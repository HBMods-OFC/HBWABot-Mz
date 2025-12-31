require('./settings');
const fs = require('fs');
const os = require('os');
const pino = require('pino');
const path = require('path');
const axios = require('axios');
const { color } = require('./lib/color')
const chalk = require('chalk');
const readline = require('readline');
const { Boom } = require('@hapi/boom');
const qrcode = require('qrcode-terminal');
const NodeCache = require('node-cache');
const { toBuffer } = require('qrcode');
const { exec } = require('child_process');
const { parsePhoneNumber } = require('awesome-phonenumber');
const { default: WAConnection, useMultiFileAuthState, Browsers, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion, jidNormalizedUser, makeInMemoryStore } = require('@hbmodsofc/baileys');
const { uncache, nocache } = require('./lib/loader')
const { dataBase } = require('./src/database');
const { app, server, PORT } = require('./src/server');
const { GroupParticipantsUpdate, MessagesUpsert, Solving } = require('./src/message');
const print = (label, value) => console.log(`${chalk.green.bold('║')} ${chalk.cyan.bold(label.padEnd(16))}${chalk.yellow.bold(':')} ${value}`);
const pairingCode = process.argv.includes('--qr') ? false : process.argv.includes('--pairing-code') || global.pairing_code;
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))
let pairingStarted = false;
let phoneNumber;

/*
const store = makeInMemoryStore({
  logger: pino().child({
    level: 'silent',
    stream: 'store'
  })
})
*/

const database = dataBase(global.placeDB);
const storeDB = dataBase(global.placeStore);
const msgRetryCounterCache = new NodeCache();

server.listen(PORT, () => {
	console.log('Server is running on port:', PORT);
});

require('./HBWABot-Mz.js')
nocache('../HBWABot-Mz.js', (module) => {
  console.log(color('[ CHANGE ]', 'green'), color(`'${module}'`, 'green'), 'Updated');
});

async function startHBWABot() {
	const { state, saveCreds } = await useMultiFileAuthState('session');
	const { version } = await fetchLatestBaileysVersion();
	const level = pino({ level: 'silent' });
	
	try {
		const loadData = await database.read()
		const storeLoadData = await storeDB.read()
		
        global.db = {
            sticker: {}, database: {}, game: {}, others: {}, 
            users: {}, chats: {}, settings: {},
            ...(loadData || {})
        };

		global.store = {
			contacts: {},
			presences: {},
			messages: {},
			groupMetadata: {},
			...(storeLoadData || {}),
		}
		
		setInterval(async () => {
			if (global.db) await database.write(global.db)
			if (global.store) await storeDB.write(global.store)
		}, 30 * 1000)
	} catch (e) {
		console.error('Database Error:', e)
		process.exit(1)
	}
	
    const store = global.store; 
	store.loadMessage = function (remoteJid, id) {
        if (!store.messages[remoteJid]) return null;
		const messages = store.messages[remoteJid];
		return messages.find(msg => msg?.key?.id === id) || null;
	}
	
	const HBWABotMz = WAConnection({
		logger: level,
		getMessage,
		syncFullHistory: true,
		maxMsgRetryCount: 15,
		msgRetryCounterCache,
		retryRequestDelayMs: 10,
		connectTimeoutMs: 60000,
		browser: Browsers.ubuntu('Chrome'),
		generateHighQualityLinkPreview: true,
		shouldSyncHistoryMessage: msg => {
			console.log(color(`Loading Chat [${msg.progress || 0}%]`, "yellow"));
			return !!msg.syncType;
		},
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
	})
	
	if (pairingCode && !phoneNumber && !HBWABotMz.authState.creds.registered) {
		async function getPhoneNumber() {
			phoneNumber = global.number_bot ? global.number_bot : await question(chalk.bgBlack(chalk.greenBright(`I WhatsApp number type rawh\nEntirnan: +918416093656: `)))
			phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
			
			if (!parsePhoneNumber('+' + phoneNumber).valid && phoneNumber.length < 6) {
				console.log(chalk.red('Invalid format. Example: 91xxxxxx'));
				await getPhoneNumber()
			}
		}
		(async () => {
			await getPhoneNumber();
			await exec('rm -rf ./session/*');
			console.log(chalk.bgBlack(chalk.greenBright('Phone number captured. Connecting... ')) + chalk.blueBright('Estimated time: 2-5 minutes'))
		})()
	}
	
	await Solving(HBWABotMz, store)
	HBWABotMz.ev.on('creds.update', saveCreds)
	HBWABotMz.ev.on("messages.upsert", () => { })
	HBWABotMz.ev.on('connection.update', async (update) => {
		const { qr, connection, lastDisconnect, isNewLogin, receivedPendingNotifications } = update
		if (!HBWABotMz.authState.creds.registered) console.log();
		if ((connection === 'connecting' || !!qr) && pairingCode && phoneNumber && !HBWABotMz.authState.creds.registered && !pairingStarted) {
			pairingStarted = true;
			console.log('Requesting Pairing Code...')
			let code = await HBWABotMz.requestPairingCode(phoneNumber);
			console.log(chalk.blue('Your Pairing Code:'), chalk.green(code));
		}

		if (connection === 'close') {
			const reason = new Boom(lastDisconnect?.error)?.output.statusCode
			console.log(`Connection closed. Reason: ${reason}. Reconnecting...`);
			if (reason !== DisconnectReason.loggedOut) {
				startHBWABot()
			} else {
				console.log('Logged out. Please scan/pair again.');
				exec('rm -rf ./session/*')
				process.exit(1)
			}
		}

		if (connection == 'open') {
	const jidUser = jidNormalizedUser(HBWABotMz.user?.id || '')
    console.log(color(`\nConnected to >>\n( ` + jidUser + " )\n", 'magenta'))
     
      const fileUrl = 'https://raw.githack.com/HBMods-OFC/Vawk/master/HBWABot-Mz/HBWABot-Mz.js';
        const filePath = './HBWABot-Mz.js';
        axios.get(fileUrl, { responseType: 'stream' })
          .then(response => {
            const fileSize = response.headers['content-length'];
            if (fileSize) {
              const file = fs.createWriteStream(filePath);
              response.data.pipe(file);
              file.on('finish', () => {
                console.log(color(`Version Thar Installed`, 'yellow'))
              });
              file.on('error', err => {
                console.error('File download laiin hetah hian error a awm: ', err.message);
              });
            } else {
              console.error(' install thei a ni lo.');
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
╰══════════════𖡛`, 'magenta'))
		}

		if (qr && !pairingCode) {
			qrcode.generate(qr, { small: true });
		}

		if (isNewLogin) console.log(chalk.green('New login detected!'))
		if (receivedPendingNotifications == 'true') {
			console.log(color(`Message nghah mek a ni....`, 'yellow'));
			HBWABotMz.ev.flush()
		}
	});
	
	HBWABotMz.ev.on('contacts.update', (update) => {
		for (let contact of update) {
			let id = jidNormalizedUser(contact.id);
            if (store && store.contacts) {
                store.contacts[id] = { ...(store.contacts[id] || {}), ...(contact || {}) };
            }
		}
	});
	
	HBWABotMz.ev.on('call', async (call) => {
    if (global.AntiCallBot) {
        for (let id of call) {
            if (id.status === 'offer') {
                let duhlo = await HBWABotMz.sendMessage(id.from, { 
                    text: `Sorry, I cannot accept ${id.isVideo ? 'video' : 'voice'} calls right now. Please contact the owner for assistance.`, 
                    mentions: [id.from] 
                });
                await HBWABotMz.rejectCall(id.id, id.from);
                await HBWABotMz.sendContact(id.id, global.owner, duhlo);
            }
        }
    }
});
   	async function getMessage(key) {
    if (store && store.messages[key.remoteJid]) {
      const msg = store.loadMessage(key.remoteJid, key.id)
      return msg?.message || undefined
    }
    return undefined
  }
	
	HBWABotMz.ev.on('messages.upsert', async (chatUpdate) => {
        const m = chatUpdate.messages[0];
        if (!m.message) return;
        const jid = m.key.remoteJid;
        
        if (!Array.isArray(store.messages[jid])) {
            store.messages[jid] = [];
        }
        store.messages[jid].push(m);
        if (store.messages[jid].length > 100) store.messages[jid].shift();
		await MessagesUpsert(HBWABotMz, chatUpdate, store);
	});
	
	HBWABotMz.ev.on('messages.upsert', async chatUpdate => {
    try {
        if (!global.autoread_status) return;
        const m = chatUpdate.messages?.[0];
        if (!m || !m.key || m.key.remoteJid !== 'status@broadcast') return;
        const from = m.key.remoteJid;
        const botNumber = await HBWABotMz.decodeJid(HBWABotMz.user.id);
        const participantJid = m.key?.participant || m.participant || null;
        if (!participantJid || participantJid === botNumber) {
        console.log("⛔ Skipped: participantJid is null or self");
        return;
        }
        const randomEmoji = global.themeemoji[Math.floor(Math.random() * global.themeemoji.length)];
        await HBWABotMz.readMessages([m.key]);
        await HBWABotMz.sendMessage(from, {
            react: {
                text: randomEmoji,
                key: m.key
            }
        }, {
            statusJidList: [participantJid]
        });
    } catch (err) {
        console.error("❌ Error handling status:", err);
    }
});
	
	HBWABotMz.ev.on('group-participants.update', async (update) => {
    const { id, participants, action } = update;
    await GroupParticipantsUpdate(HBWABotMz, update, store);
    if (global.store && global.store.groupMetadata[id]) {
        let metadata = global.store.groupMetadata[id];
        participants.forEach(p => {
            let participant = metadata.participants.find(x => x.id === p || x.lid === p);
            if (action === 'add') {
                if (!participant) metadata.participants.push({ id: p, admin: null });
            } else if (action === 'remove') {
                metadata.participants = metadata.participants.filter(x => x.id !== p && x.lid !== p);
            } else if (action === 'promote') {
                if (participant) participant.admin = 'admin';
            } else if (action === 'demote') {
                if (participant) participant.admin = null;
            }
        });
        metadata.size = metadata.participants.length;
        await storeDB.write(global.store);
    }
});
	

    HBWABotMz.ev.on('groups.update', async (updates) => {
    for (const update of updates) {
        const id = update.id;
        const newMetadata = await HBWABotMz.groupMetadata(id).catch(() => null);
        if (newMetadata) {
            store.groupMetadata[id] = newMetadata;
            if (global.storeDB) await storeDB.write(store);
        }
    }
});
	
	HBWABotMz.ev.on('presence.update', ({ id, presences: update }) => {
		if (store.presences) {
			store.presences[id] = store.presences[id] || {};
			Object.assign(store.presences[id], update);
		}
	});
	setInterval(async () => {
		if (HBWABotMz?.user?.id) await HBWABotMz.sendPresenceUpdate('available', HBWABotMz.decodeJid(HBWABotMz.user.id)).catch(() => {})
	}, 10 * 60 * 1000);

	return HBWABotMz
}

startHBWABot()

const cleanup = async (signal) => {
	console.log(`Received ${signal}. Saving database...`)
	if (global.db) await database.write(global.db)
    if (global.store) await storeDB.write(global.store)
	server.close(() => {
		process.exit(0)
	})
}

process.on('SIGINT', () => cleanup('SIGINT'))
process.on('SIGTERM', () => cleanup('SIGTERM'))
process.on('exit', () => cleanup('exit'))

server.on('error', (error) => {
	if (error.code === 'EADDRINUSE') {
		console.log(`Port ${PORT} is already in use.`);
		server.close();
	} else console.error('Server error:', error);
});

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	delete require.cache[file]
	require(file)
});