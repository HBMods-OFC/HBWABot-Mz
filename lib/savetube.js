const yts = require('yt-search');

const savetube = {
    api: {
        origin: "https://keepv.id",
    },
    
    tools: {
        generateHex: (length = 10, config = { prefix: "" }) => {
            const charSet = "0123456789abcdef";
            const charSetArr = charSet.split("");
            const getRandom = (array) => array[Math.floor(Math.random() * array.length)];
            const randomString = Array.from({ length }, _ => getRandom(charSetArr)).join("");
            return config.prefix + randomString;
        },
        generateTokenValidTo: () => (Date.now() + (1000 * 60 * 20)).toString().substring(0, 10),
        delay: async (ms) => new Promise(re => setTimeout(re, ms)),
        handleFormat: (format) => {
            if (format === 'mp3' || format === '128' || format === 'audio') return 'audio';
            const valid = ["audio", "240p", "360p", "480p", "720p", "1080p"];
            let res = format.toString().includes('p') ? format : `${format}p`;
            return valid.includes(res) ? res : '360p';
        },
        extractId: (url) => {
            const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
            return match ? match[1] : null;
        }
    },

    headers: {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36"
    },

    async getSession() {
        const r = await fetch(this.api.origin, { headers: this.headers });
        const cookies = r.headers.getSetCookie();
        const cookie = cookies?.[0]?.split("; ")?.[0];
        if (!cookie) throw Error(`Session cookie not found`);
        return { cookie, urlRedirect: r.url };
    },

    async validate(session, url, format) {
        const headers = { cookie: session.cookie, referer: session.urlRedirect, ...this.headers };
        const pathname = format === "audio" ? "button" : "vidbutton";
        const endpoint = `${this.api.origin}/${pathname}/?url=${url}`;
        await fetch(endpoint, { headers });
        return { cookie: session.cookie, referer: endpoint };
    },

    async convert(val, url, format) {
        const headers = {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            cookie: val.cookie, referer: val.referer, origin: this.api.origin, "x-requested-with": "XMLHttpRequest", ...this.headers
        };
        const payload = {
            url: url,
            convert: "gogogo",
            token_id: this.tools.generateHex(64, { prefix: "t_" }),
            token_validto: this.tools.generateTokenValidTo(),
        };
        const height = format.match(/^(\d+)p/);
        if (height) payload.height = height[1];
        
        const body = new URLSearchParams(payload);
        const pathname = format === "audio" ? "convert" : "vidconvert";
        const r = await fetch(`${this.api.origin}/${pathname}/`, { headers, body, method: "post" });
        return await r.json();
    },

    async checkStatus(val, job, format) {
        const headers = { cookie: val.cookie, referer: val.referer, "x-requested-with": "XMLHttpRequest", ...this.headers };
        const pathname = format === "audio" ? "convert" : "vidconvert";

        for (let i = 0; i < 30; i++) {
            const url = `${this.api.origin}/${pathname}/?jobid=${job.jobid}&time=${Date.now()}`;
            const r = await fetch(url, { headers });
            const data = await r.json();
            if (data.dlurl) return data.dlurl;
            if (data.error) throw Error(data.error);
            await this.tools.delay(3000);
        }
        throw Error(`Download process timed out`);
    },

    async download(url, format = "mp3") {
        try {
            const vidId = this.tools.extractId(url);
            if (!vidId) throw Error("Invalid YouTube URL");

            const [videoInfo, session] = await Promise.all([
                yts({ videoId: vidId }),
                this.getSession()
            ]);

            const targetFormat = this.tools.handleFormat(format);
            const val = await this.validate(session, url, targetFormat);
            const job = await this.convert(val, url, targetFormat);
            const dlLink = await this.checkStatus(val, job, targetFormat);

            return {
                status: true,
                code: 200,
                result: {
                    title: videoInfo.title,
                    download: dlLink,
                    thumbnail: videoInfo.thumbnail,
                    author: videoInfo.author.name,
                    quality: format === 'mp3' ? '128kbps' : (format.includes('p') ? format : `${format}p`),
                    type: targetFormat === 'audio' ? 'audio' : 'video',
                    duration: videoInfo.timestamp,
                    views: videoInfo.views
                }
            };
        } catch (error) {
            return {
                status: false,
                code: 500,
                error: error.message
            };
        }
    }
};

module.exports = savetube;