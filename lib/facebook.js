const axios = require("axios");

class Dlpanda {
    origin = "https://dlpanda.com/id"
    webHeaders = {
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
    }

    getHtml = async (api, opts) => {
        try {
            const response = await fetch(api, opts);
            return await response.text();
        } catch (err) {
            throw Error(`Fetch error: ${err.message}`);
        }
    }

    getCookieAndToken = async (path, regex) => {
        try {
            const url = this.origin + path;
            const response = await fetch(url, { headers: this.webHeaders });
            const html = await response.text();
            const cookie = response.headers.getSetCookie().map(v => v.split(";")[0]).join("; ");
            const token = html.match(new RegExp(regex))?.[1] || null;
            return { cookie, token };
        } catch (err) {
            throw Error(`Cookie error: ${err.message}`);
        }
    }

    async fbDownload(url) {
        const { cookie, token } = await this.getCookieAndToken(`/facebook`, `_token" value="(.+?)"`);
        const headers = { cookie, ...this.webHeaders };
        const body = new URLSearchParams({ url, _token: token });
        const api = "https://dlpanda.com/id/facebook";
        
        const html = await this.getHtml(api, { headers, body, method: "post" });

        const title = html.match(/" target="_blank"><h5>(.+?)<\/h5>/)?.[1] || `Facebook Video`;
        let images = Array.from(html.matchAll(/img alt="" src="(.+?)"/gm)).map(v => v[1]);
        let video = html.match(/<source src="(.+?)"/)?.[1] || null;
        if (video) video = video.replaceAll(`&amp;`, `&`);

        let mediaArray = [];
        if (video) mediaArray.push(video);
        // Image a awm chuan media array-ah kan telh ve ang
        if (images.length > 0) mediaArray.push(...images);

        return {
            metadata: {
                title: title,
                image: images[0] || ""
            },
            media: mediaArray
        };
    }
}

async function Facebook(url) {
    try {
        const dl = new Dlpanda();
        const result = await dl.fbDownload(url);
        return result;
    } catch (e) {
        console.error("Facebook DL Error:", e);
        return {
            metadata: { title: "", image: "" },
            media: []
        };
    }
}

module.exports = Facebook;