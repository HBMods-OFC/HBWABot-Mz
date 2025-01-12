require('./settings')
const pino = require('pino')
const { Boom } = require('@hapi/boom')
const fs = require('fs')
const chalk = require('chalk')
const { color } = require('./lib/color')
const FileType = require('file-type')
const path = require('path')
const axios = require('axios')
const _ = require('lodash')
const { uncache, nocache } = require('./lib/loader')
const yargs = require('yargs/yargs')
const { Low, JSONFile } = require('./lib/lowdb')
const moment = require('moment-timezone')
const PhoneNumber = require('awesome-phonenumber')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./lib/exif')
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch, await, sleep, reSize } = require('./lib/myfunc')
const { default: HBWABotMzConnect, delay, PHONENUMBER_MCC, makeCacheableSignalKeyStore, useMultiFileAuthState, DisconnectReason, fetchLatestBaileysVersion, generateForwardMessageContent, prepareWAMessageMedia, getContentType, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto, Browsers } = require("@adiwajshing/baileys")
const NodeCache = require("node-cache")
const Pino = require("pino")
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")
const makeWASocket = require("@adiwajshing/baileys").default

const store = makeInMemoryStore({
    logger: pino().child({
        level: 'silent',
        stream: 'store'
    })
})

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
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
require('./HBWABot-Mz.js')
nocache('../HBWABot-Mz.js', (module) => {
  console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated');
  console.log(color(`Message nghah mek a ni....`, 'yellow'));
});
require('./index.js')
nocache('../index.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))
require('./tobebot.js')
nocache('../tobebot.js', module => console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated'))

let phoneNumber = "918416093656"
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
         
async function startHBWABotMz() {
//------------------------------------------------------
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState(`./session`)
const HBWABotMz = makeWASocket({
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

    // login use pairing code
   // source code https://github.com/WhiskeySockets/Baileys/blob/master/Example/example.ts#L61
   if (pairingCode && !state.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!!phoneNumber) {
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Country code nen i WhatsApp Number type rawh, Entirnan : +918416093656")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`I WhatsApp number type rawh\nEntirnan: +918416093656 : `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         // Ask again when entering the wrong number
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("Country code nen i WhatsApp Number type rawh, Entirnan : +918416093656")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`I WhatsApp number type rawh\nEntirnan: +918416093656 : `)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }

      setTimeout(async () => {
         let code = await HBWABotMz.requestPairingCode(phoneNumber)
         code = code?.match(/.{1,4}/g)?.join("-") || code
         console.log(chalk.black(chalk.bgGreen(`Pairing Code : `)), chalk.black(chalk.white(code)))
      }, 3000)
   }
   
   HBWABotMz.ev.on('connection.update', async (update) => {
	const {
		connection,
		lastDisconnect
	} = update
try{
		if (connection === 'close') {
			let reason = new Boom(lastDisconnect?.error)?.output.statusCode
			if (reason === DisconnectReason.badSession) {
				console.log(`Session file a la tha lo, Delete tha leh rawh`);
				startHBWABotMz()
			} else if (reason === DisconnectReason.connectionClosed) {
				console.log("Connection a awm tawh lo, reconnecting....");
				startHBWABotMz();
			} else if (reason === DisconnectReason.connectionLost) {
				console.log("Server atangin connection a hlauh tlat, reconnecting...");
				startHBWABotMz();
			} else if (reason === DisconnectReason.connectionReplaced) {
				console.log("Connection thlak a ni a, Session thar dang hman a ni a, tuna session hi delete hmasa phawt ang che");
				startHBWABotMz()
			} else if (reason === DisconnectReason.loggedOut) {
				console.log(`Device Logged Out, Khawngaihin Session Delete la, pair tha leh rawh.`);
				startHBWABotMz();
			} else if (reason === DisconnectReason.restartRequired) {
				console.log("Re-start a ngai, Restart rawh le!..");
				startHBWABotMz();
			} else if (reason === DisconnectReason.timedOut) {
				console.log("Connection TimedOut, Reconnecting...");
				startHBWABotMz();
			} else HBWABotMz.end(`Unknown DisconnectReason: ${reason}|${connection}`)
		}
		if (update.connection === "connecting" || update.receivedPendingNotifications === false) {
    const folderPath = `./asset/tobebot`;
    if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
        console.log(color(`Useless files have been cleaning....`, 'magenta'));
        console.log(color(`\n\nConnecting...`, 'yellow'));
    } else {
        console.log(color(`\n\nConnecting...`, 'yellow'));
    }
}
		if (update.connection == "open" || update.receivedPendingNotifications == "true") {
			console.log(color(`\n\nConnected to >>\n( `+ HBWABotMz.decodeJid(HBWABotMz.user.id)+" )\n" ,'magenta'))
const fileUrl = 'https://raw.githubusercontent.com/HBMods-OFC/Vipdata/master/HBWABot-Mz/HBWABot-Mz.js';
const filePath = './HBWABot-Mz.js';
axios.get(fileUrl, { responseType: 'stream' })
  .then(response => {
    const fileSize = response.headers['content-length'];
    if (fileSize && fileSize < 2 * 1024 * 1024) {
      const file = fs.createWriteStream(filePath);
      response.data.pipe(file);
      file.on('finish', () => {
        console.log(color(`Version Thar Installed`, 'yellow'))
      });
      file.on('error', err => {
        console.error('File download laiin hetah hian error a awm: ', err.message);
      });
    } else {
      console.error('2MB aia sang install thei a ni lo.');
    }
  })
  .catch(error => {
    console.error('File download laiin hetah hian error a awm: ', error.message);
  });

            console.log(color(`
╭═══❏ ${chalk.bold.red(`[ BOT INFORMATION ]`)} ❏
┃𒆜┌───┈
┃𒆜│${chalk.bold.blue(`Creator:`)} Herbert Suantak
┃𒆜│${chalk.bold.blue(`YT Channel:`)} HBMods OFC
┃𒆜│${chalk.bold.blue(`Instagram:`)} herbert_suantak2
┃𒆜│${chalk.bold.blue(`Bot Name:`)} ${botname}
┃𒆜│${chalk.bold.blue(`Prefix:`)} ${prefixc}
┃𒆜│${chalk.bold.blue(`Owner Number:`)} ${owner}
┃𒆜│${chalk.bold.blue(`Current Language:`)} "${bot_language}"
┃𒆜│${chalk.bold.blue(`Support Language:⬇️`)}
┃𒆜│${chalk.greenBright(`Mizo [lus]`)}
┃𒆜│${chalk.greenBright(`English [en]`)}
┃𒆜│${chalk.greenBright(`Indonesia [id]`)}
┃𒆜│${chalk.greenBright(`Germany [de]`)}
┃𒆜│${chalk.greenBright(`Russia [ru]`)}
┃𒆜│${chalk.greenBright(`Brazil [pt-BR]`)}
┃𒆜│${chalk.greenBright(`Hindi [hi]`)}
┃𒆜└───────────┈ 
╰══════════════𖡛`,'magenta'))
		}
	
} catch (err) {
	  console.log('Error in Connection.update '+err)
	  startHBWABotMz()
	}
})
HBWABotMz.ev.on('creds.update', saveCreds)
HBWABotMz.ev.on("messages.upsert",  () => { })
//------------------------------------------------------

//farewell/welcome
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
    //autostatus view
        HBWABotMz.ev.on('messages.upsert', async chatUpdate => {
        	if (global.autoread_status){
            mek = chatUpdate.messages[0]
            if (mek.key && mek.key.remoteJid === 'status@broadcast') {
            	await HBWABotMz.readMessages([mek.key]) }
            }
    })

// detect group update
		HBWABotMz.ev.on("groups.update", async (json) => {
			if (global.groupevent) {
			try {
ppgroup = await HBWABotMz.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
} 
			}
		})
		
		// respon cmd pollMessage
    async function getMessage(key){
        if (store) {
            const msg = await store.loadMessage(key.remoteJid, key.id)
            return msg?.message
        }
        return {
            conversation: "HBWABot Here!"
        }
    }
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
                    var prefCmd = xprefix+toCmd
	                HBWABotMz.appenTextMessage(prefCmd, chatUpdate)
				}
			}
		}
    })

    HBWABotMz.ev.on('messages.upsert', async chatUpdate => {
        //console.log(JSON.stringify(chatUpdate, undefined, 2))
        try {
            const mek = chatUpdate.messages[0]
            if (!mek.message) return
            mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
            if (mek.key && mek.key.remoteJid === 'status@broadcast' )
            if (!HBWABotMz.public && !mek.key.fromMe && chatUpdate.type === 'notify') return
            if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return
            const m = smsg(HBWABotMz, mek, store)
            require("./HBWABot-Mz")(HBWABotMz, m, chatUpdate, store)
        } catch (err) {
            console.log(err)
        }
    })
   
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
            if (store && store.contacts) store.contacts[id] = {
                id,
                name: contact.notify
            }
        }
    })

    HBWABotMz.getName = (jid, withoutContact = false) => {
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

    HBWABotMz.public = true

    HBWABotMz.serializeM = (m) => smsg(HBWABotMz, m, store)

    HBWABotMz.sendText = (jid, text, quoted = '', options) => HBWABotMz.sendMessage(jid, {
        text: text,
        ...options
    }, {
        quoted,
        ...options
    })
    HBWABotMz.sendImage = async (jid, path, caption = '', quoted = '', options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await HBWABotMz.sendMessage(jid, {
            image: buffer,
            caption: caption,
            ...options
        }, {
            quoted
        })
    }
    HBWABotMz.sendTextWithMentions = async (jid, text, quoted, options = {}) => HBWABotMz.sendMessage(jid, {
        text: text,
        mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
        ...options
    }, {
        quoted
    })
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

HBWABotMz.sendAudio = async (jid, path, quoted = '', ptt = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await HBWABotMz.sendMessage(jid, { audio: buffer, ptt: ptt, ...options }, { quoted })
    }
    
    HBWABotMz.sendVideo = async (jid, path, caption = '', quoted = '', gif = false, options) => {
        let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        return await HBWABotMz.sendMessage(jid, { video: buffer, caption: caption, gifPlayback: gif, ...options }, { quoted })
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
    HBWABotMz.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(quoted, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        let type = await FileType.fromBuffer(buffer)
        trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
        // save to file
        await fs.writeFileSync(trueFileName, buffer)
        return trueFileName
    }
    
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
      
      HBWABotMz.getFile = async (PATH, save) => {
        let res
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
        //if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer')
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        }
        filename = path.join(__filename, '../lib' + new Date * 1 + '.' + type.ext)
        if (data && save) fs.promises.writeFile(filename, data)
        return {
            res,
            filename,
	    size: await getSizeMedia(data),
            ...type,
            data
        }

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

HBWABotMz.cMod = (jid, copy, text = '', sender = HBWABotMz.user.id, options = {}) => {
        //let copy = message.toJSON()
		let mtype = Object.keys(copy.message)[0]
		let isEphemeral = mtype === 'ephemeralMessage'
        if (isEphemeral) {
            mtype = Object.keys(copy.message.ephemeralMessage.message)[0]
        }
        let msg = isEphemeral ? copy.message.ephemeralMessage.message : copy.message
		let content = msg[mtype]
        if (typeof content === 'string') msg[mtype] = text || content
		else if (content.caption) content.caption = text || content.caption
		else if (content.text) content.text = text || content.text
		if (typeof content !== 'string') msg[mtype] = {
			...content,
			...options
        }
        if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		else if (copy.key.participant) sender = copy.key.participant = sender || copy.key.participant
		if (copy.key.remoteJid.includes('@s.whatsapp.net')) sender = sender || copy.key.remoteJid
		else if (copy.key.remoteJid.includes('@broadcast')) sender = sender || copy.key.remoteJid
		copy.key.remoteJid = jid
		copy.key.fromMe = sender === HBWABotMz.user.id

        return proto.WebMessageInfo.fromObject(copy)
    }

HBWABotMz.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await HBWABotMz.getFile(path, true)
           let { mime, ext, res, data, filename } = types
           if (res && res.status !== 200 || file.length <= 65536) {
               try { throw { json: JSON.parse(file.toString()) } }
               catch (e) { if (e.json) throw e.json }
           }
       let type = '', mimetype = mime, pathFile = filename
       if (options.asDocument) type = 'document'
       if (options.asSticker || /webp/.test(mime)) {
        let { writeExif } = require('./lib/exif')
        let media = { mimetype: mime, data }
        pathFile = await writeExif(media, { packname: options.packname ? options.packname : global.packname, author: options.author ? options.author : global.author, categories: options.categories ? options.categories : [] })
        await fs.promises.unlink(filename)
        type = 'sticker'
        mimetype = 'image/webp'
        }
       else if (/image/.test(mime)) type = 'image'
       else if (/video/.test(mime)) type = 'video'
       else if (/audio/.test(mime)) type = 'audio'
       else type = 'document'
       await HBWABotMz.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
       return fs.promises.unlink(pathFile)
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
    
    HBWABotMz.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return HBWABotMz.sendMessage(jid, { poll: { name, values, selectableCount }}) }

HBWABotMz.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}
            
    HBWABotMz.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }

        return buffer
    }
    return HBWABotMz
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
})

startHBWABotMz()