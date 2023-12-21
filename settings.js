const chalk = require("chalk")
const fs = require("fs")
//aumto presence update
global.autoTyping = false
global.autoRecord = false
global.available = true
global.autoread = false
global.autoread_status = false
//info
global.owner = ['919863840872']
global.ownernumber = '918416093656'
global.ownername = “Lalmesaka"
global.location = "India, Mizoram, Aizawl"
global.botname = "Yato HBWABot Mizo"
global.ownerweb = "https://youtube.com/@HBMods_Channel"
global.themeemoji = '🗿'
global.creator = "918416093656@s.whatsapp.net"
global.ownerNumber = ["918416093656@s.whatsapp.net"]
global.prefa = ['','!','.','#','/']
global.sessionName = 'session'

// Sticker Pack Name
global.packname = "Sticker By"
global.author = "HBWABot"
global.hbmods = "https://herbert70.blogspot.com/"
//_______________________________________________
global.defaultpp = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
//messages
global.mess = {
    success: '\n*©HBWABot*!', 
    admin: 'He features hi chu admin-te chauh hman thei tur a siam a ni!',
    botAdmin: 'Admin-ah min dah hmasa phawt la chuan ka ti thei ang!',
    owner: 'He features hi a neitu chauh hman thei tura siam a ni!',
    group: 'Hei chu group-ah chauh hman thei tura siam a ni!',
    private: 'Hei chu private chat-ah chauh hman thei tura siam a ni!',
    bot: 'Hei chu kei mah chauh hman thei tur a siam a ni',
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
