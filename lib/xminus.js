const axios = require('axios');
const FormData = require('form-data');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');

const jar = new CookieJar();
const client = wrapper(axios.create({ jar }));

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const xminus = {
  api: {
    base: "https://x-minus.pro",
    endpoint: {
      ai: "/ai",
      upload: "/upload/vocalCutAi",
      download: "/dl/vocalCutAi"
    }
  },

  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Origin': 'https://x-minus.pro',
    'Referer': 'https://x-minus.pro/ai'
  },

  getAuthKey: async () => {
    try {
      const response = await client.get(`${xminus.api.base}${xminus.api.endpoint.ai}`, {
        headers: xminus.headers
      });
      const dom = new JSDOM(response.data);
      const authKey = dom.window.document.querySelector('#vocal-cut-auth-key')?.value;
      if (!authKey) throw new Error("Key missing");
      return authKey;
    } catch (error) {
      throw new Error("Session Error");
    }
  },

  convert: async (filePath, options = {}, onProgress) => {
    try {
      const authKey = await xminus.getAuthKey();
      const def = {
        separation_type: 'vocals_music',
        model: 'bs_roformer',
        format: 'mp3'
      };
      const final = { ...def, ...options };

      const formData = new FormData();
      formData.append('myfile', fs.createReadStream(filePath));
      formData.append('auth_key', authKey);
      formData.append('locale', 'en');
      formData.append('separation', 'inst_vocal');
      formData.append('separation_type', final.separation_type);
      formData.append('format', final.format);
      formData.append('model', final.model);
      formData.append('version', '1.0');
      formData.append('hostname', 'x-minus.pro');

      // RETRY LOGIC FOR "SERVER BUSY"
      let uploadRes;
      let uploadAttempts = 0;
      while (uploadAttempts < 3) {
        uploadRes = await client.post(`${xminus.api.base}${xminus.api.endpoint.upload}?catch-file`, formData, {
            headers: { ...formData.getHeaders(), ...xminus.headers }
        });

        if (uploadRes.data.status === 'accepted') break;
        
        uploadAttempts++;
        if (onProgress) await onProgress(0, 30, "Server busy, retrying...");
        await delay(3000); // 3 seconds nghah hnuah chhin nawn leh rawh
      }

      if (uploadRes.data.status !== 'accepted') {
        throw new Error("Server is too busy. Try again later.");
      }

      const jobId = uploadRes.data.job_id;
      let attempts = 0;
      const maxAttempts = 60;

      while (attempts < maxAttempts) {
        if (onProgress) await onProgress(attempts, maxAttempts);

        const statusx = new FormData();
        statusx.append('job_id', jobId);
        statusx.append('auth_key', authKey);
        statusx.append('locale', 'en');

        const res = await client.post(`${xminus.api.base}${xminus.api.endpoint.upload}?check-job-status`, statusx, {
          headers: { ...statusx.getHeaders(), ...xminus.headers }
        });

        if (res.data.status === 'done') {
          return {
            status: true,
            result: {
              download: {
                vocal: `${xminus.api.base}${xminus.api.endpoint.download}?job-id=${jobId}&stem=vocal&fmt=${final.format}`,
                instrumental: `${xminus.api.base}${xminus.api.endpoint.download}?job-id=${jobId}&stem=inst&fmt=${final.format}`
              }
            }
          };
        } else if (res.data.status === 'failed') {
          throw new Error("AI Server failed to process this file.");
        }
        await delay(5000);
        attempts++;
      }
      return { status: false, result: { error: "Timeout" } };
    } catch (error) {
      return { status: false, result: { error: error.message } };
    }
  }
};

module.exports = { xminus };