const axios = require('axios');

const saveTube = {
	qualities: {
		audio: { 1: '32', 2: '64', 3: '128', 4: '192' },
		video: { 1: '144', 2: '240', 3: '360', 4: '480', 5: '720', 6: '1080', 7: '1440', 8: '2160' },
	},

	headers: {
		accept: '*/*',
		referer: 'https://ytshorts.savetube.me/',
		origin: 'https://ytshorts.savetube.me/',
		'user-agent': 'Postify/1.0.0',
		'Content-Type': 'application/json',
	},

	cdn() {
		return Math.floor(Math.random() * 11) + 51;
	},

	checkQuality(type, qualityIndex) {
		if (!(qualityIndex in this.qualities[type])) {
			throw new Error(`❌ Invalid quality for ${type}. Choose one of: ${Object.keys(this.qualities[type]).join(', ')}`);
		}
	},

	async fetchData(url, cdn, body = {}) {
		const headers = {
			...this.headers,
			authority: `cdn${cdn}.savetube.su`,
		};

		try {
			const response = await axios.post(url, body, { headers });
			return response.data;
		} catch (error) {
			console.error(`❌ Error fetching data from ${url}:`, error.message);
			throw error;
		}
	},

	dLink(cdnUrl) {
		return `https://${cdnUrl}/download`;
	},

	async dl(link, qualityIndex, type) {
		// Validasi tipe dan kualitas
		if (!type) {
			throw new Error('❌ Invalid type. Choose "audio" or "video".');
		}

		this.checkQuality(type, qualityIndex);
		const quality = this.qualities[type][qualityIndex];
		const cdnNumber = this.cdn();
		const cdnUrl = `cdn${cdnNumber}.savetube.su`;

		// Ambil informasi video
		const videoInfo = await this.fetchData(`https://${cdnUrl}/info`, cdnNumber, { url: link });

		// Konfigurasi untuk unduhan
		const requestBody = {
			downloadType: type,
			quality: quality,
			key: videoInfo.data.key,
		};

		// Proses unduhan
		const downloadResponse = await this.fetchData(this.dLink(cdnUrl), cdnNumber, requestBody);

		return {
			link: downloadResponse.data.downloadUrl,
			duration: videoInfo.data.duration,
			durationLabel: videoInfo.data.durationLabel,
			fromCache: videoInfo.data.fromCache,
			id: videoInfo.data.id,
			key: videoInfo.data.key,
			thumbnail: videoInfo.data.thumbnail,
			thumbnail_formats: videoInfo.data.thumbnail_formats,
			title: videoInfo.data.title,
			titleSlug: videoInfo.data.titleSlug,
			videoUrl: videoInfo.data.url,
			quality,
			type,
		};
	},
};

module.exports = saveTube;
