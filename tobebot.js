require("./settings.js")
const fs = require('fs')
const chalk = require('chalk')
const FileType = require('file-type')
const path = require('path')
const axios = require('axios')
const _ = require('lodash')
const { uncache, nocache } = require('./lib/loader')
const yargs = require('yargs/yargs')
const { Low, JSONFile } = require('./lib/lowdb')
const moment = require('moment-timezone')
const PhoneNumber = require('awesome-phonenumber')
let phoneNumber = "916009136453";
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code");
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const {isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./lib/myfunc')
const { default: HBWABotMzConnect, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, getContentType, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, Browsers, makeWASocket } = require("@adiwajshing/baileys")
const { color, bgcolor } = require('./lib/color')
const log = (pino = require("pino"));
const qrcode = require('qrcode');
const NodeCache = require("node-cache")
const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})
let rBrowser = ['Ubuntu', 'Linux', 'Windows'];
const browserr = rBrowser[Math.floor(Math.random() * rBrowser.length)];
if (global.conns instanceof Array) console.log()
else global.conns = []
function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
const tobebot = async (HBWABotMz, m, from, wanb) => {
const { sendImage, sendMessage } = HBWABotMz;
const { reply, sender } = m;
const amah = m.sender
try {
async function startHBWABotMz() {

const { state, saveCreds } = await useMultiFileAuthState(`./asset/tobebot/${amah}`,
    log({ level: 'silent' })
  );
let { version, isLatest } = await fetchLatestBaileysVersion();
const msgRetryCounterCache = new NodeCache()
/*let HBWABotMz = makeWASocket({
    auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
    },
    printQRInTerminal: false,
    logger: pino({level: "fatal"}).child({level: "fatal"}),
    browser: [ "MacOS", "Safari", "14.0" ], 
});
*/
   let HBWABotMz = makeWASocket({
    syncFullHistory: true,
    markOnlineOnConnect: true,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    generateHighQualityLinkPreview: true,
    version,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    logger: pino({
      level: "fatal",
    }),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(
        state.keys,
        pino().child({
          level: "silent",
          stream: "store",
        })
      ),
    },
  });
store.bind(HBWABotMz.ev);
let phoneNumber = wanb.replace(/[^0-9]/g, '');
      if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
      phoneNumber = wanb.replace(/[^0-9]/g, '');
}

if (pairingCode && !state.creds.registered) {
setTimeout(async () => {
let code = await HBWABotMz.requestPairingCode(phoneNumber);
code = code?.match(/.{1,4}/g)?.join("-") || code;
fs.writeFile(
  './asset/trash/pairing.json',  // Path of the file where it will be saved
  JSON.stringify({"code": code}, null, 2),  // Transforms the object into a JSON formatted string
  'utf8',
  (err) => {
      if (err) {
      } else {
      }
  }
);


}, 1703);

}
HBWABotMz.ev.on('creds.update', saveCreds)
HBWABotMz.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    if (update.connection == "connecting" || update.receivedPendingNotifications == "false") {
        console.log(color(`\nTobeBot Connecting...`, 'yellow'))
    }
    if (update.connection == "open" || update.receivedPendingNotifications == "true") {
          HBWABotMz.id = HBWABotMz.decodeJid(HBWABotMz.user.id);
          HBWABotMz.time = Date.now();
          global.conns.push(HBWABotMz);
          const botses = await sendMessage(`${amah}`, { text: `_Connected to *${botname}....*_` });
        await HBWABotMz.sendMessage(HBWABotMz.user.id, { text: `🤖 He Account-ah hian bot i activate tih hriattir i ni e!..\n> Deactivate i duh chuan i link device ah *Firefox* tih logout rawh` }, { quoted: botses });
    }
  if (connection === "close") {
       console.log(color(`\nTobebot Disconnected`, 'yellow'))
       
    }
  if (lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
  console.log(color(`\nLooping tobebot`, 'yellow'))
  await delay(1500);
     startHBWABotMz()
  }
})

//__________
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

HBWABotMz.public = true

function smsg(HBWABotMz, m, store) {
if (!m) return m
let M = proto.WebMessageInfo
if (m.key) {
m.id = m.key.id
m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
m.chat = m.key.remoteJid
m.fromMe = m.key.fromMe
m.isGroup = m.chat.endsWith('@g.us')
m.sender = HBWABotMz.decodeJid(m.fromMe && HBWABotMz.user.id || m.participant || m.key.participant || m.chat || '')
if (m.isGroup) m.participant = HBWABotMz.decodeJid(m.key.participant) || ''
}
if (m.message) {
m.mtype = getContentType(m.message)
m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype].message[getContentType(m.message[m.mtype].message)] : m.message[m.mtype])
m.body = m.message.conversation || m.msg.caption || m.msg.text || (m.mtype == 'listResponseMessage') && m.msg.singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.msg.selectedButtonId || (m.mtype == 'viewOnceMessage') && m.msg.caption || m.text
let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
if (m.quoted) {
let type = getContentType(quoted)
m.quoted = m.quoted[type]
if (['productMessage'].includes(type)) {
type = getContentType(m.quoted)
m.quoted = m.quoted[type]
}
if (typeof m.quoted === 'string') m.quoted = {
text: m.quoted
}
m.quoted.mtype = type
m.quoted.id = m.msg.contextInfo.stanzaId
m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
m.quoted.sender = HBWABotMz.decodeJid(m.msg.contextInfo.participant)
m.quoted.fromMe = m.quoted.sender === HBWABotMz.decodeJid(HBWABotMz.user.id)
m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
m.getQuotedObj = m.getQuotedMessage = async () => {
if (!m.quoted.id) return false
let q = await store.loadMessage(m.chat, m.quoted.id, conn)
 return exports.smsg(conn, q, store)
}
let vM = m.quoted.fakeObj = M.fromObject({
key: {
remoteJid: m.quoted.chat,
fromMe: m.quoted.fromMe,
id: m.quoted.id
},
message: quoted,
...(m.isGroup ? { participant: m.quoted.sender } : {})
})
m.quoted.delete = () => HBWABotMz.sendMessage(m.quoted.chat, { delete: vM.key })
m.quoted.copyNForward = (jid, forceForward = false, options = {}) => HBWABotMz.copyNForward(jid, vM, forceForward, options)
m.quoted.download = () => HBWABotMz.downloadMediaMessage(m.quoted)
}
}
if (m.msg.url) m.download = () => HBWABotMz.downloadMediaMessage(m.msg)
m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''
m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? HBWABotMz.sendMedia(chatId, text, 'file', '', m, { ...options }) : HBWABotMz.sendText(chatId, text, m, { ...options })
m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))
m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => HBWABotMz.copyNForward(jid, m, forceForward, options)

return m
}
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
displayName: await HBWABotMz.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\n
VERSION:3.0\n
N:${await HBWABotMz.getName(i + '@s.whatsapp.net')}\n
FN:${await HBWABotMz.getName(i + '@s.whatsapp.net')}\n
item1.TEL;waid=${i}:${i}\n
item1.X-ABLabel:Ponsel\n
item2.EMAIL;type=INTERNET:https://herbert70.blogspot.com\n
item2.X-ABLabel:Email\n
item3.URL:https://youtube.com/@HBMods_Channel\n
item3.X-ABLabel:YouTube\n
item4.ADR:;;India; Mizoram, Aizawl;;;\n
item4.X-ABLabel:Region\n
END:VCARD`
})
}
HBWABotMz.sendMessage(jid, { contacts: { displayName: `${list.length} Contact`, contacts: list }, ...opts }, { quoted })
}

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
"url": `https://youtube.com/@HBMods_Channel`,
"productImageCount": 1,
"salePriceAmount1000": "0"
},
"businessOwnerJid": `918416093656@s.whatsapp.net`
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
HBWABotMz.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
  let type = await HBWABotMz.getFile(path, true);
  let { res, data: file, filename: pathFile } = type;

  if (res && res.status !== 200 || file.length <= 65536) {
    try {
      throw {
        json: JSON.parse(file.toString())
      };
    } catch (e) {
      if (e.json) throw e.json;
    }
  }

  let opt = {
    filename
  };

  if (quoted) opt.quoted = quoted;
  if (!type) options.asDocument = true;

  let mtype = '',
    mimetype = type.mime,
    convert;

  if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
  else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
  else if (/video/.test(type.mime)) mtype = 'video';
  else if (/audio/.test(type.mime)) {
    convert = await (ptt ? toPTT : toAudio)(file, type.ext);
    file = convert.data;
    pathFile = convert.filename;
    mtype = 'audio';
    mimetype = 'audio/ogg; codecs=opus';
  } else mtype = 'document';

  if (options.asDocument) mtype = 'document';

  delete options.asSticker;
  delete options.asLocation;
  delete options.asVideo;
  delete options.asDocument;
  delete options.asImage;

  let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
  let m;

  try {
    m = await HBWABotMz.sendMessage(jid, message, { ...opt, ...options });
  } catch (e) {
    //console.error(e)
    m = null;
  } finally {
    if (!m) m = await HBWABotMz.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
    file = null;
    return m;
  }
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

HBWABotMz.sendText = (jid, text, quoted = '', options) => HBWABotMz.sendMessage(jid, { text: text, ...options }, { quoted })

}
startHBWABotMz()
} catch (err) {
console.log("service restated");
removeFile(`./asset/tobebot/${amah}`);
}
}

module.exports = { tobebot, conns }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})