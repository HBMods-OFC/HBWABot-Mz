const axios = require("axios");
const cheerio = require("cheerio");
const { sizeFormatter } = require('human-readable');

const formatSize = sizeFormatter({
	std: 'JEDEC',
	decimalPlaces: 2,
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`
});

async function GDrive(url) {
	let id, res = {
		"error": true
	}
	if (!(url && url.match(/drive\.google/i))) return res
	try {
		id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1]
		if (!id) throw 'ID Not Found'
		res = await axios(`https://drive.google.com/uc?id=${id}&authuser=0&export=download`, {
			method: 'post',
			headers: {
				'accept-encoding': 'gzip, deflate, br',
				'content-length': 0,
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'origin': 'https://drive.google.com',
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
				'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
				'x-drive-first-party': 'DriveWebUi',
				'x-json-requested': 'true'
			}
		})
		let {
			fileName,
			sizeBytes,
			downloadUrl
		} = JSON.parse((await res.data).slice(4))
		if (!downloadUrl) throw 'Link Download Limit!'
		let data = await fetch(downloadUrl)
		if (data.status !== 200) return data.statusText
		return {
			downloadUrl,
			fileName,
			fileSize: formatSize(sizeBytes),
			mimetype: data.headers.get('content-type')
		}
	}
	catch (e) {
		console.log(e)
		return res
	}
};

module.exports = GDrive;