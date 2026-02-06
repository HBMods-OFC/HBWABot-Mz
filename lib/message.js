import path from 'path'
import { toAudio } from './converter.js'
import chalk from 'chalk'
import fetch from 'node-fetch'
import PhoneNumber from 'awesome-phonenumber'
import fs from 'fs'
import os from 'os'
import util from 'util'
import { fileTypeFromBuffer } from 'file-type'
import { format } from 'util'
import { fileURLToPath } from 'url'
import store from './store.js'
import * as Jimp from 'jimp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

import _makeWaSocket, {
    proto,
    areJidsSameUser,
    downloadContentFromMessage,
    generateForwardMessageContent,
    generateWAMessageFromContent,
    generateWAMessage,
    getDevice,
    WAMessageStubType,
    extractMessageContent,
    jidDecode,
} from '@hbmodsofc/baileys'

export function makeWASocket(connectionOptions, options = {}) {
    let HBWABotMz = _makeWaSocket(connectionOptions)
    const _baseSend = HBWABotMz.sendMessage.bind(HBWABotMz)

    let engine = Object.defineProperties(HBWABotMz, {
        sendMessage: {
            async value(jid, content = {}, options = {}) {
                try {
                    const processMedia = async (input) => {
                        if (input && typeof input === 'object' && typeof input.url === 'string') {
                            const res = await HBWABotMz.getFile(input.url, false)
                            return res.data
                        }
                        if (typeof input === 'string') {
                            const res = await HBWABotMz.getFile(input, false)
                            return res.data
                        }
                        return input
                    }

                    const payload = { ...content }
                    const keys = ['image', 'video', 'audio', 'document', 'sticker']
                    for (const key of keys) {
                        if (key in payload) {
                            const raw = payload[key]
                            const clean = await processMedia(raw)
                            if (clean !== raw) payload[key] = clean
                        }
                    }

                    const cfg = { upload: HBWABotMz.waUploadToServer, ...options }
                    return await _baseSend(jid, payload, cfg)
                } catch (err) {
                    return await _baseSend(jid, content, options)
                }
            }
        },
        chats: {
            value: { ...(options.chats || {}) },
            writable: true
        },
        decodeJid: {
            value(jid) {
                if (!jid || typeof jid !== 'string') return (!nullish(jid) && jid) || null
                return jid.decodeJid()
            }
        },
        getJid: {
            value(sender) {
                if (!HBWABotMz.jidMap) HBWABotMz.jidMap = {}
                if (!sender) return sender

                let id = String(sender).decodeJid()

                if (HBWABotMz.jidMap[id]) return HBWABotMz.jidMap[id]
                if (/@(s\.whatsapp\.net|g\.us|broadcast)$/.test(id)) return id
                if (/^\d+$/.test(id)) return (HBWABotMz.jidMap[id] = `${id}@s.whatsapp.net`)
                if (!id.endsWith("@lid")) return id

                for (let chat of Object.values(HBWABotMz.chats)) {
                    const members = chat.metadata?.participants || []
                    if (!members.length) continue
                    const target = members.find(m => m?.lid === id || m?.id === id || m?.jid === id)
                    if (target) {
                        const resolved = target.id || target.jid || (target.phoneNumber ? `${String(target.phoneNumber).replace(/[^0-9]/g, '')}@s.whatsapp.net` : null)
                        if (resolved) {
                            HBWABotMz.jidMap[id] = resolved.decodeJid ? resolved.decodeJid() : String(resolved).decodeJid()
                            return HBWABotMz.jidMap[id]
                        }
                    }
                }
                return id
            }
        },
        
        logger: {
            get() {
                return {
                    info(...args) {
                        console.log(
                            chalk.bold.bgRgb(51, 204, 51)(' INFO '),
                            `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                            chalk.cyan(format(...args))
                        )
                    },
                    error(...args) {
                        console.log(
                            chalk.bold.bgRgb(247, 38, 33)(' ERROR '),
                            `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                            chalk.rgb(255, 38, 0)(format(...args))
                        )
                    },
                    warn(...args) {
                        console.log(
                            chalk.bold.bgRgb(255, 153, 0)(' WARN '),
                            `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                            chalk.redBright(format(...args))
                        )
                    },
                    trace(...args) {
                        console.log(
                            chalk.grey(' TRACE '),
                            `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                            chalk.white(format(...args))
                        )
                    },
                    debug(...args) {
                        console.log(
                            chalk.bold.bgRgb(66, 167, 245)(' DEBUG '),
                            `[${chalk.rgb(255, 255, 255)(new Date().toUTCString())}]:`,
                            chalk.white(format(...args))
                        )
                    }
                }
            },
            enumerable: true
        },
        getFile: {
            async value(src, write = false) {
                try {
                    let response, pathName;
                    let payload = Buffer.isBuffer(src)
                        ? src
                        : src instanceof ArrayBuffer
                            ? Buffer.from(src)
                            : /^data:.*?\/.*?;base64,/i.test(src)
                                ? Buffer.from(src.split(',')[1], 'base64')
                                : /^https?:\/\//.test(src)
                                    ? (response = await fetch(src), Buffer.from(await response.arrayBuffer()))
                                    : fs.existsSync(src)
                                        ? (pathName = src, fs.readFileSync(src))
                                        : typeof src === 'string'
                                            ? Buffer.from(src)
                                            : Buffer.alloc(0);

                    if (!Buffer.isBuffer(payload)) throw new TypeError('Invalid buffer output');

                    const meta = await fileTypeFromBuffer(payload) || {
                        mime: 'application/octet-stream',
                        ext: 'bin'
                    };

                    if (payload && write && !pathName) {
                        pathName = path.join(__dirname, '../tmp/' + Date.now() + '.' + meta.ext);
                        await fs.promises.writeFile(pathName, payload);
                    }

                    return {
                        response,
                        pathName,
                        ...meta,
                        data: payload,
                        delete() {
                            return pathName && fs.promises.unlink(pathName);
                        }
                    };
                } catch (err) {
                    throw new Error('File processing error: ' + err.message);
                }
            },
            enumerable: true
        },
        waitEvent: {
            value(targetEvent, condition = () => true, retryLimit = 25, expiry = 5000) {
                return new Promise((resolve, reject) => {
                    let count = 0;
                    let timer;

                    const listener = (...data) => {
                        count++;
                        if (condition(...data)) {
                            clearTimeout(timer);
                            HBWABotMz.ev.off(targetEvent, listener);
                            resolve(...data);
                        } else if (count >= retryLimit) {
                            clearTimeout(timer);
                            HBWABotMz.ev.off(targetEvent, listener);
                            reject(new Error(`Event limit exceeded: ${targetEvent}`));
                        }
                    };

                    HBWABotMz.ev.on(targetEvent, listener);

                    timer = setTimeout(() => {
                        HBWABotMz.ev.off(targetEvent, listener);
                        reject(new Error(`Event timeout: ${targetEvent}`));
                    }, expiry);
                });
            },
            enumerable: true
        },
        
        sendFile: {
            async value(jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) {
                try {
                    let type = await HBWABotMz.getFile(path, true);
                    let { response, data: file, pathName: pathFile } = type;

                    if (response && response.status !== 200 || file.length <= 65536) {
                        try { throw { json: JSON.parse(file.toString()) } }
                        catch (e) { if (e.json) throw e.json }
                    }

                    const detectType = function (mime, opts) {
                        if (/webp/.test(mime) || (opts.asSticker && /image/.test(mime))) return 'sticker';
                        if (/image/.test(mime) || (opts.asImage && /webp/.test(mime))) return 'image';
                        if (/video/.test(mime)) return 'video';
                        if (/audio/.test(mime)) return 'audio';
                        return 'document';
                    };

                    let mtype = detectType(type.mime, options);
                    let mimetype = options.mimetype || type.mime;

                    if (/audio/.test(type.mime)) {
                        let convert = await toAudio(file, type.ext);
                        file = convert.data;
                        pathFile = convert.filename;
                        mtype = 'audio';
                        mimetype = options.mimetype || 'audio/ogg; codecs=opus';
                    }

                    let payload = {
                        caption,
                        ptt,
                        [mtype]: file,
                        mimetype,
                        fileName: filename || (pathFile ? pathFile.split('/').pop() : undefined),
                        ...options
                    };

                    let config = { filename, quoted, ptt, upload: HBWABotMz.waUploadToServer, ...options };
                    return await HBWABotMz.sendMessage(jid, payload, config);
                } catch (err) {
                    throw new Error('Media delivery failed: ' + err.message);
                }
            },
            enumerable: true
        },
        sendSticker: {
        async value(jid, source, quoted, options = {}) {
        const { data: buffer, mime } = await HBWABotMz.getFile(source)
        if (!buffer || buffer.length === 0) throw new Error('Source file missing')

        const info = {
            packName: options.packname || options.packName || global.packname || 'HB-Mz',
            packPublish: options.author || options.packPublish || global.author || 'Bot'
        }

        const { writeExif } = await import('./exif.js')
        const stickerBuffer = await writeExif(buffer, info)

        return HBWABotMz.sendMessage(jid, { 
            sticker: stickerBuffer, 
            ...options 
        }, { quoted })
    },
    enumerable: true
},
        sendAlbumMessage: {
            async value(jid, content = {}, options = {}) {
                const { album, mentions, contextInfo, ...others } = content;
                for (const item of album) {
                    if (!item.image && !item.video) throw new TypeError(`Invalid album content type`);
                }
                if (album.length < 2) throw new RangeError("Album requires at least 2 items");
                
                const container = await generateWAMessageFromContent(jid, {
                    albumMessage: {
                        expectedImageCount: album.filter(m => m.image).length,
                        expectedVideoCount: album.filter(m => m.video).length,
                    }
                }, { userJid: HBWABotMz.user.id });

                await HBWABotMz.relayMessage(jid, container.message, { messageId: container.key.id });
                
                for (const item of album) {
                    const msg = await generateWAMessage(jid, { ...others, ...item }, { upload: HBWABotMz.waUploadToServer });
                    msg.message.messageContextInfo = {
                        messageAssociation: {
                            associationType: 1,
                            parentMessageKey: container.key
                        }
                    }
                    await HBWABotMz.relayMessage(jid, msg.message, { messageId: msg.key.id });
                }
                return container;
            },
            enumerable: true
        },

        sendContact: {
            async value(jid, data, quoted, options = {}) {
                try {
                    if (!Array.isArray(data[0]) && typeof data[0] === 'string') data = [data];
                    let list = [];
                    for (let [num, name] of data) {
                        num = num.replace(/[^0-9]/g, '');
                        if (!num) throw new Error('Number is missing');
                        let userJid = num + '@s.whatsapp.net';
                        let profile = await HBWABotMz.getBusinessProfile(userJid).catch(() => ({}));
                        let label = HBWABotMz.chats[userJid]?.vname || HBWABotMz.getName(userJid) || name;
                        let bizInfo = profile.description ? `\nX-WA-BIZ-NAME:${label}\nX-WA-BIZ-DESCRIPTION:${profile.description.replace(/\n/g, '\\n')}` : '';
                        let vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name.replace(/\n/g, '\\n')}\nTEL;type=CELL;type=VOICE;waid=${num}:${num}${bizInfo}\nEND:VCARD`.trim();
                        list.push({ vcard, displayName: name });
                    }
                    return await HBWABotMz.sendMessage(jid, {
                        ...options,
                        contacts: {
                            displayName: (list.length > 1 ? `${list.length} contacts` : list[0].displayName) || null,
                            contacts: list
                        }
                    }, { quoted, ...options });
                } catch (err) {
                    throw new Error('Contact share failed: ' + err.message);
                }
            },
            enumerable: true
        },
        sendContactArray: {
            async value(jid, data, quoted, options = {}) {
                try {
                    let list = [];
                    for (let [num, name, org, label, email, adr, web, label2] of data) {
                        num = num.replace(/[^0-9]/g, '');
                        if (!num) throw new Error('Invalid contact number');

                        let userJid = num + '@s.whatsapp.net';
                        let profile = await HBWABotMz.getBusinessProfile(userJid).catch(() => ({}));
                        let vname = HBWABotMz.chats[userJid]?.vname || HBWABotMz.getName(userJid) || name;
                        let bizInfo = profile.description ? `\nX-WA-BIZ-NAME:${vname}\nX-WA-BIZ-DESCRIPTION:${profile.description.replace(/\n/g, '\\n')}` : '';

                        let vcard = `BEGIN:VCARD
VERSION:3.0
FN:${name.replace(/\n/g, '\\n')}
ORG:${org || ''}
TEL;type=CELL;type=VOICE;waid=${num}:${PhoneNumber('+' + num).getNumber('international')}
item1.EMAIL;type=INTERNET:${email || ''}
item1.X-ABLabel:Email
item2.ADR:;;${adr || ''};;;;
item2.X-ABADR:ac
item2.X-ABLabel:Location
item3.URL:${web || ''}
item3.X-ABLabel:Website
item4.X-ABLabel:${label2 || ''}
${bizInfo}
END:VCARD`.trim();

                        list.push({ vcard, displayName: name });
                    }

                    return await HBWABotMz.sendMessage(jid, {
                        ...options,
                        contacts: {
                            displayName: (list.length > 1 ? `${list.length} items` : list[0].displayName) || null,
                            contacts: list
                        }
                    }, { quoted, ...options });
                } catch (err) {
                    throw new Error('Contact array failure: ' + err.message);
                }
            },
            enumerable: true
        },
        resize: {
            async value(buffer, w, h) {
                let img = await Jimp.read(buffer)
                return await img.resize(w, h).getBufferAsync(Jimp.MIME_JPEG)
            }
        },
        reply: {
            value(jid, content = '', quoted, options) {
                return Buffer.isBuffer(content) 
                    ? HBWABotMz.sendFile(jid, content, 'file', '', quoted, false, options) 
                    : HBWABotMz.sendMessage(jid, {
                        ...options,
                        text: content,
                        contextInfo: {
                            mentionedJid: HBWABotMz.parseMention(content),
                            ...(global.adReply?.contextInfo || {})
                        },
                        ...options
                    }, {
                        quoted,
                        ephemeralExpiration: global.ephemeral,
                        ...options
                    })
            }
        },
        sendMedia: {
            async value(jid, src, quoted, options = {}) {
                try {
                    let type = await HBWABotMz.getFile(src, true);
                    let { mime, data: buffer } = type;

                    if (!mime) throw new Error('Mime detection failed');
                    
                    const getTag = function (m, opts) {
                        if (opts.asDocument) return 'document';
                        if (/image/.test(m)) return 'image';
                        if (/video/.test(m)) return 'video';
                        if (/audio/.test(m)) return 'audio';
                        return null;
                    }

                    let tag = getTag(mime, options);
                    if (!tag) throw new Error('Mimetype not supported');

                    let payload = {
                        [tag]: buffer,
                        mimetype: mime,
                        fileName: options.fileName || src.split('/').pop(),
                        ...options
                    };

                    return await HBWABotMz.sendMessage(jid, payload, { quoted });
                } catch (err) {
                    throw new Error('Media transmission error: ' + err.message);
                }
            },
            enumerable: true
        },
        
        updateProfileStatus: {
            async value(status) {
                return await HBWABotMz.query({
                    tag: 'iq',
                    attrs: {
                        to: 's.whatsapp.net',
                        type: 'set',
                        xmlns: 'status',
                    },
                    content: [
                        {
                            tag: 'status',
                            attrs: {},
                            content: Buffer.from(status, 'utf-8')
                        }
                    ]
                })
            }
        },
        sendButton: {
            async value(jid, text = '', footer = '', buffer, buttons, quoted, options) {
                let type
                if (Array.isArray(buffer)) (options = quoted, quoted = buttons, buttons = buffer, buffer = null)
                else if (buffer) try { (type = await HBWABotMz.getFile(buffer), buffer = type.data) } catch { buffer = null }
                if (!Array.isArray(buttons[0]) && typeof buttons[0] === 'string') buttons = [buttons]
                if (!options) options = {}
                let payload = {
                    ...options,
                    [buffer ? 'caption' : 'text']: text || '',
                    footer,
                    buttons: buttons.map(btn => ({
                        buttonId: !nullish(btn[1]) && btn[1] || !nullish(btn[0]) && btn[0] || '',
                        buttonText: {
                            displayText: !nullish(btn[0]) && btn[0] || !nullish(btn[1]) && btn[1] || ''
                        }
                    })),
                    ...(buffer ?
                        options.asLocation && /image/.test(type.mime) ? {
                            location: {
                                ...options,
                                jpegThumbnail: buffer
                            }
                        } : {
                            [/video/.test(type.mime) ? 'video' : /image/.test(type.mime) ? 'image' : 'document']: buffer
                        } : {})
                }

                return await HBWABotMz.sendMessage(jid, payload, {
                    quoted,
                    upload: HBWABotMz.waUploadToServer,
                    ...options
                })
            },
            enumerable: true
        },
        sendPayment: {
            async value(jid, amount, currency, text = '', from, image, options) {
                let thumb = await HBWABotMz.resize(image, 300, 150)
                let codes = ["AED", "BRL", "EUR", "GBP", "INR", "IDR", "JPY", "USD", "ZAR"]
                let randomCode = codes[Math.floor(Math.random() * codes.length)]
                const paymentInfo = {
                    amount: {
                        currencyCode: currency || randomCode,
                        offset: 0,
                        value: amount || 9.99
                    },
                    expiryTimestamp: 0,
                    amount1000: (amount || 9.99) * 1000,
                    currencyCodeIso4217: currency || randomCode,
                    requestFrom: from || '0@s.whatsapp.net',
                    noteMessage: {
                        extendedTextMessage: {
                            text: text || 'Payment Request'
                        }
                    },
                    background: !!image ? thumb : undefined
                };
                return await HBWABotMz.relayMessage(jid, { requestPaymentMessage: paymentInfo }, { ...options });
            }
        },
        sendPoll: {
            async value(jid, name = '', pollOptions, options) {
                if (!Array.isArray(pollOptions[0]) && typeof pollOptions[0] === 'string') pollOptions = [pollOptions]
                if (!options) options = {}
                const pollData = {
                    name: name,
                    options: pollOptions.map(btn => ({
                        optionName: !nullish(btn[0]) && btn[0] || ''
                    })),
                    selectableOptionsCount: 1
                }
                return HBWABotMz.relayMessage(jid, { pollCreationMessage: pollData }, { ...options });
            }
        },
        downloadAndSaveMediaMessage: {
            async value(message, filename, addExtension = true) {
                try {
                    let raw = message.msg || message;
                    let mime = raw.mimetype || '';
                    let kind = mime.split('/')[0];

                    if (!['image', 'video', 'audio', 'document'].includes(kind)) {
                        throw new Error('No valid media found');
                    }

                    const typeTag = kind === 'sticker' ? 'image' : kind;
                    let input;
                    try {
                        input = await downloadContentFromMessage(raw, typeTag);
                    } catch (e) {
                        if (/readableStream/i.test(e?.message)) {
                            const stream = await import('stream');
                            const baseFromWeb = stream.Readable.fromWeb?.bind(stream.Readable);
                            if (baseFromWeb) {
                                try {
                                    stream.Readable.fromWeb = (rs, opts) => (rs && typeof rs.getReader !== 'function') ? rs : baseFromWeb(rs, opts);
                                    input = await downloadContentFromMessage(raw, typeTag);
                                } finally {
                                    stream.Readable.fromWeb = baseFromWeb;
                                }
                            } else throw e;
                        } else throw e;
                    }

                    const getBuffer = async (s) => {
                        if (s && typeof s.getReader === 'function') {
                            const r = s.getReader();
                            const chunks = [];
                            while (true) {
                                const { value, done } = await r.read();
                                if (done) break;
                                if (value) chunks.push(Buffer.from(value));
                            }
                            return Buffer.concat(chunks);
                        }
                        if (s && typeof s[Symbol.asyncIterator] === 'function') {
                            const chunks = [];
                            for await (const chunk of s) chunks.push(Buffer.from(chunk));
                            return Buffer.concat(chunks);
                        }
                        throw new Error('Stream error');
                    };

                    const buf = await getBuffer(input);
                    let meta = await fileTypeFromBuffer(buf) || { ext: 'bin', mime: 'application/octet-stream' };
                    const finalPath = addExtension ? `${filename}.${meta.ext}` : filename;

                    await fs.promises.writeFile(finalPath, buf);
                    return finalPath;
                } catch (err) {
                    throw new Error('Download error: ' + err.message);
                }
            },
            enumerable: true
        },
        
        sendHydrated: {
            async value(jid, text = '', footer = '', buffer, url, urlText, call, callText, buttons, quoted, options) {
                let meta
                if (buffer) try { (meta = await HBWABotMz.getFile(buffer), buffer = meta.data) } catch { buffer = buffer }
                if (buffer && !Buffer.isBuffer(buffer) && (typeof buffer === 'string' || Array.isArray(buffer))) (options = quoted, quoted = buttons, buttons = callText, callText = call, call = urlText, urlText = url, url = buffer, buffer = null)
                if (!options) options = {}
                let templateButtons = []
                if (url || urlText) {
                    if (!Array.isArray(url)) url = [url]
                    if (!Array.isArray(urlText)) urlText = [urlText]
                    templateButtons.push(...(
                        url.map((v, i) => [v, urlText[i]])
                            .map(([u, ut], i) => ({
                                index: templateButtons.length + i + 1,
                                urlButton: {
                                    displayText: !nullish(ut) && ut || !nullish(u) && u || '',
                                    url: !nullish(u) && u || !nullish(ut) && ut || ''
                                }
                            })) || []
                    ))
                }
                if (call || callText) {
                    if (!Array.isArray(call)) call = [call]
                    if (!Array.isArray(callText)) callText = [callText]
                    templateButtons.push(...(
                        call.map((v, i) => [v, callText[i]])
                            .map(([c, ct], i) => ({
                                index: templateButtons.length + i + 1,
                                callButton: {
                                    displayText: !nullish(ct) && ct || !nullish(c) && c || '',
                                    phoneNumber: !nullish(c) && c || !nullish(ct) && ct || ''
                                }
                            })) || []
                    ))
                }
                if (buttons.length) {
                    if (!Array.isArray(buttons[0])) buttons = [buttons]
                    templateButtons.push(...(
                        buttons.map(([t, id], index) => ({
                            index: templateButtons.length + index + 1,
                            quickReplyButton: {
                                displayText: !nullish(t) && t || !nullish(id) && id || '',
                                id: !nullish(id) && id || !nullish(t) && t || ''
                            }
                        })) || []
                    ))
                }
                let payload = {
                    ...options,
                    [buffer ? 'caption' : 'text']: text || '',
                    footer,
                    templateButtons,
                    ...(buffer ?
                        options.asLocation && /image/.test(meta.mime) ? {
                            location: {
                                ...options,
                                jpegThumbnail: buffer
                            }
                        } : {
                            [/video/.test(meta.mime) ? 'video' : /image/.test(meta.mime) ? 'image' : 'document']: buffer
                        } : {})
                }
                return await HBWABotMz.sendMessage(jid, payload, {
                    quoted,
                    upload: HBWABotMz.waUploadToServer,
                    ...options
                })
            },
            enumerable: true
        },
        sendHydrated2: {
            async value(jid, text = '', footer = '', buffer, url, urlText, url2, urlText2, buttons, quoted, options) {
                let meta
                if (buffer) try { (meta = await HBWABotMz.getFile(buffer), buffer = meta.data) } catch { buffer = buffer }
                if (buffer && !Buffer.isBuffer(buffer) && (typeof buffer === 'string' || Array.isArray(buffer))) (options = quoted, quoted = buttons, buttons = urlText2, urlText2 = url2, url2 = urlText, urlText = url, url = buffer, buffer = null)
                if (!options) options = {}
                let templateButtons = []
                if (url || urlText) {
                    if (!Array.isArray(url)) url = [url]
                    if (!Array.isArray(urlText)) urlText = [urlText]
                    templateButtons.push(...(
                        url.map((v, i) => [v, urlText[i]])
                            .map(([u, ut], i) => ({
                                index: templateButtons.length + i + 1,
                                urlButton: {
                                    displayText: !nullish(ut) && ut || !nullish(u) && u || '',
                                    url: !nullish(u) && u || !nullish(ut) && ut || ''
                                }
                            })) || []
                    ))
                }
                if (url2 || urlText2) {
                    if (!Array.isArray(url2)) url2 = [url2]
                    if (!Array.isArray(urlText2)) urlText2 = [urlText2]
                    templateButtons.push(...(
                        url2.map((v, i) => [v, urlText2[i]])
                            .map(([u2, ut2], i) => ({
                                index: templateButtons.length + i + 1,
                                urlButton: {
                                    displayText: !nullish(ut2) && ut2 || !nullish(u2) && u2 || '',
                                    url: !nullish(u2) && u2 || !nullish(ut2) && ut2 || ''
                                }
                            })) || []
                    ))
                }
                if (buttons.length) {
                    if (!Array.isArray(buttons[0])) buttons = [buttons]
                    templateButtons.push(...(
                        buttons.map(([t, id], index) => ({
                            index: templateButtons.length + index + 1,
                            quickReplyButton: {
                                displayText: !nullish(t) && t || !nullish(id) && id || '',
                                id: !nullish(id) && id || !nullish(t) && t || ''
                            }
                        })) || []
                    ))
                }
                let payload = {
                    ...options,
                    [buffer ? 'caption' : 'text']: text || '',
                    footer,
                    templateButtons,
                    ...(buffer ?
                        options.asLocation && /image/.test(meta.mime) ? {
                            location: {
                                ...options,
                                jpegThumbnail: buffer
                            }
                        } : {
                            [/video/.test(meta.mime) ? 'video' : /image/.test(meta.mime) ? 'image' : 'document']: buffer
                        } : {})
                }
                return await HBWABotMz.sendMessage(jid, payload, {
                    quoted,
                    upload: HBWABotMz.waUploadToServer,
                    ...options
                })
            },
            enumerable: true
        },
        msToDate: {
            async value(ms) {
                let d = Math.floor(ms / (24 * 60 * 60 * 1000));
                let h = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                let m = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000));
                return d + " Days " + h + " Hours " + m + " Minutes";
            }
        },
        delay: {
            async value(ms) {
                return new Promise(res => setTimeout(res, ms))
            }
        },
        cMod: {
            value(jid, message, text = '', sender = HBWABotMz.user.jid, options = {}) {
                if (options.mentions && !Array.isArray(options.mentions)) options.mentions = [options.mentions]
                let copy = message.toJSON()
                delete copy.message.messageContextInfo
                delete copy.message.senderKeyDistributionMessage
                let type = Object.keys(copy.message)[0]
                let msg = copy.message
                let body = msg[type]
                if (typeof body === 'string') msg[type] = text || body
                else if (body.caption) body.caption = text || body.caption
                else if (body.text) body.text = text || body.text
                if (typeof body !== 'string') {
                    msg[type] = { ...body, ...options }
                    msg[type].contextInfo = {
                        ...(body.contextInfo || {}),
                        mentionedJid: options.mentions || body.contextInfo?.mentionedJid || []
                    }
                }
                if (copy.participant) sender = copy.participant = sender || copy.participant
                else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
                if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
                else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
                copy.key.remoteJid = jid
                copy.key.fromMe = areJidsSameUser(sender, HBWABotMz.user.id) || false
                return proto.WebMessageInfo.create(copy)
            },
            enumerable: true
        },
        
        copyNForward: {
            async value(jid, message, score = true, options = {}) {
                let vType
                if (options.readViewOnce && message.message.viewOnceMessage?.message) {
                    vType = Object.keys(message.message.viewOnceMessage.message)[0]
                    delete message.message.viewOnceMessage.message[vType].viewOnce
                    message.message = proto.Message.create(
                        JSON.parse(JSON.stringify(message.message.viewOnceMessage.message))
                    )
                    message.message[vType].contextInfo = message.message.viewOnceMessage.contextInfo
                }
                let mType = Object.keys(message.message)[0]
                let content = generateForwardMessageContent(message, !!score)
                let cType = Object.keys(content)[0]
                if (score && typeof score === 'number' && score > 1) content[cType].contextInfo.forwardingScore += score
                content[cType].contextInfo = {
                    ...(message.message[mType].contextInfo || {}),
                    ...(content[cType].contextInfo || {})
                }
                content = generateWAMessageFromContent(jid, content, {
                    ...options,
                    userJid: HBWABotMz.user.jid
                })
                await HBWABotMz.relayMessage(jid, content.message, { messageId: content.key.id, additionalAttributes: { ...options } })
                return content
            },
            enumerable: true
        },
        fakeReply: {
            value(jid, text = '', fakeJid = this.user.jid, fakeText = '', fakeGroup, options) {
                return HBWABotMz.reply(jid, text, { key: { fromMe: areJidsSameUser(fakeJid, HBWABotMz.user.id), participant: fakeJid, ...(fakeGroup ? { remoteJid: fakeGroup } : {}) }, message: { conversation: fakeText }, ...options })
            }
        },
        downloadM: {
            async value(m, type, savePath) {
                try {
                    if (!m || !(m.url || m.directPath)) throw new Error('Media source missing');
                    const dlTag = type === 'sticker' ? 'image' : type;
                    let stream;
                    try {
                        stream = await downloadContentFromMessage(m, dlTag);
                    } catch (e) {
                        if (/readableStream/i.test(e?.message)) {
                            const nodeStream = await import('stream');
                            const baseFromWeb = nodeStream.Readable.fromWeb?.bind(nodeStream.Readable);
                            if (baseFromWeb) {
                                try {
                                    nodeStream.Readable.fromWeb = (rs, opts) => (rs && typeof rs.getReader !== 'function') ? rs : baseFromWeb(rs, opts);
                                    stream = await downloadContentFromMessage(m, dlTag);
                                } finally {
                                    nodeStream.Readable.fromWeb = baseFromWeb;
                                }
                            } else throw e;
                        } else throw e;
                    }

                    const getBuffer = async (s) => {
                        if (s && typeof s.getReader === 'function') {
                            const r = s.getReader();
                            const chunks = [];
                            while (true) {
                                const { value, done } = await r.read();
                                if (done) break;
                                if (value) chunks.push(Buffer.from(value));
                            }
                            return Buffer.concat(chunks);
                        }
                        if (s && typeof s[Symbol.asyncIterator] === 'function') {
                            const chunks = [];
                            for await (const chunk of s) chunks.push(Buffer.from(chunk));
                            return Buffer.concat(chunks);
                        }
                        throw new Error('Stream error');
                    };

                    const buf = await getBuffer(stream);
                    if (savePath) {
                        const meta = await fileTypeFromBuffer(buf);
                        const dest = savePath || `file_${Date.now()}.${meta?.ext || 'bin'}`;
                        await fs.promises.writeFile(dest, buf);
                        return dest;
                    }
                    return buf;
                } catch (err) {
                    throw new Error('Media download failed: ' + err.message);
                }
            },
            enumerable: true
        },
        parseMention: {
            value(text = '') {
                return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
            },
            enumerable: true
        },
        saveName: {
            async value(id, name = '') {
                if (!id) return;
                id = HBWABotMz.decodeJid(id);
                let isGroup = id.endsWith('@g.us');
                if (id in HBWABotMz.contacts && HBWABotMz.contacts[id][isGroup ? 'subject' : 'name'] && id in HBWABotMz.chats) return;
                let meta = {};
                if (isGroup) meta = await HBWABotMz.groupMetadata(id);
                let data = { ...(HBWABotMz.contacts[id] || {}), id, ...(isGroup ? { subject: meta.subject, desc: meta.desc } : { name }) };
                HBWABotMz.contacts[id] = data;
                HBWABotMz.chats[id] = data;
            }
        },
        getName: {
            value(jid = '', hideContact = false) {
                jid = HBWABotMz.decodeJid(jid);
                hideContact = HBWABotMz.withoutContact || hideContact;
                let data;
                if (jid.endsWith('@g.us')) return new Promise(async (res) => {
                    data = HBWABotMz.chats[jid] || {};
                    if (!(data.name || data.subject)) data = await HBWABotMz.groupMetadata(jid) || {};
                    res(data.name || data.subject || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international'));
                });
                else data = jid === '0@s.whatsapp.net' ? { jid, vname: 'WhatsApp' } : areJidsSameUser(jid, HBWABotMz.user.id) ? HBWABotMz.user : (HBWABotMz.chats[jid] || {});
                return (hideContact ? '' : data.name) || data.subject || data.vname || data.notify || data.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international');
            },
            enumerable: true
        },
        loadMessage: {
            value(id) {
                return Object.entries(HBWABotMz.chats)
                    .filter(([_, { messages }]) => typeof messages === 'object')
                    .find(([_, { messages }]) => Object.entries(messages)
                        .find(([k, v]) => (k === id || v.key?.id === id)))
                    ?.[1].messages?.[id];
            },
            enumerable: true
        },
        
        sendGroupV4Invite: {
            async value(groupJid, participant, inviteCode, inviteExpiration, groupName = 'Group Name', caption = 'Group Invite', jpegThumbnail, options = {}) {
                const invite = generateWAMessageFromContent(participant, {
                    groupInviteMessage: {
                        inviteCode,
                        inviteExpiration: parseInt(inviteExpiration) || + new Date(new Date + (3 * 86400000)),
                        groupJid,
                        groupName,
                        jpegThumbnail,
                        caption
                    }
                }, {
                    userJid: HBWABotMz.user.id,
                    ...options
                })
                await HBWABotMz.relayMessage(participant, invite.message, { messageId: invite.key.id })
                return invite
            },
            enumerable: true
        },
        processMessageStubType: {
            async value(m) {
                if (!m.messageStubType) return
                const remote = HBWABotMz.decodeJid(m.key.remoteJid || m.message?.senderKeyDistributionMessage?.groupId || '')
                if (!remote || remote === 'status@broadcast') return
                const groupUpdate = (data) => {
                    HBWABotMz.ev.emit('groups.update', [{ id: remote, ...data }])
                }
                switch (m.messageStubType) {
                    case WAMessageStubType.REVOKE:
                    case WAMessageStubType.GROUP_CHANGE_INVITE_LINK:
                        groupUpdate({ revoke: m.messageStubParameters?.[0] })
                        break
                    case WAMessageStubType.GROUP_CHANGE_ICON:
                        groupUpdate({ icon: m.messageStubParameters?.[0] })
                        break
                    case WAMessageStubType.GROUP_PARTICIPANT_ADD:
                    case WAMessageStubType.GROUP_PARTICIPANT_REMOVE:
                    case WAMessageStubType.GROUP_PARTICIPANT_PROMOTE:
                    case WAMessageStubType.GROUP_PARTICIPANT_DEMOTE:
                    case WAMessageStubType.GROUP_PARTICIPANT_INVITE:
                    case WAMessageStubType.GROUP_PARTICIPANT_LEAVE:
                    case WAMessageStubType.GROUP_PARTICIPANT_CHANGE_NUMBER:
                        try {
                            const rawParam = m.messageStubParameters?.[0]
                            if (rawParam) {
                                const info = JSON.parse(rawParam)
                                if (info.id && info.phoneNumber) {
                                    if (!HBWABotMz.jidMap) HBWABotMz.jidMap = {}
                                    HBWABotMz.jidMap[info.id] = info.phoneNumber
                                }
                            }
                        } catch (err) {}
                        break
                }
                const isGroup = remote.endsWith('@g.us')
                if (!isGroup) return
                let item = HBWABotMz.chats[remote]
                if (!item) item = HBWABotMz.chats[remote] = { id: remote }
                item.isChats = true
                const meta = await HBWABotMz.groupMetadata(remote).catch(() => null)
                if (!meta) return
                item.subject = meta.subject
                item.metadata = meta
            }
        },
        relayWAMessage: {
            async value(msg) {
                if (msg.message.audioMessage) {
                    await HBWABotMz.sendPresenceUpdate('recording', msg.key.remoteJid)
                } else {
                    await HBWABotMz.sendPresenceUpdate('composing', msg.key.remoteJid)
                }
                const status = await HBWABotMz.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id })
                HBWABotMz.ev.emit('messages.upsert', { messages: [msg], type: 'append' });
                return status
            }
        },
        insertAllGroup: {
            async value() {
                const list = await HBWABotMz.groupFetchAllParticipating().catch(() => ({})) || {}
                for (const id in list) HBWABotMz.chats[id] = { ...(HBWABotMz.chats[id] || {}), id, subject: list[id].subject, isChats: true, metadata: list[id] }
                return HBWABotMz.chats
            },
        },
        pushMessage: {
            async value(m) {
                if (!m) return
                if (!Array.isArray(m)) m = [m]
                for (const item of m) {
                    try {
                        if (!item) continue
                        if (item.messageStubType && item.messageStubType != WAMessageStubType.CIPHERTEXT) HBWABotMz.processMessageStubType(item).catch(() => null)
                        const keys = Object.keys(item.message || {})
                        const type = (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(keys[0]) && keys[0]) ||
                            (keys.length >= 3 && keys[1] !== 'messageContextInfo' && keys[1]) ||
                            keys[keys.length - 1]
                        const remote = HBWABotMz.decodeJid(item.key.remoteJid || item.message?.senderKeyDistributionMessage?.groupId || '')
                        if (item.message?.[type]?.contextInfo?.quotedMessage) {
                            let context = item.message[type].contextInfo
                            let user = HBWABotMz.decodeJid(context.participant)
                            const chatJid = HBWABotMz.decodeJid(context.remoteJid || user)
                            let quoted = item.message[type].contextInfo.quotedMessage
                            if ((chatJid && chatJid !== 'status@broadcast') && quoted) {
                                let qType = Object.keys(quoted)[0]
                                if (qType == 'conversation') {
                                    quoted.extendedTextMessage = { text: quoted[qType] }
                                    delete quoted.conversation
                                    qType = 'extendedTextMessage'
                                }
                                if (!quoted[qType].contextInfo) quoted[qType].contextInfo = {}
                                quoted[qType].contextInfo.mentionedJid = context.mentionedJid || quoted[qType].contextInfo.mentionedJid || []
                                const isGroup = chatJid.endsWith('g.us')
                                if (isGroup && !user) user = chatJid
                                const qMsg = {
                                    key: {
                                        remoteJid: chatJid,
                                        fromMe: areJidsSameUser(HBWABotMz.user.jid, chatJid),
                                        id: context.stanzaId,
                                        participant: user,
                                    },
                                    message: JSON.parse(JSON.stringify(quoted)),
                                    ...(isGroup ? { participant: user } : {})
                                }
                                let targetChat = HBWABotMz.chats[user]
                                if (!targetChat) targetChat = HBWABotMz.chats[user] = { id: user, isChats: !isGroup }
                                if (!targetChat.messages) targetChat.messages = {}
                                if (!targetChat.messages[context.stanzaId] && !qMsg.key.fromMe) targetChat.messages[context.stanzaId] = qMsg
                                let msgList = Object.entries(targetChat.messages)
                                if (msgList.length > 40) targetChat.messages = Object.fromEntries(msgList.slice(30))
                            }
                        }
                        if (!remote || remote === 'status@broadcast') continue
                        const isGroup = remote.endsWith('@g.us')
                        let chatData = HBWABotMz.chats[remote]
                        if (!chatData) {
                            if (isGroup) await HBWABotMz.insertAllGroup().catch(() => null)
                            chatData = HBWABotMz.chats[remote] = { id: remote, isChats: true, ...(HBWABotMz.chats[remote] || {}) }
                        }
                        let meta, sender
                        if (isGroup) {
                            if (!chatData.subject || !chatData.metadata) {
                                meta = await HBWABotMz.groupMetadata(remote).catch(() => ({})) || {}
                                if (!chatData.subject) chatData.subject = meta.subject || ''
                                if (!chatData.metadata) chatData.metadata = meta
                            }
                            sender = HBWABotMz.decodeJid(item.key?.fromMe && HBWABotMz.user.id || item.participant || item.key?.participant || remote || '')
                            if (sender !== remote) {
                                let sChat = HBWABotMz.chats[sender]
                                if (!sChat) sChat = HBWABotMz.chats[sender] = { id: sender }
                                if (!sChat.name) sChat.name = item.pushName || sChat.name || ''
                            }
                        } else if (!chatData.name) chatData.name = item.pushName || chatData.name || ''
                        if (['senderKeyDistributionMessage', 'messageContextInfo'].includes(type)) continue
                        chatData.isChats = true
                        if (!chatData.messages) chatData.messages = {}
                        const isMe = item.key.fromMe || areJidsSameUser(sender || remote, HBWABotMz.user.id)
                        if (!['protocolMessage'].includes(type) && !isMe && item.messageStubType != WAMessageStubType.CIPHERTEXT && item.message) {
                            delete item.message.messageContextInfo
                            delete item.message.senderKeyDistributionMessage
                            chatData.messages[item.key.id] = JSON.parse(JSON.stringify(item))
                            let history = Object.entries(chatData.messages)
                            if (history.length > 40) chatData.messages = Object.fromEntries(history.slice(30))
                        }
                    } catch (err) {}
                }
            }
        },
        
        serializeM: {
            value(m) {
                return smsg(HBWABotMz, m)
            }
        },
        ...(typeof HBWABotMz.chatRead !== 'function' ? {
            chatRead: {
                value(jid, participant = HBWABotMz.user.jid, messageID) {
                    return HBWABotMz.sendReadReceipt(jid, participant, [messageID])
                },
                enumerable: true
            }
        } : {}),
        ...(typeof HBWABotMz.setStatus !== 'function' ? {
            setStatus: {
                value(status) {
                    return HBWABotMz.query({
                        tag: 'iq',
                        attrs: {
                            to: 's.whatsapp.net',
                            type: 'set',
                            xmlns: 'status',
                        },
                        content: [
                            {
                                tag: 'status',
                                attrs: {},
                                content: Buffer.from(status, 'utf-8')
                            }
                        ]
                    })
                },
                enumerable: true
            }
        } : {})
    })

    if (engine.user?.id) engine.user.jid = engine.decodeJid(engine.user.id)
    store.bind(engine)
    return engine
}


export function smsg(HBWABotMz, m, hasParent) {
    if (!m) return m
    
    let MessageModel = proto.WebMessageInfo
    m = MessageModel.create(m)
    
    Object.defineProperty(m, 'HBWABotMz', { enumerable: false, writable: true, value: HBWABotMz })
    
    let protoKey
    if (m.message) {
        if (m.mtype == 'protocolMessage' && m.msg.key) {
            protoKey = m.msg.key
            if (protoKey == 'status@broadcast') protoKey.remoteJid = m.chat
            if (!protoKey.participant || protoKey.participant == 'status_me') protoKey.participant = m.sender
            protoKey.fromMe = HBWABotMz.decodeJid(protoKey.participant) === HBWABotMz.decodeJid(HBWABotMz.user.id)
            if (!protoKey.fromMe && protoKey.remoteJid === HBWABotMz.decodeJid(HBWABotMz.user.id)) protoKey.remoteJid = m.sender
        }
        if (m.quoted) if (!m.quoted.mediaMessage) delete m.quoted.download
    }
    if (!m.mediaMessage) delete m.download

    try {
        if (protoKey && m.mtype == 'protocolMessage' && (m.msg.type === 0 || m.msg.type === undefined)) {
            HBWABotMz.ev.emit('message.delete', protoKey)
        }
    } catch (err) {
        console.error('Serialization error:', err)
    }
    return m
}

export function serialize() {
    const MediaTypes = ['imageMessage', 'videoMessage', 'audioMessage', 'stickerMessage', 'documentMessage'];
    
    return Object.defineProperties(proto.WebMessageInfo.prototype, {
        HBWABotMz: {
            value: undefined,
            enumerable: false,
            writable: true
        },
        id: {
            get() {
                return this.key?.id
            }
        },
        isBaileys: {
            get() {
                return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id?.length === 22 || false
            }
        },
        chat: {
            get() {
                const group = this.message?.senderKeyDistributionMessage?.groupId
                return (
                    this.key?.remoteJid ||
                    (group && group !== 'status@broadcast') || ''
                ).decodeJid()
            }
        },
        isGroup: {
            get() {
                return this.chat.endsWith('@g.us')
            },
            enumerable: true
        },
        sender: {
            get() {
                if (this.key?.fromMe) return (this.HBWABotMz?.user?.jid || '').decodeJid()

                const list = [
                    this.key?.participantAlt,
                    this.key?.participant,
                    this.key?.remoteJidAlt,
                    this.key?.remoteJid,
                    this.chat
                ].filter(Boolean).map(s => String(s).decodeJid())

                const phoneJid = list.find(c => c.endsWith('@s.whatsapp.net'))
                if (phoneJid) return this.HBWABotMz.getJid(phoneJid)

                return this.HBWABotMz.getJid(list[0] || '')
            },
            enumerable: true
        },
        fromMe: {
            get() {
                return this.key?.fromMe || areJidsSameUser(this.HBWABotMz?.user.id, this.sender) || false
            }
        },
        mtype: {
            get() {
                if (!this.message) return ''
                const keys = Object.keys(this.message)
                return (!['senderKeyDistributionMessage', 'messageContextInfo'].includes(keys[0]) && keys[0]) ||
                    (keys.length >= 3 && keys[1] !== 'messageContextInfo' && keys[1]) ||
                    keys[keys.length - 1]
            },
            enumerable: true
        },
        msg: {
            get() {
                if (!this.message) return null
                return this.message[this.mtype]
            }
        },
        mediaMessage: {
            get() {
                if (!this.message) return null
                const content = ((this.msg?.url || this.msg?.directPath) ? {
                    ...this.message
                } : extractMessageContent(this.message)) || null
                if (!content) return null
                const type = Object.keys(content)[0]
                return MediaTypes.includes(type) ? content : null
            },
            enumerable: true
        },
        messages: {
            get() {
                return this.message ? this.message : null
            },
            enumerable: true
        },
        mediaType: {
            get() {
                let media
                if (!(media = this.mediaMessage)) return null
                return Object.keys(media)[0]
            },
            enumerable: true,
        },
        download: {
            value(toFile = false) {
                const type = this.mediaType;
                const media = this.mediaMessage;
                if (!type || !media || !media[type]) {
                    return null;
                }
                return this.HBWABotMz?.downloadM(media[type], type.replace(/message/i, ''), toFile);
            },
            enumerable: true,
            configurable: true,
        },
        quoted: {
            get() {
                const self = this
                const body = self.msg
                const context = body?.contextInfo
                const quotedMsg = context?.quotedMessage
                const bot = this.HBWABotMz
                if (!body || !context || !quotedMsg) return null
                
                const qType = Object.keys(quotedMsg)[0]
                let data = quotedMsg[qType]
                const text = typeof data === 'string' ? data : data.text
                return Object.defineProperties(JSON.parse(JSON.stringify(typeof data === 'string' ? {
                    text: data
                } : data)), {
                    mtype: {
                        get() {
                            return qType
                        },
                        enumerable: true
                    },
                    mediaMessage: {
                        get() {
                            const content = ((data.url || data.directPath) ? {
                                ...quotedMsg
                            } : extractMessageContent(quotedMsg)) || null
                            if (!content) return null
                            const type = Object.keys(content)[0]
                            return MediaTypes.includes(type) ? content : null
                        },
                        enumerable: true
                    },
                    messages: {
                        get() {
                            return quotedMsg ? quotedMsg : null
                        },
                        enumerable: true
                    },
                    mediaType: {
                        get() {
                            let media
                            if (!(media = this.mediaMessage)) return null
                            return Object.keys(media)[0]
                        },
                        enumerable: true,
                    },
                    id: {
                        get() {
                            return context.stanzaId
                        },
                        enumerable: true
                    },
                    chat: {
                        get() {
                            return context.remoteJid || self.chat
                        },
                        enumerable: true
                    },
                    isBaileys: {
                        get() {
                            return this.id?.length === 16 || this.id?.startsWith('3EB0') && this.id.length === 22 || false
                        },
                        enumerable: true
                    },
                    sender: {
                        get() {
                            const rawParticipant = (context.participant || this.chat || '').decodeJid()
                            return bot.getJid(rawParticipant)
                        },
                        enumerable: true
                    },
                    fromMe: {
                        get() {
                            return areJidsSameUser(this.sender, self.HBWABotMz?.user.jid)
                        },
                        enumerable: true,
                    },
                    text: {
                        get() {
                            return text || this.caption || this.contentText || this.selectedDisplayText || ''
                        },
                        enumerable: true
                    },
                    mentionedJid: {
                        get() {
                            let list = data.contextInfo?.mentionedJid || self.getQuotedObj()?.mentionedJid || []
                            return list.map(jid => bot.getJid(jid))
                        },
                        enumerable: true
                    },
                    name: {
                        get() {
                            const user = this.sender
                            return user ? self.HBWABotMz?.getName(user) : null
                        },
                        enumerable: true

                    },
                    vM: {
                        get() {
                            return proto.WebMessageInfo.create({
                                key: {
                                    fromMe: this.fromMe,
                                    remoteJid: this.chat,
                                    id: this.id
                                },
                                message: quotedMsg,
                                ...(self.isGroup ? {
                                    participant: this.sender
                                } : {})
                            })
                        }
                    },
                    fakeObj: {
                        get() {
                            return this.vM
                        }
                    },
                    download: {
                        value(toFile = false) {
                            const type = this.mediaType;
                            const media = this.mediaMessage;
                            if (!type || !media || !media[type]) {
                                throw new Error('Download failed: No media found in quoted message.');
                            }
                            return self.HBWABotMz?.downloadM(media[type], type.replace(/message/i, ''), toFile);
                        },
                        enumerable: true,
                        configurable: true,
                    },
                    reply: {
                        value(content, targetChat, options) {
                            return self.HBWABotMz?.reply(targetChat ? targetChat : this.chat, content, this.vM, options)
                        },
                        enumerable: true,
                    },
                    copy: {
                        value() {
                            const M = proto.WebMessageInfo
                            return smsg(HBWABotMz, M.create(M.toObject(this.vM)))
                        },
                        enumerable: true,
                    },
                    forward: {
                        value(jid, force = false, options) {
                            return self.HBWABotMz?.sendMessage(jid, {
                                forward: this.vM,
                                force,
                                ...options
                            }, {
                                ...options
                            })
                        },
                        enumerable: true,
                    },
                    copyNForward: {
                        value(jid, forceForward = false, options) {
                            return self.HBWABotMz?.copyNForward(jid, this.vM, forceForward, options)
                        },
                        enumerable: true,
                    },
                    cMod: {
                        value(jid, text = '', sender = this.sender, options = {}) {
                            return self.HBWABotMz?.cMod(jid, this.vM, text, sender, options)
                        },
                        enumerable: true,
                    },
                    delete: {
                        value() {
                            return self.HBWABotMz?.sendMessage(this.chat, {
                                delete: this.vM.key
                            })
                        },
                        enumerable: true,
                    },
                    react: {
                        value(text) {
                            return self.HBWABotMz?.sendMessage(this.chat, {
                                react: {
                                    text,
                                    key: this.vM.key
                                }
                            })
                        },
                        enumerable: true,
                    },
                    command: {
                        get() {
                            const clean = str => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&")
                            let pref = this.prefix ? this.prefix : global.prefix
                            let finder = (pref instanceof RegExp ? [
                                [pref.exec(text || this.caption || this.contentText || this.selectedDisplayText || ''), pref]
                            ] :
                                Array.isArray(pref) ?
                                    pref.map(p => {
                                        let re = p instanceof RegExp ? p : new RegExp(clean(p))
                                        return [re.exec(text || this.caption || this.contentText || this.selectedDisplayText || ''), re]
                                    }) :
                                    typeof pref === "string" ? [
                                        [new RegExp(clean(pref)).exec(text || this.caption || this.contentText || this.selectedDisplayText || ''), new RegExp(clean(pref))]
                                    ] : [[[], new RegExp]]
                            ).find(p => p[1])
                            
                            let trigger = ((opts?.['multiprefix'] ?? true) && (finder[0] || "")[0]) || ((opts?.['noprefix'] ?? false) ? null : (finder[0] || "")[0]);
                            let input = !trigger ? (text || this.caption || this.contentText || this.selectedDisplayText || '') : (text || this.caption || this.contentText || this.selectedDisplayText || '').replace(trigger, "");
                            let args_v2 = input.trim().split(/ +/);
                            let [cmd, ...args] = input.trim().split(" ").filter(v => v);
                            return {
                                command: cmd,
                                args,
                                args_v2,
                                noPrefix: input,
                                match: finder
                            };
                        },
                        enumerable: true
                    },
                    device: {
                        get() {
                            const dev = getDevice(this.vM.key?.id);
                            const osType = os.platform();
                            return dev ? (dev === 'unknown' && osType ? (osType === 'android' ? 'Android' : ['win32', 'darwin', 'linux'].includes(osType) ? 'Desktop' : 'Unknown') : dev) : 'Unknown Device';
                        },
                        enumerable: true
                    },
                    isBot: {
                        get() {
                            const botId = this.vM.key?.id;
                            return ["3EB0"].some(k => botId.includes(k) && this.sender !== this.HBWABotMz?.user.jid);
                        },
                        enumerable: true
                    }
                })
            },
            enumerable: true
        },
        _text: {
            value: null,
            writable: true,
        },
        text: {
            get() {
                const body = this.msg
                const rawText = (typeof body === 'string' ? body : body?.text) || body?.caption || body?.contentText || ''
                return typeof this._text === 'string' ? this._text : '' || (typeof rawText === 'string' ? rawText : (
                    rawText?.selectedDisplayText ||
                    rawText?.hydratedTemplate?.hydratedContentText ||
                    rawText
                )) || ''
            },
            set(val) {
                return this._text = val
            },
            enumerable: true
        },
        mentionedJid: {
            get() {
                let list = this.msg?.contextInfo?.mentionedJid?.length && this.msg.contextInfo.mentionedJid || []
                return list.map(jid => this.HBWABotMz.getJid(jid))
            },
            enumerable: true
        },
        name: {
            get() {
                return !nullish(this.pushName) && this.pushName || this.HBWABotMz?.getName(this.sender)
            },
            enumerable: true
        },
        download: {
            value(toFile = false) {
                const type = this.mediaType;
                const media = this.mediaMessage;
                if (!type || !media || !media[type]) {
                    throw new Error('No media found to download.');
                }
                return this.HBWABotMz?.downloadM(media[type], type.replace(/message/i, ''), toFile);
            },
            enumerable: true,
            configurable: true
        },
        reply: {
            value(content, targetChat, options) {
                return this.HBWABotMz?.reply(targetChat ? targetChat : this.chat, content, this, options)
            }
        },
        copy: {
            value() {
                const M = proto.WebMessageInfo
                return smsg(this.HBWABotMz, M.create(M.toObject(this)))
            },
            enumerable: true
        },
        forward: {
            value(jid, force = false, options = {}) {
                return this.HBWABotMz?.sendMessage(jid, {
                    forward: this,
                    force,
                    ...options
                }, {
                    ...options
                })
            },
            enumerable: true
        },
        copyNForward: {
            value(jid, forceForward = false, options = {}) {
                return this.HBWABotMz?.copyNForward(jid, this, forceForward, options)
            },
            enumerable: true
        },
        cMod: {
            value(jid, text = '', sender = this.sender, options = {}) {
                return this.HBWABotMz?.cMod(jid, this, text, sender, options)
            },
            enumerable: true
        },
        getQuotedObj: {
            value() {
                if (!this.quoted.id) return null
                const qMsg = proto.WebMessageInfo.create(this.HBWABotMz?.loadMessage(this.quoted.id) || this.quoted.vM)
                return smsg(this.HBWABotMz, qMsg)
            },
            enumerable: true
        },
        getQuotedMessage: {
            get() {
                return this.getQuotedObj
            }
        },
        delete: {
            value() {
                return this.HBWABotMz?.sendMessage(this.chat, {
                    delete: this.key
                })
            },
            enumerable: true
        },
        react: {
            value(emoji) {
                return this.HBWABotMz?.sendMessage(this.chat, {
                    react: {
                        text: emoji,
                        key: this.key
                    }
                })
            },
            enumerable: true
        },
        device: {
            get() {
                const dev = getDevice(this.key?.id);
                const osType = os.platform();
                return dev ? (dev === 'unknown' && osType ? (osType === 'android' ? 'Android' : ['win32', 'darwin', 'linux'].includes(osType) ? 'Desktop' : 'Unknown') : dev) : 'Unknown Device';
            },
            enumerable: true
        },
        isBot: {
            get() {
                const botId = this.key?.id;
                return ["3EB0"].some(k => botId.includes(k) && this.sender !== this.HBWABotMz?.user.jid);
            },
            enumerable: true
        }
    })
}

export function logic(check, inp, out) {
    if (inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp) if (util.isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}

export function protoType() {
    Buffer.prototype.toArrayBuffer = function toArrayBufferV2() {
        const ab = new ArrayBuffer(this.length);
        const view = new Uint8Array(ab);
        for (let i = 0; i < this.length; ++i) {
            view[i] = this[i];
        }
        return ab;
    }

    Buffer.prototype.toArrayBufferV2 = function toArrayBuffer() {
        return this.buffer.slice(this.byteOffset, this.byteOffset + this.byteLength)
    }

    ArrayBuffer.prototype.toBuffer = function toBuffer() {
        return Buffer.from(new Uint8Array(this))
    }

    Uint8Array.prototype.getFileType = ArrayBuffer.prototype.getFileType = Buffer.prototype.getFileType = async function getFileType() {
        return await fileTypeFromBuffer(this)
    }

    String.prototype.isNumber = Number.prototype.isNumber = isNumber

    String.prototype.capitalize = function capitalize() {
        return this.charAt(0).toUpperCase() + this.slice(1)
    }

    String.prototype.capitalizeV2 = function capitalizeV2() {
        const str = this.split(' ')
        return str.map(v => v.capitalize()).join(' ')
    }

    String.prototype.decodeJid = function decodeJid() {
        if (/:\d+@/gi.test(this)) {
            const decode = jidDecode(this) || {}
            return (decode.user && decode.server && decode.user + '@' + decode.server || this).trim()
        } else return this.trim()
    }

    Number.prototype.toTimeString = function toTimeString() {
        const seconds = Math.floor((this / 1000) % 60)
        const minutes = Math.floor((this / (60 * 1000)) % 60)
        const hours = Math.floor((this / (60 * 60 * 1000)) % 24)
        const days = Math.floor((this / (24 * 60 * 60 * 1000)))
        return (
            (days ? `${days} day(s) ` : '') +
            (hours ? `${hours} hour(s) ` : '') +
            (minutes ? `${minutes} minute(s) ` : '') +
            (seconds ? `${seconds} second(s)` : '')
        ).trim()
    }

    Number.prototype.getRandom = String.prototype.getRandom = Array.prototype.getRandom = getRandom
}

function isNumber() {
    const int = parseInt(this)
    return typeof int === 'number' && !isNaN(int)
}

function getRandom() {
    if (Array.isArray(this) || this instanceof String) return this[Math.floor(Math.random() * this.length)]
    return Math.floor(Math.random() * this)
}

function nullish(args) {
    return !(args !== null && args !== undefined)
}