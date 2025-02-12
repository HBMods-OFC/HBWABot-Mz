const axios = require('axios');
const cheerio = require('cheerio');

async function alightScrape(url) {
	try {
		const response = await axios.get(url, {
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
				'Referer': 'https://alight.link',
			},
		});
		const $ = cheerio.load(response.data);
		const title = $('meta[property="og:title"]').attr('content');
		const description = $('meta[property="og:description"]').attr('content');
		return {
			title,
			description
		};
	} catch (error) {
		return { error: 'The end of data collection from the Alight Motion URL' };
	}
};

module.exports = alightScrape;