const axios = require('axios');
const FormData = require('form-data');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

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
    'User-Agent': 'Postify/1.0.0',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Origin': 'https://x-minus.pro',
    'Referer': 'https://x-minus.pro/ai'
  },

  options: {
    separation_types: {
      vocals_music: "Vocals & Music",
      experimental: "Experimental",
      bv_other: "Backing Vocals",
      lv_other: "Lead Vocals",
      bass_other: "Bass",
      drums_other: "Drums",
      splitter: "Multi-Stem Split",
      wind_other: "Wind Instruments",
      piano_other: "Piano",
      strings_other: "Strings",
      guitar_other: "Guitar",
      dereverb: "De-reverb",
      deecho: "De-echo",
      decrowd: "De-crowd",
      denoise: "De-noise"
    },

    models: {
      mdx_v2_vocft: "MDX VocFT",
      mel_roformer: "Mel-RoFormer",
      mel_roformer_inst_by_gaboxfv7: "Mel-RoFormer by Gabox V7",
      mel_roformer_inst_by_becruily: "Mel-RoFormer by becruily",
      mel_roformer_inst_by_unwa_v2: "Mel-RoFormer by unwa v2",
      bs_roformer: "BS-RoFormer",
      htdemucs: "Demucs v4"
    },

    formats: ["mp3", "wav", "m4a", "flac", "zip", "stem.mp4"],

    aggressiveness: {
      1: "Low",
      2: "Medium",
      3: "High"
    },

    lvpanning: {
      0: "Center",
      1: "Slight Left",
      2: "Left",
      3: "Slight Right",
      4: "Right"
    },

    uvrbvect: {
      music: "Music",
      speech: "Speech",
      other: "Other"
    },

    prerate: {
      0: "No",
      1: "Yes"
    }
  },

  getAuthKey: async () => {
    try {
      const response = await axios.get(`${xminus.api.base}${xminus.api.endpoint.ai}`, {
        headers: xminus.headers
      });

      const dom = new JSDOM(response.data);
      const authKey = dom.window.document.querySelector('#vocal-cut-auth-key')?.value;

      if (!authKey) throw new Error("Damn, the auth key is missing! 🗿");
      return authKey;

    } catch (error) {
      throw new Error("Oops, the server is having issues. Try again later! 🤣");
    }
  },

  convert: async (filePath, options = {}) => {
    try {
      if (!filePath) {
        return {
          status: false,
          code: 400,
          result: {
            error: "Where’s the file? If you want to use this tool, don’t leave it empty! 🗿"
          }
        };
      }

      if (!fs.existsSync(filePath)) {
        return {
          status: false,
          code: 404,
          result: {
            error: "The file doesn’t exist. Check the path again 🙃"
          }
        };
      }

      const authKey = await xminus.getAuthKey();

      const def = {
        separation_type: 'vocals_music',
        model: 'mdx_v2_vocft',
        format: 'mp3',
        aggressiveness: 1,
        lvpanning: 0,
        uvrbve_ct: 'music',
        prerate: 0
      };

      const final = { ...def, ...options };

      const formData = new FormData();
      formData.append('myfile', fs.createReadStream(filePath));
      formData.append('auth_key', authKey);
      formData.append('locale', 'en');
      formData.append('separation', 'inst_vocal');
      formData.append('separation_type', final.separation_type);
      formData.append('format', final.format);
      formData.append('version', '1.0');
      formData.append('model', final.model);
      formData.append('aggressiveness', final.aggressiveness);
      formData.append('lvpanning', final.lvpanning);
      formData.append('uvrbve_ct', final.uvrbve_ct);
      formData.append('pre_rate', final.prerate);
      formData.append('show_setting_format', 'true');
      formData.append('hostname', 'x-minus.pro');

      const up = await axios.post(`${xminus.api.base}${xminus.api.endpoint.upload}?catch-file`, formData, {
        headers: {
          ...formData.getHeaders(),
          ...xminus.headers
        }
      });

      if (up.data.status !== 'accepted') {
        return {
          status: false,
          code: 400,
          result: {
            error: "Oops, upload failed! 🤣"
          }
        };
      }

      const jobId = up.data.job_id;
      let attempts = 0;
      const maxAttempts = 60;

      while (attempts < maxAttempts) {
        const statusx = new FormData();
        statusx.append('job_id', jobId);
        statusx.append('auth_key', authKey);
        statusx.append('locale', 'en');

        const res = await axios.post(`${xminus.api.base}${xminus.api.endpoint.upload}?check-job-status`, statusx, {
          headers: {
            ...statusx.getHeaders(),
            ...xminus.headers
          }
        });

        if (res.data.status === 'done') {
          return {
            status: true,
            code: 200,
            result: {
              jobId,
              download: {
                vocal: `${xminus.api.base}${xminus.api.endpoint.download}?job-id=${jobId}&stem=vocal&fmt=${final.format}`,
                instrumental: `${xminus.api.base}${xminus.api.endpoint.download}?job-id=${jobId}&stem=inst&fmt=${final.format}`
              }
            }
          };
        } else if (res.data.status === 'failed') {
          return {
            status: false,
            code: 400,
            result: {
              error: "Failed, the server might be down 😂"
            }
          };
        }

        console.log(`Still processing... (${attempts + 1}/${maxAttempts}) ⏳`);
        await delay(5000);
        attempts++;
      }

      return {
        status: false,
        code: 408,
        result: {
          error: "This is taking forever... Timeout! 🤣"
        }
      };

    } catch (error) {
      return {
        status: false,
        code: error.response?.status || 400,
        result: {
          error: "Error 😑"
        }
      };
    }
  },

  download: async (url, outputPath, authKey) => {
    try {
      const response = await axios.get(url, {
        responseType: 'stream',
        headers: {
          ...xminus.headers,
          'Cookie': `auth_key=${authKey}`
        }
      });

      const writer = fs.createWriteStream(outputPath);
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
          resolve();
        });
        writer.on('error', () => {
          reject(new Error("Oops, download failed! 🤣"));
        });
      });

    } catch (error) {
      throw new Error("Error 🗿");
    }
  }
};

module.exports = { xminus };