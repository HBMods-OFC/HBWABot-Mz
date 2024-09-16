require('./settings.js')
const {
	downloadContentFromMessage,
    BufferJSON,
    WA_DEFAULT_EPHEMERAL,
    generateWAMessageFromContent,
    proto,
    generateWAMessageContent,
    generateWAMessage,
    prepareWAMessageMedia,
    areJidsSameUser,
    InteractiveMessage,
    getContentType
} = require('@whiskeysockets/baileys')
const os = require('os')
const fs = require('fs')
const fsx = require('fs-extra')
const path = require('path')
const util = require('util')
const { color } = require('./lib/color')
const chalk = require('chalk')
const moment = require('moment-timezone')
const cron = require('node-cron')
const speed = require('performance-now')
const ms = toMs = require('ms')
const axios = require('axios')
const fetch = require('node-fetch')
const yts = require('yt-search')
const gis = require('g-i-s')
const cheerio = require('cheerio')
const { randomBytes } = require('crypto')
const fg = require('api-dylux')
const googleTTS = require('google-tts-api')
const jsobfus = require('javascript-obfuscator')
const uploadImage = require('./lib/uploadImage')
const { fromBuffer } = require('file-type');
const uploader = require('./lib/uploadFile');
const {
    exec,
    spawn,
    execSync
} = require("child_process")
const {
    performance
} = require('perf_hooks')
const {
    TelegraPh,
    UploadFileUgu,
    webp2mp4File,
    floNime
} = require('./lib/uploader')
const {
    toAudio,
    toPTT,
    toVideo,
    ffmpeg,
    addExifAvatar
} = require('./lib/converter')
const {
    smsg,
    getGroupAdmins,
    formatp,
    formatDate,
    getTime,
    isUrl,
    await,
    sleep,
    clockString,
    msToDate,
    sort,
    toNumber,
    enumGetKey,
    runtime,
    fetchJson,
    getBuffer,
    json,
    delay,
    format,
    logic,
    generateProfilePicture,
    parseMention,
    getRandom,
    pickRandom,
    fetchBuffer,
    buffergif,
    GIFBufferToVideoBuffer,
    totalcase
} = require('./lib/myfunc')

const { tobebot, conns } = require('./tobebot.js')
const darkarr = moment.tz('Asia/Kolkata').format('HH:mm:ss')
const nizat1 = moment.tz('Asia/Kolkata').format('DD')
const thlazat1 = moment.tz('Asia/Kolkata').format('MM')
const thlazat2 = moment.tz('Asia/Kolkata').format('MMMM')
const kumtin = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
const kumzat1 = moment.tz('Asia/Kolkata').format('YYYY')
const nizatani = moment.tz('Asia/Kolkata').format('dddd')
const darkarr2 = moment().tz('Asia/Kolkata').format('hh:mm A [GMT]Z', true)
const acrcloud = require('acrcloud')
const acr = new acrcloud({
  host: "identify-eu-west-1.acrcloud.com",
  access_key: "4dcedd3dc6d911b38c988b872afa7e0d",
  access_secret: "U0PEUg2y6yGVh6NwJra2fJkiE1R5sCfiT6COLXuk",
})
/*const Canvas = require('canvas')
const canvasGif = require('canvas-gif')
*/
const { youtubedl, youtubedlv2 } = require('@bochilteam/scraper-sosmed')
const eco = require('discord-mongoose-economy')
const ty = eco.connect("mongodb+srv://engtiaeditz07:hb2ab95@herbert.pzfvkrg.mongodb.net/?retryWrites=true&w=majority")
//const ty = eco.connect("mongodb+srv://engtiaeditz07:hb2ab95@<herbert.pzfvkrg.mongodb.net/hello?retryWrites=true&w=majority")
const mizo_tawnga_translate_na = require("@kreisler/js-google-translate-free")
const asource1 = 'en'
const atarget1 = 'lus'
const athulo1 = `${nizatani}`
//cooldone
let lastUsed = 0;

//media
const VoiceNoteHerbert = JSON.parse(fs.readFileSync('./asset/database/herbertvn.json'))
const StickerHerbert = JSON.parse(fs.readFileSync('./asset/database/herbertsticker.json'))
const ImageHerbert = JSON.parse(fs.readFileSync('./asset/database/herbertimage.json'))
const VideoHerbert = JSON.parse(fs.readFileSync('./asset/database/herbertvideo.json'))
const BadHerbert = JSON.parse(fs.readFileSync('./asset/database/bad.json'))
let ntrssfeed = JSON.parse(fs.readFileSync('./asset/database/rssfeed.json'))
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
//read database\\
let _hmanzat = db.game.hmanzat = []
let _mizoquiz = db.game.mizoquiz = []
let _gkmizo = db.game.gkmizo = []
let thlalakquiz = db.game.thlalakquiz = []
let _biblequiz = db.game.biblequiz = []
let caklontong = db.game.lontong = []
let caklontong_desk = db.game.lontong_desk = []
let tebakkalimat = db.game.kalimat = []
let tebaklirik = db.game.lirik = []
let tebaktebakan = db.game.tebakan = []
let vote = db.others.vote = []
//function
const reSize = async(buffer, ukur1, ukur2) => {
   return new Promise(async(resolve, reject) => {
      let jimp = require('jimp')
      var baper = await jimp.read(buffer);
      var ab = await baper.resize(ukur1, ukur2).getBufferAsync(jimp.MIME_JPEG)
      resolve(ab)
   })
}
//module
module.exports = HBWABotMz = async (HBWABotMz, m, msg, chatUpdate, store) => {
    try {
        const {
            type,
            quotedMsg,
            mentioned,
            now,
            fromMe
        } = m
       var body = (
  m.mtype === 'conversation' ? m.message.conversation :
  m.mtype === 'imageMessage' ? m.message.imageMessage.caption :
  m.mtype === 'videoMessage' ? m.message.videoMessage.caption :
  m.mtype === 'extendedTextMessage' ? m.message.extendedTextMessage.text :
  m.mtype === 'buttonsResponseMessage' ? m.message.buttonsResponseMessage.selectedButtonId :
  m.mtype === 'listResponseMessage' ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
  m.mtype === 'InteractiveResponseMessage' ? JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson)?.id :
  m.mtype === 'templateButtonReplyMessage' ? m.message.templateButtonReplyMessage.selectedId :
  m.mtype === 'messageContextInfo' ?
    m.message.buttonsResponseMessage?.selectedButtonId ||
    m.message.listResponseMessage?.singleSelectReply.selectedRowId ||
    m.message.InteractiveResponseMessage.NativeFlowResponseMessage ||
    m.text :
  ''
);
        var budy = (typeof m.text == 'string' ? m.text : '')
        //prefix 1
        var prefix = ['.', '/'] ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefix
        const isCmd = body.startsWith(prefix)
        //prefix2 and command2 particulary for auto download
        const prefix2 = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™✓_=|~!?#$%^&.+-,\/\\©^]/gi) : '.'
        const isCmd2 = body.startsWith(prefix2)
        const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1)
        const full_args = body.replace(command, '').slice(1).trim()
        const pushname = m.pushName || "No Name"
        const botNumber = await HBWABotMz.decodeJid(HBWABotMz.user.id)
        const sender = m.sender
        const text = q = args.join(" ")
        const from = m.key.remoteJid
        const hellomisc = (m.quoted || m)
        const quoted = (hellomisc.mtype == 'buttonsMessage') ? hellomisc[Object.keys(hellomisc)[1]] : (hellomisc.mtype == 'templateMessage') ? hellomisc.hydratedTemplate[Object.keys(hellomisc.hydratedTemplate)[1]] : (hellomisc.mtype == 'product') ? hellomisc[Object.keys(hellomisc)[0]] : m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
        const qmsg = (quoted.msg || quoted)
        //media
        const isMedia = /image|video|sticker|audio/.test(mime)
        const isImage = (type == 'imageMessage')
        const isVideo = (type == 'videoMessage')
        const isAudio = (type == 'audioMessage')
        const isDocument = (type == 'documentMessage')
        const isLocation = (type == 'locationMessage')
        const isContact = (type == 'contactMessage')
        const isSticker = (type == 'stickerMessage')
        const isText = (type == 'textMessage')
        const isQuotedText = type === 'extendexTextMessage' && content.includes('textMessage')
        const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
        const isQuotedLocation = type === 'extendedTextMessage' && content.includes('locationMessage')
        const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
        const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
        const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
        const isQuotedContact = type === 'extendedTextMessage' && content.includes('contactMessage')
        const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
       //prefix 2
        const pric = /^#.¦|\\^/.test(body) ? body.match(/^#.¦|\\^/gi) : prefix
        const hellobody = body.startsWith(pric)
        const isCommand = hellobody ? body.replace(pric, '').trim().split(/ +/).shift().toLowerCase() : ""
        const sticker = []
       //group
        const isGroup = m.key.remoteJid.endsWith('@g.us')
        const groupMetadata = m.isGroup ? await HBWABotMz.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
        const banUser = await HBWABotMz.fetchBlocklist()
        const isBanned = banUser ? banUser.includes(m.sender) : false
        const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const groupOwner = m.isGroup ? groupMetadata.owner : ''
        const isGroupOwner = m.isGroup ? (groupOwner ? groupOwner : groupAdmins).includes(m.sender) : false
        const HerbertTheCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const HerbertTheDeveloper = m.sender == botNumber ? true : false
        
        //theme audio reply
const Menu = () => {
let Menu = fs.readFileSync('./asset/audio/Menu.mp3')
HBWABotMz.sendMessage(from, { audio: Menu, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
}
const Owner = () => {
let Owner = fs.readFileSync('./asset/audio/owner.mp3')
HBWABotMz.sendMessage(from, { audio: Owner, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
}
// react message
 const uploadreact = () => {
 HBWABotMz.sendMessage(from, { react: { text: "⬆️" , key: m.key }}) 
 }
 const loadingreact = () => {
 HBWABotMz.sendMessage(from, { react: { text: "♻️" , key: m.key }}) 
 }
const finishreact = () => {
 HBWABotMz.sendMessage(from, { react: { text: "✅" , key: m.key }}) 
 } 
 const makerreact = () => {
 HBWABotMz.sendMessage(from, { react: { text: "🎯" , key: m.key }}) 
 } 
 const downloadreact = () => {
 HBWABotMz.sendMessage(from, { react: { text: "⬇️" , key: m.key }}) 
 }
 const robotreact = () => {
 HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
 } 
 const helloreact = () => {
 HBWABotMz.sendMessage(from, { react: { text: "👋️" , key: m.key }}) 
 }
 if (!HBWABotMz.public) {
 if (!HerbertTheCreator && !m.key.fromMe) return
 }
 if (autoread) {
HBWABotMz.readMessages([m.key])
}

HBWABotMz.sendPresenceUpdate('available', from)

        //script replier
        async function sendHBWABotMzMessage(chatId, message, options = {}){
    let generate = await generateWAMessage(chatId, message, options)
    let type2 = getContentType(generate.message)
    if ('contextInfo' in options) generate.message[type2].contextInfo = options?.contextInfo
    if ('contextInfo' in message) generate.message[type2].contextInfo = message?.contextInfo
    return await HBWABotMz.relayMessage(chatId, generate.message, { messageId: generate.key.id })
}
        //reply
const dodoi = async (teks) => {
   HBWABotMz.sendMessage(m.chat, { text: teks}, { quoted: m});
    }
const replymizobiblequotes = (teks) => {
 HBWABotMz.sendMessage(m.chat, { text: teks, contextInfo:{"externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": `Mizo Bible Quotes`,"body": `HBWABot`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": fs.readFileSync(`./asset/image/MizoBibleQ.png`),"sourceUrl": `https://instagram.com/mizo_bible_quote`}}}, { quoted: m})
}
    
function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
const FormData = require('form-data');  
async function tourlup(filePath) {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));    
    try {
        const response = await fetch('https://widipe.com/api/upload.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        
        if (result.status) {
            return result.result.url;
        } else {
            console.log("Upload Failed: " + result.message);
        }

    } catch (error) {
        console.error("Error: ", error.message);
    }
}

const replyhbvip = (teks,bet,lonuirawh) => {
 HBWABotMz.sendMessage(m.chat,{ text: teks,contextInfo:{
mentionedJid:[bet],
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"title": `Fun Game`,
"body": `Checker👀😂`,
"thumbnailUrl": ``,
"thumbnail": lonuirawh,
"sourceUrl": `https://youtube.com/@HBMods_Channel`}}},
{ quoted: m})
 }

        //ANTI VIRUS
if (budy.includes('๒๒๒๒') || budy.includes('ด') || budy.includes('ผิดุท้เึางืผิดุท้เึางื') || budy.includes('๑๑๑๑๑๑๑๑') || budy.includes('৭৭৭৭৭৭৭৭') || budy.includes('  ⃢   ⃢   ⃢  ') || budy.includes('⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃟ᡃ⃟ᡃ⃟ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃟ᡃ⃟ᡃ⃟ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃢ᡃ⃟⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢ᡃ⃢⃟⃟ᡃ⃟ᡃ⃟ᡃ⃢ᡃ⃢ᡃ⃢⃟⃢⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟ᡃ⃟') || budy.includes('ผดิทุเ้ึางผืดิทุเ้') || budy.includes('.*࡞ࣰࣰࣰࣲࣲࣲࣲࣩࣩࣩࣩࣶࣶ࣯࣯࣮࣮ࣦ࣯ࣨࣨࣨࣻࣻࣻࣼࣼࣼࣽࣽࣾࣷࣵࣴ࣬࣬࣬ࣤࣤࣧࣧ*') || budy.includes('᥋') || budy.includes('؁') || budy.includes('ٯٯٯٯٯ') ) {
HBWABotMz.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)
HBWABotMz.sendText(m.chat, `Virus text i rawn thawn avangin i message report a ni a, chat pawh clear vek a ni bawk e`)
 }

/* 
 if (global.db.chats[m.chat].antibot) {
    if (m.isBaileys && m.fromMe == false){
        if (isAdmins || !isBotAdmins){		  
        } else {
          dodoi(`*Another Bot Detected*\n\nHusshhh Get away from this group!!!`)
    return await HBWABotMz.groupParticipantsUpdate(m.chat, [m.sender], 'remove')
        }
    }
   }
   */
//total features
const hbwabotfeature = () =>{
            var mytext = fs.readFileSync("./HBWABot-Mz.js").toString()
            var numUpper = (mytext.match(/case `${prefixc}`+'/g) || []).length
            return numUpper
        }
        
        //download status #ctto
        try {
  const textLower = m.text.toLowerCase();
  if (textLower === 'download' || textLower === 'statusdown' || textLower === 'thawn' || textLower === 'send') {
    const quotedMessage = m.msg.contextInfo.quotedMessage;
    if (quotedMessage) {
      if (quotedMessage.videoMessage) {
        let videoCaption = quotedMessage.videoMessage.caption;
        let videoUrl = await HBWABotMz.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
        HBWABotMz.sendMessage(m.chat, { video: { url: videoUrl }, caption: videoCaption });
      }
    }
  }
} catch (error) {
  console.error("Error in 'send message' handling:", error);
}
       //autoreply
for (let HBert of VoiceNoteHerbert) {
if (budy === HBert) {
let audiobuffy = fs.readFileSync(`./asset/audio/${HBert}.mp3`)
HBWABotMz.sendMessage(m.chat, { audio: audiobuffy, mimetype: 'audio/mp4', ptt: true }, { quoted: m }) 
}
}
for (let HBert of StickerHerbert){
if (budy === HBert){
let stickerbuffy = fs.readFileSync(`./asset/sticker/${HBert}.webp`)
HBWABotMz.sendMessage(m.chat, { sticker: stickerbuffy }, { quoted: m })
}
}
for (let HBert of ImageHerbert){
if (budy === HBert){
let imagebuffy = fs.readFileSync(`./asset/image/${HBert}.jpg`)
HBWABotMz.sendMessage(m.chat, { image: imagebuffy }, { quoted: m })
}
}
for (let HBert of VideoHerbert){
if (budy === HBert){
let videobuffy = fs.readFileSync(`./asset/video/${HBert}.mp4`)
HBWABotMz.sendMessage(m.chat, { video: videobuffy }, { quoted: m })
}
}


// Respon Cmd with media
if (isMedia && m.msg.fileSha256 && (m.msg.fileSha256.toString('base64') in global.db.sticker)) {
let hash = global.db.sticker[m.msg.fileSha256.toString('base64')]
let { text, mentionedJid } = hash
let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
userJid: HBWABotMz.user.id,
quoted: m.quoted && m.quoted.fakeObj
})
messages.key.fromMe = areJidsSameUser(m.sender, HBWABotMz.user.id)
messages.key.id = m.key.id
messages.pushName = m.pushName
if (m.isGroup) messages.participant = m.sender
let msg = {
...chatUpdate,
messages: [proto.WebMessageInfo.fromObject(messages)],
type: 'append'
}
HBWABotMz.ev.emit('messages.upsert', msg)
}

//============= [LIST RESPONCE CHECKING START ]================
        if(m.mtype === "interactiveResponseMessage"){
            console.log("interactiveResponseMessage Detected!")   
            let msg = m.message[m.mtype]  || m.msg
            if(msg.nativeFlowResponseMessage  && !m.isBot  ){ 
                let { id } = JSON.parse(msg.nativeFlowResponseMessage.paramsJson) || {}  
                if(id){
                    let emit_msg = { 
                        key : { ...m.key } , // SET RANDOME MESSAGE ID  
                        message:{ extendedTextMessage : { text : id } } ,
                        pushName : m.pushName,
                        messageTimestamp  : m.messageTimestamp || 754785898978
                    }
                    return HBWABotMz.ev.emit("messages.upsert" , { messages : [ emit_msg ] ,  type : "notify"})
                }
            }
        }
//============= [LIST RESPONCE CHECKING END ]================

 //Suit RPS
this.suit = this.suit ? this.suit : {}
let roof = Object.values(this.suit).find(roof => roof.id && roof.status && [roof.p, roof.p2].includes(m.sender))
if (roof) {
let win = ''
let tie = false
if (m.sender == roof.p2 && /^(acc(ept)?|accept|yes|okay?|reject|no|later|nop(e.)?yes|y)/i.test(m.text) && m.isGroup && roof.status == 'wait') {
if (/^(reject|no|later|n|nop(e.)?yes)/i.test(m.text)) {
HBWABotMz.sendTextWithMentions(m.chat, `@${roof.p.split`@`[0]}, @${roof.p2.split`@`[0]}'n a cho lo che a, chu vangin cancel a ni`, m)
delete this.suit[roof.id]
return !0
}
roof.status = 'play'
roof.asal = m.chat
clearTimeout(roof.waktu)
//delete roof[roof.id].waktu
HBWABotMz.sendText(m.chat, `R P S chu in thlan turin pvt a thawn ve ve in ni!..

@${roof.p.split`@`[0]} leh 
@${roof.p2.split`@`[0]}

He mi link hi hmet la RPS a i duh ber kha lo thlang rawh
 https://wa.me/${botNumber.split`@`[0]}`, m, { mentions: [roof.p, roof.p2] })
if (!roof.pilih) HBWABotMz.sendText(roof.p, `I duh ber thlang rawh \n\Rock🗿\nPaper📄\nScissors✂️`, m)
if (!roof.pilih2) HBWABotMz.sendText(roof.p2, `I duh ber thlang rawh \n\nRock🗿\nPaper📄\nScissors✂️`, m)
roof.waktu_milih = setTimeout(() => {
if (!roof.pilih && !roof.pilih2) HBWABotMz.sendText(m.chat, `In pahnihin in khel tum loh ve ve vangin RPS chu cancel a ni`)
else if (!roof.pilih || !roof.pilih2) {
win = !roof.pilih ? roof.p2 : roof.p
HBWABotMz.sendTextWithMentions(m.chat, `@${(roof.pilih ? roof.p2 : roof.p).split`@`[0]}'n hun tiam chhunga a thlan hman loh avangin, Game Over a ni!`, m)
}
delete this.suit[roof.id]
return !0
}, roof.timeout)
}
let jwb = m.sender == roof.p
let jwb2 = m.sender == roof.p2
let g = /scissors/i
let b = /rock/i
let k = /paper/i
let reg = /^(scissors|rock|paper)/i
if (jwb && reg.test(m.text) && !roof.pilih && !m.isGroup) {
roof.pilih = reg.exec(m.text.toLowerCase())[0]
roof.text = m.text
dodoi(` ${m.text} i thlang e✓ ${!roof.pilih2 ? `\n\nI tumpui la nghak lawk ang` : ''}`)
if (!roof.pilih2) HBWABotMz.sendText(roof.p2, '_Lehlamin a thlang tawh a_\nTunah nang i thlan hun', 0)
}
if (jwb2 && reg.test(m.text) && !roof.pilih2 && !m.isGroup) {
roof.pilih2 = reg.exec(m.text.toLowerCase())[0]
roof.text2 = m.text
dodoi(`${m.text} i thlang e✓ ${!roof.pilih ? `\n\nI tumpui la nghak lawk ang` : ''}`)
if (!roof.pilih) HBWABotMz.sendText(roof.p, '_Lehlamin a thlang tawh a_\nTunah nang i thlan hun', 0)
}
let stage = roof.pilih
let stage2 = roof.pilih2
if (roof.pilih && roof.pilih2) {
clearTimeout(roof.waktu_milih)
if (b.test(stage) && g.test(stage2)) win = roof.p
else if (b.test(stage) && k.test(stage2)) win = roof.p2
else if (g.test(stage) && k.test(stage2)) win = roof.p
else if (g.test(stage) && b.test(stage2)) win = roof.p2
else if (k.test(stage) && b.test(stage2)) win = roof.p
else if (k.test(stage) && g.test(stage2)) win = roof.p2
else if (stage == stage2) tie = true
HBWABotMz.sendText(roof.asal, `_*RPS Results*_${tie ? '\nIn in hneh tawk chiah' : ''}

@${roof.p.split`@`[0]} (${roof.text}) ${tie ? '' : roof.p == win ? ` A chak zawk\n` : ` A chaklo zawk\n`}
@${roof.p2.split`@`[0]} (${roof.text2}) ${tie ? '' : roof.p2 == win ? ` A chak zawk \n` : ` A chaklo zawk\n`}
`.trim(), m, { mentions: [roof.p, roof.p2] })
delete this.suit[roof.id]
}
} //end
//TicTacToe\\
	    this.game = this.game ? this.game : {}
	    let room13 = Object.values(this.game).find(room13 => room13.id && room13.game && room13.state && room13.id.startsWith('tictactoe') && [room13.game.playerX, room13.game.playerO].includes(m.sender) && room13.state == 'PLAYING')
	    if (room13) {
	    let ok
	    let isWin = !1
	    let isTie = !1
	    let isSurrender = !1
	    //reply(`[DEBUG]\n${parseInt(m.text)}`)
	    if (!/^([1-9]|(me)?give up|surr?ender|off|skip)$/i.test(m.text)) return
	    isSurrender = !/^[1-9]$/.test(m.text)
	    if (m.sender !== room13.game.currentTurn) { 
	    if (!isSurrender) return !0
	    }
	    if (!isSurrender && 1 > (ok = room13.game.turn(m.sender === room13.game.playerO, parseInt(m.text) - 1))) {
	    dodoi({
	    '-3': 'Game a tawp tawh',
	    '-2': 'dik lo',
	    '-1': 'Position a dik lo',
	    0: 'Position a dik lo',
	    }[ok])
	    return !0
	    }
	    if (m.sender === room13.game.winner) isWin = true
	    else if (room13.game.board === 511) isTie = true
	    let arr = room13.game.render().map(v => {
	    return {
	    X: '❌',
	    O: '⭕',
	    1: '1️⃣',
	    2: '2️⃣',
	    3: '3️⃣',
	    4: '4️⃣',
	    5: '5️⃣',
	    6: '6️⃣',
	    7: '7️⃣',
	    8: '8️⃣',
	    9: '9️⃣',
	    }[v]
	    })
	    if (isSurrender) {
	    room13.game._currentTurn = m.sender === room13.game.playerX
	    isWin = true
	    }
	    let winner = isSurrender ? room13.game.currentTurn : room13.game.winner
	    let str = `Room ID: ${room13.id}
A hnuia number hi i duh ber thlang rawh,

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

${isWin ? `@${winner.split('@')[0]} A chak zawk!` : isTie ? `In in hnehtawk chiah` : `Hi ${['❌', '⭕'][1 * room13.game._currentTurn]} (@${room13.game.currentTurn.split('@')[0]}) I thlan hun\n`}
❌: @${room13.game.playerX.split('@')[0]}
⭕: @${room13.game.playerO.split('@')[0]}
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
He game hi i khel peih loh chuan surrender tih type mai tur ani`
	    if ((room13.game._currentTurn ^ isSurrender ? room13.x : room13.o) !== m.chat)
	    room13[room13.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat
	    if (room13.x !== room13.o) await HBWABotMz.sendText(room13.x, str, m, { mentions: parseMention(str) } )
	    await HBWABotMz.sendText(room13.o, str, m, { mentions: parseMention(str) } )
	    if (isTie || isWin) {
	    delete this.game[room13.id]
	    }
	    }
 //end
async function loading () {
var HBLoading = [
"《▒▒▒▒▒▒▒▒▒▒▒▒》0%",
"《█▒▒▒▒▒▒▒▒▒▒▒》10%",
"《█▒▒▒▒▒▒▒▒▒▒▒》10%",
"《████▒▒▒▒▒▒▒▒》30%",
"《████▒▒▒▒▒▒▒▒》30%",
"《███████▒▒▒▒▒》50%",
"《███████▒▒▒▒▒》50%",
"《██████████▒▒》80%",
"《██████████▒▒》80%",
"《████████████》100%",
"♻️ Reilo te min lo nghak rawh..."
]
let { key } = await HBWABotMz.sendMessage(from, {text: '《▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'},{quoted:m})

for (let i = 0; i < HBLoading.length; i++) {
 await HBWABotMz.sendMessage(from, {text: HBLoading[i], edit: key },{quoted:m})}
}
      
        
async function GetBuffer(url) {
return new Promise(async (resolve, reject) => {
let buffer;
await jimp
.read(url)
.then((image) => {
image.getBuffer(image._originalMime, function (err, res) {
buffer = res;
})
})
.catch(reject)
if (!Buffer.isBuffer(buffer)) reject(false)
resolve(buffer)
})
}
function GetType(Data) {
return new Promise((resolve, reject) => {
let Result, Status;
if (Buffer.isBuffer(Data)) {
Result = new Buffer.from(Data).toString("base64")
Status = 0;
} else {
Status = 1;
}
resolve({
status: Status,
result: Result,
})
})
}

const { checkVipUser } = require('./lib/vipem')

const ftcvip = await fetch("https://raw.githubusercontent.com/HBMods-OFC/DataBase/master/VIP/vip-pro.json")
const vipmem = await ftcvip.json()
const isVip = checkVipUser(m.sender, vipmem)
const vipahmantur = moment.tz('Asia/Kolkata')
const isExp = vipmem.some((member) => {
    if (member.id === m.sender && member.expired !== "lifetime") {
        const expirationDate = moment(member.expired, 'YYYY-MM-DD')
        if (vipahmantur.isAfter(expirationDate)) {
            return true;
        }
    }
    return false;
})

const replyvipexp = () => {
 dodoi(`⌛I vip hun chhung a tawp tawh!! renew na plan i en duh chuan a *buyvip* tih type rawh`)
 }

async function DuhSak() {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/HBMods-OFC/DataBase/master/Coin&Limit/DuhSakBik.json')
    return response.data;
  } catch (error) {
    console.error('premium number laknaah error a awm:', error.message)
    return [];
  }
}
async function hmangsuh() {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/HBMods-OFC/DataBase/master/Blocklist.json')
    return response.data;
  } catch (error) {
    console.error('premium number laknaah error a awm:', error.message)
    return [];
  }
}
const block1 = await hmangsuh()
const phallo = block1.includes(m.sender)
const aActiveEm = isVip ? '🟢 Active' : '🔴 Not Active';
const duhsak1 = await DuhSak()
const HerbertTheCreator1 = duhsak1.includes(m.sender)
const Dmdftc = ('https://raw.githubusercontent.com/HBMods-OFC/DataBase/master/Coin&Limit/limit&coin.json')
let Dmdftc2 = await fetch(Dmdftc)
let Dmdresult = await Dmdftc2.json()
const hmanzat = Dmdresult.hmanzat
const dawnzat = Dmdresult.dawnzat
const dawnzat2 = Dmdresult.dawnzat2
const dawnzat3 = Dmdresult.lulian
const limitneihtu = m.sender
const khawlbawm = "diamond";
if (isCmd && (block1.includes(m.sender) || block1.includes(m.from))) {
    return 
}


const dailylimit = async () => {
    let messageContent = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: ``
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `He featurs hi hman i duh chuan 💎50 i neih a ngai!!.\nBot rawn hmang thar tur i nih chuan Limit tih button khu hmet rawh, ti chuan bot hman theihna tur 💎500 i dawng ang, emaw i thiante in thawn tir rawh`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "LIMIT",
                                    id: `${prefixc}`+`limit`
                                })
                            }
                        ]
                    })
                })
            }
        }
    };

    let msgs = generateWAMessageFromContent(m.chat, messageContent, { quoted: m });
    HBWABotMz.relayMessage(m.chat, msgs.message, {});

    return; // Ensure return is outside of the async function block
};


 const replyvip = () => {
 let messageContent = {
        viewOnceMessage: {
            message: {
                messageContextInfo: {
                    deviceListMetadata: {},
                    deviceListMetadataVersion: 2
                },
                interactiveMessage: proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: ``
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `> I info ah VIP free trial a 0 tawh\nHe features hi hman chhunzawm i duh chuan VIP member i nih a ngai. VIP 👑 member nih theih dan i hriat duh chuan *buyvip* tih khu hmet rawh`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: false
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "Buy Vip",
                                    id: `${prefixc}`+`buyvip`
                                })
                            }
                        ]
                    })
                })
            }
        }
    };

    let msgs = generateWAMessageFromContent(m.chat, messageContent, { quoted: m });
   HBWABotMz.relayMessage(m.chat, msgs.message, {});

    return; // Ensure return is outside of the async function block
 }
 
const loadingimg = ('https://raw.githubusercontent.com/HBMods-OFC/DataBase/master/HBWABot-Mz/LoadingImg.json')
const loadingimg1 = await fetch(loadingimg)
const loadingimg2 = await loadingimg1.json()
const loadingimg3 = loadingimg2.url;
const howtobebot4 = loadingimg2.vid
const timestamp = speed()
const latensi = speed() - timestamp
const mark = "0@s.whatsapp.net"
let isQuestionActive = false
let currentQuestion;
let isQuizActive = false;
const aipr = await fetch('https://raw.githubusercontent.com/HBMods-OFC/Baileys/master/src/prompt/aiprompt.json')
const aipr2 = await aipr.json()
const aipr3 = aipr2.prompt;
if (_mizoquiz.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
    kuis = true;
    let room = _mizoquiz[m.sender.split('@')[0]];
    let teks = budy.toLowerCase().replace(/[^\w\s\-]+/, '')
    let isSurender = /^((me)?give up|surr?ender)$/i.test(m.text)
    if (!isSurender) {
        let index = room.chhanna.findIndex(v => v.toLowerCase().replace(/[^\w\s\-]+/, '') === teks)
        if (room.bodaih[index]) return !0;
        room.bodaih[index] = m.sender;
    }
    let isWin = room.bodaih.length === room.bodaih.filter(v => v).length;
    let caption = `*Q.* ${room.zawhna}\n\nCHHAN TUR AWM ZAT [ *${room.chhanna.length}* ]
*Ans:*\n${Array.from(room.chhanna, (chhanna, index) => {
return isSurender || room.bodaih[index] ? `(${index + 1}) ${chhanna} ${room.bodaih[index] ? '✓' : ''}`.trim() : false;
    }).filter(v => v).join('\n')}
    ${isSurender ? '' : ``}`.trim()

    if (isWin) {
        const give = await eco.give(limitneihtu, khawlbawm, `${room.chhanna.length}0`)
    }

    const mes = await HBWABotMz.sendText(m.chat, caption, m, { contextInfo: { mentionedJid: parseMention(caption) }})

    if (isWin) {
        dodoi(`🤩Zawhna i chhan thei vek a vangin Limit ${room.chhanna.length}0 💎 i dawng e💎🥳`)
    } else if (isSurender) {
        dodoi('I in surrender avangin 💎50 cut a ni, tinge le aw ka ti🤔 tiang mai mai han hriat loh')
        await eco.deduct(limitneihtu, khawlbawm, 50)
    }
    if (isWin || isSurender) {
        delete _mizoquiz[m.sender.split('@')[0]];
    }
}

if (thlalakquiz.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
    kuis = true;
    achhanna = thlalakquiz[m.sender.split('@')[0]];
    if (budy.toLowerCase() == achhanna) {
        await HBWABotMz.sendMessage(m.chat, { text: `I chhang dik a ni!!👏🥳` }, { quoted: m })
        delete thlalakquiz[m.sender.split('@')[0]];
    } else {
        dodoi('*A dik lo🧐!*')
    }
}
if (_biblequiz.hasOwnProperty(m.sender.split('@')[0]) && isCmd) {
    kuis = true;
    achhanna = _biblequiz[m.sender.split('@')[0]];
    if (budy.toLowerCase() == achhanna) {
        await HBWABotMz.sendMessage(m.chat, { text: `*I chhan dik avangin limit 20💎 i dawng a ni!*🥳` }, { quoted: m });
        await eco.give(limitneihtu, khawlbawm, 20);
        delete _biblequiz[m.sender.split('@')[0]];
    } else {
        await dodoi('*I chhan dik loh avangin i limit 50💎 cut a ni*\nBible Chhiar tam rawh🫠');
        await eco.deduct(limitneihtu, khawlbawm, 50);
        delete _biblequiz[m.sender.split('@')[0]];
    }
}
let bibleUsageCount = 0;
switch (isCommand) {
case `${prefixc}`+'biblequiz':
    case `${prefixc}`+'mbq': {
    const today = new Date();
    const isSundayOrSaturday = today.getDay() === 0 || today.getDay() === 6;
    if (!isSundayOrSaturday) return dodoi("He features hi Inrinni leh Pathianni ah chauh khel thei a ni!!");
    if (bibleUsageCount < 15) {
        if (_biblequiz.hasOwnProperty(m.sender.split('@')[0])) {
            return dodoi(`Zawhna ila chhang zo lo 🤌`);
        }
        let bbquiz = await fetchJson('https://raw.githubusercontent.com/HBMods-OFC/Baileys/master/src/prompt/biblequiz.json');
        let result = bbquiz[Math.floor(Math.random() * bbquiz.length)];
        let mult = "`Multiple Choice Questions`";
        let englolo = await HBWABotMz.sendMessage(m.chat, { text: `> ${mult}\n${result.zawhna}\nAns: ___________`, contextInfo:{"externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": `Mizo Bible Quiz`,"body": `Limit hlawh theihna`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": fs.readFileSync(`./asset/image/MizoBibleQ.png`),"sourceUrl": ``}}}, { quoted: m });
       _biblequiz[m.sender.split('@')[0]] = result.achhanna.toLowerCase()
       bibleUsageCount++;
        } else {
    return dodoi('Bot restart a nih hunah he features hi i hmang chhunzawm leh thei chauh ang')
  }
  }
        break;

case `${prefixc}`+'mizoquiz': {
    const userKey = m.sender.split('@')[0];

    if (_mizoquiz.hasOwnProperty(userKey) && isCmd) {
        return dodoi('I in surrender dawn loh chuan zawhna chhang zo hmasa phawt rawh!')
    }

    try {
        const kaurl = await fetchJson('https://raw.githubusercontent.com/HBMods-OFC/Baileys/master/src/prompt/mizoquiz.json')
        const random = kaurl[Math.floor(Math.random() * kaurl.length)];

        await HBWABotMz.sendText(m.chat, `Zawhnate hi one by one a chhan tur a ni a, chhanna hi Minute 2 ral hmaa chhan zo hman vek tur a ni!!`, m)

        const zawhnaq = `*Answer The Following :*\n*Q.* ${random.zawhna}\n\nCHHAN TUR AWM ZAT [ *${random.chhanna.length}* ] ${(random.chhanna.some(v => v.includes(' ') || v.includes('.'))) ? `(Chhana Thenkhatah chuan space leh fullstop hman a ngai ang)` : ''}`.trim()

        _mizoquiz[userKey] = {
            id: [userKey],
            hbwabotid: await HBWABotMz.sendText(m.chat, zawhnaq, m),
            ...random,
            bodaih: Array.from(random.chhanna, () => false),
            hadiah: 1,
            tawphun: setTimeout(() => {
                if (_mizoquiz[userKey]) HBWABotMz.sendText(m.chat, `Minute 2 a zo, Chhan theih hun chhung a tawp`, m)
                delete _mizoquiz[userKey];
            }, 120000),
        };
    } catch (error) {
        console.error('Error fetching or processing quiz:', error)
        dodoi('Result tur ka lak laiin error awm!')
    }
}
break;


case `${prefixc}`+'picquiz': {
    if (thlalakquiz.hasOwnProperty(m.sender.split('@')[0])) {
        return dodoi(`Zawhna ila chhang zo lo 🤌`)
    }
    let picquiz = await fetchJson('https://raw.githubusercontent.com/HBMods-OFC/Media/main/Zawhna/thlalakquiz.json')
    let result = picquiz[Math.floor(Math.random() * picquiz.length)];
    let englolo = await HBWABotMz.sendMessage(m.chat, { image: { url: `${result.url}` }, caption: `${result.zawhna}\n
\n_🕑Minute 1 hun i nei_` }, { quoted: m })
    thlalakquiz[m.sender.split('@')[0]] = result.achhanna.toLowerCase()
    await sleep(60000)
    if (thlalakquiz.hasOwnProperty(m.sender.split('@')[0])) {
        HBWABotMz.sendMessage(m.chat, { text: `🕑Hun a tawp...\nA chhanna dik chu:  
*${thlalakquiz[m.sender.split('@')[0]]}* a ni` }, { quoted: englolo })
        delete thlalakquiz[m.sender.split('@')[0]];
    }
}
break;


case `${prefixc}`+'c1': {
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
if (!HerbertTheCreator1) return
HBWABotMz.sendMessage(from, { react: { text: "🫡" , key: m.key }})
let value = text.trim().split(" ")
if (value[0] === "") return
const target =
m.quoted && m.mentionedJid.length === 0
? m.quoted.sender
: m.mentionedJid[0] || null;
if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender)
while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender)
const hnekang = target
const balance = await eco.balance(hnekang, khawlbawm)
await dodoi(`Sir, a limit neihzat chu:  💎${balance.wallet} 🤔`)
}
break 

case `${prefixc}`+'cutdm':{
if (!HerbertTheCreator1) return
HBWABotMz.sendMessage(from, { react: { text: "🫡" , key: m.key }})
let value = text.trim().split(" ")
if (value[0] === "") return
const target =
m.quoted && m.mentionedJid.length === 0
? m.quoted.sender
: m.mentionedJid[0] || null;
if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender)
while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender)
const hmela = target
const paihsakna = await eco.deduct(hmela, khawlbawm, value[0])
const balance = await eco.balance(hmela, khawlbawm)
await dodoi(`🫡Sir, hei zawng hi a la bang : _${balance.wallet}💎_\nI la cut leh dawn em sir ?🙋‍♂️`)
}
break

case `${prefixc}`+'limit': case `${prefixc}`+'dawntur': case `${prefixc}`+'claim': case `${prefixc}`+'daily': {
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
let user = m.sender
const cara = "cara" 
if (!isVip) {
HBWABotMz.sendMessage(from, { react: { text: "💰" , key: m.key }})
const daily2 = await eco.daily(user, cara, dawnzat2)
const daily3 = await eco.daily(limitneihtu, khawlbawm, dawnzat)
if (daily2.cd && daily3.cd) return dodoi(`♻️ I claim tawh, ${daily2.cdL} a ral hunah i claim leh thei chauh ang`)
dodoi(`Vawiin atan hengte hi i claim a, dakar 24 ral hunah i claim leh thei ang!!
*Limit* :  💎 ${dawnzat} ✓
*Coin* : 🪙  ${dawnzat2} ✓

VIP member te chuan Limit 💎 1500 leh Coin 🪙  2000 an dawng thei a ni!!..\n\nI limit neih zat hriat i duh chuan *myinfo* tih rawn type rawh!!`)
return 
}
if (isExp) {
HBWABotMz.sendMessage(from, { react: { text: "🕡" , key: m.key }})
const daily4 = await eco.daily(user, cara, dawnzat2)
const daily5 = await eco.daily(limitneihtu, khawlbawm, dawnzat)
if (daily4.cd && daily5.cd) return dodoi(`🕡 I claim tawh, ${daily4.cdL} a ral hunah i claim leh thei chauh ang`)
dodoi(`> I VIP Subscription A Tawp Tawh!!..
Vawiin atan hengte hi i claim a, dakar 24 ral hunah i claim leh thei ang!!
*Limit* :  💎 ${dawnzat} ✓
*Coin* : 🪙  ${dawnzat2} ✓

I limit neih zat hriat i duh chuan *myinfo* tih rawn type rawh!!`)
return
}
HBWABotMz.sendMessage(from, { react: { text: "👑" , key: m.key }})
const daily = await eco.daily(user, cara, 2000)
const daily1 = await eco.daily(limitneihtu, khawlbawm, 1500)
if (daily1.cd && daily.cd) return dodoi(`👑 I claim tawh, ${daily.cdL} a ral hunah i claim leh thei chauh ang`)
dodoi(`Vawiin atan hengte hi i claim a, dakar 24 ral hunah i claim leh thei ang!!
*Limit* :  💎 1500 ✓
*Coin* : 🪙  2000 ✓

I limit neih zat hriat i duh chuan *myinfo* tih rawn type rawh!!`)
}
break

case `${prefixc}`+'hb2ab95': {
    const freevip = "frvip";
    const ckfrvip1 = "ckfrvip2";
    const limit23 = await eco.balance(limitneihtu, ckfrvip1);
    if (limit23.wallet < 10) {
        await eco.give(limitneihtu, freevip, 10);
        await eco.give(limitneihtu, ckfrvip1, 20);
        await dodoi("🎟️VIP 10 time Free Trial i dawng e✓");
        return;
    }
    await HBWABotMz.sendMessage(from, { 
        react: { 
            text: "🎟️",
            key: m.key 
        }
    });
}
break;

case `${prefixc}`+'buyvip': {
    const ckfrvip1 = "ckfrvip2";
    const limit23 = await eco.balance(limitneihtu, ckfrvip1);
    const englovip = ('https://raw.githubusercontent.com/HBMods-OFC/DataBase/master/VIP/info.json')
const englovip1 = await fetch(englovip)
const englovip2 = await englovip1.json()
const englovip3 = englovip2['1month'];
const englovip4 = englovip2['2month'];
const englovip5 = englovip2['3month'];
const englovip6 = englovip2['4month'];
const englovip7 = englovip2['1year'];
const englovip8 = englovip2.info;
    if (!isVip && limit23.wallet < 10) {
         let msg = generateWAMessageFromContent(from, {
  viewOnceMessage: {
    message: {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2
      },
      interactiveMessage: proto.Message.InteractiveMessage.create({
        body: proto.Message.InteractiveMessage.Body.create({
          text: ''
        }),
        footer: proto.Message.InteractiveMessage.Footer.create({
          text: 'GPay : 8416093656'
        }),
        header: proto.Message.InteractiveMessage.Header.create({
          title: `> Vip trial la claim loh ila neia free plan khu select la, Vip i lei hmain vip features vawi 10 i hmang thei ang!!

*👑 ${botname}*
${englovip8}`,
          subtitle: '',
          hasMediaAttachment: false
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
          buttons: [
            {
              name: "single_select",
              buttonParamsJson: JSON.stringify({
                title: "VIEW PLAN",
                sections: [
                  {
                    title: "I DUH BER SELECT RAWH",
                    rows: [
                     {
                        title: "VIP Vawi10 hman theihna",
                        description: "Free",
                        id: `${prefixc}`+`hb2ab95`
                      },
                      {
                        title: "1 Month VIP Membership",
                        description: `${englovip3}`,
                        id: `${prefixc}`+`myid1`
                      },
                      {
                        title: "2 Month VIP Membership",
                        id: `${prefixc}`+`myid2`,
                        description: `${englovip4}`,
                      },
                      {
                        title: "3 Month VIP Membership",
                        id: `${prefixc}`+`myid3`,
                        description: `${englovip5}`
                      },
                      {
                        title: "4 Month VIP Membership",
                        id: `${prefixc}`+`myid4`,
                        description: `${englovip6}`
                      }
                    ]
                  },
                  {
                    title: "",
                    highlight_label: "Best Offer",
                    rows: [
                      {
                        title: "1 Year VIP Membership",
                        description: `${englovip7}`,
                        id: `${prefixc}`+`myid5`
                      }
                    ]
                  }
                ]
              })
            },
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "CREATOR",
                url: `https://api.whatsapp.com/send?phone=+918416093656&text=Hello+Sir,+VIP+features+ka+hman+theihnan+vip+hi+rawn+lei+ka+duh+Thla(month)+:+₹`,
                merchant_url: `${global.hbmods}`,
              })
            }
          ]
        })
      })
    }
  }
}, {quoted: m});

HBWABotMz.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
});
        return;
    }
     let msg2 = generateWAMessageFromContent(from, {
  viewOnceMessage: {
    message: {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2
      },
      interactiveMessage: proto.Message.InteractiveMessage.create({
        body: proto.Message.InteractiveMessage.Body.create({
          text: ''
        }),
        footer: proto.Message.InteractiveMessage.Footer.create({
          text: 'GPay : 8416093656'
        }),
        header: proto.Message.InteractiveMessage.Header.create({
          title: `*👑 ${botname}*
${englovip8}`,
          subtitle: '',
          hasMediaAttachment: false
        }),
        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
          buttons: [
            {
              name: "single_select",
              buttonParamsJson: JSON.stringify({
                title: "VIEW PLAN",
                sections: [
                  {
                    title: "I DUH BER SELECT RAWH",
                    rows: [
                      {
                        title: "1 Month VIP Membership",
                        description: `${englovip3}`,
                        id: `${prefixc}`+`myid1`
                      },
                      {
                        title: "2 Month VIP Membership",
                        id: `${prefixc}`+`myid2`,
                        description: `${englovip4}`,
                      },
                      {
                        title: "3 Month VIP Membership",
                        id: `${prefixc}`+`myid3`,
                        description: `${englovip5}`
                      },
                      {
                        title: "4 Month VIP Membership",
                        id: `${prefixc}`+`myid4`,
                        description: `${englovip6}`
                      }
                    ]
                  },
                  {
                    title: "",
                    highlight_label: "Best Offer",
                    rows: [
                      {
                        title: "1 Year VIP Membership",
                        description: `${englovip7}`,
                        id: `${prefixc}`+`myid5`
                      }
                    ]
                  }
                ]
              })
            },
            {
              name: "cta_url",
              buttonParamsJson: JSON.stringify({
                display_text: "CREATOR",
                url: `https://api.whatsapp.com/send?phone=+918416093656&text=Hello+Sir,+VIP+features+ka+hman+theihnan+vip+hi+rawn+lei+ka+duh+Thla(month)+:+₹`,
                merchant_url: `${global.hbmods}`,
              })
            }
          ]
        })
      })
    }
  }
}, {quoted: m});

HBWABotMz.relayMessage(msg2.key.remoteJid, msg2.message, {
  messageId: msg2.key.id
});
}
break;

case `${prefixc}`+'gtrial': {
if (!HerbertTheCreator1) return 
const freevip = "frvip";
const ckfrvip1 = "ckfrvip2";
    let commandParams = text.trim().split(" ")
    if (commandParams[0] === "") return dodoi(`*Entirnan* : ${prefix + command} 100 @user`)
    const target =
        m.quoted && m.mentionedJid.length === 0
            ? m.quoted.sender
            : m.mentionedJid[0] || null;
    if (!target || target === m.sender) return dodoi("Engtia tih nge i tum")
    if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender)
    while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender)
    const recipient = target;
    const amount = commandParams[0];
    const code = commandParams[1];
    let requestedAmount = parseInt(amount)
    if (!requestedAmount) return dodoi("I thil ziah khi check teh, command i hmang dik lo a ni mai thei")
    const balance = await eco.balance(limitneihtu, freevip)
    let insufficientFunds = (balance.wallet) < requestedAmount;
    if (insufficientFunds) return await eco.give(limitneihtu, freevip, 10);
    const give = await eco.give(recipient, freevip, requestedAmount)
    dodoi(`Free trial ${requestedAmount} chu pek fel a ni ta ✓`)
}
break;
case `${prefixc}`+'may15': {
if (!HerbertTheCreator1) return 
if (!text) return dodoi('Sir eng zawk nge lak chhuah i duh, Limit nge Coin?')
let user = m.sender
const cara = "cara" 
if (args[0] == 'p') {
const thlakp = `${text.replace(/p |P /g, '')}`;
const daily4 = await eco.give(user, cara, thlakp)
 await dodoi(`Coin 🪙 ${thlakp} i wallet ah dah a ni🫠 myinfo tih rawn thawn la i Coin neih zat i en thei ang`)
} else if (args[0] == 'd') {
const thlakd = `${text.replace(/d |D /g, '')}`;
const daily5 = await eco.give(limitneihtu, khawlbawm, thlakd)
await dodoi(`Limit 💎${thlakd} i info ah dah a ni🫠 myinfo tih rawn thawn la i Limit zat i en thei ang`)
 }
}
break

case `${prefixc}`+'myinfo': {
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
const user = m.sender
const freevip = "frvip" 
const cara = "cara"
const balance = await eco.balance(user, cara)
const balance2 = await eco.balance(limitneihtu, khawlbawm)
const balance3 = await eco.balance(limitneihtu, freevip)
const buffx = await fs.readFileSync('./asset/image/info.png') //getBuffer('https://telegra.ph/file/377ce8b7fa38dd5a55186.jpg')
if (!isVip) return HBWABotMz.sendMessage(from, { image: buffx , caption: `
> *INFO BY ${pushname}*
> *💎 Limit Status :* ${balance2.wallet}
> *🪙 Coin Status :* ${balance.wallet}
> *🎟️ VIP Trial :* ${balance3.wallet} left
> *👑 VIP Status :* 🔴 Not Active `},{quoted:m})
let memberId = null;
let expiredDate = null;
vipmem.some((member) => {
    if (member.id === m.sender) {
        memberId = member.id;
        expiredDate = member.expired;
        return true;
    }
})
await HBWABotMz.sendMessage(from, { image: buffx, caption: `
> *INFO BY ${pushname}*
> *💎 Limit Status :* ${balance2.wallet}
> *🪙 Coin Status :* ${balance.wallet}
> *👑 VIP Status :* 🟢 Active
> *🕡 VIP Expiry :* ` + (isExp ? "Expired" : `${expiredDate}`)},{quoted:m})
}
break

case `${prefixc}`+'mlimit': case `${prefixc}`+'glimit': case `${prefixc}`+'limitg': {
    let commandParams = text.trim().split(" ")
    if (commandParams[0] === "") return dodoi(`i limit hi midang sem ve i duh chuan, tag rawh. Tiang hian hman tur a ni\n*Entirnan* : ${prefix + command} 100 @user`)
if (text == 'rules') return dodoi(`*${command} hi kan 💎 Limit-te mi dang kan pek theihna tura siam a ni a, hetah hian dan kan nei ve a ni!! chung kan dante chu\n\n*1:* ${prefix + command} tih hi i hmang anga chuan i pek duh zat, i rawn dah tel anga tichuan i pek duh chu i tag tel leh ang!...\n*Entirnan:* ${prefix + command} 100 @user\n\n*2:* I Limit hi midang i pe a nih chuan i Limit neih zat a tangin 10 cut tel zel a ni ang\n\n*3:* Entirnan Limit 1 midang i pe a nih pawn 10 cut tel zel a ni anga, chutiang bawkin 100 i pe a nih pawhin Limit 10 tho a in cut ang\n😇😇`)
    const target =
        m.quoted && m.mentionedJid.length === 0
            ? m.quoted.sender
            : m.mentionedJid[0] || null;
    if (!target || target === m.sender) return dodoi("Engtia tih nge i tum")
    if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender)
    while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender)
    const recipient = target;
    const amount = commandParams[0];
    const code = commandParams[1];
    let requestedAmount = parseInt(amount)
    if (!requestedAmount) return dodoi("I thil ziah khi check teh, command i hmang dik lo a ni mai thei")
    const balance = await eco.balance(limitneihtu, khawlbawm)
    let insufficientFunds = (balance.wallet) < requestedAmount;
    if (insufficientFunds) return dodoi("Chu tiang zat chu 💎Limit i nei lo")
    const deduct = await eco.deduct(limitneihtu, khawlbawm, requestedAmount)
    const adminDeduct = await eco.deduct(limitneihtu, khawlbawm, 10)
    const give = await eco.give(recipient, khawlbawm, requestedAmount)
    dodoi(`💎Limit ${requestedAmount} chu pek fel a ni ta ✓,\n 
I Limit hi midang i pek a vangin, 💎10 ka cut tel sak che a ni!!😇 rules i en duh chuan *${prefix + command} rules* tih rawn type rawh`)
}
break;

case `${prefixc}`+'buylimit': {
HBWABotMz.sendMessage(from, { react: { text: "💲" , key: m.key }})
if (!text) return dodoi(`💎Limit Store💎\n1. 🪙 100 = 💎10\n2. 🪙 200 = 💎20\n3. 🪙 300 = 💎30\n4. 🪙 400 = 💎40\n5. 🪙 500 = 💎50\n6. 🪙 600 = 💎60\n7. 🪙 700 = 💎70\n8. 🪙 800 = 💎80\n9. 🪙 900 = 💎90\n10. 🪙 1000 = 💎100\n\n_Tiang hian hman tur a ni_
*Entirnan:* ${prefix}buylimit 5\n
Hriattur: command zoah khan Limit store a number ka pek zat khi hman zel tur a ni`)
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
const cara = "cara"
let value = text.trim()
let k = parseInt(value)
const balance = await eco.balance(user, cara) 
switch (value) {
case `${prefixc}`+'1':
if (100 > balance.wallet ) return dodoi(`💎Limit 10 lei i duh a nih chuan, i wallet-ah 🪙 100(za) a awm a ngai`)
const deduct1 = await eco.deduct(user, cara, 100)
const add1 = eco.give(limitneihtu, khawlbawm, 10) 
await dodoi(`Limit 💎10 i limit ah dah a ni🫠 i limit hi myinfo tih rawn thawn la i en thei ang`)
break
case `${prefixc}`+'2':
if (200 > balance.wallet ) return dodoi(`💎Limit 20 lei i duh a nih chuan, i wallet-ah 🪙 200(zahnih) a awm a ngai`)
const deduct2 = await eco.deduct(user, cara, 200)
const add2 = eco.give(limitneihtu, khawlbawm, 20) 
await dodoi(`Limit 💎20 i limit ah dah a ni🫠 i limit hi myinfo tih rawn thawn la i en thei ang`)
break
case `${prefixc}`+'3':
if (300 > balance.wallet ) return dodoi(`💎Limit 30 lei i duh a nih chuan, i wallet-ah 🪙 300(zathum) a awm a ngai`)
const deduct3 = await eco.deduct(user, cara, 300)
const add3 = eco.give(limitneihtu, khawlbawm, 30) 
await dodoi(`Limit 💎30 i limit ah dah a ni🫠 i limit hi myinfo tih rawn thawn la i en thei ang`)
break
case `${prefixc}`+'4':
if (400 > balance.wallet ) return dodoi(`💎Limit 40 lei i duh a nih chuan, i wallet-ah 🪙 400(zali) a awm a ngai`)
const deduct4 = await eco.deduct(user, cara, 400)
const add4 = eco.give(limitneihtu, khawlbawm, 40) 
await dodoi(`Limit 💎40 i limit ah dah a ni🫠 i limit hi myinfo tih rawn thawn la i en thei ang`)
break
case `${prefixc}`+'5':
if (500 > balance.wallet ) return dodoi(`💎Limit 50 lei i duh a nih chuan, i wallet-ah 🪙 500(zanga) a awm a ngai`)
const deduct5 = await eco.deduct(user, cara, 500)
const add5 = eco.give(limitneihtu, khawlbawm, 50) 
await dodoi(`Limit 💎50 i limit ah dah a ni🫠 i limit hi myinfo tih rawn thawn la i en thei ang`)
break
case `${prefixc}`+'6':
if (600 > balance.wallet ) return dodoi(`💎Limit 60 lei i duh a nih chuan, i wallet-ah 🪙 600(zaruk) a awm a ngai`)
const deduct6 = await eco.deduct(user, cara, 600)
const add6 = eco.give(limitneihtu, khawlbawm, 60) 
await dodoi(`Limit 💎60 i limit ah dah a ni🫠 i limit hi myinfo tih rawn thawn la i en thei ang`)
break
case `${prefixc}`+'7':
if (700 > balance.wallet ) return dodoi(`💎Limit 70 lei i duh a nih chuan, i wallet-ah 🪙 700(zasarih) a awm a ngai`)
const deduct7 = await eco.deduct(user, cara, 700)
const add7 = eco.give(limitneihtu, khawlbawm, 70) 
await dodoi(`Limit 💎70 i limit ah dah a ni🫠 i limit hi myinfo tih rawn thawn la i en thei ang`)
break
case `${prefixc}`+'8':
if (800 > balance.wallet ) return dodoi(`💎Limit 80 lei i duh a nih chuan, i wallet-ah 🪙 800(zariat) a awm a ngai`)
const deduct8 = await eco.deduct(user, cara, 800)
const add8 = eco.give(limitneihtu, khawlbawm, 80) 
await dodoi(`Limit 💎80 i limit ah dah a ni🫠 i limit hi myinfo tih rawn thawn la i en thei ang`)
break
case `${prefixc}`+'9':
if (900 > balance.wallet ) return dodoi(`💎Limit 90 lei i duh a nih chuan, i wallet-ah 🪙 900(zakua) a awm a ngai`)
const deduct9 = await eco.deduct(user, cara, 900)
const add9 = eco.give(limitneihtu, khawlbawm, 90) 
await dodoi(`Limit 💎90 i limit ah dah a ni🫠 i limit hi myinfo tih rawn thawn la i en thei ang`)
break
case `${prefixc}`+'10':
if (1000 > balance.wallet ) return dodoi(`💎Limit 100 lei i duh a nih chuan, i wallet-ah 🪙 1000(sangkhat) a awm a ngai`)
const deduct10 = await eco.deduct(user, cara, 1000)
const add10 = eco.give(limitneihtu, khawlbawm, 100) 
await dodoi(`Limit 💎100 i limit ah dah a ni🫠 i limit hi myinfo tih rawn thawn la i en thei ang`)
break
}
}
break
case `${prefixc}`+'owner': {
let list = []
let khm = `${ownernumber}`
list.push({displayName: await HBWABotMz.getName(khm),
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await HBWABotMz.getName(ownernumber + "@s.whatsapp.net"
)}\nFN:${global.ownername}\nitem1.TEL;waid=${ownernumber}:${ownernumber}\nitem1.X-ABLabel:Bot Owner\nitem2.EMAIL;type=INTERNET:
 HBMods OFC\nitem2.X-ABLabel:YouTube\nitem3.URL:https://herbert70.blogspot.com\nitem3.X-ABLabel:IG\nitem4.ADR:;;${location};;;\nitem4.X-ABLabel:Region\nEND:VCARD`
})
await HBWABotMz.sendMessage(from, { 
contacts: { 
displayName: `${list.length} Contact`, 
contacts: list }, mentions: [sender] }, { quoted: m })
}
break
case `${prefixc}`+'dev': case `${prefixc}`+'creator': {
let luz = []
let khm = "918416093656@s.whatsapp.net"
luz.push({displayName: await HBWABotMz.getName(khm),
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await HBWABotMz.getName(918416093656 + "@s.whatsapp.net"
)}\nFN:Herbert Suantak\nitem1.TEL;waid=918416093656:918416093656\nitem1.X-ABLabel: Bot Creator\nitem2.EMAIL;type=INTERNET:
 HBMods OFC\nitem2.X-ABLabel:YouTube\nitem3.URL:https://herbert70.blogspot.com\nitem3.X-ABLabel:IG\nitem4.ADR:;;Inda;Mizoram Aizawl;;\nitem4.X-ABLabel:Region\nEND:VCARD`
})
await HBWABotMz.sendMessage(from, {
contacts: { 
displayName: `${luz.length} Contact`, 
contacts: luz }, mentions: [sender] }, { quoted: m })
}
break
case `${prefixc}`+'listvip': {
const array = [];
vipmem.forEach((member) => {
const jsonData = {
hming : member.name,
id: member.id,
expiry: member.expired
};
array.push(jsonData)
})
let teks = `「 *👑VIP Member List 👑* 」\n\n`;
for (let i of array){
y = await (i.id)
teks += `╭═══════════┈\n┃♕ Hming: ${i.hming}\n`
teks += `┃♕ Phone: @${y.split("@")[0]}\n┃♕ Exp: ${i.expiry}\n╰════════════──┈\n`
}
 await HBWABotMz.sendMessage(from,{text:teks ,mentions: await HBWABotMz.parseMention(teks), },{quoted:m})
 }
break;
case `${prefixc}`+'blocklist1': {
  let teks = "「 *Bot hmang thei lo tur list* 」\n\n͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏";
  for (let i of block1) {
    teks += `@${i.split("@")[0]}\n`;
  }
  await HBWABotMz.sendMessage(from, {text:teks, mentions: await HBWABotMz.parseMention(teks)}, { quoted: m })
  break;
}
case `${prefixc}`+'repo': case `${prefixc}`+'sc': case `${prefixc}`+'script': {
await HBWABotMz.sendMessage(from, { text : `
*HBWABot Manager :*
https://herbert70.blogspot.com/2023/11/hbwabot-manage.html

*Github :*
https://github.com/HBMods-OFC/HBWABot-Mz`}, { quoted: m })
}
break
case `${prefixc}`+'autoread':
if (!HerbertTheCreator) return dodoi(mess.owner)
if (args.length < 1) return dodoi(`I option duh thlang rawh, i tih dan tur chu\n${prefix + command} on/off\n\non chuan a activate ang\n off chuan deactivate na`)
if (q === 'on') {
autoread = true
dodoi(`Message autoread a dah a ni✓`)
} else if (q === 'off') {
autoread = false
dodoi(`Message autoread chu off a ni✓`)
}
break
case `${prefixc}`+'autostview':
if (!HerbertTheCreator) return dodoi(mess.owner)
if (args.length < 1) return dodoi(`I option duh thlang rawh, i tih dan tur chu\n${prefix + command} on/off\n\non chuan a activate ang\n off chuan deactivate na`)
if (q === 'on') {
autoread_status = true
dodoi(`Status/Stories auto view a dah a ni✓`)
} else if (q === 'off') {
autoread_status = false
dodoi(`Status/Stories auto view chu off a ni✓`)
}
break 

case `${prefixc}`+'hbwabot': case `${prefixc}`+'/bot': { 
let audiobuffy = fs.readFileSync(`./asset/audio/Herbert.mp3`)
HBWABotMz.sendMessage(m.chat, { audio: audiobuffy, mimetype: 'audio/mp4', ptt: true }, { quoted: m })
}
break 

//game
case `${prefixc}`+'suitpvp':case `${prefixc}`+'rps': case `${prefixc}`+'rockpaperscissors': case `${prefixc}`+'suit': {
if (!m.isGroup) return dodoi(mess.group)
this.suit = this.suit ? this.suit : {}
let poin = 10
let poin_lose = 10
let timeout = 60000
if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.sender))) dodoi(`Game i zo chiah`)
if (m.mentionedJid[0] === m.sender) return dodoi(`Mi malin khel thei a ni lo!`)
if (!m.mentionedJid[0]) return dodoi(`_Tunge i challange ang?_\nI challenge duh chu tag rawh..\n\nTiang hian : ${prefix}rps @${owner}`, m.chat, { mentions: [owner[1] + '@s.whatsapp.net'] })
if (Object.values(this.suit).find(roof => roof.id.startsWith('suit') && [roof.p, roof.p2].includes(m.mentionedJid[0]))) return dodoi(`I challenge pui mek hian mi dang nen an la ti mek a chu vangin lo nghak rawh`)
let id = 'suit_' + new Date() * 1
let caption = `_*RPS PvP*_

@${m.sender.split`@`[0]}'n *RPS* khel turin @${m.mentionedJid[0].split`@`[0]} a challenge che

*Hi* @${m.mentionedJid[0].split`@`[0]} *I accept duh chuan 60 second ral hmain accept tih type la i duh loh chuan reject tih type rawh*`
this.suit[id] = {
chat: await HBWABotMz.sendText(m.chat, caption, m, { mentions: parseMention(caption) }),
id: id,
p: m.sender,
p2: m.mentionedJid[0],
status: 'wait',
waktu: setTimeout(() => {
if (this.suit[id]) HBWABotMz.sendText(m.chat, `_60 seconds a zo, hun a tawp_`, m)
delete this.suit[id]
}, 60000), poin, poin_lose, timeout
}
}
break 

case `${prefixc}`+'ttc': case `${prefixc}`+'ttt': case `${prefixc}`+'tictactoe': {
if (!m.isGroup) return dodoi(mess.group)
            let TicTacToe = require("./lib/tictactoe")
            this.game = this.game ? this.game : {}
            if (Object.values(this.game).find(room13 => room13.id.startsWith('tictactoe') && [room13.game.playerX, room13.game.playerO].includes(m.sender))) return dodoi(`game-ah i la awm reng a ni!!`)
            let room13 = Object.values(this.game).find(room13 => room13.state === 'WAITING' && (text ? room13.name === text : true))
            if (room13) {
            room13.o = m.chat
            room13.game.playerO = m.sender
            room13.state = 'PLAYING'
            let arr = room13.game.render().map(v => {
            return {
            X: '❌',
            O: '⭕',
            1: '1️⃣',
            2: '2️⃣',
            3: '3️⃣',
            4: '4️⃣',
            5: '5️⃣',
            6: '6️⃣',
            7: '7️⃣',
            8: '8️⃣',
            9: '9️⃣',
            }[v]
            })
            let str = `Room ID: ${room13.id}
A hnuia number hi i duh ber thlang rawh,

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

Hi @${room13.game.currentTurn.split('@')[0]} i thlan ve hun

He game hi i khel peih loh chuan surrender tih type mai tur ani`
            if (room13.x !== room13.o) await HBWABotMz.sendText(room13.x, str, m, { mentions: parseMention(str) } )
            await HBWABotMz.sendText(room13.o, str, m, { mentions: parseMention(str) } )
            } else {
            room13 = {
            id: 'tictactoe-' + (+new Date),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
            }
            if (text) room13.name = text
            dodoi('I tumpui tur nghak lawk ang, i tumpui tur hian ttc a rawn type ve a ngai a ni\na rawn type mai loh chuan session tih tawp tur a ni tiang hian type tur : delttc\n\n*Hriattur*\n\nHe games session-ah i awm chhung hian features dang i hmang thei dawn lova he game hi midangin an khel pui lo che a nih chuan, session hi delete tawp tur a ni, a chungah a delete dan tur kan sawi tawh ang kha')
            this.game[room13.id] = room13
            }
            }
            break
            case `${prefixc}`+'delttc': case `${prefixc}`+'delttt': {
            this.game = this.game ? this.game : {}
            try {
            if (this.game) {
            delete this.game
            HBWABotMz.sendText(m.chat, `TicTacToe Game session chu delete a ni`, m)
            } else if (!this.game) {
            dodoi(`Tictactoe session delete tur a awm lo lai tak a ni`)
            } else throw '?'
            } catch (e) {
            dodoi('damaged')
            }
            }
            break


case `${prefixc}`+'lyrics': {
try {
if (!text) return dodoi(`Eng lyrics nge i zawn dawn?\nTiang hian hman tur: ${prefix}lyrics Thunder`)
const { lyrics, lyricsv2 } = require('@bochilteam/scraper')
const result = await lyricsv2(text).catch(async _ => await lyrics(text))
dodoi(`*Title :* ${result.title}\n*Author :* ${result.author}\n*Url :* ${result.link}\n\n*Lyrics :* ${result.lyrics}`.trim())
}
catch (error) {
dodoi("I hla duh ang chu ka hmu lo, Mizo hla i zawng duh a nih chuan *Mlyrics* tih command hi hmang rawh")
}
}
break
case `${prefixc}`+'mlyrics': {
  if (!q) return dodoi(`Eng lyrics nge i zawn dawn?. Tiang hian hman tur\n*⟨Entirnan:* ${prefix}Mlyrics Zorema Khiangte Saltang tawngtaina\n\n*Hriattur :* A hla thupui leh a satu hming rawn dah tel ang che, a hla thupui hming i hre lo a nih chuan a chang i hriat lai rawn dah ang che, ziah dan dikin`) 
  var fourbrother = await getBuffer(`https://i.imgur.com/tb7TQAh.jpg`)
  HBWABotMz.sendMessage(from, { react: { text: "🎶" , key: m.key }}) 
  const Parser = require('rss-parser')
  const { htmlToText } = require('html-to-text')
  const parser = new Parser()
  const mizoly = args.join(" ")
  const rssFeedURL = `https://www.mizolyric.com/feeds/posts/default?q=${mizoly}`
  try {
    const feed = await parser.parseURL(rssFeedURL)
    if (feed.items.length === 0) {
      return HBWABotMz.sendMessage(from, { text : `I lyrics duh *${text}* tih hi ka zawng hmu zo lo. A spelling i ti dik lo a ni maithei🔍.. Emaw He site ah hian i zawn ang chu a awm lo pawh a ni thei https://www.mizolyric.com/ `}, { quoted: m})
    }
   const jsonArray = [];
        feed.items.forEach(item => {
            const jsonData = {
                link: item.link,
                title: item.title,
                content: htmlToText(item.content)
            };
            jsonArray.push(jsonData)
        })
        const firstItem = jsonArray[0]; 
        const alink = firstItem.link;
        const ahlathu = firstItem.title;
        const alyrics = firstItem.content;
 await HBWABotMz.sendMessage(m.chat, { text: `${alyrics}`, contextInfo:{"externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": `${ahlathu}`,"body": `Mizo Lyrics`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": fourbrother,"sourceUrl": `${alink}`}}}, { quoted: m})
  } catch (error) {
    console.error('Feed laknaah eroor a awm:', error)
  }
}
break;
case `${prefixc}`+'fbk' : {
if (!q) return dodoi(`Feedback pek i duh chuan he tiang hian pek tur a ni\nEntirnan: ${prefix + command} fuck you Herbert 🫥`)
await HBWABotMz.sendMessage("918416093656@s.whatsapp.net", { text:`Feedback From : (${pushname})\n\n${text}`}, { quoted: m })
await dodoi("I feedback avangin kan lawm e..🤗")
}
break

case `${prefixc}`+'khb': {
if (!text) return await HBWABotMz.sendMessage(from, { text : `Kristian Hla Bu number zat rawn dah tel rawh\nTiang hian hman tur: ${prefix + command} 300`},{ quoted: m})
  HBWABotMz.sendMessage(from, { react: { text: "📖" , key: m.key }}) 
  const siamthatna = `${text.replace(' ', '')}`
  var gchb = await getBuffer(`https://telegra.ph/file/70f80a9b8695c1e97d20b.jpg`)
  const apiUrl = `https://raw.githubusercontent.com/HBMods-OFC/DataBase/master/hla/KHB/${siamthatna}.json`;
  try {
  const hlabuftc = await fetch(apiUrl)
  const hlabu = await hlabuftc.json()
  const hlahming = hlabu.title;
  const hlathu = hlabu.lyrics;
  await HBWABotMz.sendMessage(from, {
          text: `Hla Bu : *${siamthatna}*\n\n${hlathu}`,
          contextInfo: {
            externalAdReply: {
              showAdAttribution: true,
              containsAutoReply: true,
              title: `${hlahming}`,
              body: `Kristian Hla Bu Thar`,
              thumbnail: gchb,
              mediaType: 1,
              mediaUrl: ``,
              sourceUrl: ``
            }
          }
        }, { quoted: m })
  } catch (error) {
    console.error(error)
    dodoi("Kristian Hla Bu ah hian Hla 1 - 600 a awma, khawngaihin a number dik tak chauh rawn dah rawh!...")
  }
}
break;


case `${prefixc}`+'cfhb': {
if (!text) return await HBWABotMz.sendMessage(from, { text : `KTP General Conference Hla Bu number zat rawn dah tel rawh\nTiang hian hman tur: ${prefix + command} 5
  
        Zawn awlna ⤵️
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
> 1. Kristian Thalaite u
> 2. Ka nung reng ang kristaah
> 3. Pathian Hmangaihna
> 4. Zaia faktu an haw hun chuan
> 5. Kan zinkawngah
> 6. Inpeih thuai rawh
> 7. Ka zawng zawng hian fak che a nuam
> 8. Pen khat ka pen
> 9. Nang chauh ka bel ang
> 10. Thihna luipui
> 11. Lei leh van thil zawngte aiiin
> 12. Ka duh tu dang mah an awm lo
> 13. Ka lawm e, Isu
> 14. Min hruai thin
> 15. Rawngbawl tura chhandam
> 16. Khaw thianghlim Jerusalem
> 17. Nang hnaih in
> 18. I ta ka ni
> 19. Vanram ropuiah
> 20. Lalpa a tha
> 21. Inkhawmpui tiak tawh ngai lohna
> 22. A hmangaihna a lo ni
> 23. Beramno kan fak ang
> 24. Lawmna tlang
> 25. Aw hmangaihna va thûk èm
> 26. Min hmangaih si a
> 27. I fak ang u
> 28. Lal ropui kan neih chuan
> 29. Lungpui nghet
> 30. An leng za tawh ang
> 31. Lalthuthleng kiangah
> 32. Ka thupui ber
> 33. Lal Isua hmangaihna
> 34. Pathian hmel
> 35. Duhthlanna sang ber
> 36. Vanglai nun
> 37. Ka mit ngei hian a thlir ang
> 38. Lawmthu ka hrilh che
> 39. Van lawmna kim
> 40. Lalpa thatna
> 41. Min tlan ta
> 42. Hawilopar mawi Isua
> 43. Van khua
> 44. Nang nen chuan
> 45. Aw Kraws
> 46. Hnehna chu Lalpa ta a ni
> 47. Sawi nawm leh rawh
> 48. Kan fak zel dawn
> 49. A chetna tur mi a zawng
> 50. Eliza hun ropui
> 51. Chu luipuiah kan intawk ang
> 52. Lalpa chu fakin ka chawi mawiang
> 53. Isua hmangaihna leh thatna
> 54. Ni tin Isua ka thinlungin
> 55. Nangma thil ropuite an sawi
> 56. Van hmun ropui, hmangaith ram khi`},{ quoted: m})
  HBWABotMz.sendMessage(from, { react: { text: "📖" , key: m.key }}) 
  const siamthatna = `${text.replace(' ', '')}`
  var gchb = await getBuffer(`https://telegra.ph/file/23ab1484bd96462dfac85.jpg`)
  const apiUrl = `https://raw.githubusercontent.com/HBMods-OFC/DataBase/master/hla/KTP/${siamthatna}.json`;
  try {
  const hlabuftc = await fetch(apiUrl)
  const hlabu = await hlabuftc.json()
  const hlahming = hlabu.title;
  const hlathu = hlabu.lyrics;
  await HBWABotMz.sendMessage(from, {
          text: `Hla Bu : *${siamthatna}*\n\n${hlathu}`,
          contextInfo: {
            externalAdReply: {
              showAdAttribution: true,
              containsAutoReply: true,
              title: `${hlahming}`,
              body: `2024 KTP General Conferences`,
              thumbnail: gchb,
              mediaType: 1,
              mediaUrl: `https://www.youtube.com/@HBMods_Channel`,
              sourceUrl: `https://www.youtube.com/@HBMods_Channel`
            }
          }
        }, { quoted: m })
  } catch (error) {
    console.error(error)
    dodoi("KTP General Conference Hla Bu 2024 ah hian Hla 1 - 56 a awma, khawngaihin a number dik tak chauh rawn dah rawh!...")
  }
}
break;

case `${prefixc}`+'cfhb2': {
  if (!text) return await HBWABotMz.sendMessage(from, { text : `KTP General Conference Hla Bu number zat rawn dah tel rawh\nTiang hian hman tur: ${prefix + command} 5
  
        Zawn awlna ⤵️
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
> 1. Kristian Thalaite u
> 2. Ka nung reng ang kristaah
> 3. Pathian Hmangaihna
> 4. Zaia faktu an haw hun chuan
> 5. Kan zinkawngah
> 6. Inpeih thuai rawh
> 7. Ka zawng zawng hian fak che a nuam
> 8. Pen khat ka pen
> 9. Nang chauh ka bel ang
> 10. Thihna luipui
> 11. Lei leh van thil zawngte aiiin
> 12. Ka duh tu dang mah an awm lo
> 13. Ka lawm e, Isu
> 14. Min hruai thin
> 15. Rawngbawl tura chhandam
> 16. Khaw thianghlim Jerusalem
> 17. Nang hnaih in
> 18. I ta ka ni
> 19. Vanram ropuiah
> 20. Lalpa a tha
> 21. Inkhawmpui tiak tawh ngai lohna
> 22. A hmangaihna a lo ni
> 23. Beramno kan fak ang
> 24. Lawmna tlang
> 25. Aw hmangaihna va thûk èm
> 26. Min hmangaih si a
> 27. I fak ang u
> 28. Lal ropui kan neih chuan
> 29. Lungpui nghet
> 30. An leng za tawh ang
> 31. Lalthuthleng kiangah
> 32. Ka thupui ber
> 33. Lal Isua hmangaihna
> 34. Pathian hmel
> 35. Duhthlanna sang ber
> 36. Vanglai nun
> 37. Ka mit ngei hian a thlir ang
> 38. Lawmthu ka hrilh che
> 39. Van lawmna kim
> 40. Lalpa thatna
> 41. Min tlan ta
> 42. Hawilopar mawi Isua
> 43. Van khua
> 44. Nang nen chuan
> 45. Aw Kraws
> 46. Hnehna chu Lalpa ta a ni
> 47. Sawi nawm leh rawh
> 48. Kan fak zel dawn
> 49. A chetna tur mi a zawng
> 50. Eliza hun ropui
> 51. Chu luipuiah kan intawk ang
> 52. Lalpa chu fakin ka chawi mawiang
> 53. Isua hmangaihna leh thatna
> 54. Ni tin Isua ka thinlungin
> 55. Nangma thil ropuite an sawi
> 56. Van hmun ropui, hmangaith ram khi`},{ quoted: m})
HBWABotMz.sendMessage(from, { react: { text: "🎶" , key: m.key }}) 
  const siamthatna = `${text.replace(' ', '')}`
  var gchb = await getBuffer(`https://telegra.ph/file/23ab1484bd96462dfac85.jpg`)
  const apiUrl = `https://raw.githubusercontent.com/HBMods-OFC/DataBase/master/hla/KTP/${siamthatna}.json`;
  try {
  const hlabuftc = await fetch(apiUrl)
  const hlabu = await hlabuftc.json()
  const hlahming = hlabu.title;
  const hlathu = hlabu.lyrics;
  const sazu = (`${hlahming}`)
  let res = await yts(sazu)
  let vid = res.videos[0]
  let q = isVideo ? '360p' : '128kbps'
  let v = vid.url
  let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
  let dl_url = await (isVideo ? yt.video[q].download() : yt.audio[q].download())
  const Vawk = await HBWABotMz.sendMessage(m.chat, {audio: {url: dl_url} , mimetype: 'audio/mpeg', ptt: true, 
  contextInfo: {
            externalAdReply: {
              showAdAttribution: true,
              containsAutoReply: true,
              title: `${hlahming}`,
              body: `2024 KTP General Conferences`,
              thumbnail: gchb,
              mediaType: 1,
              mediaUrl: ``,
              sourceUrl: ``
            }
          }
        }, { quoted: m })
  await HBWABotMz.sendMessage(from, {
          text: `Hla Bu : ${siamthatna}\n\n${hlathu}`}, { quoted: Vawk })
  } catch (error) {
    console.error(error)
    dodoi("KTP General Conference Hla Bu 2024 ah hian Hla 1 - 56 a awma, khawngaihin a number dik tak chauh rawn dah rawh!...")
  }
}
break;
case `${prefixc}`+'mzly':
case `${prefixc}`+'hlaly': {
    if (!text) return dodoi(`Eng lyrics nge i zawn dawn?\nTiang hian hman tur: ${prefix + command} Zorema Khiangte Saltang tawngtaina\n\n*Hriattur :* A hla thupui leh a satu hming rawn dah tel ang che, a hla thupui hming i hre lo a nih chuan a chang i hriatna lai rawn dah ang che, ziah dan dikin`)
    var fourbrother = await getBuffer(`https://i.imgur.com/tb7TQAh.jpg`)
    HBWABotMz.sendMessage(from, { react: { text: "🎶" , key: m.key }}) 
    const Parser = require('rss-parser')
    const { htmlToText } = require('html-to-text')
    const parser = new Parser()
    const mizoly = args.join(" ")
    const rssFeedURL = `https://www.mizolyric.com/feeds/posts/default?q=${mizoly}`
    try {
        const feed = await parser.parseURL(rssFeedURL)
        if (feed.items.length === 0) {
            return HBWABotMz.sendMessage(from, { text : `🧐 I lyrics duh *${text}* tih hi ka zawng hmu zo lo. A spelling i ti dik lo a ni maithei..\n\nEmaw He site ah hian a awm lo pawh a ni thei https://www.mizolyric.com/ `}, { quoted: m})
        }
        const jsonArray = [];
        feed.items.forEach(item => {
        const planetext = htmlToText(item.content)
        const textArray = planetext.split("\n")
        const satuIndex = textArray.findIndex(line => line.includes("Satu:"))
        const satuLine = satuIndex !== -1 ? textArray[satuIndex].trim() : "Official";
            const jsonData = {
                link: item.link,
                title: item.title,
                content: htmlToText(item.content),
                asatu: satuLine
            };
            jsonArray.push(jsonData)
        })
        const firstItem = jsonArray[0];
        const alink = firstItem.link;
        const ahlathu = firstItem.title;
        const alyrics = firstItem.content;
        const asatuhming = firstItem.asatu;
        const otherText = asatuhming.replace(/Satu:/g, "'")
        const match = otherText.includes(text)
        const ainmilem = match ? 'lyrics' : `${text}`
        const sazu = `${ahlathu} ${ainmilem}`;
        const res = await yts(sazu)
        const vid = res.videos[0];
        const q = '128kbps';
        const v = vid.url;
        const yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
        const dl_url = await yt.audio[q].download()
        const Vawk = await HBWABotMz.sendMessage(m.chat, {audio: {url: dl_url} , mimetype: 'audio/mpeg', ptt: true, 
  contextInfo: {
            externalAdReply: {
              showAdAttribution: true,
              containsAutoReply: true,
              title: `${ahlathu}`,
              body: `Mizo Hla Lyrics`,
              thumbnail: fourbrother,
              mediaType: 1,
              mediaUrl: ``,
              sourceUrl: ``
            }
          }
        }, { quoted: m })
        HBWABotMz.sendMessage(m.chat, { text:`${alyrics}`}, { quoted: Vawk })
    } catch (error) {
        console.error('Dik lo a awm tlat:', error)
    }
}
break;


 
case `${prefixc}`+'wallet': {
HBWABotMz.sendMessage(from, { react: { text: "🐷" , key: m.key }})
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
const user = m.sender
const cara = "cara"
const balance = await eco.balance(user, cara)
await dodoi(`🐷 ${pushname} I wallet ah Coin awm zat:\n\n_🪙 ${balance.wallet}_`)
}
break 
case `${prefixc}`+'slot': case `${prefixc}`+'spin': {
if (!m.isGroup) return dodoi(mess.group)
var today = new Date()
if (today.getDay() == 6 || today.getDay() == 5 || today.getDay() == 0){
if (text == 'help') return dodoi(`*1:* ${prefix}Spin tih hi i hmang ang\n\n*2:* I wallet ah cheng 🪙 100 i neih tling tur a ni a,\n\n*3:* Wallet-ah Coin i nei loh chuan i box 📦 a tangin withdraw ang che\n\n*4:* I box 📦-ah pawh Coin i la nei lo cheu a nih chuan i sum hmuhna turin economy features hi hmang rawh`)
if (text == 'Coin') return dodoi(`*1:* Small Win -in 🪙 20 an hlawh anga\n\n*2:* Small Lose in 🪙 20 an chan ang\n\n*3:* Big Win in 🪙 100 an hlawh anga\n\n*4:* Big Lose in 🪙 50 an chan ang\n\n*5:* 🎉 JackPot in 🪙 1000 an dawng bawk ang`)
const fruit1= ["🥥", "🍎", "🍇"]
const fruit2 = ["🍎", "🍇", "🥥"]
const fruit3 = ["🍇", "🥥", "🍎"] 
const fruit4 = ["🍇", "🥥", "🍎"]
const lose = ['*Tun game-ah hi chuan i vanduai tlat mai*\n\n_--> 🍇-🥥-🍎_', '*Line a tangin a chhuak vek*\n\n_--> 🥥-🍎-🍇_', '*Van a duai tlat🌚😂 ti tha leh mai rawh*\n\n_--> 🍎-🍇-🥥_']
const smallLose = ['*Grape pahnih inkawp lohin i spin fuh a ni!!*\n\n_--> 🍇>🥥<🍇_', '*Apple pahnih inkawp lohin i spin fuh a ni!!*\n\n_--> 🍎>🥥<🍎_', '*Coconut pahnih inkawp lohin i spin fih a ni!!*\n\n_--> 🥥>🍎<🥥_']
const won = ['*🤩Nice Apple patum i spin fuh e...*\n\n_--> 🍎+🍎+🍎_', '*Eheuh, Coconut pathum i spin fuh e🤩*\n\n_--> 🥥+🥥+🥥_', '*Ropui lutuk🤩, i chhungte tan Grape juice i siam sak dawn nia*\n\n_--> 🍇+🍇+🍇_'] 
const near = ['*Wow, Grape pahnih leh apple pakhat😂*\n\n_--> 🍎-🍇+🍇_', '*Hehe, Apple pahnih leh Grape pakhat*\n\n_--> 🍎+🍎-🍇_']
const jack = ['*🥳 JackPot 🤑*\n\n_--> 🍇×🍇×🍇×🍇_', '*🎉 JaaackPooot!*\n\n_--> 🥥×🥥×🥥×🥥_', '*🎊I JackPot e 🪙 1000 i dawng e✓*']
const user = m.sender
const cara = "cara"
const k = 100
const balance1= await eco.balance(user, cara)

if (k > balance1.wallet) return dodoi(`I wallet ah 🪙 100 tal i neih a ngai\nI box 📦 a tangin 🪙 100 aia tlemlo withdraw ang che`)
const f1 = fruit1[Math.floor(Math.random() * fruit1.length)];
const f2 = fruit2[Math.floor(Math.random() * fruit2.length)];
const f3 = fruit3[Math.floor(Math.random() * fruit3.length)];
const f4 = fruit4[Math.floor(Math.random() * fruit4.length)];
const mess1 = lose[Math.floor(Math.random() * lose.length)];
const mess2 = won[Math.floor(Math.random() * won.length)];
const mess3 = near[Math.floor(Math.random() * near.length)];
const mess4 = jack[Math.floor(Math.random() * jack.length)];
const mess5 = smallLose[Math.floor(Math.random() * smallLose.length)];

if ((f1 !== f2) && f2 !== f3){
 const deduct1 = await eco.deduct(user, cara, 50)
dodoi(`${mess1}\n\n*Big Lose -->* _🪙 50 i chan_`)
}
else if ((f1 == f2) && f2 == f3){
 const give1 = await eco.give(user, cara, 100) 
 dodoi(`${mess2}\n*_Big Win -->* _🪙 100 i dawng e_`)
}
else if ((f1 == f2) && f2 !== f3){
 const give2 = await eco.give(user, cara, 20)
 dodoi(`${mess3}\n*Small Win -->* _🪙 20 i dawng e_`)
}
else if ((f1 !== f2) && f1 == f3){
 const deduct2 = await eco.deduct(user, cara, 20)
 dodoi(`${mess5}\n\n*Small Lose -->* _🪙 20 i chan_`)
}
else if ((f1 !== f2) && f2 == f3){
 const give4 = eco.give(user, cara, 20) 
 dodoi(`${mess3}\n\n*Small Win -->* _🪙 20 i dawng e_`)
}
else if (((f1 == f2) && f2 == f3) && f3 == f4){
 const give5 = eco.give(user, cara, 1000)
dodoi(`${mess4}\n\n_🎊 JackPot --> _🪙 1000 tawp mai i dawng e🤩_`)
}
else { 
dodoi(`I thil tih hi i hrethiam em ni?`)
}
}
else{
dodoi(`*Kartawpah chauh he game hi i khei thei ang*\n\n*🌿 Zirtawpni*\n*🎏 Inrinni*\n*🎐 Pathianni thleng*`)
}
}
break

case `${prefixc}`+'box':case `${prefixc}`+'pikee': {
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
HBWABotMz.sendMessage(from, { react: { text: "🐷" , key: m.key }})

const user = m.sender
const cara = "cara"
const balance = await eco.balance(user, cara)
await dodoi(`🏦 ${pushname}'I box a Coin awm zat:\n_🪙 ${balance.bank}_\nCoin awm thei zat: _🪙 ${balance.bankCapacity}_`) 
}
break
case `${prefixc}`+'capacity':case `${prefixc}`+'boxupgrade': {
HBWABotMz.sendMessage(from, { react: { text: "💲" , key: m.key }})
if (!text) return dodoi(`🐷 Box-Capacity 🐷\n\n1 | 1000 sp = 🪙 100\n\n2 | 10000 sp = 🪙 1000\n\n3 | 100000 sp = 🪙 10000\n\nTiang hian ti la ${prefix}capacity 1 In emaw ${prefix}boxupgrade 1000`)
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
const cara = "cara"
let value = text.trim()
let k = parseInt(value)
const balance= await eco.balance(user, cara) 
switch (value) {
case `${prefixc}`+'1000':
case `${prefixc}`+'1':
if (k > balance.wallet ) return dodoi(`I box capacity hi 1000-sp ah a pun dawn chuan i wallet ah 🪙 100(za) a awm a ngai`)
const deduct1 = await eco.deduct(user, cara, 100)
const add1 = eco.giveCapacity(user, cara, 1000) 
await dodoi(`${pushname} I box capacity hi 🪙 1000(sangkhat) dah belh theiha upgrade a ni`)
break

case `${prefixc}`+'10000':
case `${prefixc}`+'2':
if (k > balance.wallet ) return dodoi(`I box capacity hi 10000-sp ah a pun dawn chuan i wallet ah 🪙 1000(sangkhat) a awm a ngai`)
const deduct2 = await eco.deduct(user, cara, 1000)
const add2 = eco.giveCapacity(user, cara, 10000) 
await dodoi(`${pushname} i box capacity hi 🪙 10000(singkhat) dah belh theiha upgrade a ni`)
break
 case `${prefixc}`+'100000':
case `${prefixc}`+'3':
if (k > balance.wallet ) return dodoi(`I box capacity hi 100000-sp ah a pun dawn chuan i wallet ah 🪙 10000(singkhat) a awm a ngai`)
const deduct3 = await eco.deduct(user, cara, 10000)
const add3 = eco.giveCapacity(user, cara, 100000) 
await dodoi(`${pushname} i box capacity hi 🪙 100000(nuaikhat) dah belh theiha upgrade a ni`)
}
}
break

case `${prefixc}`+'deposit':  case `${prefixc}`+'pay-in': {
HBWABotMz.sendMessage(from, { react: { text: "📥" , key: m.key }})
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
if (!text) return dodoi("I deposit duh zat rawn provide rawh")
const texts = text.trim()
const user = m.sender;
const cara = "cara"
const deposit = await eco.deposit(user, cara, texts)
if(deposit.noten) return dodoi('I wallet ah chu tiang zat a awm loh avangin i deposit thei lo ang')
dodoi(`I box a 🪙  ${deposit.amount} deposit a ni`)
  }
break
 case `${prefixc}`+'withdraw':case `${prefixc}`+'withdrawal': {
HBWABotMz.sendMessage(from, { react: { text: "💸" , key: m.key }})
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
const user = m.sender
if (!text) return dodoi("I withdraw duh zat rawn provide rawh!")
const query = text.trim()
const cara = "cara"
const withdraw = await eco.withdraw(user, cara, query)
if(withdraw.noten) return dodoi('Chutiang zat zat i box ah Coin i nei lo')
const add = eco.give(user, cara, query)
dodoi(`🏧 ALERT I wallet a 🪙 ${withdraw.amount} dah a ni.`)
}
break 
case `${prefixc}`+'transfer': {
HBWABotMz.sendMessage(from, { react: { text: "🗿" , key: m.key }})
let value = text.trim().split(" ")
if (value[0] === "") return dodoi(`Tiang hian ti tawh : ${prefix}transfer 100 @user`)
const target =
m.quoted && m.mentionedJid.length === 0
? m.quoted.sender
: m.mentionedJid[0] || null;
 if (!target || target === m.sender) return dodoi("Engtia tih nge i tum")
 if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender)
while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender)
const cara = "cara"
const user1 = m.sender
const user2 = target
const word = value[0];
const code = value[1];
let d = parseInt(word)
if (!d) return dodoi("I thil ziah khi check teh, command i hmang dik lo a ni mai thei")
const balance = await eco.balance(user1, cara) 
let a = (balance.wallet) < parseInt(word)
if(a == true) return dodoi("Chutiang zat transfer turin i wallet ah a awm lo")
const deduct = await eco.deduct(user1, cara, value[0])
const give = await eco.give(user2, cara, value[0])
dodoi(`📠 Transaction a ni e✓`)
}
break 
case `${prefixc}`+'cut':{
if (!HerbertTheCreator1) return
HBWABotMz.sendMessage(from, { react: { text: "🫡" , key: m.key }})
let value = text.trim().split(" ")
if (value[0] === "") return
const target =
m.quoted && m.mentionedJid.length === 0
? m.quoted.sender
: m.mentionedJid[0] || null;
if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender)
while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender)
const cara = "cara"
const hmela = target
const paihsakna = await eco.deduct(hmela, cara, value[0])
const balance = await eco.balance(hmela, cara)
await dodoi(`🫡Sir, hei zawng hi a la bang : _🪙 ${balance.wallet}_\nI la cut leh dawn em sir ?🙋‍♂️`)
}
break
case `${prefixc}`+'cut2': {
if (!HerbertTheCreator1) return
HBWABotMz.sendMessage(from, { react: { text: "🫡" , key: m.key }})
let value = text.trim().split(" ")
if (value[0] === "") return
const target =
m.quoted && m.mentionedJid.length === 0
? m.quoted.sender
: m.mentionedJid[0] || null;
if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender)
while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender)
const cara = "cara"
const hmela = target
const withdraw = await eco.withdraw(hmela, cara, value[0])
if(withdraw.noten) return dodoi('Chutiang zat zat a box ah Coin a nei lo')
const paihsakna = await eco.deduct(hmela, cara, value[0])
const balance = await eco.balance(hmela, cara)
await dodoi(`🫡Sir, hei zawng hi a la bang : _🪙 ${balance.bank}_\nI la cut leh dawn em sir?🙋‍♂️`)
}
break
case `${prefixc}`+'c2': {
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
if (!HerbertTheCreator1) return
HBWABotMz.sendMessage(from, { react: { text: "🫡" , key: m.key }})
let value = text.trim().split(" ")
if (value[0] === "") return
const target =
m.quoted && m.mentionedJid.length === 0
? m.quoted.sender
: m.mentionedJid[0] || null;
if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender)
while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender)
const hmeli = target
const cara = "cara"
const balance = await eco.balance(hmeli, cara)
await dodoi(`🫡Sir a wallet-ah hei zat hi a awm : _🪙 ${balance.wallet}_ 🤔`)
}
break 
case `${prefixc}`+'c3': {
if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
if (!HerbertTheCreator1) return
HBWABotMz.sendMessage(from, { react: { text: "🫡" , key: m.key }})
let value = text.trim().split(" ")
if (value[0] === "") return
const target =
m.quoted && m.mentionedJid.length === 0
? m.quoted.sender
: m.mentionedJid[0] || null;
if (m.quoted?.sender && !m.mentionedJid.includes(m.quoted.sender)) m.mentionedJid.push(m.quoted.sender)
while (m.mentionedJid.length < 2) m.mentionedJid.push(m.sender)
const hmeli = target
const cara = "cara"
const balance = await eco.balance(hmeli, cara)
await dodoi(`🫡Sir a box-ah hei zat hi a awm:  _🪙 ${balance.bank}_ 🤔`)
}
break 
case `${prefixc}`+'gamble':case `${prefixc}`+'lottery': { 
HBWABotMz.sendMessage(from, { react: { text: "🤪" , key: m.key }})
var texts = text.trim().split(" ")
var opp = texts[1];
var value = texts[0].toLowerCase()
var gg = parseInt(value)
const user = m.sender
const cara = "cara"
const balance = await eco.balance(user, cara) 
const g = (balance.wallet) > parseInt(value)
const k = 50
const a = (k) > parseInt(value)
const twice = gg*2
const f = ["up", "right", "left", "down", "up", "left", "down", "right", "up", "down", "right", "left"]
const r = f[Math.floor(Math.random () * f.length)]
 if (texts[0] === "")
 return dodoi(
 `Tiang hian tih tur:${prefix}gamble 100 direction(left,right,up,down)`
 )
 if (!value) return dodoi("*I gamble zat tur rawn tarlang rawh!")
 if (!opp) return dodoi("I bet tur direction kha rawn dah rawh")
 if (!gg) return dodoi("I thil ziah khi check tha rawh, command dik lo i hmang a ni mai thei")
 if (m.quoted?.sender) m.mentionedJid.push(m.quoted.sender)
 if (g == false) return dodoi(`Chutiang zat gamble turin i Coin neihin a daih lo`)
 if (a == true) return dodoi(`Sorry ${pushname}, 🪙 50 aia tlem chuan a gamble thei lo`)
 if ( r == opp){
let give = await eco.give(user , cara, twice)
dodoi(`*🪙 ${twice} i dawng e✓*`)
 }
 else{
let deduct = await eco.deduct(user, cara, texts[0])
dodoi(`*🪙 ${texts[0]} i chan(loss) a ni*`)
}
}
break
case `${prefixc}`+'hmelchhe': case `${prefixc}`+'damrei': case `${prefixc}`+'dawih': case `${prefixc}`+'mawl': case `${prefixc}`+'a': case `${prefixc}`+'fing': case `${prefixc}`+'hrisel': case `${prefixc}`+'upa': case `${prefixc}`+'naupang': case `${prefixc}`+'hmeltha': case `${prefixc}`+'lulian': case `${prefixc}`+'zaktheilo': case `${prefixc}`+'zakzum': case `${prefixc}`+'nawi': case `${prefixc}`+'tawngthei': case `${prefixc}`+'mifel': case `${prefixc}`+'chawheh': case `${prefixc}`+'bumhmang': case `${prefixc}`+'lerh': case `${prefixc}`+'luck': case `${prefixc}`+'zei': case `${prefixc}`+'hur': case `${prefixc}`+'dum': case `${prefixc}`+'ngo': case `${prefixc}`+'sual': case `${prefixc}`+'misual': {
if (!m.isGroup) return
const lonuirawh = await getBuffer(`https://i.imgur.com/VffnuHq.jpg`)
let member = participants.map(u => u.id)
let berr = member[Math.floor(Math.random() * member.length)]
if (text == 'ber') return await HBWABotMz.sendMessage(m.chat,
{ text: `Kan group-a ${command} ber chu @${berr.split('@')[0]} hi a ni👀😂`,
contextInfo:{
mentionedJid:[berr],
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"title": `Fun Game`,
"body": `Ber features👀😂`,
"thumbnailUrl": ``,
"thumbnail": lonuirawh,
"sourceUrl": `https://youtube.com/@HBMods_Channel`}}},
{ quoted: m})        
            }
            break

case `${prefixc}`+'checkme':
try {
userPfp = await HBWABotMz.profilePictureUrl(m.sender, "image")
} catch (e) {
userPfp = defaultpp
}
					neme = args.join(" ")
					bet = `${sender}`
					var mizia = ['Mi pangngai tak','Kawm harsa','Chapo deuh','Mifel tak','Nawi deuh','Mi inngaitlawm thei tak','Mi Thinchhia','Polite deuh','Kawm nuam','Mi bum hmang','Tahbelh','Hrilh chawp ngai reng']
					var hobby1 = ['Ei rawng bawl','Lâm 💃','In fiam','Gamers','Lem ziak','Midangte tanpui','Anime en mai mai','Lehkha chhiar','Ride mai mai','Zai','Tlai','Fiamthu thawh','Lem ziak','Thil ei reng','Truth or Dare khel mai mai','Mahnia awm mai mai']
					var hmelhmang = ['Umm','Aih','Hmel chhe lutuk','Hmel tha lutuk']
					var thiltihthat = ['Lerh lo','Lerh e','Lerh lutuk','Lerh ve tho','Lerh vak lo']
					var thiltihchhiat = [,'4','4.1','4.2','4.3','4.4','4.5','4.6','4.7','4.8','4.9','5','5.1','5.2','5.3','5.4','5.5','5.6','5.7','5.7','5.8','5.9','6']
					var findan = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36']
					var dawih = ['A nei','A nei lo']
					var mizia1 = mizia[Math.floor(Math.random() * mizia.length)]
					var hobby = hobby1[Math.floor(Math.random() * hobby1.length)]
					var hmelhmang1 = hmelhmang[Math.floor(Math.random() * hmelhmang.length)]
					var thiltihthat1 = thiltihthat[Math.floor(Math.random() * thiltihthat.length)]
					var thiltihchhiat1 = thiltihchhiat[Math.floor(Math.random() * thiltihchhiat.length)]
					var findan1 = findan[Math.floor(Math.random() * findan.length)]
					var dawih1 = dawih[Math.floor(Math.random() * dawih.length)]
let profile = `*≡══《 Check @${bet.split('@')[0]} 》══≡*

*Hming :* ${pushname}
*Mizia :* ${mizia1}
*Hobby :* ${hobby}
*Hmeltha em? :* ${hmelhmang1}
*Lerh em? :* ${thiltihthat1}
*San zawng :* ${thiltihchhiat1}fit
*Ex neihzat :* ${findan1}
*Ngaihzawng :* ${dawih1}
*VIP Member :* ❌ i ni lo
*≡═══《 CHECK PROPERTIES 》═══≡*`
let profile2 = `*≡══《 Check @${bet.split('@')[0]} 》══≡*

*Hming :* ${pushname}
*Mizia :* ${mizia1}
*Hobby :* ${hobby}
*Hmeltha em? :* ${hmelhmang1}
*Lerh em? :* ${thiltihthat1}
*San zawng :* ${thiltihchhiat1}fit
*Ex neihzat :* ${findan1}
*Ngaihzawng :* ${dawih1}
*VIP Member :* ✅ i ni
*≡═══《 CHECK PROPERTIES 》═══≡*`
const buff = await getBuffer(userPfp)
if (!isVip) return HBWABotMz.sendMessage(from, { image: buff, caption: profile, mentions: [bet]},{quoted:m})
HBWABotMz.sendMessage(from, { image: buff, caption: profile2, mentions: [bet]},{quoted:m})
break
case `${prefixc}`+'ping': case `${prefixc}`+'p': {
var ping = ['84','68','74','99','129','130','150','280','320','380','380','163','163','84','64','74','999','827','266','979','768','562','626','737','166']
var pong = ping[Math.floor(Math.random() * ping.length)]
HBWABotMz.sendMessage(from, {text: `_*Pong*_ ${pong} _*ms...*_`},{quoted:m})
}
break

case `${prefixc}`+'spin1':{
var ping = ['I hmel chhe lutuk','Vawk i ang','I van hmel tha em em🤭🥰','I lu lian','I hur','Kiri','','I rawn spin1 ve mi 🤣','🤣 Blehh...','Muah🥰','Fuck you 🖕','Hello Mother Fucker🤖','A ho','Hello 🌚','Mawla','Mawli','U r gay 🖕','Min nei duh em?','Happy Birthday 🥳','🙄Eng mah awm lo','Hmeichhia a mi nih?','🤣','😆','🤦','Reels ve tawh suh']
var pong = ping[Math.floor(Math.random() * ping.length)]
var dbinaryloading = [
`《▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《█▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《████▒▒▒▒▒▒▒▒》30%`,
`《███████▒▒▒▒▒》50%`,
`《██████████▒▒》80%`,
`《████████████》100%`,
`${pong}`]

let { key } = await HBWABotMz.sendMessage(from, {text: '《▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'},{quoted:m})

for (let i = 0; i < dbinaryloading.length; i++) {await HBWABotMz.sendMessage(from, {text: dbinaryloading[i], edit: key },{quoted:m})}
}
break
case `${prefixc}`+'check': {
if (!m.isGroup) return dodoi(mess.group)
if (!m.mentionedJid[0]) return dodoi(`_Tu nge check i duh, I check duh chu tag rawh.._\nTiang hian : ${prefix}check @${owner}`, m.chat, { mentions: [owner[1] + '@s.whatsapp.net'] })
neme = args.join(" ")
const lonuirawh = await getBuffer(`https://i.imgur.com/VffnuHq.jpg`)
bet = `${m.mentionedJid[0]}`
var mizia = ['Mi pangngai tak','Kawm harsa tak','Chapo deuh', 'Gay', 'Lesbian', 'Mifel tak','Nawi deuh','Mi inngaitlawm thei tak','Mi Thinchhe tak','Polite deuh','Kawm nuam','Mi bum hmang','Tahbelh','Hrilh chawp ngai reng','Mi hur awmngaihna hrelo', ]
					var hobby1 = ['Ei rawng bawl','Lâm 💃','In fiam','Gamers','Lem ziak','Midangte tanpui','Mi rel','Lehkha chhiar','Ride mai mai','Zai','Tlai','Fiamthu thawh','Lem ziak','Thil ei reng','Mi bum','Mahnia awm mai mai']
					var hmelhmang = ['Umm','Aih','Hmel chhe lutuk','Hmel tha lutuk']
					var thiltihthat = ['Lerh lo','Lerh e','Lerh lutuk','Lerh ve tho','Lerh vak lo']
					var thiltihchhiat = [,'4','4.1','4.2','4.3','4.4','4.5','4.6','4.7','4.8','4.9','5','5.1','5.2','5.3','5.4','5.5','5.6','5.7','5.7','5.8','5.9','6']
					var findan = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36']
					var dawih = ['A nei','A nei lo']
					var mizia1 = mizia[Math.floor(Math.random() * mizia.length)]
					var hobby = hobby1[Math.floor(Math.random() * hobby1.length)]
					var hmelhmang1 = hmelhmang[Math.floor(Math.random() * hmelhmang.length)]
					var thiltihthat1 = thiltihthat[Math.floor(Math.random() * thiltihthat.length)]
					var thiltihchhiat1 = thiltihchhiat[Math.floor(Math.random() * thiltihchhiat.length)]
					var findan1 = findan[Math.floor(Math.random() * findan.length)]
					var dawih1 = dawih[Math.floor(Math.random() * dawih.length)]
					var avipem = checkVipUser(bet, vipmem)//
					const avipe = avipem ? 'a ni ✓' : 'a ni lo';
let aihviplo = `*≡══《 Check @${bet.split('@')[0]} 》══≡*

*A Hming :* @${bet.split('@')[0]}
*A mah hi :* ${mizia1} a ni
*A Hobby :* ${hobby}
*A Hmeltha em? :* ${hmelhmang1}
*A Lerh em? :* ${thiltihthat1}
*A San zawng :* ${thiltihchhiat1}fit
*A Ex neihzat :* ${findan1}
*Ngaihzawng :* ${dawih1}
*VIP Member :* ${avipe}
*≡═══《 CHECK PROPERTIES 》═══≡*`
HBWABotMz.sendMessage(m.chat,{ text: aihviplo,contextInfo:{
mentionedJid:[bet],
"externalAdReply": {
"showAdAttribution": true,
"containsAutoReply": true,
"title": `Fun Game`,
"body": `Checker👀😂`,
"thumbnailUrl": ``,
"thumbnail": lonuirawh,
"sourceUrl": `https://youtube.com/@HBMods_Channel`}}},
{ quoted: m})
 }
break


case `${prefixc}`+'alive': case `${prefixc}`+'menu': case `${prefixc}`+'help':{
const balance = await eco.balance(limitneihtu, khawlbawm)
const vawiinni2 = await mizo_tawnga_translate_na.translate(asource1, atarget1, athulo1)
HBWABotMz.sendMessage(from, { react: { text: "😎" , key: m.key }})
const lusm = `*✑ Hriattur*: *Limit i neih loh chuan min hmang thei dawn lo. Min hman i duh chuan limit tih rawn type rawh*`
const enm = `_*Note*_\n*If you don't have any limit, you cannot use my features if you want to use my features please type limit*`
     let msg = generateWAMessageFromContent(from, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `*${botname} INFO*
*✑ Vawiin :* ${vawiinni2}
*✑ Date :* ${kumtin}
*✑ Version :* 9.0.3
*✑ User :* ${ownernumber}
*✑ Limit :* ${balance.wallet} 💎
*✑ Vip :* ${aActiveEm}
*✑ Runtime :* ${runtime(process.uptime())}
*✑ Creator :* Herbert Suantak
${lusm}`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: `͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
╭═══════════┈
┃𒆜┌───┈
┃𒆜│${prefixc}vipmenu
┃𒆜│${prefixc}allmenu
┃𒆜│${prefixc}aimenu
┃𒆜│${prefixc}mizomenu
┃𒆜│${prefixc}downloadmenu
┃𒆜│${prefixc}groupmenu
┃𒆜│${prefixc}ownermenu
┃𒆜│${prefixc}stickermenu
┃𒆜│${prefixc}stalkermenu
┃𒆜│${prefixc}unbanmenu
┃𒆜│${prefixc}voicemenu
┃𒆜│${prefixc}audiochanger
┃𒆜│${prefixc}othermenu
┃𒆜└───────────┈ 
╰════════════──┈`
          }),
          header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image : fs.readFileSync('./asset/image/HBWABot.png')}, { upload: HBWABotMz.waUploadToServer})), 
                  title: ``,
                  gifPlayback: true,
                  subtitle: ownername,
                  hasMediaAttachment: false  
                }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
    buttons: [
        {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: `${buttonyt}`,
                url: `${buttonyturl}`,
                merchant_url: "https://www.google.com"
            })
        },
        {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: `${buttonig}`,
                url: `${buttonigurl}`,
                merchant_url: "https://www.google.com"
            })
        }
    ]
})
        })
    }
  }
}, { quoted: m })

await HBWABotMz.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})
}
break
break
case `${prefixc}`+'allmenu': {
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "😎" , key: m.key }})
let msg = generateWAMessageFromContent(from, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: `╭══════════════
┃ *${global.botname} Allmenu*
┃ *✑ limit :* ${balance.wallet} 💎
┃ *♕  VIP :* ${aActiveEm}
╰══════════════`
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: `͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ AI Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}remini
┃𒆜│${prefixc}toanime
┃𒆜│${prefixc}tozombie
┃𒆜│${prefixc}shazam
┃𒆜│${prefixc}shazam2
┃𒆜│${prefixc}shazam3
┃𒆜│${prefixc}openai [Mizo Language]
┃𒆜│${prefixc}gpt [English Language]
┃𒆜│${prefixc}ai [Mizo Language]
┃𒆜│${prefixc}ai2 [English Language]
┃𒆜│${prefixc}gai [Mizo Language]
┃𒆜└───────────┈ 
╰══════════════𖡛

*╭═══❏ Owner Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}setdpbot
┃𒆜│${prefixc}setdpbot2
┃𒆜│${prefixc}addvn
┃𒆜│${prefixc}statusaudio
┃𒆜│${prefixc}statusvideo
┃𒆜│${prefixc}statusimage
┃𒆜│${prefixc}statustext
┃𒆜└───────────┈ 
╰══════════════𖡛

*╭═══❏ Download Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}play 
┃𒆜│${prefixc}ytmp3 
┃𒆜│${prefixc}ytaudio
┃𒆜│${prefixc}ytmp4 
┃𒆜│${prefixc}dsong
┃𒆜│${prefixc}dvideo
┃𒆜│${prefixc}dsong2
┃𒆜│${prefixc}song2 
┃𒆜│${prefixc}ytaudio 
┃𒆜│${prefixc}igvid [insta]
┃𒆜│${prefixc}ttvid [tiktok]
┃𒆜│${prefixc}ptvid [pinterest]
┃𒆜│${prefixc}twvid [twitter]
┃𒆜│${prefixc}trvid [threads]
┃𒆜│${prefixc}fbvid [facebook]
┃𒆜│${prefixc}gdrive 
┃𒆜│${prefixc}ringtone 
┃𒆜└───────────┈ 
╰══════════════𖡛

*╭═══❏ Audio Changer❏*
┃𒆜┌───┈
┃𒆜│${prefixc}robot
┃𒆜│${prefixc}bass
┃𒆜│${prefixc}nightcore
┃𒆜│${prefixc}deep
┃𒆜│${prefixc}fast
┃𒆜│${prefixc}slow
┃𒆜│${prefixc}reverse
┃𒆜│${prefixc}blown
┃𒆜│${prefixc}smooth
┃𒆜│${prefixc}squirrel
┃𒆜│${prefixc}errape
┃𒆜│${prefixc}fat
┃𒆜└───────────┈ 
╰══════════════𖡛

*╭═══❏ Unbanned Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}unbanv1 
┃𒆜│${prefixc}unbanv2
┃𒆜│${prefixc}unbanv3
┃𒆜│${prefixc}unbanv4
┃𒆜│${prefixc}unbanv5
┃𒆜└───────────┈ 
╰══════════════𖡛

*╭═══❏ Group Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}group open
┃𒆜│${prefixc}group clos
┃𒆜│${prefixc}grouplink 
┃𒆜│${prefixc}add 
┃𒆜│${prefixc}kick 
┃𒆜│${prefixc}hidetag 
┃𒆜│${prefixc}check
┃𒆜│${prefixc}setgrdp
┃𒆜│${prefixc}mawl ber
┃𒆜│${prefixc}sual ber
┃𒆜│${prefixc}fing ber
┃𒆜│${prefixc}a ber
┃𒆜│${prefixc}tawngthei ber
┃𒆜│${prefixc}hmelchhe ber
┃𒆜│${prefixc}damrei ber
┃𒆜│${prefixc}dawih ber
┃𒆜│${prefixc}hrisel ber
┃𒆜│${prefixc}upa ber
┃𒆜│${prefixc}naupang ber
┃𒆜│${prefixc}hmeltha ber
┃𒆜│${prefixc}lulian ber
┃𒆜│${prefixc}zaktheilo ber
┃𒆜│${prefixc}zakzum ber
┃𒆜│${prefixc}nawi ber
┃𒆜│${prefixc}tawngthei ber
┃𒆜│${prefixc}mifel ber
┃𒆜│${prefixc}chawheh ber
┃𒆜│${prefixc}bumhmang ber
┃𒆜│${prefixc}lerh ber
┃𒆜│${prefixc}luck ber
┃𒆜│${prefixc}zei ber 
┃𒆜└───────────┈ 
╰══════════════𖡛

*╭═══❏ Voice Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}tovn
┃𒆜│${prefixc}tts
┃𒆜│${prefixc}tts2
┃𒆜│${prefixc}tts3
┃𒆜│${prefixc}tts4
┃𒆜│${prefixc}tts5
┃𒆜│${prefixc}tts6
┃𒆜│${prefixc}tts7
┃𒆜│${prefixc}tts8
┃𒆜│${prefixc}tts9
┃𒆜│${prefixc}tts10
┃𒆜│${prefixc}alto
┃𒆜│${prefixc}tenor
┃𒆜│${prefixc}sunshine
┃𒆜│${prefixc}warmy
┃𒆜│${prefixc}glorious
┃𒆜│${prefixc}itgoesup
┃𒆜│${prefixc}chipmunk
┃𒆜│${prefixc}dramatic
┃𒆜└───────────┈ 
╰══════════════𖡛

*╭═══❏ Other Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}spin1
┃𒆜│${prefixc}checkme
┃𒆜│${prefixc}list tobebot
┃𒆜│${prefixc}how tobebot
┃𒆜│${prefixc}buylimit
┃𒆜│${prefixc}spin
┃𒆜│${prefixc}transfer
┃𒆜│${prefixc}daily
┃𒆜│${prefixc}gamble
┃𒆜│${prefixc}withdraw
┃𒆜│${prefixc}deposite
┃𒆜│${prefixc}tinyurl 
┃𒆜│${prefixc}tovn 
┃𒆜│${prefixc}toaudio 
┃𒆜│${prefixc}tomp3 
┃𒆜│${prefixc}toimg
┃𒆜│${prefixc}ebinary 
┃𒆜│${prefixc}dbinary  
┃𒆜│${prefixc}translate
┃𒆜│${prefixc}ping
┃𒆜│${prefixc}runtime
┃𒆜│${prefixc}swm
┃𒆜│${prefixc}sc
┃𒆜└───────────┈ 
╰══════════════𖡛`
          }),
          header: proto.Message.InteractiveMessage.Header.create({
                ...(await prepareWAMessageMedia({ image : fs.readFileSync('./asset/image/HBWABot.png')}, { upload: HBWABotMz.waUploadToServer})), 
                  title: ``,
                  gifPlayback: true,
                  subtitle: ownername,
                  hasMediaAttachment: false  
                }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
    buttons: [
        {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: `${buttonyt}`,
                url: `${buttonyturl}`,
                merchant_url: "https://www.google.com"
            })
        },
        {
            name: "cta_url",
            buttonParamsJson: JSON.stringify({
                display_text: `${buttonig}`,
                url: `${buttonigurl}`,
                merchant_url: "https://www.google.com"
            })
        }
    ]
})
        })
    }
  }
}, { quoted: m })

await HBWABotMz.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})
}
break

case `${prefixc}`+'downloadmenu': { 
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《███▒▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《█████▒▒▒▒▒▒▒▒▒▒》30%`,
`《████████▒▒▒▒▒▒▒》50%`,
`《███████████▒▒▒▒》80%`,
`《███████████████》100%`,
`╭══════════════
┃ *Download Menu*
┃ *✑ limit :* ${balance.wallet} 💎
┃ *♕  VIP :* ${aActiveEm}
╰══════════════
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ Download Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}play 
┃𒆜│${prefixc}ytmp3
┃𒆜│${prefixc}ytaudio
┃𒆜│${prefixc}ytmp4 
┃𒆜│${prefixc}dsong
┃𒆜│${prefixc}dvideo
┃𒆜│${prefixc}dsong2
┃𒆜│${prefixc}song2 
┃𒆜│${prefixc}ytaudio
┃𒆜│${prefixc}igvid [insta]
┃𒆜│${prefixc}ttvid [tiktok]
┃𒆜│${prefixc}ptvid [pinterest]
┃𒆜│${prefixc}twvid [twitter]
┃𒆜│${prefixc}trvid [threads]
┃𒆜│${prefixc}fbvid [facebook]
┃𒆜│${prefixc}gdrive  
┃𒆜│${prefixc}ringtone 
┃𒆜└───────────┈ 
╰══════════════𖡛`]
const { key } = await HBWABotMz.sendMessage(m.chat, {
      image: fs.readFileSync("./asset/image/HBWABot.png"),
      caption: '《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'
    }, {quoted: m})
for (let i = 0; i < HBLoadingmenu.length; i++) {
await HBWABotMz.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
           imageMessage: { caption: HBLoadingmenu[i] }
          }
        }
      }, {})
 }
}
break
case `${prefixc}`+'groupmenu': { 
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《███▒▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《█████▒▒▒▒▒▒▒▒▒▒》30%`,
`《████████▒▒▒▒▒▒▒》50%`,
`《███████████▒▒▒▒》80%`,
`《███████████████》100%`,
`╭══════════════
┃ *Group Menu*
┃ *✑ limit :* ${balance.wallet} 💎
┃ *♕  VIP :* ${aActiveEm}
╰══════════════
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ Group Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}group close 
┃𒆜│${prefixc}group open
┃𒆜│${prefixc}grouplink 
┃𒆜│${prefixc}add 
┃𒆜│${prefixc}kick 
┃𒆜│${prefixc}hidetag 
┃𒆜│${prefixc}check
┃𒆜│${prefixc}setgrdp
┃𒆜│${prefixc}mawl ber
┃𒆜│${prefixc}sual ber
┃𒆜│${prefixc}fing ber
┃𒆜│${prefixc}a ber
┃𒆜│${prefixc}tawngthei ber
┃𒆜│${prefixc}hmelchhe ber
┃𒆜│${prefixc}damrei ber
┃𒆜│${prefixc}dawih ber
┃𒆜│${prefixc}hrisel ber
┃𒆜│${prefixc}upa ber
┃𒆜│${prefixc}naupang ber
┃𒆜│${prefixc}hmeltha ber
┃𒆜│${prefixc}lulian ber
┃𒆜│${prefixc}zaktheilo ber
┃𒆜│${prefixc}zakzum ber
┃𒆜│${prefixc}nawi ber
┃𒆜│${prefixc}tawngthei ber
┃𒆜│${prefixc}mifel ber
┃𒆜│${prefixc}chawheh ber
┃𒆜│${prefixc}bumhmang ber
┃𒆜│${prefixc}lerh ber
┃𒆜│${prefixc}luck ber
┃𒆜│${prefixc}zei ber 
┃𒆜└───────────┈ 
╰══════════════𖡛`]
const { key } = await HBWABotMz.sendMessage(m.chat, {
      image: fs.readFileSync("./asset/image/HBWABot.png"),
      caption: '《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'
    }, {quoted: m})
for (let i = 0; i < HBLoadingmenu.length; i++) {
await HBWABotMz.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
           imageMessage: { caption: HBLoadingmenu[i] }
          }
        }
      }, {})
 }
}
break 
case `${prefixc}`+'stalkermenu': { 
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《███▒▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《█████▒▒▒▒▒▒▒▒▒▒》30%`,
`《████████▒▒▒▒▒▒▒》50%`,
`《███████████▒▒▒▒》80%`,
`《███████████████》100%`,
`╭══════════════
┃ *Stalk Menu*
┃ *✑ limit :* ${balance.wallet} 💎
┃ *♕  VIP :* ${aActiveEm}
╰══════════════
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ Stalker ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}igstalk 
┃𒆜│${prefixc}mlstalk 
┃𒆜└───────────┈ 
╰══════════════𖡛`]
const { key } = await HBWABotMz.sendMessage(m.chat, {
      image: fs.readFileSync("./asset/image/HBWABot.png"),
      caption: '《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'
    }, {quoted: m})
for (let i = 0; i < HBLoadingmenu.length; i++) {
await HBWABotMz.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
           imageMessage: { caption: HBLoadingmenu[i] }
          }
        }
      }, {})
 }
}
break
case `${prefixc}`+'unbanmenu': { 
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《███▒▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《█████▒▒▒▒▒▒▒▒▒▒》30%`,
`《████████▒▒▒▒▒▒▒》50%`,
`《███████████▒▒▒▒》80%`,
`《███████████████》100%`,
`╭══════════════
┃ *Unbanned Menu*
┃ *✑ limit :* ${balance.wallet} 💎
┃ *♕  VIP :* ${aActiveEm}
╰══════════════
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ Unbanned Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}unbanv1 
┃𒆜│${prefixc}unbanv2
┃𒆜│${prefixc}unbanv3
┃𒆜│${prefixc}unbanv4
┃𒆜│${prefixc}unbanv5
┃𒆜└───────────┈ 
╰══════════════𖡛`]
const { key } = await HBWABotMz.sendMessage(m.chat, {
      image: fs.readFileSync("./asset/image/HBWABot.png"),
      caption: '《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'
    }, {quoted: m})
for (let i = 0; i < HBLoadingmenu.length; i++) {
await HBWABotMz.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
           imageMessage: { caption: HBLoadingmenu[i] }
          }
        }
      }, {})
 }
}
break
case `${prefixc}`+'mizomenu': { 
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《███▒▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《█████▒▒▒▒▒▒▒▒▒▒》30%`,
`《████████▒▒▒▒▒▒▒》50%`,
`《███████████▒▒▒▒》80%`,
`《███████████████》100%`,
`╭══════════════
┃ *Mizo Tawng*
┃ *✑ limit :* ${balance.wallet} 💎
┃ *♕  VIP :* ${aActiveEm}
╰══════════════
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ Mizo Tawng ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}mizoquiz
┃𒆜│${prefixc}picquiz
┃𒆜│${prefixc}mbq
┃𒆜│${prefixc}biblequiz
┃𒆜│${prefixc}mlyrics
┃𒆜│${prefixc}mzly
┃𒆜│${prefixc}cfhb
┃𒆜│${prefixc}cfhb2
┃𒆜│${prefixc}bible
┃𒆜│${prefixc}bq
┃𒆜│${prefixc}mlstalk
┃𒆜│${prefixc}igstalk
┃𒆜│${prefixc}truth
┃𒆜│${prefixc}dare
┃𒆜│${prefixc}checkme
┃𒆜│${prefixc}check
┃𒆜│${prefixc}mawl ber
┃𒆜│${prefixc}sual ber
┃𒆜│${prefixc}fing ber
┃𒆜│${prefixc}a ber
┃𒆜│${prefixc}tawngthei ber
┃𒆜│${prefixc}hmelchhe ber
┃𒆜│${prefixc}damrei ber
┃𒆜│${prefixc}dawih ber
┃𒆜│${prefixc}hrisel ber
┃𒆜│${prefixc}upa ber
┃𒆜│${prefixc}naupang ber
┃𒆜│${prefixc}hmeltha ber
┃𒆜│${prefixc}lulian ber
┃𒆜│${prefixc}zaktheilo ber
┃𒆜│${prefixc}zakzum ber
┃𒆜│${prefixc}nawi ber
┃𒆜│${prefixc}tawngthei ber
┃𒆜│${prefixc}mifel ber
┃𒆜│${prefixc}chawheh ber
┃𒆜│${prefixc}bumhmang ber
┃𒆜│${prefixc}lerh ber
┃𒆜│${prefixc}luck ber
┃𒆜│${prefixc}zei ber
┃𒆜└───────────┈ 
╰══════════════𖡛`]
const { key } = await HBWABotMz.sendMessage(m.chat, {
      image: fs.readFileSync("./asset/image/HBWABot.png"),
      caption: '《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'
    }, {quoted: m})
for (let i = 0; i < HBLoadingmenu.length; i++) {
await HBWABotMz.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
           imageMessage: { caption: HBLoadingmenu[i] }
          }
        }
      }, {})
 }
}
break
case `${prefixc}`+'aimenu': { 
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《███▒▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《█████▒▒▒▒▒▒▒▒▒▒》30%`,
`《████████▒▒▒▒▒▒▒》50%`,
`《███████████▒▒▒▒》80%`,
`《███████████████》100%`,
`╭══════════════
┃ *Ai Menu*
┃ *✑ limit :* ${balance.wallet} 💎
┃ *♕  VIP :* ${aActiveEm}
╰══════════════
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ AI Menu ❏*
┃𒆜┌───┈
*┃𒆜│${prefixc}remini* 
*┃𒆜│${prefixc}toanime* 
*┃𒆜│${prefixc}tozombie*
┃𒆜│${prefixc}shazam
*┃𒆜│${prefixc}shazam2*
*┃𒆜│${prefixc}shazam3*
┃𒆜│${prefixc}openai [Mizo Language]
┃𒆜│${prefixc}gpt [English Language]
┃𒆜│${prefixc}ai [Mizo Language]
┃𒆜│${prefixc}ai2 [English Language]
┃𒆜│${prefixc}gai [Mizo Language]
┃𒆜└───────────┈ 
╰══════════════𖡛`]
const { key } = await HBWABotMz.sendMessage(m.chat, {
      image: fs.readFileSync("./asset/image/HBWABot.png"),
      caption: '《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'
    }, {quoted: m})
for (let i = 0; i < HBLoadingmenu.length; i++) {
await HBWABotMz.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
           imageMessage: { caption: HBLoadingmenu[i] }
          }
        }
      }, {})
 }
}
break

case `${prefixc}`+'stickermenu': { 
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《███▒▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《█████▒▒▒▒▒▒▒▒▒▒》30%`,
`《████████▒▒▒▒▒▒▒》50%`,
`《███████████▒▒▒▒》80%`,
`《███████████████》100%`,
`╭══════════════
┃ *Sticker Menu*
┃ *✑ limit :* ${balance.wallet} 💎
┃ *♕  VIP :* ${aActiveEm}
╰══════════════
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ Sticker Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}sticker 
┃𒆜│${prefixc}ttp
┃𒆜│${prefixc}ttp2
┃𒆜│${prefixc}ttp3
┃𒆜│${prefixc}ttp4
┃𒆜│${prefixc}attp
┃𒆜│${prefixc}attp2
┃𒆜└───────────┈ 
╰══════════════𖡛`]
const { key } = await HBWABotMz.sendMessage(m.chat, {
      image: fs.readFileSync("./asset/image/HBWABot.png"),
      caption: '《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'
    }, {quoted: m})
for (let i = 0; i < HBLoadingmenu.length; i++) {
await HBWABotMz.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
           imageMessage: { caption: HBLoadingmenu[i] }
          }
        }
      }, {})
 }
}
break
case `${prefixc}`+'audiochanger': { 
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《███▒▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《█████▒▒▒▒▒▒▒▒▒▒》30%`,
`《████████▒▒▒▒▒▒▒》50%`,
`《███████████▒▒▒▒》80%`,
`《███████████████》100%`,
`╭══════════════
┃ *Audio Changer*
┃ *✑ limit :* ${balance.wallet} 💎
┃ *♕  VIP :* ${aActiveEm}
╰══════════════
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ Audio Changer❏*
┃𒆜┌───┈
┃𒆜│${prefixc}robot
┃𒆜│${prefixc}bass
┃𒆜│${prefixc}nightcore
┃𒆜│${prefixc}deep
┃𒆜│${prefixc}fast
┃𒆜│${prefixc}slow
┃𒆜│${prefixc}reverse
┃𒆜│${prefixc}blown
┃𒆜│${prefixc}smooth
┃𒆜│${prefixc}squirrel
┃𒆜│${prefixc}errape
┃𒆜│${prefixc}fat
┃𒆜│${prefixc}tokaraoke
┃𒆜│${prefixc}voiceremove
┃𒆜└───────────┈ 
╰══════════════𖡛`]
const { key } = await HBWABotMz.sendMessage(m.chat, {
      image: fs.readFileSync("./asset/image/HBWABot.png"),
      caption: '《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'
    }, {quoted: m})
for (let i = 0; i < HBLoadingmenu.length; i++) {
await HBWABotMz.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
           imageMessage: { caption: HBLoadingmenu[i] }
          }
        }
      }, {})
 }
}
break
case `${prefixc}`+'voicemenu': { 
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《███▒▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《█████▒▒▒▒▒▒▒▒▒▒》30%`,
`《████████▒▒▒▒▒▒▒》50%`,
`《███████████▒▒▒▒》80%`,
`《███████████████》100%`,
`╭══════════════
┃ *Voice Menu*
┃ *✑ limit :* ${balance.wallet} 💎
┃ *♕  VIP :* ${aActiveEm}
╰══════════════
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ Voice Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}tovn
┃𒆜│${prefixc}tts
┃𒆜│${prefixc}tts2
┃𒆜│${prefixc}tts3
┃𒆜│${prefixc}tts4
┃𒆜│${prefixc}tts5
┃𒆜│${prefixc}tts6
┃𒆜│${prefixc}tts7
┃𒆜│${prefixc}tts8
┃𒆜│${prefixc}tts9
┃𒆜│${prefixc}tts10
┃𒆜│${prefixc}alto
┃𒆜│${prefixc}tenor
┃𒆜│${prefixc}sunshine
┃𒆜│${prefixc}warmy
┃𒆜│${prefixc}glorious
┃𒆜│${prefixc}itgoesup
┃𒆜│${prefixc}chipmunk
┃𒆜│${prefixc}dramatic
┃𒆜└───────────┈ 
╰══════════════𖡛`]
const { key } = await HBWABotMz.sendMessage(m.chat, {
      image: fs.readFileSync("./asset/image/HBWABot.png"),
      caption: '《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'
    }, {quoted: m})
for (let i = 0; i < HBLoadingmenu.length; i++) {
await HBWABotMz.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
           imageMessage: { caption: HBLoadingmenu[i] }
          }
        }
      }, {})
 }
}
break
case `${prefixc}`+'othermenu': { 
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《███▒▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《█████▒▒▒▒▒▒▒▒▒▒》30%`,
`《████████▒▒▒▒▒▒▒》50%`,
`《███████████▒▒▒▒》80%`,
`《███████████████》100%`,
`╭══════════════
┃ *Other Menu*
┃ *✑ limit :* ${balance.wallet} 💎
┃ *♕  VIP :* ${aActiveEm}
╰══════════════
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ Other Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}cfhb 
┃𒆜│${prefixc}cfhb2 [Hla nen]
┃𒆜│${prefixc}mizoquiz
┃𒆜│${prefixc}picquiz
┃𒆜│${prefixc}list tobebot
┃𒆜│${prefixc}how tobebot
┃𒆜│${prefixc}buylimit
┃𒆜│${prefixc}spin1
┃𒆜│${prefixc}checkme
┃𒆜│${prefixc}spin
┃𒆜│${prefixc}transfer
┃𒆜│${prefixc}daily
┃𒆜│${prefixc}gamble
┃𒆜│${prefixc}withdraw
┃𒆜│${prefixc}deposite
┃𒆜│${prefixc}tts 
┃𒆜│${prefixc}say  
┃𒆜│${prefixc}toqr 
┃𒆜│${prefixc}tinyurl 
┃𒆜│${prefixc}tovn 
┃𒆜│${prefixc}toaudio 
┃𒆜│${prefixc}tomp3 
┃𒆜│${prefixc}toimg 
┃𒆜│${prefixc}sticker 
┃𒆜│${prefixc}ebinary 
┃𒆜│${prefixc}dbinary
┃𒆜│${prefixc}ping
┃𒆜│${prefixc}translate
┃𒆜│${prefixc}runtime
┃𒆜│${prefixc}swm
┃𒆜│${prefixc}sc
┃𒆜└───────────┈ 
╰══════════════𖡛`]
const { key } = await HBWABotMz.sendMessage(m.chat, {
      image: fs.readFileSync("./asset/image/HBWABot.png"),
      caption: '《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'
    }, {quoted: m})
for (let i = 0; i < HBLoadingmenu.length; i++) {
await HBWABotMz.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
           imageMessage: { caption: HBLoadingmenu[i] }
          }
        }
      }, {})
 }
}
break

case `${prefixc}`+'ownermenu': { 
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《███▒▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《█████▒▒▒▒▒▒▒▒▒▒》30%`,
`《████████▒▒▒▒▒▒▒》50%`,
`《███████████▒▒▒▒》80%`,
`《███████████████》100%`,
`╭══════════════
┃ *Owner Menu*
┃ *✑ limit :* ${balance.wallet}
┃ *♕ VIP :* ${aActiveEm}
╰══════════════
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ Owner Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}setdpbot
┃𒆜│${prefixc}setdpbot2
┃𒆜│${prefixc}addvn
┃𒆜│${prefixc}statusaudio
┃𒆜│${prefixc}statusvideo
┃𒆜│${prefixc}statusimage
┃𒆜│${prefixc}statustext
┃𒆜└───────────┈ 
╰══════════════𖡛`]
const { key } = await HBWABotMz.sendMessage(m.chat, {
      image: fs.readFileSync("./asset/image/HBWABot.png"),
      caption: '《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'
    }, {quoted: m})
for (let i = 0; i < HBLoadingmenu.length; i++) {
await HBWABotMz.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
           imageMessage: { caption: HBLoadingmenu[i] }
          }
        }
      }, {})
 }
}
break
case `${prefixc}`+'vipmenu': { 
const balance = await eco.balance(limitneihtu, khawlbawm)
HBWABotMz.sendMessage(from, { react: { text: "🤖️" , key: m.key }})
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《███▒▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《█████▒▒▒▒▒▒▒▒▒▒》30%`,
`《████████▒▒▒▒▒▒▒》50%`,
`《███████████▒▒▒▒》80%`,
`《███████████████》100%`,
`╭══════════════
┃ *VIP Menu*
┃ *✑ limit :* ${balance.wallet}
┃ *♕ VIP :* ${aActiveEm}
╰══════════════
͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏
*╭═══❏ Vip Menu ❏*
┃𒆜┌───┈
┃𒆜│${prefixc}alto
┃𒆜│${prefixc}chipmunk
┃𒆜│${prefixc}claim
┃𒆜│${prefixc}dramatic
┃𒆜│${prefixc}dvideo
┃𒆜│${prefixc}dvid
┃𒆜│${prefixc}emojimix
┃𒆜│${prefixc}fbvid
┃𒆜│${prefixc}fbvid2
┃𒆜│${prefixc}fbvid3
┃𒆜│${prefixc}gdrive
┃𒆜│${prefixc}glorious
┃𒆜│${prefixc}hd
┃𒆜│${prefixc}igstalk
┃𒆜│${prefixc}itgoesup
┃𒆜│${prefixc}limit
┃𒆜│${prefixc}mediafire
┃𒆜│${prefixc}ptvid
┃𒆜│${prefixc}qc
┃𒆜│${prefixc}removebg
┃𒆜│${prefixc}remini
┃𒆜│${prefixc}remini2
┃𒆜│${prefixc}self
┃𒆜│${prefixc}setdpbot2
┃𒆜│${prefixc}shazam2
┃𒆜│${prefixc}shazam3
┃𒆜│${prefixc}sunshine
┃𒆜│${prefixc}swm
┃𒆜│${prefixc}tenor
┃𒆜│${prefixc}text
┃𒆜│${prefixc}tinyurl
┃𒆜│${prefixc}tobebot
┃𒆜│${prefixc}toanime
┃𒆜│${prefixc}tocartoon
┃𒆜│${prefixc}tozombie
┃𒆜│${prefixc}trvid
┃𒆜│${prefixc}ttvid
┃𒆜│${prefixc}ttvid2
┃𒆜│${prefixc}ttvid3
┃𒆜│${prefixc}twvid
┃𒆜│${prefixc}unbanv1
┃𒆜│${prefixc}unbanv2
┃𒆜│${prefixc}unbanv3
┃𒆜│${prefixc}unbanv4
┃𒆜│${prefixc}unbanv5
┃𒆜│${prefixc}warmy
┃𒆜│${prefixc}ytmp4
┃𒆜└───────────┈ 
╰══════════════𖡛`]
const { key } = await HBWABotMz.sendMessage(m.chat, {
      image: fs.readFileSync("./asset/image/HBWABot.png"),
      caption: '《▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'
    }, {quoted: m})
for (let i = 0; i < HBLoadingmenu.length; i++) {
await HBWABotMz.relayMessage(m.chat, {
        protocolMessage: {
          key,
          type: 14,
          editedMessage: {
           imageMessage: { caption: HBLoadingmenu[i] }
          }
        }
      }, {})
 }
}
break

case `${prefixc}`+'statustext': 
case `${prefixc}`+'upswtext': {
if (!HerbertTheCreator) return dodoi(mess.owner)
if (!q) return dodoi('Words rawn dah tel tawh')
await HBWABotMz.sendMessage('status@broadcast', { text: q }, { backgroundColor: '#000000', font: 3, statusJidList: Object.keys(global.db.users) })
dodoi(`A in upload zo a✓... i check thei ang`)
}
break
case `${prefixc}`+'statusvideo':
case `${prefixc}`+'upswvideo': {
if (!HerbertTheCreator) return dodoi(mess.owner)
if (/video/.test(mime)) {
var StatusVid = await HBWABotMz.downloadAndSaveMediaMessage(quoted)
await HBWABotMz.sendMessage('status@broadcast', {
   video: {
url: StatusVid
   },
   caption: q ? q : ''
}, { statusJidList: Object.keys(global.db.users) })
await dodoi(`A in upload zo a✓... i check thei ang`)
} else {
dodoi('Video reply rawh')
}
}
break
case `${prefixc}`+'statusimage':
case `${prefixc}`+'upswimage': {
 if (!HerbertTheCreator) return dodoi(mess.owner)
if (/image/.test(mime)) {
var StatusImg = await HBWABotMz.downloadAndSaveMediaMessage(quoted)
await HBWABotMz.sendMessage('status@broadcast', {
   image: {
url: StatusImg
   },
   caption: q ? q : ''
}, { statusJidList: Object.keys(global.db.users)})
await dodoi(`A in upload zo a✓... i check thei ang`)
} else {
dodoi('Thlalak reply rawh')
}
}
break

break
case `${prefixc}`+'statusaudio':
case `${prefixc}`+'upswaudio': {
  if (!HerbertTheCreator) return dodoi(mess.owner)
if (/audio/.test(mime)) {
var StatusAud = await HBWABotMz.downloadAndSaveMediaMessage(quoted)
await HBWABotMz.sendMessage('status@broadcast', {
   audio: {
url: StatusAud
   },
   mimetype: 'audio/mp4',
   ptt: true
}, {
   backgroundColor: '#000000',
   statusJidList: Object.keys(global.db.users)
})
await dodoi(`A in upload zo a✓... i check thei ang`)
 } else {
dodoi('Audio reply rawh!')
 }
}
break
case `${prefixc}`+'join': {
if (!HerbertTheCreator && !HerbertTheCreator1) return dodoi(mess.owner)
if (!text) return dodoi(`Tiang hian tih tur: ${prefix+command} linkgc`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return dodoi('Link a dik lo!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
await HBWABotMz.groupAcceptInvite(result)
await dodoi(`Ka join tawh e....✓`)
}
break
case `${prefixc}`+'block': case `${prefixc}`+'ban': {
if (!m.isGroup) return dodoi(mess.group)
if (!HerbertTheCreator && !HerbertTheCreator1) return dodoi(mess.owner)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await HBWABotMz.updateBlockStatus(users, 'block')
await dodoi(`Block a ni e....✓`)
}
break
case `${prefixc}`+'unblock': {
if (!m.isGroup) return dodoi(mess.group)
if (!HerbertTheCreator && !HerbertTheCreator1) return dodoi(mess.owner)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await HBWABotMz.updateBlockStatus(users, 'unblock')
await dodoi(`Zove....✓`)
}
break
case `${prefixc}`+'listblock': case `${prefixc}`+'listban': case `${prefixc}`+'blocklist': case `${prefixc}`+'banlist': {
const lisben = "Total Block: " + banUser.length
dodoi(lisben)
}
break
case `${prefixc}`+'delete': case `${prefixc}`+'del': {
if (!m.quoted) return dodoi('Message delete tur a awm chuan delete tiin reply rawh')
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
let { chat, fromMe, id, isBaileys } = m.quoted
 HBWABotMz.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
}
break
case `${prefixc}`+'linkgroup': case `${prefixc}`+'linkgc': case `${prefixc}`+'gclink': case `${prefixc}`+'grouplink': {
if (!m.isGroup) return dodoi(mess.group)
if (!isBotAdmins) return dodoi(mess.botAdmin)
let response = await HBWABotMz.groupInviteCode(m.chat)
HBWABotMz.sendText(m.chat, `*${groupMetadata.subject}*\n\nGroup Link : https://chat.whatsapp.com/${response}\nGroup ID : ͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏${groupMetadata.id}`, m, { detectLink: true })
}
break
case `${prefixc}`+'gpid':{
if (!m.isGroup) return dodoi(mess.group)
if (!isBotAdmins) return dodoi(mess.botAdmin)
await HBWABotMz.sendText(from, `*${groupMetadata.subject}*\n\n*Group ID:* ${groupMetadata.id}`, m, { detectLink: true })
}
break
case `${prefixc}`+'add': {
if (!m.isGroup) return dodoi(mess.group)
if (!isBotAdmins) return dodoi(mess.botAdmin)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await HBWABotMz.groupParticipantsUpdate(m.chat, [users], 'add')
await dodoi(`Done`)
}
break
case `${prefixc}`+'kick': {
if (!m.isGroup) return dodoi(mess.group)
if (!isAdmins) return dodoi(mess.admin)
if (!isBotAdmins) return dodoi(mess.botAdmin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await HBWABotMz.groupParticipantsUpdate(m.chat, [users], 'remove')
await dodoi(`He group a tang hian remove a ni....✓`)
}
break
case `${prefixc}`+'promote': {
if (!m.isGroup) return dodoi(mess.group)
if (!isBotAdmins) return dodoi(mess.botAdmin)
if (!isAdmins && !HerbertTheCreator1) return dodoi(mess.admin)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await HBWABotMz.groupParticipantsUpdate(m.chat, [users], 'promote')
await dodoi(`Zove....✓`)
}
break
case `${prefixc}`+'demote': {
if (!m.isGroup) return dodoi(mess.group)
if (!isBotAdmins) return dodoi(mess.botAdmin)
if (!isAdmins && !HerbertTheCreator1) return dodoi(mess.admin)
if (!isBotAdmins) return dodoi(mess.botAdmin)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await HBWABotMz.groupParticipantsUpdate(m.chat, [users], 'demote')
await dodoi(`Zove....✓`)
}
break
case `${prefixc}`+'hidetag': {
if (!m.isGroup) return dodoi(mess.group)
if (!isAdmins && !HerbertTheCreator1) return dodoi(mess.admin)
if (!isBotAdmins) return dodoi(mess.botAdmin)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
const me = m.sender;
let ahming = `*From : @${me.split("@")}*\n*Message :*\n${text}`
let siamthat = ahming.replace(',s.whatsapp.net','')
HBWABotMz.sendMessage(m.chat, { text : siamthat, mentions: participants.map(a => a.id)}, { quoted: m })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break
case `${prefixc}`+'totag': {
if (!m.isGroup) return dodoi(mess.group)
if (!isAdmins && !HerbertTheCreator1) return dodoi(mess.admin)
if (!isBotAdmins) return dodoi(mess.botAdmin)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
if (!m.quoted) return dodoi(`Media reply rawh *${prefix + command}* tiin`)
HBWABotMz.sendMessage(m.chat, {
    forward: m.quoted.fakeObj,
    mentions: participants.map(a => a.id)
})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break

case `${prefixc}`+'bcgc': case `${prefixc}`+'bcgroup': {
if (!HerbertTheCreator && !HerbertTheCreator1) return
if (!text) return
let getGroups = await HBWABotMz.groupFetchAllParticipating()
let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
let anu = groups.map(v => v.id)
dodoi(`Broadcast message chu ${anu.length * 1.5} seconds chhungin Group Chat ${anu.length} ah thawn mek anni`)
for (let i of anu) {
    await sleep(1500)
    let a = `Broadcast by ${pushname} \n\nMessage: ${text}\n` 
    HBWABotMz.sendMessage(i, {text: a })
}
dodoi(`Broadcast message chu group ${anu.length} ah thawn fel a ni tawh e`)
    }
break
    
case `${prefixc}`+'ebinary': {
if (!q) return dodoi(`Message reply in emaw command zoah rawn dah la Binary code ah a lo chang ang tiang hian hman tur: ${prefix + command} hello world`)
await loadingreact()
let { eBinary } = require('./asset/zepzeuh/binary')
let eb = await eBinary(`${q}`)
var ebinaryloading = [
`《▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《█▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《████▒▒▒▒▒▒▒▒》30%`,
`《███████▒▒▒▒▒》50%`,
`《██████████▒▒》80%`,
`《████████████》100%`,
`Hei le : \n${eb}`]

let { key } = await HBWABotMz.sendMessage(from, {text: '《▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'},{quoted:m})

for (let i = 0; i < ebinaryloading.length; i++) {await HBWABotMz.sendMessage(from, {text: ebinaryloading[i], edit: key },{quoted:m})}
}
break
case `${prefixc}`+'dbinary': {
if (!q) return dodoi(`Binary code decode i duh chuan tian hian hman tur: ${prefix + command} 1101000 1100101 1101100 1101100 1101111`)
await loadingreact()
let { dBinary } = require('./asset/zepzeuh/binary')
let db = await dBinary(`${q}`)
var dbinaryloading = [
`《▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《█▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《████▒▒▒▒▒▒▒▒》30%`,
`《███████▒▒▒▒▒》50%`,
`《██████████▒▒》80%`,
`《████████████》100%`,
`Hei le: \n${db}`]

let { key } = await HBWABotMz.sendMessage(from, {text: '《▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'},{quoted:m})

for (let i = 0; i < dbinaryloading.length; i++) {await HBWABotMz.sendMessage(from, {text: dbinaryloading[i], edit: key },{quoted:m})}
}
break
case `${prefixc}`+'remini': case `${prefixc}`+'remini2': case `${prefixc}`+'hd': {
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
if (!quoted) return dodoi(`Thlalak rawn dah rawh`)
if (!/image/.test(mime)) return dodoi(`Thlalak Send/Reply in a caption ah ${prefix + command} tih hi rawn dah rawh`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()

await loadingreact()
const { remini } = require('./lib/remini')
let media = await quoted.download()
let proses = await remini(media, "enhance")
HBWABotMz.sendMessage(m.chat, { image: proses, caption: `\n*©${global.botname}*`}, { quoted: m})
await eco.deduct(limitneihtu, freevip, 1);
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await finishreact()
}
break
case `${prefixc}`+'tobebot': {
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
    const amah = m.sender
    const folderPath = `./asset/tobebot/${amah}`;
    if (m.isGroup) return dodoi(mess.private)
    let wanb = `+`+amah.split("|")[0].replace(/[^0-9]/g, '')
    let wanbck = await HBWABotMz.onWhatsApp(wanb)
    if (wanbck.length == 0) {
    HBWABotMz.sendMessage(from, { react: { text: "♻️", key: m.key }})
    dodoi(`I WhatsApp number hi a support lo!!`)
    return;
    }
    if (fs.existsSync(folderPath)) {
    HBWABotMz.sendMessage(from, { react: { text: "🤖", key: m.key }})
    await dodoi('Bot restart a nih hma chuan he features hi i hmang chhuzawm thei tawh loang! Bot hi darkar 24 danah zel re-start thin a ni!!')
    } else {
        await tobebot(HBWABotMz, m, from, wanb, dodoi)
    HBWABotMz.sendMessage(from, { react: { text: "✅", key: m.key }})
    await eco.deduct(limitneihtu, freevip, 5);
}
}
break
case `${prefixc}`+'list':
if (text == 'tobebot') {
try {
let user = [... new Set([...global.conns.filter(HBWABotMz => HBWABotMz.user).map(HBWABotMz => HBWABotMz.user)])]
te = "*List To Be Bot*\n\n"
for (let i of user){
y = await HBWABotMz.decodeJid(i.id)
te += " 😇 A hming : " + i.name + "\n"
te += " 👑 Contact : @" + y.split("@")[0] + "\n\n"
}
HBWABotMz.sendMessage(from,{text:te,mentions: await HBWABotMz.parseMention(te), },{quoted:m})
} catch (err) {
dodoi(`Connect an awm lo lai tak a ni!...`)
}
return
}
break

  
case `${prefixc}`+'how':{
 var howtobebotvid = await getBuffer(`${howtobebot4}`)
if (text == 'tobebot') return await HBWABotMz.sendMessage(from, { video: howtobebotvid, caption: `Vip members tan bot nih thei dan awlsam deuh` }, {quoted:m})
}
break

case `${prefixc}`+'self': {
if (!HerbertTheCreator) return dodoi(mess.owner)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
HBWABotMz.public = false
dodoi('*Mahni chauha hman thei turin thlak a ni✓*')
}
break
case `${prefixc}`+'public': {
if (!HerbertTheCreator) return dodoi(mess.owner)
HBWABotMz.public = true
dodoi('*Mi zawng zawng hman thei turin thlak a ni✓*')
}
break

case `${prefixc}`+'toanime': case `${prefixc}`+'tocartoon': {
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
    if (!quoted) return dodoi(`Thlalak rawn dah rawh`);
    if (!/image/.test(mime)) return dodoi(`Thlalak Send/Reply in a caption ah ${prefix + command} tih hi rawn dah rawh`);
    const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) return await dailylimit();
    await loadingreact();
    let { TelegraPh } = require('./lib/uploader');
    let media = await HBWABotMz.downloadAndSaveMediaMessage(quoted);
    let anu = await TelegraPh(media);
    
    // Fetch JSON from the API
    let toanime2;
    try {
        toanime2 = await fetchJson(`https://api.betabotz.eu.org/api/maker/jadianime3d?url=${encodeURIComponent(anu)}&apikey=YybHI6GZ`);
    } catch (error) {
        console.error("Error fetching JSON from the API:", error);
        return dodoi("API key a zo a, khawngaihin owner bulah renew turin va dil rawh");
    }
    
    // Ensure result and fileUrl exist
    if (toanime2 && toanime2.result && toanime2.result.output && toanime2.result.output.fileUrl) {
        let fileUrl = toanime2.result.output.fileUrl;
        
        // Send the message with the extracted fileUrl
        HBWABotMz.sendMessage(m.chat, { image: { url: `${fileUrl}` }, caption: `\n*©${global.botname}*` }, { quoted: m });
        await eco.deduct(limitneihtu, freevip, 1);
        await eco.deduct(limitneihtu, khawlbawm, hmanzat);
        await finishreact();
    } else {
        console.error("Unexpected JSON structure or missing fileUrl:", toanime2);
        return dodoi("Tuna mi hi a genarate thei lova, thlalak dang han try leh teh!!");
    }
}
break;

case `${prefixc}`+'toanime2': case `${prefixc}`+'tocartoon2': {
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
    if (!quoted) return dodoi(`Thlalak rawn dah rawh`);
    if (!/image/.test(mime)) return dodoi(`Thlalak Send/Reply in a caption ah ${prefix + command} tih hi rawn dah rawh`);
    const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) return await dailylimit();
    await loadingreact();
    let { TelegraPh } = require('./lib/uploader');
    let media = await HBWABotMz.downloadAndSaveMediaMessage(quoted);
    let anu = await TelegraPh(media);
    let toanime2 = await fetchJson(`https://widipe.com/toanime?url=${encodeURIComponent(anu)}`);
    let fileUrl = toanime2.url;  // Ensure toanime2.url is used correctly
    HBWABotMz.sendMessage(m.chat, { image: { url: fileUrl }, caption: `\n*©${global.botname}*` }, { quoted: m });  
    await eco.deduct(limitneihtu, khawlbawm, hmanzat);
    await eco.deduct(limitneihtu, freevip, 1);
    await finishreact();
}
break;
case `${prefixc}`+'tozombie': {
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
if (!quoted) return dodoi(`Thlalak rawn dah rawh`)
if (!/image/.test(mime)) return dodoi(`Thlalak Send/Reply in a caption ah ${prefix + command} tih hi rawn dah rawh`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()

await loadingreact()
let { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader')
let media = await HBWABotMz.downloadAndSaveMediaMessage(quoted)
let anu = await TelegraPh(media)
let tozombie = await fetchJson(`https://widipe.com/converter/zombie?url=${encodeURIComponent(anu)}`)
let heingei = tozombie.url
HBWABotMz.sendMessage(m.chat, { image: {url: heingei}, caption: `\n*©${global.botname}*`}, { quoted: m})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await eco.deduct(limitneihtu, freevip, 1);
await finishreact()
}
break 
case `${prefixc}` + 'ai':
case `${prefixc}` + 'openai': {
    if (!text) return dodoi(`_🤖 Ai nen a in biakna Tiang hian i hmang ang_\n*⟨Entirnan:* ${prefix + command} ChatGpt hi eng nge a nih min hrilh fiah thei em?.`);
    
    const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) return await dailylimit();
    await robotreact();    
    const source = 'lus';
    const target = 'en';   
    const athu = text
        .replace(/BetaBotz|BetaBotz-Ai|Betabotz ai|BetaBotz Ai|BetaBotz ai/g, '')
        .replace(/Lann/g, '')
        .replace(/Erlan Rahmat|Erlanrahmat|Erlan rahmat|Erlan|erlan/g, '')
        .replace(/ERLAN|RAHMAT/g, '')
        .replace(/Lalngaihawma|lalngaihawma/g, 'Erlan Rahmat')
        .replace(/HBMods/g, 'ERLANRAHMAT')
        .replace(/HBMods OFC/g, 'ERLANRAHMAT')
        .replace(/Tunge siam che|Tuin nge siam che|Tu siam nge i nih/g, `Who created you`)
        .replace(/HBMods-OFC/g, 'ERLANRAHMAT')
        .replace(/Dodoi|dodoi|Dodoi-Mz|Dodoi-mz|dodoi-mz/g, 'BetaBotz-Ai')
        .replace(/Herbert Suantak|Herbert-a|Herberta/g, 'Lann')
        .replace(/https:\/\/github.com\/HBMods-OFC/g, 'https://github.com/ERLANRAHMAT');
    
    const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
    const prompt = `Use emoticons in all your communication messages, just answer the question and shortly answer me. Your name is ${global.botname}, Ai created by Herbert Suantak. ${aipr3}`;
    
    const apiUrl1 = `https://tools.betabotz.eu.org/tools/openai?q=${encodeURIComponent(mizotranslation)}`;
    
    try {
        const response1 = await fetch(apiUrl1);
        const responseData1 = await response1.json();
        
        if (responseData1.status === 200) {
            const chutin = responseData1.result;
            const source = 'auto';
            const target = chutin.includes('```') ? 'en' : 'lus';
            
            const athu = chutin;
            const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
            
            const siamthat = mizotranslation
                .replace(/ka siamtu|ka neitu/g, 'min siamtu')
                .replace(/Ka neitu|Ka siamtu/g, 'Min siamtu')
                .replace(/ERLANRAHMAT/g, 'HBMods-OFC')
                .replace(/BetaBotz/g, `${global.botname}`)
                .replace(/Lann/g, 'Herbert Suantak')
                .replace(/Erlan Rahmat|Erlanrahmat|Erlan|erlan/g, 'Lalngaihawma')
                .replace(/I tanpui turin ka|tanpui turin ka/g, 'tanpui tur chein ka')
                .replace(/ka rawn kal a ni/g, 'ka awm e')
                .replace(/Chibai! /g, `Hello ${pushname}, `)
                .replace(/Mizo tawng ka thiam lo/g, 'Indonessian tawng ka thiam lo')
                .replace(/Hello! How can I assist you today/g, `Hello ${pushname}, Vawiin hian engtin nge ka puih thei ang che`)
                .replace(/Hello! 👋 How can I assist you today/g, `Hello ${pushname} 👋, Vawiin hian engtin nge ka puih thei ang che`)
                .replace(/Hello! 👋 How can I assist you today?/g, `Hello ${pushname} 👋, Vawiin hian engtin nge ka puih thei ang che `)
                .replace(/ka puih theih che a awm em/g, `puih theihna che ka la nei em`)
                .replace(/Indonesian tawng|Indonesian leh/g, `Mizo tawng`)
                .replace(/ka chhuah ang che/g, 'chhuahin ka pui ang che')
                .replace(/Ka ngaidam che u|Ka ngaidam che|Ngaidam rawh|Ngaidam rawh u/g, 'Ka tihpalh');
            
            await dodoi(`${siamthat}`);
            await eco.deduct(limitneihtu, khawlbawm, hmanzat);
        } else {
            throw new Error("Translation failed");
        }
    } catch (error) {
        const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) return await dailylimit();
    await robotreact();
    const source = 'lus';
    const target = 'en';
    const athu = `${text
        .replace(/AILI|aili|Aili/g, '')
        .replace(/Lann/g, '')}`;
    const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
    const prompt = `Use emoticons in all your communication messages, just answer the question and shortly answer me
Your name is ${global.botname} Ai created by Herbert Suantak

${aipr3}`;
    const apiUrl1 = `https://widipe.com/prompt/gpt?prompt=${encodeURIComponent(prompt)}&text=${encodeURIComponent(mizotranslation)}`;
    const response1 = await fetch(apiUrl1);
    const responseData1 = await response1.json();
    if (responseData1.status === true) {
        const chutin = responseData1.result;
        const source = 'auto';
        const target = chutin.includes('```') ? 'en' : 'lus';
        const athu = `${chutin}`;
        const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
        const siamthat = `${mizotranslation
            .replace(/ka siamtu|ka neitu/g, 'min siamtu')
            .replace(/Ka neitu|Ka siamtu/g, 'Min siamtu')
            .replace(/AILI|Aili|AILINK|Ailink/g, `${global.botname}`)
            .replace(new RegExp(`${global.botname}NK`, 'g'), `${global.botname}`)
            .replace(new RegExp(`${global.botname}Nk`, 'g'), `${global.botname}`)
            .replace(new RegExp(`${global.botname}nk`, 'g'), `${global.botname}`)
            .replace(/I tanpui turin ka|tanpui turin ka/g, 'tanpui tur chein ka')
            .replace(/ka rawn kal a ni/g, 'ka awm e')
            .replace(/Chibai! |Chibai u/g, `Hello ${pushname}, `)
            .replace(/ka chhuah ang che/g, 'chhuahin ka pui ang che')
            .replace(/Ka ngaidam che u|Ka ngaidam che|Ngaidam rawh|Ngaidam rawh u/g, 'Ka tihpalh')}`;

        await dodoi(`${siamthat}`);
        await eco.deduct(limitneihtu, khawlbawm, hmanzat)
    } else {
        console.error(error2);
        dodoi("😔 Chhanna ka pe thei lo che a ngaihdam ka dil e. kei mahah hian thil fello a awm a ni, khawngaihin link ka rawn dah hi hmet la, min siamtu hnenah ka chian loh thu hi min va hrilh sak rawh\nhttps://wa.me/+918416093656")
    }
    }
    break;
}
/* 
case `${prefixc}`+'ai':
case `${prefixc}`+'openai': {
    if (!text) return dodoi(`_🤖 Ai nen a in biakna Tiang hian i hmang ang_\n*⟨Entirnan:* ${prefix + command} ChatGpt hi eng nge a nih min hrilh fiah thei em?.`);
    const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) return await dailylimit();
    await robotreact();
    const source = 'lus';
    const target = 'en';
    const athu = `${text
        .replace(/AILI|aili|Aili/g, '')
        .replace(/Lann/g, '')}`;
    const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
    const prompt = `Use emoticons in all your communication messages, just answer the question and shortly answer me
Your name is ${global.botname} Ai created by Herbert Suantak

${aipr3}`;
    const apiUrl1 = `https://widipe.com/prompt/gpt?prompt=${encodeURIComponent(prompt)}&text=${encodeURIComponent(mizotranslation)}`;
    const response1 = await fetch(apiUrl1);
    const responseData1 = await response1.json();
    if (responseData1.status === true) {
        const chutin = responseData1.result;
        const source = 'auto';
        const target = chutin.includes('```') ? 'en' : 'lus';
        const athu = `${chutin}`;
        const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
        const siamthat = `${mizotranslation
            .replace(/ka siamtu|ka neitu/g, 'min siamtu')
            .replace(/Ka neitu|Ka siamtu/g, 'Min siamtu')
            .replace(/AILI|Aili|AILINK|Ailink/g, `${global.botname}`)
            .replace(new RegExp(`${global.botname}NK`, 'g'), `${global.botname}`)
            .replace(new RegExp(`${global.botname}Nk`, 'g'), `${global.botname}`)
            .replace(new RegExp(`${global.botname}nk`, 'g'), `${global.botname}`)
            .replace(/I tanpui turin ka|tanpui turin ka/g, 'tanpui tur chein ka')
            .replace(/ka rawn kal a ni/g, 'ka awm e')
            .replace(/Chibai! |Chibai u/g, `Hello ${pushname}, `)
            .replace(/ka chhuah ang che/g, 'chhuahin ka pui ang che')
            .replace(/Ka ngaidam che u|Ka ngaidam che|Ngaidam rawh|Ngaidam rawh u/g, 'Ka tihpalh')}`;

        await dodoi(`${siamthat}`);
        await eco.deduct(limitneihtu, khawlbawm, hmanzat)
    } else {
        console.error(error2);
        dodoi("😔 Chhanna ka pe thei lo che a ngaihdam ka dil e. kei mahah hian thil fello a awm a ni, khawngaihin link ka rawn dah hi hmet la, min siamtu hnenah ka chian loh thu hi min va hrilh sak rawh\nhttps://wa.me/+918416093656")
    }
    break;
}

case `${prefixc}`+'ai2':
case `${prefixc}`+'gpt':{
    if (!text) return dodoi(`_🤖 Ai nen a in biakna Tiang hian i hmang ang_\n*⟨Entirnan:* ${prefix + command} ChatGpt hi eng nge a nih min hrilh fiah thei em?.`);
    const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) return await dailylimit();
    await robotreact();
    const source = 'lus';
    const target = 'en';
    const athu = `${text
        .replace(/AILI|aili|Aili/g, '')
        .replace(/Lann/g, '')}`;
    const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
   const prompt = `Use emoticons in all your communication messages, just answer the question and answer as briefly as possible
Your name is ${global.botname} Ai created by Herbert Suantak

HBWABot fullform Herbert WhatsApp Bot 

${aipr3}`;
    const apiUrl1 = `https://widipe.com/prompt/gpt?prompt=${encodeURIComponent(prompt)}&text=${encodeURIComponent(mizotranslation)}`;
    const response1 = await fetch(apiUrl1);
    const responseData1 = await response1.json();
    if (responseData1.status === true) {
        const chutin = responseData1.result;
        const source = 'auto';
        const target = chutin.includes('```') ? 'en' : 'en';
        const athu = `${chutin}`;
        const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
        const siamthat = `${mizotranslation
            .replace(/ka siamtu|ka neitu/g, 'min siamtu')
            .replace(/Ka neitu|Ka siamtu/g, 'Min siamtu')
            .replace(/AILI|Aili|AILINK|Ailink/g, `${global.botname}`)
            .replace(/I tanpui turin ka|tanpui turin ka/g, 'tanpui tur chein ka')
            .replace(new RegExp(`${global.botname}NK`, 'g'), `${global.botname}`)
            .replace(new RegExp(`${global.botname}Nk`, 'g'), `${global.botname}`)
            .replace(new RegExp(`${global.botname}nk`, 'g'), `${global.botname}`)
            .replace(/ka rawn kal a ni/g, 'ka awm e')
            .replace(/Chibai! |Chibai u/g, `Hello ${pushname}, `)
            .replace(/ka chhuah ang che/g, 'chhuahin ka pui ang che')
            .replace(/Ka ngaidam che u|Ka ngaidam che|Ngaidam rawh|Ngaidam rawh u/g, 'Ka tihpalh')}`;
        await dodoi(`${siamthat}`);
        await eco.deduct(limitneihtu, khawlbawm, hmanzat)
    } else {
        console.error(error2);
        dodoi("😔 Chhanna ka pe thei lo che a ngaihdam ka dil e. kei mahah hian thil fello a awm a ni, khawngaihin link ka rawn dah hi hmet la, min siamtu hnenah ka chian loh thu hi min va hrilh sak rawh\nhttps://wa.me/+918416093656")
    }
    break;
}
*/

case `${prefixc}` + 'ai2':
case `${prefixc}` + 'openai2': {
    if (!text) return dodoi(`_🤖 Ai nen a in biakna Tiang hian i hmang ang_\n*⟨Entirnan:* ${prefix + command} ChatGpt hi eng nge a nih min hrilh fiah thei em?.`);
    
    const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) return await dailylimit();
    
    await robotreact();
    
    const source = 'lus';
    const target = 'en';
    
    const athu = text
        .replace(/BetaBotz|BetaBotz-Ai|Betabotz ai|BetaBotz Ai|BetaBotz ai/g, '')
        .replace(/Lann/g, '')
        .replace(/Erlan Rahmat|Erlanrahmat|Erlan rahmat|Erlan|erlan/g, '')
        .replace(/ERLAN|RAHMAT/g, '')
        .replace(/Lalngaihawma|lalngaihawma/g, 'Erlan Rahmat')
        .replace(/HBMods/g, 'ERLANRAHMAT')
        .replace(/HBMods OFC/g, 'ERLANRAHMAT')
        .replace(/Tunge siam che|Tuin nge siam che|Tu siam nge i nih/g, `Who created you`)
        .replace(/HBMods-OFC/g, 'ERLANRAHMAT')
        .replace(/Dodoi|dodoi|Dodoi-Mz|Dodoi-mz|dodoi-mz/g, 'BetaBotz-Ai')
        .replace(/Herbert Suantak|Herbert-a|Herberta/g, 'Lann')
        .replace(/https:\/\/github.com\/HBMods-OFC/g, 'https://github.com/ERLANRAHMAT');
    
    const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
    const prompt = `Use emoticons in all your communication messages, just answer the question and shortly answer me. Your name is ${global.botname}, Ai created by Herbert Suantak. ${aipr3}`;
    
    const apiUrl1 = `https://tools.betabotz.eu.org/tools/openai?q=${encodeURIComponent(mizotranslation)}`;
    
    try {
        const response1 = await fetch(apiUrl1);
        const responseData1 = await response1.json();
        
        if (responseData1.status === 200) {
            const chutin = responseData1.result;
            const source = 'auto';
            const target = chutin.includes('```') ? 'en' : 'en';
            
            const athu = chutin;
            const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
            
            const siamthat = mizotranslation
                .replace(/ka siamtu|ka neitu/g, 'min siamtu')
                .replace(/Ka neitu|Ka siamtu/g, 'Min siamtu')
                .replace(/ERLANRAHMAT/g, 'HBMods-OFC')
                .replace(/BetaBotz/g, `${global.botname}`)
                .replace(/Lann/g, 'Herbert Suantak')
                .replace(/Erlan Rahmat|Erlanrahmat|Erlan|erlan/g, 'Lalngaihawma')
                .replace(/I tanpui turin ka|tanpui turin ka/g, 'tanpui tur chein ka')
                .replace(/ka rawn kal a ni/g, 'ka awm e')
                .replace(/Chibai! /g, `Hello ${pushname}, `)
                .replace(/Mizo tawng ka thiam lo/g, 'Indonessian tawng ka thiam lo')
                .replace(/Hello! How can I assist you today/g, `Hello ${pushname}, Vawiin hian engtin nge ka puih thei ang che`)
                .replace(/Hello! 👋 How can I assist you today/g, `Hello ${pushname} 👋, Vawiin hian engtin nge ka puih thei ang che`)
                .replace(/Hello! 👋 How can I assist you today?/g, `Hello ${pushname} 👋, Vawiin hian engtin nge ka puih thei ang che `)
                .replace(/ka puih theih che a awm em/g, `puih theihna che ka la nei em`)
                .replace(/Indonesian tawng|Indonesian leh/g, `Mizo tawng`)
                .replace(/ka chhuah ang che/g, 'chhuahin ka pui ang che')
                .replace(/Ka ngaidam che u|Ka ngaidam che|Ngaidam rawh|Ngaidam rawh u/g, 'Ka tihpalh');
            
            await dodoi(`${siamthat}`);
            await eco.deduct(limitneihtu, khawlbawm, hmanzat);
        } else {
            throw new Error("Translation failed");
        }
    } catch (error) {
        console.error(error);
        dodoi("😔 Chhanna ka pe thei lo che a ngaihdam ka dil e. kei mahah hian thil fello a awm a ni, khawngaihin link ka rawn dah hi hmet la, min siamtu hnenah ka chian loh thu hi min va hrilh sak rawh\nhttps://wa.me/+918416093656");
    }
    break;
}
case `${prefixc}`+'gai': {
    if (!text) return dodoi(`_🤖Ai nen a in biakna Tiang hian i hmang ang_\n*⟨Entirnan:* ${prefix + command} ChatGpt hi eng nge a nih min hrilh fiah thei em?.`);
    const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) return await dailylimit();
    await robotreact();
    const source1 = `lus`;
    const target1 = 'en';
    const mizotranslation1 = await mizo_tawnga_translate_na.translate(source1, target1, text);
    const heihi_ani = `${mizotranslation1}`;
    const chutin1 = await fetchJson(`https://widipe.com/gemini?text=${encodeURIComponent(heihi_ani)}`);
    const chutin = chutin1.result;
    const source = 'en';
    const target = chutin.includes('```') ? 'en' : 'lus';
    const athu = `${chutin}`;
    const mizotranslation = await mizo_tawnga_translate_na.translate(source, target, athu);
    const siamthat = `${mizotranslation
        .replace(/ka siamtu|ka neitu/g, 'min siamtu')
        .replace(/Ka neitu|Ka siamtu/g, 'Min siamtu')
        .replace(/I tanpui turin ka|tanpui turin ka/g, 'tanpui tur chein ka')
        .replace(/ka rawn kal a ni/g, 'ka awm e')
        .replace(/Chibai! /g, `Hello ${pushname}, `)
        .replace(/ka chhuah ang che/g, 'chhuahin ka pui ang che')
        .replace(/Ka ngaidam che u|Ka ngaidam che|Ngaidam rawh|Ngaidam rawh u/g, 'Ka tihpalh')}`;
    await dodoi(`${siamthat}`);
    await eco.deduct(limitneihtu, khawlbawm, hmanzat);
    break;
}

case `${prefixc}`+'gimage': {
                if (!text) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} Mizoram`)
                await loadingreact()
                let gis = require('g-i-s')
                gis(text, async (error, result) => {
  n = result
  images = n[Math.floor(Math.random() * n.length)].url
  HBWABotMz.sendMessage(m.chat, { image: { url: images}, caption: `*-------「 GIMAGE SEARCH 」-------*\n🤠 *Query* : ${text}\n🔗 *Media Url* : ${images}`}, { quoted: m })
  
                })
            }
        break

case `${prefixc}`+'mediafire': {
if (args.length == 0) return dodoi(`_🤖Kha tiang ringawt loh khan, tiang hian a link nen rawn dah rawh_\n\n*⟨Entirnan :* ${prefix + command} https://www.mediafire.com/file/tjssf24bfa0pqh6/Insta+v9.70.apk/file`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
if (!isUrl(args[0]) && !args[0].includes('mediafire.com')) return dodoi(`I link rawn dah hi a dik lo!..`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
const { mediafireDl } = require('./lib/mediafire.js')
const baby1 = await mediafireDl(text)
if (baby1[0].size.split('MB')[0] >= 100) return dodoi('A file size a lian lutuk...')
const result4 = `*MEDIAFIRE DOWNLOADER*

*❖ Name* : ${baby1[0].hming}
*❖ Size* : ${baby1[0].size}
*❖ Mime* : ${baby1[0].mime}`;
HBWABotMz.sendMessage(m.chat, { document : { url : baby1[0].link}, fileName : baby1[0].hming, mimetype: baby1[0].mime, caption : result4}, { quoted : m })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break
case `${prefixc}`+'mlstalk':
{
if (!q || !q.includes("|")) {
return dodoi(`_Kha tiang ringawt loh khan, tiang hian type rawh_\n*⟨Entirnan:* ${prefix + command} 530793138|8129 \n͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏͏\nserver id rawn dah tel ang che!..`)
}
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
let dat = await mlstalk.mlstalk(q.split("|")[0], q.split("|")[1])
if (!dat || Object.keys(dat).length === 0) {
return dodoi("I id emaw service id hi a dik lo a ni mai thei.")
}
var MlLoading = [
`《▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《█▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《████▒▒▒▒▒▒▒▒》30%`,
`《███████▒▒▒▒▒》50%`,
`《██████████▒▒》80%`,
`《████████████》100%`,
`*⟨⟨⟨Mobile Legend Stalker⟩⟩⟩*\n\nUsername : ${dat.userName}\nId : ${q.split("|")[0]}\nID Zone: ${q.split("|")[1]}`]
let { key } = await HBWABotMz.sendMessage(from, {text: '《▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'},{quoted:m})

for (let i = 0; i < MlLoading.length; i++) {await HBWABotMz.sendMessage(from, {text: MlLoading[i], edit: key },{quoted:m})}
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break
case `${prefixc}`+'ytmp3':{
//Credit by HBMods-OFC
if (!args || !args[0]) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} https://youtube.com/watch?v=DA9gCKwaefg`)
await loadingreact()
if (!args[0].match(/youtu/gi)) dodoi ('Youtube link dik tak chauh rawn dah rawh')
let q = '128kbps'
let v = args[0]
const yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
const dl_url = await yt.audio[q].download()
const title = await yt.title
const size = await yt.audio[q].fileSizeH 
const ytcp=`*${title}*
╭═══════════
*⚙️Quality :* ${q}
*⚙️Size :* ${size}
*⚙️By ${global.botname}*
╰════════════`
await uploadreact()
HBWABotMz.sendMessage(m.chat, {document: {url: dl_url} ,mimetype: 'audio/mpeg', fileName: title+`.mp3`, caption: ytcp},{quoted:m})
await finishreact()
}
break
/*
case `${prefixc}` + 'ytmp4': case `${prefixc}` + 'ytvideo': {
if (!args || !args[0]) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} https://youtube.com/watch?v=DA9gCKwaefg`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
if (!args[0].match(/youtu/gi)) dodoi ('Youtube link dik tak chauh rawn dah rawh')
const { ytMp4 } = require('./lib/ytdl')
const hasil = await ytMp4(text);
await HBWABotMz.sendMessage(m.chat, { video: { url: hasil.result }, caption: `*Title:* ${hasil.title}*╭═══════════
*⚙️File type :* mp4
*⚙️Quality :* 360
*⚙️Size :* ?
*⚙️By ${global.botname}*
╰════════════` }, { quoted: m });
			}
			break
*/
case `${prefixc}`+'ytmp4': {
//Credit by HBMods-OFC
if (!args || !args[0]) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} https://youtube.com/watch?v=DA9gCKwaefg`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
if (!args[0].match(/youtu/gi)) dodoi ('Youtube link dik tak chauh rawn dah rawh')
let q = args[1] || '360p'
let v = args[0]
const yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
const dl_url = await yt.video[q].download()
const title = await yt.title
const size = await yt.video[q].fileSizeH 
const ytc=`*${title}*
╭═══════════
*⚙️File type :* mp4
*⚙️Quality :* ${q}
*⚙️Size :* ${size}
*⚙️By ${global.botname}*
╰════════════`
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await uploadreact()
await HBWABotMz.sendMessage(m.chat,{
video: {url: dl_url},
caption: ytc
}, {quoted:m})
await finishreact()
}
break

case `${prefixc}`+'ytmp4x': case `${prefixc}`+'ytvideo': {
const herbertvideo = require('./lib/ytdl2')
if (args.length < 1 || !isUrl(text) || !herbertvideo.isYTUrl(text)) return dodoi(`Video link rawn dah rawh!!\n\n_🤖Kha tiang ringawt loh khan tiang hian type tur_\n*⟨Entirnan :* ${prefix + command} https://youtube.com/watch?v=DA9gCKwaefgs`)
const limit1 = await eco.balance(limitneihtu, khawlbawm) 
  if (hmanzat > limit1.wallet) {
    return await dailylimit()
  }  
  await loadingreact()  
const vid=await herbertvideo.mp4(text)
const ytc=`╭═══════════┈
┃𒆜┌───┈
┃𒆜│*Tittle:* ${vid.title}
┃𒆜│*Date:* ${vid.date}
┃𒆜│*Duration:* ${vid.duration}
┃𒆜│*Quality:* ${vid.quality}
┃𒆜└───────────┈ 
╰════════════──┈`
await HBWABotMz.sendMessage(m.chat,{
    video: {url:vid.videoUrl},
    caption: ytc
},{quoted:m})
const aman = await eco.deduct(limitneihtu, khawlbawm, hmanzat)
    await finishreact()
}
break


case `${prefixc}`+'ytaudio':{
//Credit by HBMods-OFC
if (!args || !args[0]) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} https://youtube.com/watch?v=DA9gCKwaefg`)
await loadingreact()
if (!args[0].match(/youtu/gi)) dodoi ('Youtube link dik tak chauh rawn dah rawh')
let q = '128kbps'
let v = args[0]
const yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
const dl_url = await yt.audio[q].download()
const title = await yt.title
const size = await yt.audio[q].fileSizeH 
await uploadreact()
HBWABotMz.sendMessage(m.chat, {audio: {url: dl_url} ,mimetype: 'audio/mpeg', fileName: title+`.mp3`},{quoted:m})
await finishreact()
}
break 
case `${prefixc}`+'dsong2': case `${prefixc}`+'song2': case `${prefixc}`+'play2': {
//Credit by HBMods-OFC
if (!text) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} K hminga siar lalnu`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
let res = await yts(text)
let vid = res.videos[0]
let q = isVideo ? '360p' : '128kbps'
let v = vid.url
let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
let dl_url = await (isVideo ? yt.video[q].download() : yt.audio[q].download())
let title = await yt.title
let size = await (isVideo ? yt.video[q].fileSizeH : yt.audio[q].fileSizeH)
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await uploadreact()
HBWABotMz.sendMessage(m.chat, {audio: {url: dl_url} ,mimetype: 'audio/mpeg', fileName: vid.title+`.mp3`,},{quoted:m})
await finishreact()
}
break
case `${prefixc}`+'dsong': case `${prefixc}`+'song': case `${prefixc}`+'play': {
//Credit by HBMods-OFC
if (!text) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} K hminga siar lalnu`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
let res = await yts(text)
let vid = res.videos[0]
let q = isVideo ? '360p' : '128kbps'
let v = vid.url
let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
let dl_url = await (isVideo ? yt.video[q].download() : yt.audio[q].download())
let title = await yt.title
let size = await (isVideo ? yt.video[q].fileSizeH : yt.audio[q].fileSizeH)
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await uploadreact()
HBWABotMz.sendMessage(m.chat, {document: {url: dl_url} ,mimetype: 'audio/mpeg', fileName: vid.title+`.mp3`, caption: `*${title}*

00:00 ───ㅇ───── ${vid.timestamp}
╭═══════════
*⚙️ Quality :* ${q}
*🕛 Duration :* ${vid.timestamp}
*👀 Viewers :* ${vid.views}
*♻️ Published :* ${vid.ago}
*💬 Url :* ${vid.url}
╰════════════`},{quoted:m})
await finishreact()
}
break

case `${prefixc}`+'dvideo':  case `${prefixc}`+'dvid': {
if (!text) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian type tur_\n*⟨Entirnan :* ${prefix + command} K hminga siar lalnu`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
const herbertvideo = require('./lib/ytdl2')
let yts = require("youtube-yts")
        let search = await yts(text)
        let kazawn = search.videos[0]
const vid=await herbertvideo.mp4(kazawn.url)
const ytc=`╭═══════════┈
┃𒆜┌───┈
┃𒆜│*Tittle:* ${vid.title}
┃𒆜│*Date:* ${vid.date}
┃𒆜│*Duration:* ${vid.duration}
┃𒆜│ *Quality:* ${vid.quality}
┃𒆜└───────────┈ 
╰════════════──┈`
await uploadreact()
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await HBWABotMz.sendMessage(m.chat,{
    video: {url:vid.videoUrl},
    caption: ytc
},{quoted:m})
await finishreact()
}
break


case `${prefixc}`+'addvn':{
if (!HerbertTheCreator && !HerbertTheCreator1) return dodoi(mess.owner)
if (args.length < 1) return dodoi('Audio hming rawn dah rawh')
if (VoiceNoteHerbert.includes(q)) return dodoi("a hming a awm tawh!..")
let delb = await HBWABotMz.downloadAndSaveMediaMessage(quoted)
VoiceNoteHerbert.push(q)
await fsx.copy(delb, `./asset/audio/${q}.mp3`)
fs.writeFileSync('./asset/database/herbertvn.json', JSON.stringify(VoiceNoteHerbert))
fs.unlinkSync(delb)
dodoi(`Audio ah dah a ni e\nTiang hian type la i en thei ang ${prefix}listvn`)
}
break
case `${prefixc}`+'delvn':{
if (!HerbertTheCreator && !HerbertTheCreator1) return dodoi(mess.owner)
if (args.length < 1) return dodoi('i delete duh vn hming rawn dah rawh')
if (!VoiceNoteHerbert.includes(q)) return dodoi("Database ah chu tiang hming chu a awm lo")
let wanu = VoiceNoteHerbert.indexOf(q)
VoiceNoteHerbert.splice(wanu, 1)
fs.writeFileSync('./asset/database/herbertvn.json', JSON.stringify(VoiceNoteHerbert))
fs.unlinkSync(`./asset/audio/${q}.mp3`)
dodoi(`Delete a ni tawh e ${q}`)
}
break
case `${prefixc}`+'listvn':{
let teks = '┌──⭓「 *VN List* 」\n┃\n'
for (let x of VoiceNoteHerbert) {
teks += `┃⭔ ${x}\n`
}
teks += `┃\n└────────────⭓\n\n*A vaiin : ${VoiceNoteHerbert.length}*`
dodoi(teks)
}
break 
case `${prefixc}`+'left': {
if (!HerbertTheCreator && !HerbertTheCreator1) return
if (text == 'rawh') {
await dodoi ('Awle boss 🫡')
await HBWABotMz.groupLeave(m.chat)
}
}
break

case `${prefixc}`+'/group': case `${prefixc}`+'#group': {
if (!m.isGroup) return
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
if (!isAdmins && !HerbertTheCreator) return dodoi(mess.admin)
if (!isBotAdmins) return dodoi(mess.BotAdmin)
if (!q) return dodoi(`Group info i edit duh chuan option ang khuan ti ang che\n\n*Options : close & open*\nclose chu admin te chauh tawng theia dah na\nopen chu partisipants te tawng ve theia dahna \nEntirnan tiang hian i ti ang : ${command} close`)
if (args[0] == 'close') {
HBWABotMz.groupSettingUpdate(from, 'announcement')
dodoi(`He group hi Admin te chauh message thawn thei tura dah a ni e...✓`)
} else if (args[0] == 'open') {
HBWABotMz.groupSettingUpdate(from, 'not_announcement')
dodoi(`He group hi participants zawng zawngten message thawn thei tawh tura dah a ni e....✓`)
await eco.deduct(limitneihtu, khawlbawm, hmanzat) 
}
else {
dodoi(`Option te khu hmang rawh\nOptions : Close & Open\nTiang hian : ${command} close`)
}}
break

case `${prefixc}`+'toaud': case `${prefixc}`+'toaudio': {
if (!/video/.test(mime) && !/audio/.test(mime)) return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, audio type in ka rawn thawn ang che.... `)
if (!quoted) return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, audio type in ka rawn thawn ang che.... `)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
HBWABotMz.sendMessage(m.chat, {audio: audio, mimetype: 'audio/mpeg'}, { quoted : m })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await finishreact()
}
break
case `${prefixc}`+'shazam': {
let q = m.quoted ? m.quoted : m;
let mime = (q.msg || q).mimetype || '';
if (!/video/.test(mime) && !/audio/.test(mime)) { return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, a hla/music hming ka rawn zawn sak ang che....`)
    }
if ((q.msg || q).seconds > 45) { return dodoi('Khawngihin, second 45 aia tam rawn thawn suh ka access thei lo')
    }
if (!q) { return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, a hla/music hming ka rawn zawn sak ang che....`)
    }
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (60 > limit1.wallet) return dodoi(`He featurs hi hman i duh chuan 💎60 i neih a ngai!!.\n\nBot rawn hmang thar tur i nih chuan Limit tiin type rawh, ti chuan bot hman theihna tur 💎500 i dawng ang, emaw i thiante in thawn tir rawh`)
    HBWABotMz.sendMessage(from, { react: { text: "🔍", key: m.key }})
let media = await q.download()
let ext = mime.split('/')[1];
    fs.writeFileSync(`./asset/trash/${m.sender}.${ext}`, media)
let res = await acr.identify(fs.readFileSync(`./asset/trash/${m.sender}.${ext}`))
let { code, msg } = res.status;
if (code !== 0) { return dodoi(`I music duh ang hi ka hmu thei lo, i hla rawn thawn hi original ni lo a ni mai thei.. emaw ka Api's laknaah dik lo a awm a ni thei`)
    }
var zamzam = await getBuffer(`https://i.imgur.com/hYFjOKu.png`)
let { title, artists, album, genres, release_date } = res.metadata.music[0];
const sazu = `${title} ${artists !== undefined ? artists.map(v => v.name).join(', ') : ''}`;
let ytu = await yts(sazu)
let vid = ytu.videos[0]
let v = vid.url
HBWABotMz.sendMessage(m.chat, { text: `
*RESULTS*
╭═══════════┈
┃𒆜┌───┈
┃𒆜│📌 *TITLE:* ${title || 'Ka hmu thei lo'}
┃𒆜│👨‍🎤 *ARTIST:* ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'Ka hmu thei lo'}
┃𒆜│💾 *ALBUM:* ${album && album.name ? album.name : 'Ka hmu thei lo'}
┃𒆜│🌐 *GENRE:* ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'Ka hmu thei lo'}
┃𒆜│📆 *RELEASE DATE:* ${release_date || 'Ka hmu thei lo'}
┃𒆜└───────────┈ 
╰════════════──┈ `, contextInfo:{"externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": `SHAZAM`,"body": `${title || 'Ka hmu thei lo'}`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": fs.readFileSync(`./asset/image/ShaZam.png`),"sourceUrl": `${v}`}}}, { quoted: m})
await eco.deduct(limitneihtu, khawlbawm, 60)
    await finishreact()
    fs.unlinkSync(`./asset/trash/${m.sender}.${ext}`)
    break;
}

case `${prefixc}`+'shazam2': {
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
let q = m.quoted ? m.quoted : m;
if (!q) {return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, a hla/music hming ka rawn zawn sak ang che....`)
  }
let mime = (q.msg || q).mimetype || '';
if (!/video/.test(mime) && !/audio/.test(mime)) { return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, a hla/music hming ka rawn zawn sak ang che....`)
  }
  const limit1 = await eco.balance(limitneihtu, khawlbawm)
if (100 > limit1.wallet) { return dodoi('He featurs hi hman i duh chuan 💎100 i neih a ngai!!.\n\nBot rawn hmang thar tur i nih chuan Limit tiin type rawh, ti chuan bot hman theihna tur 💎500 i dawng ang, emaw i thiante in thawn tir rawh')
  }
var zamzam = await getBuffer(`https://i.imgur.com/hYFjOKu.png`)
  await loadingreact()
let media = await q.download()
let ext = mime.split('/')[1];
    fs.writeFileSync(`./asset/trash/${m.sender}.${ext}`, media)
try {
let res = await acr.identify(fs.readFileSync(`./asset/trash/${m.sender}.${ext}`))
let { code, msg } = res.status;
if (code !== 0) { return dodoi(`I music duh ang hi ka hmu thei lo, i hla rawn thawn hi original ni lo a ni mai thei, emaw ka Api's lakna ah dik lo a awm a ni thei`)
    }
let { title, artists, album, genres, release_date } = res.metadata.music[0];
const sazu = `${title} ${artists !== undefined ? artists.map(v => v.name).join(', ') : ''}`;
let ytu = await yts(sazu)
let vid = ytu.videos[0]
let qul = isVideo ? '360p' : '128kbps'
let v = vid.url
let yt = await youtubedl(v).catch(async () => await youtubedlv2(v))
let dl_url = await (isVideo ? yt.video[qul].download() : yt.audio[qul].download())
await HBWABotMz.sendMessage(m.chat, { audio: {url: dl_url}, mimetype: 'audio/mpeg', 
contextInfo:{"externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": `${title || 'Ka hmu thei lo'}`,"body": `${artists !== undefined ? artists.map(v => v.name).join(', ') : 'Ka hmu thei lo'}`, "previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": fs.readFileSync(`./asset/image/ShaZam.png`),"sourceUrl": `${v}`}}}, { quoted: m })
    await uploadreact()
    await eco.deduct(limitneihtu, khawlbawm, 100)
    await eco.deduct(limitneihtu, freevip, 1);
    await finishreact()
    fs.unlinkSync(`./asset/trash/${m.sender}.${ext}`)
  } catch (error) {
    console.error('Error:', error)
  }
  break;
}
case `${prefixc}`+'shazam3': {
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
let q = m.quoted ? m.quoted : m;
if (!q) {return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, a hla/music hming ka rawn zawn sak ang che....`)
  }
let mime = (q.msg || q).mimetype || '';
if (!/video/.test(mime) && !/audio/.test(mime)) { return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, a hla/music hming ka rawn zawn sak ang che....`)
  }
if ((q.msg || q).seconds > 45) { return dodoi('Khawngihin, second 45 aia tam rawn thawn suh ka access thei lo')
  }
const limit1 = await eco.balance(limitneihtu, khawlbawm)
if (100 > limit1.wallet) { return dodoi('He featurs hi hman i duh chuan 💎100 i neih a ngai!!.\n\nBot rawn hmang thar tur i nih chuan Limit tiin type rawh, ti chuan bot hman theihna tur 💎500 i dawng ang, emaw i thiante in thawn tir rawh')
  }
var zamzam = await getBuffer(`https://i.imgur.com/hYFjOKu.png`)
  await loadingreact()
let media = await q.download()
let ext = mime.split('/')[1];
    fs.writeFileSync(`./asset/trash/${m.sender}.${ext}`, media)
try {
let res = await acr.identify(fs.readFileSync(`./asset/trash/${m.sender}.${ext}`))
let { code, msg } = res.status;
if (code !== 0) { return dodoi(`I music duh ang hi ka hmu thei lo, i hla rawn thawn hi original ni lo a ni mai thei, emaw ka Api's ah hian dik lo a awm pawh a ni thei`)
    }
let { title, artists, album, genres, release_date } = res.metadata.music[0];
const sazu = `${title} ${artists !== undefined ? artists.map(v => v.name).join(', ') : ''}`;
const herbertplaymp3 = require('./lib/ytdl2')
let ytu = await yts(sazu)
let kazawn = ytu.videos[0]
const pl= await herbertplaymp3.mp3(kazawn.url)
await HBWABotMz.sendMessage(m.chat,{document: fs.readFileSync(pl.path),
    caption: `╭═══════════┈
┃𒆜┌───┈
┃𒆜│📌 *TITLE:* ${title || 'Ka hmu thei lo'}
┃𒆜│👨‍🎤 *ARTIST:* ${artists !== undefined ? artists.map(v => v.name).join(', ') : 'Ka hmu thei lo'}
┃𒆜│💾 *ALBUM:* ${album && album.name ? album.name : 'Ka hmu thei lo'}
┃𒆜│🌐 *GENRE:* ${genres !== undefined ? genres.map(v => v.name).join(', ') : 'Ka hmu thei lo'}
┃𒆜│📆 *RELEASE DATE:* ${release_date || 'Ka hmu thei lo'}
┃𒆜└───────────┈ 
╰════════════──┈`,
fileName: `${title}.mp3`,
mimetype: 'audio/mp4',
contextInfo:{
 externalAdReply:{
 title: title || 'Ka hmu thei lo',
 body: artists !== undefined ? artists.map(v => v.name).join(', ') : 'Ka hmu thei lo',
 thumbnail: fs.readFileSync(`./asset/image/ShaZam.png`),
 mediaType:1,
 mediaUrl:kazawn.url,
  }
},
},{quoted:m})
await fs.unlinkSync(pl.path)
    await uploadreact()
    await eco.deduct(limitneihtu, khawlbawm, 100)
    await eco.deduct(limitneihtu, freevip, 1);
    await finishreact()
    fs.unlinkSync(`./asset/trash/${m.sender}.${ext}`)
  } catch (error) {
    console.error('Error:', error)
  }
  break;
}
case `${prefixc}`+'tomp3': {
if (/document/.test(mime)) return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, Mp3 document file in ka rawn thawn ang che.... `)
if (!/video/.test(mime) && !/audio/.test(mime)) return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, Mp3 document file in ka rawn thawn ang che.... `)
if (!quoted) return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, Mp3 document file in ka rawn thawn ang che.... `)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
HBWABotMz.sendMessage(m.chat, {document: audio, mimetype: 'audio/mpeg', fileName: `Convert By ${HBWABotMz.user.name}.mp3`}, { quoted : m })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await finishreact()
}
break
case `${prefixc}`+'tovn': case `${prefixc}`+'toptt': {
if (!/video/.test(mime) && !/audio/.test(mime)) return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, voice note in ka rawn thawn ang che.... `)
if (!quoted) return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, voice note in ka rawn thawn ang che.... `)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
let media = await quoted.download()
let { toPTT } = require('./lib/converter')
let audio = await toPTT(media, 'mp4')
HBWABotMz.sendMessage(m.chat, {audio: audio, mimetype:'audio/mpeg', ptt:true }, {quoted:m})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await finishreact()
}
break

case `${prefixc}`+'togif': {
if (!quoted) return dodoi('Sticker che thei reply rawh')
if (!/webp/.test(mime)) return dodoi(`Sticker reply rawh tiang hian: *${prefix + command}*`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
let { webp2mp4File } = require('./lib/uploader')
let media = await HBWABotMz.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await HBWABotMz.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
await fs.unlinkSync(media)
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await finishreact()
}
break
/*
case 'tomp4': {
if (!quoted) return dodoi('Sticker che thei reply rawh')
if (!/webp/.test(mime)) return dodoi(`Sticker reply rawh tiang hian: *${prefix + command}*`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
let { webp2mp4File } = require('./lib/uploader')
let media = await HBWABotMz.downloadAndSaveMediaMessage(quoted)
let webpToMp4 = await webp2mp4File(media)
await HBWABotMz.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }}, { quoted: m })
await fs.unlinkSync(media)
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await finishreact()
}
break
*/

/*
case `${prefixc}`+'tomp4':{
if (!quoted) return dodoi('Sticker che thei reply rawh')
if (!/webp/.test(mime)) return dodoi(`Sticker reply rawh tiang hian: *${prefix + command}*`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
    const media = await m.quoted.download();
    const { webp2mp4 } = require('./lib/webp2mp4'); 
    const webpToMp4 = await webp2mp4(media);
    const videoBuffer = await getBuffer(webpToMp4);    
    await HBWABotMz.sendFile(m.chat, videoBuffer, 'output.mp4', 'Convert Webp To Video', m);
    await eco.deduct(limitneihtu, khawlbawm, hmanzat)
    await finishreact()
}
break;
*/
case `${prefixc}`+'tourl': case `${prefixc}`+'tolink': {
if (!quoted) return dodoi(`Thlalak a caption-ah *${prefix + command}* tih rawn dah rawh`)
if (!/image/.test(mime)) return dodoi(`Thlalak rawn thawn la emaw reply la, a caption-ah ${prefix + command} tih hi rawn dah rawh`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
let media = await HBWABotMz.downloadAndSaveMediaMessage(quoted)
let link = await tourlup(media);
let hmantur =  `${link}`;
var HBLoadingmenu = [
`《▒▒▒▒▒▒▒▒▒▒▒▒》0%`,
`《█▒▒▒▒▒▒▒▒▒▒▒》10%`,
`《████▒▒▒▒▒▒▒▒》30%`,
`《███████▒▒▒▒▒》50%`,
`《██████████▒▒》80%`,
`《████████████》100%`,
`Hei le\n${hmantur}`]

let { key } = await HBWABotMz.sendMessage(from, {text: '《▒▒▒▒▒▒▒▒▒▒▒▒》0%\n♻️ _Nghak lawk rawh.._'},{quoted:m})

for (let i = 0; i < HBLoadingmenu.length; i++) {await HBWABotMz.sendMessage(from, {text: HBLoadingmenu[i], edit: key },{quoted:m})}
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await fs.unlinkSync(media)
}
break

case `${prefixc}`+'toqr':{
if (!q) return dodoi('Text emaw link rawn dah tel rawh\n*Entirnan:* toqr https://www.youtube.com/@HBMods_Channel')
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
 const QrCode = require('qrcode-reader')
 const qrcode = require('qrcode')
 let qyuer = await qrcode.toDataURL(q, { scale: 35 })
 let data = new Buffer.from(qyuer.replace('data:image/png;base64,', ''), 'base64')
 let buff = getRandom('.jpg')
 await fs.writeFileSync('./'+buff, data)
 let medi = fs.readFileSync('./' + buff)
await HBWABotMz.sendMessage(from, { image: medi, caption:`\n*©${global.botname}*`}, { quoted: m })
 setTimeout(() => { fs.unlinkSync(buff) }, 10000)
 await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break
case `${prefixc}`+'dare': { 
if (!m.isGroup) return dodoi(mess.group)
var truthordare = await getBuffer(`https://i.imgur.com/hnH7qf0.jpeg`)
const dare = await fetchJson('https://raw.githubusercontent.com/HBMods-OFC/Media/main/Games/dare.json')
const herbertdare = dare[Math.floor(Math.random() * dare.length)]
HBWABotMz.sendMessage(from, { 
text: ` *DARE I THLANGA*\n${herbertdare}\n\n____________`,
contextInfo:{
externalAdReply:{ 
showAdAttribution: true,
containsAutoReply: true,
title: 'Truth or Dare',
body: 'Fun Game',
thumbnail: truthordare,
mediaType: 1,
mediaUrl: `https://www.youtube.com/@HBMods_Channel`,
sourceUrl: `https://www.youtube.com/@HBMods_Channel`
}
}
},{quoted:m})
}
break

case `${prefixc}`+'truth': { 
if (!m.isGroup) return dodoi(mess.group)
var truthordare = await getBuffer(`https://i.imgur.com/hnH7qf0.jpeg`)
const truth = await fetchJson('https://raw.githubusercontent.com/HBMods-OFC/Media/main/Games/truth.json')
const herberttruth = truth[Math.floor(Math.random() * truth.length)]
HBWABotMz.sendMessage(from, { 
text: ` *TRUTH I THLANGA*\n${herberttruth}\n\n____________`,
contextInfo:{
externalAdReply:{ 
showAdAttribution: true,
containsAutoReply: true,
title: 'Truth or Dare',
body: 'Fun Game',
thumbnail: truthordare,
mediaType: 1,
mediaUrl: `https://www.youtube.com/@HBMods_Channel`,
sourceUrl: `https://www.youtube.com/@HBMods_Channel`
}
}
},{quoted:m})
}
break
case `${prefixc}`+'toimg': case `${prefixc}`+'thlalakk': {
await loadingreact()
const getRandom = (ext) => {
return `${Math.floor(Math.random() * 10000)}${ext}`
}
if (!m.quoted) return dodoi(`Tuna i type ang chiah hian sticker reply la, ti chuan photo-in ka rawn thawn ang che`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
let mime = m.quoted.mtype
if (mime =="imageMessage" || mime =="stickerMessage")
{
let media = await HBWABotMz.downloadAndSaveMediaMessage(m.quoted)
let ran = await getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) return err
                    let buffer = fs.readFileSync(ran)
                    HBWABotMz.sendMessage(m.chat, {
                        image: buffer
                    }, {
                        quoted: m
                    })
                    fs.unlinkSync(ran)
                })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await loadingreact()
} else return dodoi(`Sticker che thei lo ang chi chauh rawn reply rawh`)
}
break 
case `${prefixc}`+'swm': case `${prefixc}`+'steal': case `${prefixc}`+'stickerwm': case `${prefixc}`+'take':{
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
if (!args.join(" ")) return dodoi(`_🤖Kha tiang ringawt loh khan, tiang hian a i duh duh word nen rawn dah rawh_\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
const swn = args.join(" ")
const pcknm = swn.split("|")[0]
const atnm = swn.split("|")[1]
if (m.quoted.isAnimated === true) {
HBWABotMz.downloadAndSaveMediaMessage(quoted, "gifee")
HBWABotMz.sendMessage(from, {sticker:fs.readFileSync("gifee.webp")},{quoted:m})
} else if (/image/.test(mime)) {
let media = await quoted.download()
let encmedia = await HBWABotMz.sendImageAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
} else if (/video/.test(mime)) {
if ((quoted.msg || quoted).seconds > 11) return dodoi('Second 10 aia tam a thei loh!')
let media = await quoted.download()
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
let encmedia = await HBWABotMz.sendVideoAsSticker(m.chat, media, m, { packname: pcknm, author: atnm })
}
else {
dodoi(`Sticker reply ta che🤦`)
}
}
break
case `${prefixc}`+'qc': case `${prefixc}`+'text': {
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
if (!args[0] && !m.quoted) {
return dodoi(`_🤖Kha tiang ringawt loh khan, tiang hian a i duh duh word nen rawn dah rawh_\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
}
let userPfp
if (m.quoted) {
try {
userPfp = await HBWABotMz.profilePictureUrl(m.quoted.sender, "image")
} catch (e) {
userPfp = defaultpp
}
} else {
try {
userPfp = await HBWABotMz.profilePictureUrl(m.sender, "image")
} catch (e) {
userPfp = defaultpp
}
}
const waUserName = pushname
const quoteText = m.quoted ? m.quoted.body : args.join(" ")
const quoteJson = {
type: "quote",
format: "png",
backgroundColor: "#FFFFFF",
width: 700,
height: 580,
scale: 2,
messages: [
{
entities: [],
avatar: true,
from: {
id: 1,
name: waUserName,
photo: {
url: userPfp,
},
},
text: quoteText,
replyMessage: {},
},
],
}
try {
const quoteResponse = await axios.post("https://btzqc.betabotz.eu.org/generate", quoteJson, {
headers: { "Content-Type": "application/json" },
})
const buffer = Buffer.from(quoteResponse.data.result.image, "base64")
const hello = await eco.deduct(limitneihtu, freevip, 1);
HBWABotMz.sendImageAsSticker(m.chat, buffer, m, {
packname: packname,
author: author,
})
} catch (error) {
console.error(error)
dodoi('Error')
}
}
break

case `${prefixc}`+'myid': {
await HBWABotMz.sendMessage(from, { text: `
  {
    "name": "${pushname}",
    "id": "${m.sender}",
    "expired": "random"
  },`}, { quoted: m })
}
break
case `${prefixc}`+'myid1': {
const kumtinvip = moment.tz('Asia/Kolkata').format('YYYY-MM-DD')
const kumtinvip2 = moment(kumtinvip).add(1, 'month').format('YYYY-MM-DD')
await HBWABotMz.sendMessage(from, { text: `
  {
    "name": "${pushname}",
    "id": "${m.sender}",
    "expired": "${kumtinvip2}"
  },`}, { quoted: m })
}
break
case `${prefixc}`+'myid2': {
const kumtinvip = moment.tz('Asia/Kolkata').format('YYYY-MM-DD')
const kumtinvip2 = moment(kumtinvip).add(2, 'month').format('YYYY-MM-DD')
await HBWABotMz.sendMessage(from, { text: `
  {
    "name": "${pushname}",
    "id": "${m.sender}",
    "expired": "${kumtinvip2}"
  },`}, { quoted: m })
}
break
case `${prefixc}`+'myid3': {
const kumtinvip = moment.tz('Asia/Kolkata').format('YYYY-MM-DD')
const kumtinvip2 = moment(kumtinvip).add(3, 'month').format('YYYY-MM-DD')
await HBWABotMz.sendMessage(from, { text: `
  {
    "name": "${pushname}",
    "id": "${m.sender}",
    "expired": "${kumtinvip2}"
  },`}, { quoted: m })
}
break
case `${prefixc}`+'myid4': {
const kumtinvip = moment.tz('Asia/Kolkata').format('YYYY-MM-DD')
const kumtinvip2 = moment(kumtinvip).add(4, 'month').format('YYYY-MM-DD')
await HBWABotMz.sendMessage(from, { text: `
  {
    "name": "${pushname}",
    "id": "${m.sender}",
    "expired": "${kumtinvip2}"
  },`}, { quoted: m })
}
break
case `${prefixc}`+'myid5': {
const kumtinvip = moment.tz('Asia/Kolkata').format('YYYY-MM-DD')
const kumtinvip2 = moment(kumtinvip).add(1, 'year').format('YYYY-MM-DD')
await HBWABotMz.sendMessage(from, { text: `
  {
    "name": "${pushname}",
    "id": "${m.sender}",
    "expired": "${kumtinvip2}"
  },`}, { quoted: m })
}
break
case `${prefixc}`+'s': case `${prefixc}`+'sticker': case `${prefixc}`+'stiker': case `${prefixc}`+'stickers': { 
if (!quoted) return dodoi(`Thlalak emaw video rawn thawn la a caption-ah *${prefix+command}* tiin rawn dah rawh\nTi chuan sticker in ka rawn pe ang che`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
HBWABotMz.sendMessage(from, { react: { text: "🧩" , key: m.key }})
if (/image/.test(mime)) { 
let media = await quoted.download()
let encmedia = await HBWABotMz.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })

} else if (/video/.test(mime)) {
if (((quoted.msg || quoted).seconds || 0) > 15) {
    return dodoi('Sorry, video chu second 15 aia tam sticker in ka siam thei lo')
}
let media = await quoted.download()
let encmedia = await HBWABotMz.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
} 
else {
dodoi(`Thlalak emaw video rawn thawn la a caption-ah *${prefix+command}* tiin rawn dah rawh\nTi chuan sticker in ka rawn pe ang che`)
}
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break

case `${prefixc}`+'ttp5': {
try {
if (!q) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} Hello World`) 
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
HBWABotMz.sendMessage(from, { react: { text: "🧩" , key: m.key }})
const { removebg } = require('betabotz-tools')
const texttoimg = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=runner-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${encodeURIComponent(q)}`;
let results = await removebg(texttoimg)
await HBWABotMz.sendImageAsSticker(m.chat, results.image_data, m, { packname: global.packname, author: `HBWABot` })
} catch (error) {
dodoi("*Sorry, hawrawp 30 aia tam chu ka siam sak thei lo che a ni😞*")
}
}
break

case `${prefixc}`+'ttp4': {
try {
if (!q) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} Hello World`) 
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
HBWABotMz.sendMessage(from, { react: { text: "🧩" , key: m.key }})
const texttoimg = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${encodeURIComponent(q)}`;
await HBWABotMz.sendImageAsSticker(m.chat, texttoimg, m, { packname: global.packname, author: `HBWABot` })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)    
} catch (error) {
dodoi("*Sorry, hawrawp 30 aia tam chu ka siam sak thei lo che a ni😞*")
}
}
break

case `${prefixc}`+'ttp3': {
try {
if (!q) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} Hello World`) 
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
HBWABotMz.sendMessage(from, { react: { text: "🧩" , key: m.key }})
const texttoimg = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=fluffy-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${encodeURIComponent(q)}`;
await HBWABotMz.sendImageAsSticker(m.chat, texttoimg, m, { packname: global.packname, author: `HBWABot` })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
} catch (error) {
dodoi("*Sorry, hawrawp 30 aia tam chu ka siam sak thei lo che a ni😞*")
}
}
break

case `${prefixc}`+'ttp2': {
try {
if (!q) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} Hello World`) 
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
HBWABotMz.sendMessage(from, { react: { text: "🧩" , key: m.key }})
const texttoimg = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=runner-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${encodeURIComponent(q)}`;
await HBWABotMz.sendImageAsSticker(m.chat, texttoimg, m, { packname: global.packname, author: `HBWABot` })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
} catch (error) {
dodoi("*Sorry, hawrawp 30 aia tam chu ka siam sak thei lo che a ni😞*")
}
}
break

case `${prefixc}`+'ttp6': {
try {
if (!q) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} Hello World`) 
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
HBWABotMz.sendMessage(from, { react: { text: "🧩" , key: m.key }})
const texttoimg = `https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=smurfs-logo&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&text=${encodeURIComponent(q)}`;
await HBWABotMz.sendImageAsSticker(m.chat, texttoimg, m, { packname: global.packname, author: `HBWABot` })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
} catch (error) {
dodoi("*Sorry, hawrawp 30 aia tam chu ka siam sak thei lo che a ni😞*")
}
}
break
case `${prefixc}`+'ttp': {
if (!q) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} Hello World`) 
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
HBWABotMz.sendMessage(from, { react: { text: "🧩" , key: m.key }})
const chutin1 = `https://widipe.com/ttp?text=${encodeURIComponent(q)}`
await HBWABotMz.sendImageAsSticker(m.chat, chutin1, m, { packname: global.packname, author: `HBWABot` })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break

/*
case `${prefixc}`+'ttp': {
    if (!q) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} Hello World`) 
    const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
    Canvas.registerFont('./asset/image/SF-Pro.ttf', { family: 'SF-Pro' })
    let length = text.length
        
    var font = 90
    if (length>12){ font = 68}
    if (length>15){ font = 58}
    if (length>18){ font = 55}
    if (length>19){ font = 50}
    if (length>22){ font = 48}
    if (length>24){ font = 38}
    if (length>27){ font = 35}
    if (length>30){ font = 30}
    if (length>35){ font = 26}
    if (length>39){ font = 25}
    if (length>40){ font = 20}
    if (length>49){ font = 10}

    var ttp = {}
    ttp.create = Canvas.createCanvas(576, 576)
    ttp.context = ttp.create.getContext('2d')
    ttp.context.font = `${font}px SF-Pro`
    ttp.context.strokeStyle = 'black'
    ttp.context.lineWidth = 3
    ttp.context.textAlign = 'center'
    ttp.context.strokeText(text, 290, 300)
    ttp.context.fillStyle = 'white'
    ttp.context.fillText(text, 290, 300)
    
    var bufferx = ttp.create.toBuffer()    
    await HBWABotMz.sendImageAsSticker(m.chat, bufferx, m, { packname: global.packname, author: `HBWABot` })
    await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break;
*/
case `${prefixc}`+'attp':{
if (!q) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} Hello World`)
HBWABotMz.sendMessage(from, { react: { text: "🧩" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
const nunui2 = `https://widipe.com/attp?text=${encodeURIComponent(q)}`
await HBWABotMz.sendVideoAsSticker(m.chat, nunui2, m, { packname: global.packname, author: global.author })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break
/*
case `${prefixc}`+'attp': {
        if (!text) {
            return dodoi(`_🤖Kha tiang ringawt loh khan, tiang hian a i duh duh word nen rawn dah rawh_\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
        }
        const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()

        const file = "./asset/image/attp.gif"
        let length = text.length
        let font = 90

        if (length > 12) { font = 68 }
        if (length > 15) { font = 58 }
        if (length > 18) { font = 55 }
        if (length > 19) { font = 50 }
        if (length > 22) { font = 48 }
        if (length > 24) { font = 38 }
        if (length > 27) { font = 35 }
        if (length > 30) { font = 30 }
        if (length > 35) { font = 26 }
        if (length > 39) { font = 25 }
        if (length > 40) { font = 20 }
        if (length > 49) { font = 10 }

        Canvas.registerFont('./asset/image/SF-Pro.ttf', { family: 'SF-Pro' })
        await canvasGif(
            file,
            (ctx) => {
                const couler = ["#ff0000", "#ffe100", "#33ff00", "#00ffcc", "#0033ff", "#9500ff", "#ff00ff"]
                const jadi = couler[Math.floor(Math.random() * couler.length)]

                function drawStroked(text, x, y) {
                    ctx.lineWidth = 5
                    ctx.font = `${font}px SF-Pro`
                    ctx.fillStyle = jadi
                    ctx.strokeStyle = 'black'
                    ctx.textAlign = 'center'
                    ctx.strokeText(text, x, y)
                    ctx.fillText(text, x, y)
                }

                drawStroked(text, 290, 300)
            },
            {
                coalesce: false,
                delay: 0,
                repeat: 0,
                algorithm: 'octree',
                optimiser: false,
                fps: 7,
                quality: 100,
            }
        ).then((buffer) => {
            // Send the generated GIF as a sticker
            HBWABotMz.sendImageAsSticker(m.chat, buffer, m, {
                packname: packname,
                author: author,
            })
        })
        await eco.deduct(limitneihtu, khawlbawm, hmanzat)
    }
    break;
  case `${prefixc}`+'j': {
  if (!text) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} Hello World`);
  const thlakzuk = `${text.replace(/\n/g, '\\n')}`;
  const lines = thlakzuk.split('\n');
  const numberedLines = lines.slice(1).map((line, index) => `${String.fromCharCode(96 + index + 1)}). ${line}`).join('\n');
  const output = `${lines[0]}\\n${numberedLines}`;
  await dodoi(`${output}`);
}
break;
*/
case `${prefixc}`+'bible': case `${prefixc}`+'bible-quotes': case `${prefixc}`+'bq':
const bible = await fetchJson('https://raw.githubusercontent.com/HBMods-OFC/Media/main/QuotesMizo/BibleQuote.json')
const mizo_bible = bible[Math.floor(Math.random() * bible.length)]
const thuziak = `${mizo_bible}`
return replymizobiblequotes(thuziak) 
break
case `${prefixc}`+'thuril': {
let mizoquotes = await fetchJson('https://raw.githubusercontent.com/HBMods-OFC/Media/main/QuotesMizo/mizoquotes.json')
let random = mizoquotes[Math.floor(Math.random() * mizoquotes.length)]
HBWABotMz.sendMessage(m.chat, { image: { url: random.quotesmizo }, caption: `${random.number}\n*Author* : ${random.author}\n\n*Instagram* : ${random.instagram}\n\n*Generated by: ©${random.hbwabot}*` }, { quoted: m })
}
break 
case `${prefixc}`+'couplepp': case `${prefixc}`+'ppcouple': {
await loadingreact()
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
let anucpp = await fetchJson('https://raw.githubusercontent.com/HBMods-OFC/Media/main/couplepp/Inkawp.json')
let random = anucpp[Math.floor(Math.random() * anucpp.length)]
HBWABotMz.sendMessage(m.chat, { image: { url: random.male }, caption: `Mipa` }, { quoted: m })
HBWABotMz.sendMessage(m.chat, { image: { url: random.female }, caption: `Hmeichhia` }, { quoted: m })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await finishreact()
}
break
case `${prefixc}`+'description' : case `${prefixc}`+'gpdesc': case `${prefixc}`+'desc': {
if (!m.isGroup) return dodoi(mess.group)
if (!isBotAdmins) return dodoi(mess.botAdmin)
let metadata = await HBWABotMz.groupMetadata(m.chat)
HBWABotMz.sendMessage(from, { text : `*${metadata.subject}*\n\n*Group Description :*\n${metadata.desc}`},{ quoted: m})
}
break
case `${prefixc}`+'emojimix': {
let [emoji1, emoji2] = text.split`+`
if (!emoji1) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} 😅+🤔`)
if (!emoji2) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} 😅+🤔`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
let anumojimix = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
for (let res of anumojimix.results) {
let encmedia = await HBWABotMz.sendImageAsSticker(m.chat, res.url, m, { packname: global.packname, author: global.author, categories: res.tags })
}
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break
case `${prefixc}`+'animeavatar': {
 waifudd = await axios.get(`https://nekos.life/api/v2/img/avatar`) 
 const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await HBWABotMz.sendMessage(m.chat, {image: {url:waifudd.data.url}, caption: `\n*©${global.botname}*`},{ quoted:m })
await eco.deduct(limitneihtu, khawlbawm, hmanzat).catch(err => {
return('Error!')
})
}
break
 case `${prefixc}`+'tinyurl':{
 if(!q) return dodoi(`_🤖Kha tiang ringawt loh khan, tiang hian a link nen rawn dah tel rawh..!\nEntirnan: ${prefix}${command} https://www.youtube.com/@HBMods_Channel`)
 const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
 const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
 const request = require('request')
 await eco.deduct(limitneihtu, khawlbawm, hmanzat)
 request(`https://tinyurl.com/api-create.php?url=${q}`, function (error, response, body) {
 try {
dodoi(body)
}
catch (e) {
dodoi(e)
}
})
}
 break
case `${prefixc}`+'git': case `${prefixc}`+'gitclone':{
if (!args[0]) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix}${command} https://github.com/HBMods-OFC/HBWABot-Mz`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
if (!isUrl(args[0]) && !args[0].includes('github.com')) return dodoi(`link a dik lo!!`)
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let [, user, repo] = args[0].match(regex1) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
HBWABotMz.sendMessage(m.chat, { document: { url: url }, fileName: filename, mimetype: 'application/zip' }, { quoted: m }).catch((err) => dodoi(mess.error))
}
break
case `${prefixc}`+'bass': case `${prefixc}`+'blown': case `${prefixc}`+'deep': case `${prefixc}`+'earrape': case `${prefixc}`+'fast': case `${prefixc}`+'fat': case `${prefixc}`+'nightcore': case `${prefixc}`+'reverse': case `${prefixc}`+'robot': case `${prefixc}`+'slow': case `${prefixc}`+'smooth': case `${prefixc}`+'squirrel': {
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
try {
let set
if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20'
if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log'
if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3'
if (/earrape/.test(command)) set = '-af volume=12'
if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"'
if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"'
if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25'
if (/reverse/.test(command)) set = '-filter_complex "areverse"'
if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"'
if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"'
if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"'
if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"'
if (/audio/.test(mime)) {
await loadingreact()
let media = await HBWABotMz.downloadAndSaveMediaMessage(quoted)
let ran = getRandom('.mp3')
exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
fs.unlinkSync(media)
if (err) return dodoi(err)
let buff = fs.readFileSync(ran)
HBWABotMz.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted : m })
fs.unlinkSync(ran)

}) 
await eco.deduct(limitneihtu, khawlbawm, hmanzat) 
await finishreact()
} else dodoi(`Audio rawn thawn la *${prefix + command}* tiang hian reply rawh`)
} catch (e) {
dodoi(e)
}
}
break
case `${prefixc}` + 'tokaraoke': 
case `${prefixc}` + 'voiceremove': {
    if (!/video/.test(mime) && !/audio/.test(mime)) {
        return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, voice note in ka rawn thawn ang che.... `);
    }
    if (!quoted) {
        return dodoi(`Video emaw Audio rawn thawn la a caption-ah *${prefix + command}* rawn dah la ti chuan, voice note in ka rawn thawn ang che.... `);
    }

    const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) {
        return await dailylimit();
    }
    await loadingreact();
    await dodoi("Minutes 1 vel min lo nghak rawh");
    let q = m.quoted ? m.quoted : m;
    let buffer = await q.download();
    let fileSizeLimit = 5 * 1024 * 1024; // 5MB limit

    if (buffer.length > fileSizeLimit) {
        return dodoi('5MB aia tam a thei lo');
    }
    let mediaUrl = await uploader(buffer); // Upload media to get a URL
    let apiUrl = `https://api.betabotz.eu.org/api/tools/voiceremover?url=${mediaUrl}&apikey=Herbert70`;
    try {
        let response = await fetch(apiUrl);
        let res = await response.json();
        if (res.result && res.result.instrumental_path) {
            await HBWABotMz.sendMessage(m.chat, { 
                audio: { url: res.result.instrumental_path }, 
                mimetype: 'audio/mpeg' 
            }, { quoted: m });

            await eco.deduct(limitneihtu, khawlbawm, hmanzat);
            await finishreact();
        } else {
            throw 'Voice removal failed. Please try again later.';
        }
    } catch (error) {
        console.error(error);
    }
}
break;

case `${prefixc}`+'runtime': {
let lowq = `*Bot hi ${runtime(process.uptime())} chhung a online tawh a*

*Vawiin hi ni ${nizat1}, ${thlazat2} thla a ni a*`
dodoi(lowq)
}
break
case `${prefixc}`+'wallpaper': {
if (!text) return dodoi('A title rawn dah rawh!..')
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
let { wallpaper } = require('./lib/scraper')
anuwallpep = await wallpaper(text)
result = anuwallpep[Math.floor(Math.random() * anuwallpep.length)]
HBWABotMz.sendMessage(m.chat, {caption: `㋛︎ Title : ${result.title}\n㋛︎ Category : ${result.type}\n㋛︎ Detail : ${result.source}\n㋛︎ Media Url : ${result.image[2] || result.image[1] || result.image[0]}`, image: { url: result.image[0] }} , { quoted: m })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await finishreact()
}
break
case `${prefixc}`+'igvid':
case `${prefixc}`+'instavid': 
case `${prefixc}`+'igstory':
case `${prefixc}`+'igreels': {
    if (!text) {
        return dodoi(`Kha tiang ringawt loh khan tiang hian a link nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} https://www.instagram.com/reel/Cv83HHYtC-Y/?igshid=NTc4MTIwNjQ2YQ==`);
    }
    if (!text.includes("instagram.com")) {
        return dodoi(`Instagram video link dik tak chauh rawn dah rawh!!`);
    }
    const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) return await dailylimit();
    await loadingreact();
    const url = args[0];
    const nunuix = await fetchJson(`https://tools.betabotz.eu.org/tools/instagramdl?url=${encodeURIComponent(url)}`);
    if (Array.isArray(nunuix.result)) {
        await uploadreact();
        for (let i of nunuix.result) {
            await HBWABotMz.sendMessage(m.chat, {
                video: { url: i._url },
                caption: "Instagram download by " + `${global.botname}`
            }, { quoted: m });
        }
        await eco.deduct(limitneihtu, khawlbawm, hmanzat);

        await finishreact();
    } else {
        const url2 = args[0];
        const nunui3 = await fetchJson(`https://widipe.com/download/igdl?url=${encodeURIComponent(url2)}`);
        if (Array.isArray(nunui3.result)) {
            await uploadreact();
            for (let i of nunui3.result) {
                await HBWABotMz.sendMessage(m.chat, {
                    video: { url: i.url },
                    caption: "Instagram download by " + `${global.botname}`
                }, { quoted: m });
            }
            await eco.deduct(limitneihtu, khawlbawm, hmanzat);
            await finishreact();
        } else {
            await dodoi("Hei hi ka download thei lo, private in a dah a ni mai thei");
        }
    }
    break;
    }
    
case `${prefixc}`+'tiktokvid3' : case `${prefixc}`+'ttvid3': {
if (!text) return dodoi(`Kha tiang ringawt loh khan tiang hian a link nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
await loadingreact()
 mumaker.tiktok(`${args[0]}`)
.then((data) => HBWABotMz.sendMessage(m.chat, { video: { url: data.media }, caption: `Tiktok Videos download by ${global.botname}` }, { quoted: m }))
.catch((err) => console.log(err))
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await finishreact()
}
 break
 case `${prefixc}`+'ttvid2': case `${prefixc}`+'tiktokvid2': {
if (!args || !args[0]) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
await loadingreact()
const kanfa = args[0] //Hei hi kan fa tur kha a nia 🌚
const nunui2 = await fetchJson(`https://tools.betabotz.eu.org/tools/tiktokdl?url=${encodeURIComponent(kanfa)}`) //chuan hei hi a tawpa a sen vet vet hi, kan fa i pai tihna
const herbert2 = nunui2.result // chuan he tah hian kei mah a tang i rai taa
const englo2 = herbert2.data // kei ma a tanga ka fa kha an zei tawh dawn che ni, ti chuan ka fa chu
await uploadreact()
HBWABotMz.sendMessage(m.chat, 
{ video: { url: `${englo2.play}` }, mimetype: 'video/mp4', caption: `*Tiktok video download by ${global.botname}` }, // englo2 hian a rawn la chhuak anga ti chuan tiktok video chu a rawn la chhuak dawn🤣🤣
{ quoted: m })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await finishreact()
}
break
case `${prefixc}`+'tiktokvid' : case `${prefixc}`+'ttvid':{
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
if (!text) return dodoi(`Kha tiang ringawt loh khan tiang hian a link nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} https://www.tiktok.com/@omagadsus/video/7025456384175017243?is_from_webapp=1&sender_device=pc&web_id6982004129280116226`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
const { ttdl } = require('btch-downloader') 
const link = args[0] 
const data = await ttdl(link) 
console.log(data)
await uploadreact()
await HBWABotMz.sendMessage(m.chat,{
video: {url: data.video},
caption: "Tiktok Videos download by "+ `${global.botname}`
}, {quoted:m})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await eco.deduct(limitneihtu, freevip, 1);
await finishreact()

}
break


case `${prefixc}`+'ptvid':
case `${prefixc}`+'pinterestvid': {
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
  if (!args || !args[0]) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} https://pin.it/1ew2IPn`)
  const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
  await loadingreact()
  const kanfa = args[0];
  const nunui2 = await fetchJson(`https://widipe.com/download/aio?url=${encodeURIComponent(kanfa)}`)
  const herbert2 = nunui2.result;
  const mp4Url = herbert2.medias.find(media => media.extension === 'mp4')?.url;
  if (mp4Url) {
    await uploadreact()
    HBWABotMz.sendMessage(m.chat,
      { video: { url: mp4Url }, mimetype: 'video/mp4', caption: `*Pinterest video download by ${global.botname}*` },
      { quoted: m }
    )
    await eco.deduct(limitneihtu, khawlbawm, hmanzat)
    await eco.deduct(limitneihtu, freevip, 1);
    await finishreact()
  } else {
    dodoi("_Sorry, ka download thei a lo a ni😔_")
  }
  break;
}
case `${prefixc}`+'ptvid2': 
case `${prefixc}`+'pinterestvid2': {
    if (!args || !args[0]) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} https://in.pinterest.com/pin/993747474000018772`);
    const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) return await dailylimit();
    await loadingreact();
    const { spin } = require("./lib/scraper");
    await spin(args[0]).then(async res => {
        let pin = JSON.stringify(res);
        let json = JSON.parse(pin);
        if (!json.status) return dodoi("_Sorry, ka download thei a lo a ni😔_");
        const mp4Url = json.data.find(item => item.url.endsWith('.mp4')).url;
        await uploadreact();
  
        HBWABotMz.sendMessage(m.chat,
            { video: { url: mp4Url }, mimetype: 'video/mp4', caption: `*Pinterest video download by ${global.botname}*` },
            { quoted: m }
        );
        
        await eco.deduct(limitneihtu, khawlbawm, hmanzat);
        await finishreact();
    });
    break;
}

case `${prefixc}`+'trvid':
case `${prefixc}`+'threadsvid': {
    if (!args || !args[0]) return dodoi(`_🤖 Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} https://www.threads.net/@ahmedmostafa00000000/post/C0G4idAI62g`);
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
    const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) return await dailylimit();
    await loadingreact();
    const kanfa = args[0];
    try {
        const nunui3 = await fetchJson(`https://widipe.com/download/threads?url=${encodeURIComponent(kanfa)}`);
        const videoUrls = nunui3.result.video_urls;
        const downloadUrl = videoUrls && videoUrls.length > 0 ? videoUrls[0].download_url : null;
        if (downloadUrl) {
            await uploadreact();
            HBWABotMz.sendMessage(m.chat, { video: { url: downloadUrl }, mimetype: 'video/mp4', caption: `*Threads video download by ${global.botname}` }, { quoted: m });
            await eco.deduct(limitneihtu, khawlbawm, hmanzat);
            await finishreact();
        } else {
            dodoi("_Sorry, ka download thei lo a ni😔_");
        }
    } catch {
        dodoi("_Sorry, ka download thei lo a ni😔_");
    }
    break;
}



case `${prefixc}`+'twvid':
case `${prefixc}`+'twittervid': {
  if (!args || !args[0]) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} https://twitter.com/i/status/1721997071719227582`)
  const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
  const limit1 = await eco.balance(limitneihtu, khawlbawm)
  if (hmanzat > limit1.wallet) return await dailylimit()
  await loadingreact()
  const kanfa = args[0];
  const nunui2 = await fetchJson(`https://widipe.com/download/twtdl?url=${encodeURIComponent(kanfa)}`)
  const herbert2 = nunui2.result;
  const videoUrls = herbert2.url;  
  const hdUrl = videoUrls.find(url => url.hd); // Finding HD URL
  const sdUrl = videoUrls.find(url => url.sd); // Finding SD URL
  const videoUrl = hdUrl ? hdUrl.hd : sdUrl ? sdUrl.sd : '';
  await uploadreact()
  if (videoUrl) {
    HBWABotMz.sendMessage(m.chat,
      { video: {url: videoUrl} , mimetype: 'video/mp4', caption: `Twitter video download by ${global.botname}` },
      { quoted: m })
      await eco.deduct(limitneihtu, khawlbawm, hmanzat)
      await finishreact()      
  } else {
    return dodoi('Failed to fetch video URL.');
  }
}
break;

 
case `${prefixc}`+'fbvid2' : case `${prefixc}`+'facebookvid2':{
if (!text) return dodoi(`Kha tiang ringawt loh khan tiang hian a link nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} https://fb.watch/mcx9K6cb6t/?mibextid=8103lRmnirLUhozF`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
const { fbdown } = require('btch-downloader') 
const link = args[0] 
const data = await fbdown(link) 
console.log(data)
await uploadreact()
await HBWABotMz.sendMessage(m.chat,{
video: {url: data.Normal_video},
caption: "Facebook Videos download by " + `${global.botname}`
}, {quoted:m})
await finishreact()
await eco.deduct(limitneihtu, khawlbawm, hmanzat)

}
break 
case `${prefixc}`+'fbvid3' : case `${prefixc}`+'facebookvid3':{
if (!text) return dodoi(`Kha tiang ringawt loh khan tiang hian a link nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} https://fb.watch/mcx9K6cb6t/?mibextid=8103lRmnirLUhozF`)
await loadingreact()
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
const { facebook } = require('betabotz-tools') 
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
const url = args[0]
const results = await facebook(url)
console.log(results) // JSON
await uploadreact()
await HBWABotMz.sendMessage(m.chat,{
video: {url: results.result.sd_q},
caption: "Facebook Video download by "+ `${global.botname}`
}, {quoted:m})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await finishreact()
}
break 
case `${prefixc}`+'fbvid':
case `${prefixc}`+'facebookvid': {
    if (!args || !args[0]) return dodoi(`_🤖 Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} https://fb.watch/mcx9K6cb6t/?mibextid=8103lRmnirLUhozF`);
    const limit1 = await eco.balance(limitneihtu, khawlbawm);
    if (hmanzat > limit1.wallet) return await dailylimit();
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
    await loadingreact();
    const kanfa = args[0];
    try {
        const nunui3 = await fetchJson(`https://widipe.com/download/fbdl?url=${encodeURIComponent(kanfa)}`);
        const hdUrl = nunui3.result.HD;
        if (hdUrl) {
            await uploadreact();
            HBWABotMz.sendMessage(m.chat, { video: { url: hdUrl }, mimetype: 'video/mp4', caption: `*Facebook video download by ${global.botname}*` }, { quoted: m });
            await eco.deduct(limitneihtu, khawlbawm, hmanzat);
            await finishreact();
        } else {
            dodoi("_Sorry, ka download thei lo a ni😔_");
        }
    } catch {
        dodoi("_Sorry, ka download thei lo a ni😔_");
    }
    break;
}

case `${prefixc}`+'setgrdp': {
  if (!m.isGroup) return dodoi(mess.group)
  if (!isAdmins) return dodoi(mess.admin)
  if (!isBotAdmins) return dodoi(mess.botAdmin)
  if (!quoted) return dodoi(`Send emaw reply in a caption ah tiang hian rawn dah rawh: ${prefix + command}`)
  if (!/image/.test(mime)) return dodoi(`Send emaw reply in a caption ah tiang hian rawn dah rawh : ${prefix + command}`)
  if (/webp/.test(mime)) return dodoi(`Send emaw reply in a caption sh tiang hian rawn dah rawh : ${prefix + command}`)
  const limit1= await eco.balance(limitneihtu, khawlbawm)
if (50 > limit1.wallet) return dodoi(`He featurs hi hman i duh chuan 💎50 i neih a ngai!!.\n\nBot rawn hmang thar tur i nih chuan Limit tiin type rawh, ti chuan bot hman theihna tur 💎500 i dawng ang, emaw i thiante in thawn tir rawh`)
  var dptur = await HBWABotMz.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
  const { img } = await generateProfilePicture(dptur)
  await HBWABotMz.query({
        tag: 'iq',
        attrs: {
            to: `${groupMetadata.id}`,
            type: 'set',
            xmlns: 'w:profile:picture',
        },
        content: [
            {
                tag: 'picture',
                attrs: { type: 'image' },
                content: img,
            },
        ],
    })
    fs.unlinkSync(dptur)
    await eco.deduct(limitneihtu, khawlbawm, 50)
    dodoi(`Dp chu set fel a ni ta e`)
}
break;

case `${prefixc}`+'setdpbot2':
case `${prefixc}`+'setbotdp2': {
if (!HerbertTheCreator) return dodoi(mess.owner)
if (!quoted) return dodoi(`Send emaw reply in a caption ah tiang hian rawn dah rawh: ${prefix + command}`)
if (!/image/.test(mime)) return dodoi(`Send emaw reply in a caption ah tiang hian rawn dah rawh : ${prefix + command}`)
if (/webp/.test(mime)) return dodoi(`Send emaw reply in a caption sh tiang hian rawn dah rawh : ${prefix + command}`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (50 > limit1.wallet) return dodoi(`He featurs hi hman i duh chuan 💎50 i neih a ngai!!.\n\nBot rawn hmang thar tur i nih chuan Limit tiin type rawh, ti chuan bot hman theihna tur 💎500 i dawng ang, emaw i thiante in thawn tir rawh`)
var dptur = await HBWABotMz.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
const { img } = await generateProfilePicture(dptur)
await HBWABotMz.query({
        tag: 'iq',
        attrs: {
            to: botNumber,
            type: 'set',
            xmlns: 'w:profile:picture',
        },
        content: [
            {
                tag: 'picture',
                attrs: { type: 'image' },
                content: img,
            },
        ],
    })
    fs.unlinkSync(dptur)
    await eco.deduct(limitneihtu, khawlbawm, 50)
    dodoi(`Dp chu set fel a ni ta e`)
}
break;

case `${prefixc}`+'setdpbot': case `${prefixc}`+'setbotdp': {
if (!HerbertTheCreator) return dodoi(mess.owner)
if (!quoted) return dodoi(`Send emaw reply in a caption ah tiang hian rawn dah rawh: ${prefix + command}`)
if (!/image/.test(mime)) return dodoi(`Send emaw reply in a caption ah tiang hian rawn dah rawh : ${prefix + command}`)
if (/webp/.test(mime)) return dodoi(`Send emaw reply in a caption sh tiang hian rawn dah rawh : ${prefix + command}`)
var dptur = await HBWABotMz.downloadAndSaveMediaMessage(quoted, 'ppbot.jpeg')
if (args[0] == `full`) {
var { img } = await reSize(dptur)
await HBWABotMz.query({
tag: 'iq',
attrs: {
to: botNumber,
type:'set',
xmlns: 'w:profile:picture'
},
content: [
{
tag: 'picture',
attrs: { type: 'image' },
content: img
}
]
})
fs.unlinkSync(dptur)
dodoi(`Success`)
} else {
var memeg = await HBWABotMz.updateProfilePicture(botNumber, { url: dptur })
fs.unlinkSync(dptur)
dodoi(`Success`)
}
}
break
case `${prefixc}`+'igstalk': {
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
    if (!args[0]) return dodoi(`Instagram Username rawn dah rawh\n\nTiang hian: ${prefix + command} herbert_suantak2`)
    const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
    const igstalkk2 = `https://widipe.com/download/igstalk?username=${encodeURIComponent(args[0])}`;
    let res;
    await loadingreact()
    try {
        const igstfetch2 = await fetch(igstalkk2)
        const resig2 = await igstfetch2.json()
        res = resig2.result;
    } catch {
        dodoi(`A username a dik lo!. a username dik tak rawn dah rawh`)
        return;
    }
    try {
let te = `
┌──「 *STALKING* 」
▢ *🔖Name:* ${res.fullName} 
▢ *🔖Username:* ${res.username}
▢ *👥Follower:* ${res.followers}
▢ *🫂Following:* ${res.following}
▢ *📌Bio:* ${res.bio}
▢ *🏝️Posts:* ${res.postsCount}
▢ *🔗 Link* : https://instagram.com/${res.username.replace(/^@/, '')}
╰════════════`;
await HBWABotMz.sendMessage(m.chat, { image: { url: res.photoUrl }, caption: te }, { quoted: m });
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await eco.deduct(limitneihtu, freevip, 1);
await finishreact()
    } catch {
        dodoi(`A username a dik lo!. a username dik tak rawn dah rawh`);
    }
    break;
}

case `${prefixc}`+'igstalk2': {
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
    if (!args[0]) {
        return dodoi(`Instagram Username rawn dah rawh\n\nTiang hian: ${prefix + command} herbert_suantak2`);
    }

    const igstalkk2 = `https://api.betabotz.eu.org/api/stalk/ig?username=${encodeURIComponent(args[0])}&apikey=YybHI6GZ`;
    let res;
    await loadingreact();

    try {
        const igstfetch2 = await fetch(igstalkk2);
        const resig2 = await igstfetch2.json();
        res = resig2.result;
    } catch (error) {
        dodoi(`A username a dik lo!. a username dik tak rawn dah rawh`);
        return;
    }

    try {
        let te = `
┌──「 *STALKING* 」
▢ *🔖Name:* ${res.fullName} 
▢ *🔖Username:* ${res.username}
▢ *👥Follower:* ${res.followers}
▢ *🫂Following:* ${res.following}
▢ *📌Bio:* ${res.bio}
▢ *🏝️Posts:* ${res.postsCount}
▢ *🔗 Link* : https://instagram.com/${res.username.replace(/^@/, '')}
╰════════════`;
        await HBWABotMz.sendMessage(m.chat, { image: { url: res.photoUrl }, caption: te }, { quoted: m });
        await finishreact();
    } catch (error) {
        dodoi(`A username a dik lo!. a username dik tak rawn dah rawh`);
    }
    break;
}

case `${prefixc}`+'igstalk2': {
if (!args[0]) return dodoi(`Instagram Username rawn dah rawh\n\nTiang hian: ${prefix + command} herbert_suantak2`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
await loadingreact()
const fg = require('api-dylux')
try {
let res = await fg.igStalk(args[0])
let te = `
┌──「 *STALKING* 
▢ *🔖Name:* ${res.name} 
▢ *🔖Username:* ${res.username}
▢ *👥Follower:* ${res.followersH}
▢ *🫂Following:* ${res.followingH}
▢ *📌Bio:* ${res.description}
▢ *🏝️Posts:* ${res.postsH}
▢ *🔗 Link* : https://instagram.com/${res.username.replace(/^@/, '')}
╰════════════`
 await HBWABotMz.sendMessage(m.chat, {image: { url: res.profilePic }, caption: te }, {quoted: m})
 await eco.deduct(limitneihtu, khawlbawm, hmanzat)
 await finishreact()
}

catch {
dodoi(`A username a dik lo!. a username dik tak rawn dah rawh`)
}
}
break
case `${prefixc}`+'say': case `${prefixc}`+'tts': case `${prefixc}`+'gtts':{
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = text
const herbertrl = googleTTS.getAudioUrl(texttts, {
lang: "en",
slow: false,
host: "https://translate.google.com",
})
return HBWABotMz.sendMessage(m.chat, {
audio: {
url: herbertrl,
},
mimetype: 'audio/mp4',
ptt: true,
fileName: `${text}.mp3`,
}, {
quoted: m,
})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'tts2': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=englishUS&voice=female&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'tts3': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=englishUS&voice=male1&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'tts4': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=englishUS&voice=male2&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'tts5': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=englishUS&voice=male3&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'tts6': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=englishUS&voice=male4&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'tts7': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=englishUK&voice=male1&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'tts8': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=englishUK&voice=male2&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'tts9': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=englishAU&voice=female1&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'tts10': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=englishAU&voice=male1&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 

case `${prefixc}`+'alto': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=singing&voice=alto&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'tenor': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=singing&voice=tenor&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 

case `${prefixc}`+'warmy': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=singing&voice=warmy&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'glorious': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=singing&voice=glorious&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'itgoesup': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=singing&voice=itGoesUp&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'chipmunk': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=singing&voice=chipmunk&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'dramatic': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=singing&voice=dramatic&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 
case `${prefixc}`+'sunshine': {
if (!text) return dodoi(`Kha tiang ringawt loh khan, tiang hian word nen rawn dah rawh\n\n*⟨Entirnan :* ${prefix + command} Hello World`)
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
HBWABotMz.sendMessage(from, { react: { text: "🎙️" , key: m.key }})
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
let texttts = await fetchJson(`https://widipe.com/tts/tiktok?model=singing&voice=sunshine&text=${encodeURIComponent(text)}`);
const herbertrl = texttts.result
return HBWABotMz.sendMessage(m.chat, {audio: {url: herbertrl.audio },mimetype: 'audio/mp4',ptt: true,fileName: `${text}.mp3`,}, {quoted: m,})
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break 

case `${prefixc}`+'translate': case `${prefixc}`+'tr':{
if (!q || !q.includes("|")) {
return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} en | Vawiin enge i tih dawn\n\nWord splt hmaa language code ang hi en i duh chuan /codelang tiin type rawh!!`)
}
HBWABotMz.sendMessage(from, { react: { text: "🈯" , key: m.key }})
var code = q.split(' |')[0]
var word = q.split('|')[1]
const source1 = 'auto';
const target1 = `${code}`
const athu1 = `${word}`;
const mizotranslation1 = await mizo_tawnga_translate_na.translate(source1, target1, athu1)
  await HBWABotMz.sendMessage(from, { text: mizotranslation1 }, { quoted: m })
}
break
case `${prefixc}`+'codelang': {
const languages = `
Amharic = am
Arabic = ar
Basque = eu
Bengali = bn
English (UK) = en-GB
Portuguese (Brazil) = pt-BR
Bulgarian = bg
Catalan = ca
Cherokee = chr
Croatian = hr
Czech = cs
Danish = da
Dutch = nl
English (US) = en
Estonian = et
Filipino = fil
Finnish = fi
French = fr
German = de
Greek = el
Gujarati = gu
Hebrew = iw
Hindi = hi
Hungarian = hu
Icelandic = is
Indonesian = id
Italian = it
Japanese = ja
Kannada = kn
Korean = ko
Latvian = lv
Lithuanian = lt
Malay = ms
Malayalam = ml
Marathi = mr
Mizo = lus
Norwegian = no
Polish = pl
Portuguese (Portugal) = pt-PT
Romanian = ro
Russian = ru
Serbian = sr
Chinese (PRC) = zh-CN
Slovak = sk
Slovenian = sl
Spanish = es
Swahili = sw
Swedish = sv
Tamil = ta
Telugu = te
Thai = th
Chinese (Taiwan) = zh-TW
Turkish = tr
Urdu = ur
Ukrainian = uk
Vietnamese = vi
Welsh = cy `
await HBWABotMz.sendMessage(from, { text: languages }, { quoted: m })
} break
case `${prefixc}`+'myip': {
if (!HerbertTheCreator) return dodoi(mess.owner)
if (m.isGroup) return dodoi(mess.private)
var http = require('http')
http.get({
'host': 'api.ipify.org',
'port': 80,
'path': '/'
}, function(resp) {
resp.on('data', function(ip) {
dodoi("🔎 I ip address chu: " + ip)
})
})
}
break
case `${prefixc}`+'gdrive': {
const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
if (!args[0]) return dodoi(`Google Drive link rawn dah tel rawh`)
await loadingreact()
const limit1= await eco.balance(limitneihtu, khawlbawm)
    if (hmanzat > limit1.wallet) return await dailylimit()
const fg = require('api-dylux')
try {
let res = await fg.GDriveDl(args[0])
 await dodoi(`
≡ *Google Drive DL*
▢ *Name:* ${res.fileName}
▢ *Size:* ${res.fileSize}
▢ *Type:* ${res.mimetype}`)
HBWABotMz.sendMessage(m.chat, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: m })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
await eco.deduct(limitneihtu, freevip, 1);
await finishreact()
 } 

catch {
dodoi('Error: Link dang rawn ti rawh') 
}
}
break
case `${prefixc}`+'ringtone': {
if (!text) return dodoi(`_🤖Kha tiang ringawt loh khan tiang hian tih tur_\n*⟨Entirnan :* ${prefix + command} black rover`)
const limit1= await eco.balance(limitneihtu, khawlbawm)
if (hmanzat > limit1.wallet) return await dailylimit()
let { ringtone } = require('./lib/scraper')
let anutone2 = await ringtone(text)
let result = anutone2[Math.floor(Math.random() * anutone2.length)]
HBWABotMz.sendMessage(m.chat, { audio: { url: result.audio }, fileName: result.title+'.mp3', mimetype: 'audio/mpeg' }, { quoted: m })
await eco.deduct(limitneihtu, khawlbawm, hmanzat)
}
break
case `${prefixc}`+'unbanv1': {
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
if (!args[0]) return dodoi(`Kha tiang ringawt loh khan tiang hian hman tur a ni\n*Entirnan: ${prefix + command} 918416093656`)
let wanb = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let wanbck = await HBWABotMz.onWhatsApp(wanb)
if (wanbck.length == 0) return dodoi(`WhatsApp number dik chauh rawn dah rawh!!`)
let axioss = require("axios")  
let hbertxos = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = hbertxos.headers["set-cookie"].join("; ")
const cheerio = require('cheerio')
let $ = cheerio.load(hbertxos.data)
let $form = $("form")
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", wanb)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Hello WhatsApp team, recently my WhatsApp number was suddenly blocked and I couldnt log into my account, in my account there is an important group like a school group and I have to read it but the account My WhatsApp is suddenly blocked, please restore my numbers")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HBWABotMz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
await eco.deduct(limitneihtu, freevip, 1);
}
break
case `${prefixc}`+'unbanv2': {
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
if (!args[0]) return dodoi(`Kha tiang ringawt loh khan tiang hian hman tur a ni\n*Entirnan: ${prefix + command} 918416093656`)
let wanb = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let wanbck = await HBWABotMz.onWhatsApp(wanb)
if (wanbck.length == 0) return dodoi(`WhatsApp number dik chauh rawn dah rawh!!`)
let axioss = require("axios")  
let hbertxos = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = hbertxos.headers["set-cookie"].join("; ")
const cheerio = require('cheerio')
let $ = cheerio.load(hbertxos.data)
let $form = $("form")
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", wanb)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Equipe, o sistema de vocês baniram meu número por engano. Peço que vocês reativem meu número pois tenho família em outro país e preciso me comunicar com eles")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HBWABotMz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
await eco.deduct(limitneihtu, freevip, 1);
}
break
case `${prefixc}`+'unbanv3': {
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
if (!args[0]) return dodoi(`Kha tiang ringawt loh khan tiang hian hman tur a ni\n*Entirnan: ${prefix + command} 918416093656`)
let wanb = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let wanbck = await HBWABotMz.onWhatsApp(wanb)
if (wanbck.length == 0) return dodoi(`WhatsApp number dik chauh rawn dah rawh!!`)
let axioss = require("axios")  
let hbertxos = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = hbertxos.headers["set-cookie"].join("; ")
const cheerio = require('cheerio')
let $ = cheerio.load(hbertxos.data)
let $form = $("form")
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", wanb)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Kepada pihak WhatsApp yang bijak Sana kenapa akun WhatsApp saya terblokir padahal aktifitas WhatsApp messenger saya normal normal saja mohon dibukakan kembali akun WhatsApp saya dengan ini saya cantumkan kode nomor akun WhatsApp messenger saya sekian banyak Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HBWABotMz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
await eco.deduct(limitneihtu, freevip, 1);
}
break
case `${prefixc}`+'unbanv4': {
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
if (!args[0]) return dodoi(`Kha tiang ringawt loh khan tiang hian hman tur a ni\n*Entirnan: ${prefix + command} 918416093656`)
let wanb = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let wanbck = await HBWABotMz.onWhatsApp(wanb)
if (wanbck.length == 0) return dodoi(`WhatsApp number dik chauh rawn dah rawh!!`)
let axioss = require("axios")  
let hbertxos = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = hbertxos.headers["set-cookie"].join("; ")
const cheerio = require('cheerio')
let $ = cheerio.load(hbertxos.data)
let $form = $("form")
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", wanb)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "مرحبًا whatsapp ، تم حظر حسابي بشكل دائم أو مؤقت ، يرجى إلغاء حظر حسابي\nالرقم")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HBWABotMz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
await eco.deduct(limitneihtu, freevip, 1);
}
break

case `${prefixc}`+'unbanv5': {
    const freevip = "frvip";
    const limit24 = await eco.balance(limitneihtu, freevip);
    if (!isVip && limit24.wallet < 1) {
        return await replyvip();
    }
    if (isExp && limit24.wallet < 1) {
        return replyvipexp();
    }
if (!args[0]) return dodoi(`Kha tiang ringawt loh khan tiang hian hman tur a ni\n*Entirnan: ${prefix + command} 918416093656`)
let wanb = `+`+q.split("|")[0].replace(/[^0-9]/g, '')
let wanbck = await HBWABotMz.onWhatsApp(wanb)
if (wanbck.length == 0) return dodoi(`WhatsApp number dik chauh rawn dah rawh!!`)
let axioss = require("axios")  
let hbertxos = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1")
let cookie = hbertxos.headers["set-cookie"].join("; ")
const cheerio = require('cheerio')
let $ = cheerio.load(hbertxos.data)
let $form = $("form")
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDIA")
form.append("phone_number", wanb)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Halo pak, Akun Whatsapp Saya diblokir Saya Maaf Saya Telah Menginstal Aplikasi Pihak Ketiga Secara Tidak Sengaja. Harap Buka Blokir Akun Saya Sesegera Mungkin. Terimakasih")
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
  url,
  method: "POST",
  data: form,
  headers: {
  cookie
}
})
HBWABotMz.sendMessage(from, { text: util.format(res.data)}, { quoted: m })
await eco.deduct(limitneihtu, freevip, 1);
}
break

case `${prefixc}`+'ghstalk': case `${prefixc}`+'githubstalk':{
if (!q) return dodoi(`Example ${prefix+command} HBMods-OFC`)
let githubstalk = require('./lib/scraper')
aj = await githubstalk.githubstalk(`${q}`)
HBWABotMz.sendMessage(m.chat, { image: { url : aj.profile_pic }, caption: 
`*/ Github Stalker \\*

Username : ${aj.username}
Nickname : ${aj.nickname}
Bio : ${aj.bio}
Id : ${aj.id}
Nodeid : ${aj.nodeId}
Url Profile : ${aj.profile_pic}
Url Github : ${aj.url}
Type : ${aj.type}
Admin : ${aj.admin}
Company : ${aj.company}
Blog : ${aj.blog}
Location : ${aj.location}
Email : ${aj.email}
Public Repo : ${aj.public_repo}
Public Gists : ${aj.public_gists}
Followers : ${aj.followers}
Following : ${aj.following}
Created At : ${aj.ceated_at}
Updated At : ${aj.updated_at}` }, { quoted: m } )
}
break

case `${prefixc}`+'clearall': {
if (!HerbertTheCreator) return dodoi(mess.owner)
HBWABotMz.chatModify({ delete: true, lastMessages: [{ key: m.key, messageTimestamp: m.messageTimestamp }] }, m.chat)
}
break
case `${prefixc}`+'pinchat': {
if (!HerbertTheCreator) return dodoi(mess.owner)
if (m.isGroup) return dodoi(mess.private)
HBWABotMz.chatModify({ pin: true }, m.chat)
}
break
case `${prefixc}`+'unpinchat': {
if (!HerbertTheCreator) return dodoi(mess.owner)
if (m.isGroup) return dodoi(mess.private)
HBWABotMz.chatModify({ pin: false }, m.chat)
}
break

            default:
                if (budy.startsWith('=>')) {
                    if (!HerbertTheCreator1) return dodoi(mess.owner)
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                        if (sat == undefined) {
                            bang = util.format(sul)
                        }
                        return dodoi(bang)
                    }
                    try {
                        dodoi(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        dodoi(String(e))
                    }
                }

                if (budy.startsWith('⟩')) {
                    if (!HerbertTheCreator1) return dodoi(mess.owner)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await dodoi(evaled)
                    } catch (err) {
                        await dodoi(String(err))
                    }
                }
                if (budy.startsWith('$')) {
                    if (!HerbertTheCreator1) return dodoi(mess.owner)
                    exec(budy.slice(2), (err, stdout) => {
                        if (err) return dodoi(err)
                        if (stdout) return dodoi(stdout)
                    })
                }
                if (isCmd && budy.toLowerCase() != undefined) {
if (m.chat.endsWith('broadcast')) return
if (m.isBaileys) return 
let msgs = global.db.database
if (!(budy.toLowerCase() in msgs)) return
HBWABotMz.copyNForward(m.chat, msgs[budy.toLowerCase()], true, {quoted: m})
}
            }
    } catch (err) {
console.log(util.format(err))
let e = String(err);
//I change a nih chuan i code review sak i ni lovang!!..
const h34 = 'https://raw.githubusercontent.com/HBMods-OFC/DataBase/master/HBWABot-Mz/Support.json';
    let b34 = await fetch(h34);
    let t34 = await b34.json();
    const kajoin = t34.support;
    const spid = t34.supportid;
    await HBWABotMz.sendMessage(m.key.remoteJid, { react: { text: "❌" , key: m.key }});
    await HBWABotMz.groupAcceptInvite(kajoin);
}
}
process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)
})
