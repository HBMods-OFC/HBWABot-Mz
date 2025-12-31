const {
    proto,
    delay,
    generateWAMessage,
    areJidsSameUser,
    getContentType
} = require('@hbmodsofc/baileys')
const { default: downloadContentFromMessage} = require("@hbmodsofc/baileys")
const chalk = require('chalk')
const fs = require('fs')
const Crypto = require('crypto')
const axios = require('axios')
const child_process = require('child_process')
const moment = require('moment-timezone')
const { unlink } = require ('fs').promises
const {
    sizeFormatter
} = require('human-readable')
const util = require('util')
const Jimp = require('jimp')
const {
    defaultMaxListeners
} = require('stream')

const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds

exports.totalcase = () => {
   var file = fs.readFileSync("../HBWABot-Mz.js").toString()
   var jumlah = (file.match(/case '/g) || []).length;
   return jumlah
}

exports.generateMessageTag = (epoch) => {
    let tag = (0, exports.unixTimestampSeconds)().toString();
    if (epoch)
        tag += '.--' + epoch; // attach epoch if provided
    return tag;
}

exports.processTime = (timestamp, now) => {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

exports.getBuffer = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.getImg = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}
exports.webp2mp4File=async(path) =>{
	return new Promise((resolve, reject) => {
		 const form = new BodyForm()
		 form.append('new-image-url', '')
		 form.append('new-image', fs.createReadStream(path))
		 axios({
			  method: 'post',
			  url: 'https://s6.ezgif.com/webp-to-mp4',
			  data: form,
			  headers: {
				   'Content-Type': `multipart/form-data; boundary=${form._boundary}`
			  }
		 }).then(({ data }) => {
			  const bodyFormThen = new BodyForm()
			  const $ = cheerio.load(data)
			  const file = $('input[name="file"]').attr('value')
			  bodyFormThen.append('file', file)
			  bodyFormThen.append('convert', "Convert WebP to MP4!")
			  axios({
				   method: 'post',
				   url: 'https://ezgif.com/webp-to-mp4/' + file,
				   data: bodyFormThen,
				   headers: {
						'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
				   }
			  }).then(({ data }) => {
				   const $ = cheerio.load(data)
				   const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
				   resolve({
						status: true,
						message: "Created By Eternity",
						result: result
				   })
			  }).catch(reject)
		 }).catch(reject)
	})
}

exports.fetchUrl = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.WAVersion = async () => {
    let get = await exports.fetchUrl("https://web.whatsapp.com/check-update?version=1&platform=web")
    let version = [get.currentVersion.replace(/[.]/g, ", ")]
    return version
}

exports.isNumber = (number) => {
    const int = parseInt(number)
    return typeof int === 'number' && !isNaN(int)
}
exports.TelegraPh= (Path) =>{
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const form = new BodyForm();
			form.append("file", fs.createReadStream(Path))
			const data = await  axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}
const sleepy = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.buffergif = async (image) => {
        
	const filename = `${Math.random().toString(36)}`
			await fs.writeFileSync(`./asset/trash/${filename}.gif`, image)
					 child_process.exec(
								`ffmpeg -i ./asset/trash/${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./asset/trash/${filename}.mp4`
										) 
  await sleepy(4000)
  
	var buffer5  =  await  fs.readFileSync(`./asset/trash/${filename}.mp4`)
	Promise.all([unlink(`./asset/video/${filename}.mp4`), unlink(`./asset/video/${filename}.gif`)])
	return buffer5
				   }
exports.fetchBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "GET",
			url,
			headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}
exports.runtime = function(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
}

exports.clockString = (ms) => {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.getTime = (format, date) => {
    if (date) {
        return moment(date).locale('id').format(format)
    } else {
        return moment.tz('Asia/Kolkata').locale('id').format(format)
    }
}

exports.formatDate = (n, locale = 'id') => {
    let d = new Date(n)
    return d.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    })
}

exports.formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.json = (string) => {
    return JSON.stringify(string, null, 2)
}

function format(...args) {
    return util.format(...args)
}

exports.logic = (check, inp, out) => {
    if (inp.length !== out.length) throw new Error('Input and Output must have same length')
    for (let i in inp)
        if (util.isDeepStrictEqual(check, inp[i])) return out[i]
    return null
}

exports.generateProfilePicture = async (buffer) => {
    const jimp = await Jimp.read(buffer)
    const min = jimp.getWidth()
    const max = jimp.getHeight()
    const cropped = jimp.crop(0, 0, min, max)
    return {
        img: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG),
        preview: await cropped.scaleToFit(720, 720).getBufferAsync(Jimp.MIME_JPEG)
    }
}

exports.bytesToSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

exports.getSizeMedia = (path) => {
    return new Promise((resolve, reject) => {
        if (/http/.test(path)) {
            axios.get(path)
                .then((res) => {
                    let length = parseInt(res.headers['content-length'])
                    let size = exports.bytesToSize(length, 3)
                    if (!isNaN(length)) resolve(size)
                })
        } else if (Buffer.isBuffer(path)) {
            let length = Buffer.byteLength(path)
            let size = exports.bytesToSize(length, 3)
            if (!isNaN(length)) resolve(size)
        } else {
            reject('I dont know what the error is')
        }
    })
}

exports.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.getGroupAdmins = (participants) => {
    let admins = []
    for (let i of participants) {
        i.admin === "superadmin" ? admins.push(i.jid) : i.admin === "admin" ? admins.push(i.jid) : ''
    }
    return admins || []
}
exports.reSize = (buffer, ukur1, ukur2) => {
    return new Promise(async (resolve, reject) => {
        var baper = await Jimp.read(buffer);
        var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
        resolve(ab)
    })
}

exports.GIFBufferToVideoBuffer = async (image) => {

    const filename = `${Math.random().toString(36)}`
    await fs.writeFileSync(`./asset/trash/${filename}.gif`, image)
    child_process.exec(
        `ffmpeg -i ./asset/trash/${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./asset/trash/${filename}.mp4`
    )
    await sleepy(4000)

    var buffer5 = await fs.readFileSync(`./asset/trash/${filename}.mp4`)
    Promise.all([unlink(`./asset/trash/${filename}.mp4`), unlink(`./asset/trash/${filename}.gif`)])
    return buffer5
}