const { modul } = require('./asset/database/module');
const moment = require('moment-timezone');
const { baileys, boom, chalk, fs, figlet, FileType, path, pino, process, PhoneNumber, axios, yargs, _ } = modul;
const { Boom } = boom
const {
	default: HBWABotMzConnect,
	BufferJSON,
	initInMemoryKeyStore,
	DisconnectReason,
	AnyMessageContent,
        makeInMemoryStore,
	useMultiFileAuthState,
	delay,
	fetchLatestBaileysVersion,
	generateForwardMessageContent,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    generateMessageID,
    downloadContentFromMessage,
    jidDecode,
    getAggregateVotesInPollMessage,
    proto
} = require("@whiskeysockets/baileys")
const { color, bgcolor } = require('./lib/color')
const colors = require('colors')
const { start } = require('./lib/spinner')
const { uncache, nocache } = require('./lib/loader')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { smsg, isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, await, sleep, reSize } = require('./lib/myfunc')

const prefix = ''

global.db = JSON.parse(fs.readFileSync('./asset/database/database.json'))
if (global.db) global.db = {
sticker: {},
database: {}, 
game: {},
others: {},
users: {},
chats: {},
settings: {},
...(global.db || {})
}


const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

require('./HBWABot-Mz.js')
nocache('../HBWABot-Mz.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))
require('./index.js')
nocache('../index.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))

const express = require('express'); 
const app = express();
const port = process.env.PORT || 8080;
app.set('json spaces', 2);
app.get('/', (req, res) => {
  const data = {
    status: 'true',
    message: `Runtime: ${runtime(process.uptime())}`,
    creator: 'Herbert Suantak',
  };
  const result = {
    response: data,
  };
  res.json(result);
});
function listenOnPort(port) {
  app.listen(port, () => {
    console.log(`This Bot is Created by Herbert Suantak`);
  });
  app.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`${port} expired`);
      listenOnPort(port + 1);
    } else {
      console.error(err);
    }
  });
}

listenOnPort(port);

async function HBWABotMz2() {
	const {  saveCreds, state } = await useMultiFileAuthState(`./${sessionName}`)
    	const HBWABotMz = HBWABotMzConnect({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: [`${botname}`,'Safari','3.0'],
        auth: state,
        getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id)
                return msg.message || undefined
            }
            return {
                conversation: "HBWABot Here"
            }
        }
    })

    store.bind(HBWABotMz.ev)

HBWABotMz.ev.on('connection.update', async (update) => {
	const {
		connection,
		lastDisconnect
	} = update
try{
		if (connection === 'close') {
			let reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.badSession) {
				console.log(`I session File a chak tawh lo, pair tha rawh`);
				HBWABotMz2()
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("Connection closed, reconnecting....");
				HBWABotMz2();
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("Connection Lost from Server, reconnecting...");
				HBWABotMz2();
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("Connection Replaced, Another New Session Opened, Please Close Current Session First");
				HBWABotMz2()
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`Device Logged Out, Please Scan Again And Run.`);
				HBWABotMz2();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("Restart Required, Restarting...");
				HBWABotMz2();
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Connection TimedOut, Reconnecting...");
				HBWABotMz2();
			} else HBWABotMz.end(`Unknown DisconnectReason: ${reason}|${connection}`)
		}
		if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
			console.log(color(`\n📡Connecting...`, 'yellow'))
		}
		if (update.connection == "open" || update.receivedPendingNotifications == "true") {
			console.log(color(` `,'magenta'))
            console.log(color(`📡Connected to => ` + JSON.stringify(HBWABotMz.user, null, 2), 'yellow'))
			await delay(1999)
            console.log(chalk.yellow(`\n\n${chalk.bold.blue ('[ HBWABot Mizo ]')}\n\n`))
            console.log(color(`____________`, 'cyan'))
	        console.log(color(`\nHei hi HBWABot Mizo a ni khawngaihin ka YouTube channel HBMods OFC channel tih kha min lo subscribe sak ve ta che `,'magenta'))
            console.log(color(`INSTAGRAM: Herbert_Suantak2 `,'magenta'))
		}
	
} catch (err) {
	  console.log('Error in Connection.update '+err)
	  HBWABotMz2();
	}
})
await delay(5555) 
start('2',colors.bold.white('\n\nMessage nghah mek a ni..'))

HBWABotMz.ev.on('creds.update', await saveCreds)

    // Anti Call
HBWABotMz.ev.on('call', async (BotCall) => {
    if (!AntiCallBot) return;
    let botNumber = await HBWABotMz.decodeJid(HBWABotMz.user.id);
    let HerbertBotNum = db.settings[botNumber].anticall;
    if (!HerbertBotNum) return;
    console.log(BotCall);
    for (let BotCallLohTur of BotCall) {
    if (BotCallLohTur.isGroup == false) {
    if (BotCallLohTur.status == "offer") {
    let BlockHmak = await HBWABotMz.sendTextWithMentions(BotCallLohTur.from, `${global.botname} hian ${BotCallLohTur.isVideo ? `video` : `voice` } call ka dawng thei lo , chu vangin @${BotCallLohTur.from.split('@')[0]} block i ni. Unblock i duh chuan a rang lamin owner hi va bia ang che`);
    HBWABotMz.sendContact(BotCallLohTur.from, global.owner, BlockHmak);
                await sleep(8000);
                await HBWABotMz.updateBlockStatus(BotCallLohTur.from, "block");
            }
        }
    }
});


HBWABotMz.ev.on('messages.upsert', async chatUpdate => {
        try {
            const mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast'){
            if (autoread_status) {
            await HBWABotMz.readMessages([mek.key]) 
            }
            } 
            if (!HBWABotMz.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            const m = smsg(HBWABotMz, mek, store)
            require("./HBWABot-Mz")(HBWABotMz, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })

if (GroupWcMsg) {
HBWABotMz.ev.on('group-participants.update', async (anu) => {
    console.log(anu);
    try {
        let metadata = await HBWABotMz.groupMetadata(anu.id);
        let participants = anu.participants;
        for (let num of participants) {
            try {
                ppuser = await HBWABotMz.profilePictureUrl(num, 'image');
            } catch (err) {
                ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60';
            }
            try {
                ppgroup = await HBWABotMz.profilePictureUrl(anu.id, 'image');
            } catch (err) {
                ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60';
            }

            // Welcome message
            if (anu.action == 'add') {
                let nama = await HBWABotMz.getName(num);
                memb = metadata.participants.length;

                Kon = await getBuffer(`https://i.imgur.com/RlEmFEQ.mp4`);
                Tol = await getBuffer(`https://i.imgur.com/RlEmFEQ.mp4`);

              const deletetur = await HBWABotMz.sendMessage(anu.id, { video: Kon, contextInfo: { mentionedJid: [num] }, caption: `Hi @${num.split("@")[0]},\nKei hi ${global.botname} ka ni a,\n*${metadata.subject} Group-ah hian kan lo lawm a che*\n\n*Group Description :*\n ${metadata.desc}\n\n\n*©HBWABot*`, gifPlayback: true });
              await sleep(60000);
              delete deletetur
            }
        }
    } catch (err) {
        console.log(err);
    }
})
}


    // respon cmd pollMessage
    async function getMessage(key){
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: "HBWABot Here"
        }
    }
    HBWABotMz.ev.on('messages.update', async chatUpdate => {
        for(const { key, update } of chatUpdate) {
			if(update.pollUpdates && key.fromMe) {
				const pollCreation = await getMessage(key)
				if(pollCreation) {
				    const pollUpdate = await getAggregateVotesInPollMessage({
							message: pollCreation,
							pollUpdates: update.pollUpdates,
						})
	                var toCmd = pollUpdate.filter(v => v.voters.length !== 0)[0]?.name
	                if (toCmd == undefined) return
                    var prefCmd = prefix+toCmd
	                HBWABotMz.appenTextMessage(prefCmd, chatUpdate)
				}
			}
		}
    })

HBWABotMz.sendTextWithMentions = async (jid, text, quoted, options = {}) => HBWABotMz.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

HBWABotMz.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

HBWABotMz.ev.on('contacts.update', update => {
for (let contact of update) {
let id = HBWABotMz.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

HBWABotMz.getName = (jid, withoutContact  = false) => {
id = HBWABotMz.decodeJid(jid)
withoutContact = HBWABotMz.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = HBWABotMz.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === HBWABotMz.decodeJid(HBWABotMz.user.id) ?
HBWABotMz.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

HBWABotMz.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

HBWABotMz.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await HBWABotMz.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await HBWABotMz.getName(
          i + "@s.whatsapp.net"
        )}\nFN:${
          global.ownername
        }\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Hmet la be rawh\nitem2.EMAIL;type=INTERNET:
HBMods OFC\nitem2.X-ABLabel:YouTube\nitem3.URL:https://herbert70.blogspot.com\nitem3.X-ABLabel:IG\nitem4.ADR:;;${location};;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	HBWABotMz.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
    }

HBWABotMz.setStatus = (status) => {
HBWABotMz.query({
tag: 'iq',
attrs: {
to: '@s.whatsapp.net',
type: 'set',
xmlns: 'status',
},
content: [{
tag: 'status',
attrs: {},
content: Buffer.from(status, 'utf-8')
}]
})
return status
}

HBWABotMz.public = true

HBWABotMz.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await HBWABotMz.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })
}

HBWABotMz.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await HBWABotMz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
.then( response => {
fs.unlinkSync(buffer)
return response
})
}

HBWABotMz.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}
await HBWABotMz.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

HBWABotMz.copyNForward = async (jid, message, forceForward = false, options = {}) => {
let vtype
if (options.readViewOnce) {
message.message = message.message && message.message.ephemeralMessage && message.message.ephemeralMessage.message ? message.message.ephemeralMessage.message : (message.message || undefined)
vtype = Object.keys(message.message.viewOnceMessage.message)[0]
delete(message.message && message.message.ignore ? message.message.ignore : (message.message || undefined))
delete message.message.viewOnceMessage.message[vtype].viewOnce
message.message = {
...message.message.viewOnceMessage.message
}
}
let mtype = Object.keys(message.message)[0]
let content = await generateForwardMessageContent(message, forceForward)
let ctype = Object.keys(content)[0]
let context = {}
if (mtype != "conversation") context = message.message[mtype].contextInfo
content[ctype].contextInfo = {
...context,
...content[ctype].contextInfo
}
const waMessage = await generateWAMessageFromContent(jid, content, options ? {
...content[ctype],
...options,
...(options.contextInfo ? {
contextInfo: {
...content[ctype].contextInfo,
...options.contextInfo
}
} : {})
} : {})
await HBWABotMz.relayMessage(jid, waMessage.message, { messageId:  waMessage.key.id })
return waMessage
}

HBWABotMz.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.msg ? message.msg : message
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

HBWABotMz.downloadMediaMessage = async (message) => {
let mime = (message.msg || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

HBWABotMz.getFile = async (PATH, save) => {
let res
let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
let type = await FileType.fromBuffer(data) || {
mime: 'application/octet-stream',
ext: '.bin'}
filename = path.join(__filename, './lib' + new Date * 1 + '.' + type.ext)
if (data && save) fs.promises.writeFile(filename, data)
return {
res,
filename,
size: await getSizeMedia(data),
...type,
data}}

HBWABotMz.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
let types = await HBWABotMz.getFile(path, true)
let { mime, ext, res, data, filename } = types
if (res && res.status !== 200 || file.length <= 65536) {
try { throw { json: JSON.parse(file.toString()) } }
catch (e) { if (e.json) throw e.json }}
let type = '', mimetype = mime, pathFile = filename
if (options.asDocument) type = 'document'
if (options.asSticker || /webp/.test(mime)) {
let { writeExif } = require('./lib/exif')
let media = { mimetype: mime, data }
pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
await fs.promises.unlink(filename)
type = 'sticker'
mimetype = 'image/webp'}
else if (/image/.test(mime)) type = 'image'
else if (/video/.test(mime)) type = 'video'
else if (/audio/.test(mime)) type = 'audio'
else type = 'document'
await HBWABotMz.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
return fs.promises.unlink(pathFile)}

HBWABotMz.sendText = (jid, text, quoted = '', options) => HBWABotMz.sendMessage(jid, { text: text, ...options }, { quoted })

HBWABotMz.serializeM = (m) => smsg(HBWABotMz, m, store)

HBWABotMz.sendButtonText = (jid, buttons = [], text, footer, quoted = '', options = {}) => {
let buttonMessage = {
text,
footer,
buttons,
headerType: 2,
...options
}
HBWABotMz.sendMessage(jid, buttonMessage, { quoted, ...options })
}

HBWABotMz.sendKatalog = async (jid , title = '' , desc = '', gam , options = {}) =>{
let message = await prepareWAMessageMedia({ image: gam }, { upload: HBWABotMz.waUploadToServer })
const tod = generateWAMessageFromContent(jid,
{"productMessage": {
"product": {
"productImage": message.imageMessage,
"productId": "9999",
"title": title,
"description": desc,
"currencyCode": "INR",
"priceAmount1000": "100000",
"url": `${hbmods}`,
"productImageCount": 1,
"salePriceAmount1000": "0"
},
"businessOwnerJid": `${ownernumber}@s.whatsapp.net`
}
}, options)
return HBWABotMz.relayMessage(jid, tod.message, {messageId: tod.key.id})
} 

HBWABotMz.send5ButLoc = async (jid , text = '' , footer = '', img, but = [], options = {}) =>{
var template = generateWAMessageFromContent(jid, proto.Message.fromObject({
templateMessage: {
hydratedTemplate: {
"hydratedContentText": text,
"locationMessage": {
"jpegThumbnail": img },
"hydratedFooterText": footer,
"hydratedButtons": but
}
}
}), options)
HBWABotMz.relayMessage(jid, template.message, { messageId: template.key.id })
}

HBWABotMz.sendButImg = async (jid, path, teks, fke, but) => {
let img = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let fjejfjjjer = {
image: img, 
jpegThumbnail: img,
caption: teks,
fileLength: "1",
footer: fke,
buttons: but,
headerType: 4,
}
HBWABotMz.sendMessage(jid, fjejfjjjer, { quoted: m })
}

            /**
             * Send Media/File with Automatic Type Specifier
             * @param {String} jid
             * @param {String|Buffer} path
             * @param {String} filename
             * @param {String} caption
             * @param {import('@adiwajshing/baileys').proto.WebMessageInfo} quoted
             * @param {Boolean} ptt
             * @param {Object} options
             */
HBWABotMz.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
                let type = await HBWABotMz.getFile(path, true)
                let { res, data: file, filename: pathFile } = type
                if (res && res.status !== 200 || file.length <= 65536) {
                    try { throw { json: JSON.parse(file.toString()) } }
                    catch (e) { if (e.json) throw e.json }
                }
                const fileSize = fs.statSync(pathFile).size / 1024 / 1024
                if (fileSize >= 1800) throw new Error(' A file size a lian lutuk\n\n')
                let opt = {}
                if (quoted) opt.quoted = quoted
                if (!type) options.asDocument = true
                let mtype = '', mimetype = options.mimetype || type.mime, convert
                if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
                else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
                else if (/video/.test(type.mime)) mtype = 'video'
                else if (/audio/.test(type.mime)) (
                    convert = await toAudio(file, type.ext),
                    file = convert.data,
                    pathFile = convert.filename,
                    mtype = 'audio',
                    mimetype = options.mimetype || 'audio/ogg; codecs=opus'
                )
                else mtype = 'document'
                if (options.asDocument) mtype = 'document'

                delete options.asSticker
                delete options.asLocation
                delete options.asVideo
                delete options.asDocument
                delete options.asImage

                let message = {
                    ...options,
                    caption,
                    ptt,
                    [mtype]: { url: pathFile },
                    mimetype,
                    fileName: filename || pathFile.split('/').pop()
                }
                /**
                 * @type {import('@adiwajshing/baileys').proto.WebMessageInfo}
                 */
                let m
                try {
                    m = await HBWABotMz.sendMessage(jid, message, { ...opt, ...options })
                } catch (e) {
                    console.error(e)
                    m = null
                } finally {
                    if (!m) m = await HBWABotMz.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options })
                    file = null // releasing the memory
                    return m
                }
            }

//HBWABotMz.sendFile = async (jid, media, options = {}) => {
        //let file = await HBWABotMz.getFile(media)
        //let mime = file.ext, type
        //if (mime == "mp3") {
          //type = "audio"
          //options.mimetype = "audio/mpeg"
          //options.ptt = options.ptt || false
        //}
        //else if (mime == "jpg" || mime == "jpeg" || mime == "png") type = "image"
        //else if (mime == "webp") type = "sticker"
        //else if (mime == "mp4") type = "video"
        //else type = "document"
        //return HBWABotMz.sendMessage(jid, { [type]: file.data, ...options }, { ...options })
      //}

HBWABotMz.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
      let mime = '';
      let res = await axios.head(url)
      mime = res.headers['content-type']
      if (mime.split("/")[1] === "gif") {
     return HBWABotMz.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options}, { quoted: quoted, ...options})
      }
      let type = mime.split("/")[0]+"Message"
      if(mime === "application/pdf"){
     return HBWABotMz.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "image"){
     return HBWABotMz.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options}, { quoted: quoted, ...options})
      }
      if(mime.split("/")[0] === "video"){
     return HBWABotMz.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options}, { quoted: quoted, ...options })
      }
      if(mime.split("/")[0] === "audio"){
     return HBWABotMz.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options}, { quoted: quoted, ...options })
      }
      }
      
      /**
     * 
     * @param {*} jid 
     * @param {*} name 
     * @param [*] values 
     * @returns 
     */
    HBWABotMz.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return HBWABotMz.sendMessage(jid, { poll: { name, values, selectableCount }}) }

return HBWABotMz

}

HBWABotMz2()

process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})
