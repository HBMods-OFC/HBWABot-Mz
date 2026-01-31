import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

global.group_bot = false
global.pairing_code = true
global.autoread_status = true

global.number_bot = ''
global.owner = [['918416093656', 'Herbert Suantak', true]]
global.mods = []
global.prems = []
global.themeemoji = ['😍', '🔥', '👌', '❤️', '🤯', '😂', '😎', '🥺', '💯', '✨']

global.readMore = readMore
global.author = 'Herbert Suantak'
global.botname = 'HBWABot-Mz'
global.wm = '© HBWABot By Herbert Suantak'
global.watermark = global.wm
global.packname = `Sticker by`
global.author = `HBWABot`
global.prefixc = [""]
global.multiplier = 0

global.mess = {
    success: '\n*©HBWABot*!', 
    admin: 'He features hi chu admin-te chauh hman thei tur a siam a ni!',
    botAdmin: 'Admin-ah min dah hmasa phawt la chuan ka ti thei ang!',
    owner: 'He features hi a neitu chauh hman thei tura siam a ni!',
    group: 'Hei chu group-ah chauh hman thei tura siam a ni!',
    private: 'Hei chu private chat-ah chauh hman thei tura siam a ni!',
    bot: 'Hei chu kei mah chauh hman thei tur a siam a ni',
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})