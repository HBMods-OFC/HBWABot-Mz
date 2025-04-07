const axios = require('axios');
const cheerio = require('cheerio');

const musicara = {
  api: {
    base: 'https://musicara.ml'
  },

  headers: {
    'authority': 'musicara.ml',
    'accept': '*/*',
    'origin': 'https://musicara.ml',
    'referer': 'https://musicara.ml/',
    'user-agent': 'Postify/1.0.0'
  },

  steamx: {
    'spleeter:2stems': 'Vocals + Music',
    'NoDrums': 'No Drums vs Drums',
    'NoBass': 'No Bass vs Bass',
    'spleeter:4stems': 'Vocals + Music + Bass + Drums',
    'spleeter:5stems': 'Vocals + Music + Bass + Drums + Piano'
  },

  isUrl: (str) => {
    try {
      new URL(str);
      return true;
    } catch (_) {
      return false;
    }
  },

  youtube: (url) => {
    if (!url) return null;
    const patterns = [
      /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
      /youtu\.be\/([a-zA-Z0-9_-]{11})/
    ];
    for (let pattern of patterns) {
      if (pattern.test(url)) return url.match(pattern)[1];
    }
    return null;
  },

  request: async (url, options = {}) => {
    try {
      const form = new URLSearchParams();
      form.append('email', options.email || '');
      form.append('stems', options.stems || 'spleeter:2stems');
      form.append('id', url);

      const response = await axios.post(musicara.api.base, form, {
        headers: musicara.headers
      });

      return {
        status: true,
        code: 200,
        result: {
          data: response.data
        }
      };
    } catch (error) {
      if (error.response?.status === 500) {
        return {
          status: false,
          code: 500,
          result: {
            error: "Server error! Try again later, it might be down 😂"
          }
        };
      }

      if (error.code === 'ECONNREFUSED') {
        return {
          status: false,
          code: error.code,
          result: {
            error: "Server is currently offline! Please wait, it might be under maintenance 😬"
          }
        };
      }

      return {
        status: false,
        code: error.response?.status || 'UNKNOWN',
        result: {
          error: "Unexpected error! Maybe try again later 😂"
        }
      };
    }
  },

  parse: (data) => {
    const $ = cheerio.load(data);

    const dlinks = {};
    $('audio source').each((i, el) => {
      const src = $(el).attr('src');
      if (src) {
        if (!src.includes('-')) {
          dlinks.original = src;
        } else if (src.includes('-vocals')) {
          dlinks.vocals = src;
        } else if (src.includes('-other') || src.includes('-accompaniment')) {
          dlinks.instrumental = src;
        } else if (src.includes('-NoDrums')) {
          dlinks.noDrums = src;
        } else if (src.includes('-drums')) {
          dlinks.drums = src;
        } else if (src.includes('-NoBass')) {
          dlinks.noBass = src;
        } else if (src.includes('-bass')) {
          dlinks.bass = src;
        } else if (src.includes('-piano')) {
          dlinks.piano = src;
        }
      }
    });

    if (!dlinks.original) {
      throw new Error("No links found! Maybe try refreshing the page 🤣");
    }

    return dlinks;
  },

  vt: (dlinks, stems) => {
    switch (stems) {
      case 'spleeter:2stems':
        if (!dlinks.vocals || !dlinks.instrumental) {
          throw new Error("Missing vocals or instrumental 😒");
        }
        break;

      case 'NoDrums':
        if (!dlinks.noDrums || !dlinks.drums) {
          throw new Error("Drums track not found 🤣");
        }
        break;

      case 'NoBass':
        if (!dlinks.noBass || !dlinks.bass) {
          throw new Error("Bass track not found 🤣");
        }
        break;

      case 'spleeter:4stems':
        if (!dlinks.vocals || !dlinks.other || !dlinks.drums || !dlinks.bass) {
          throw new Error("4-stem tracks are incomplete 🤣");
        }
        break;

      case 'spleeter:5stems':
        if (!dlinks.vocals || !dlinks.other || !dlinks.drums || !dlinks.bass || !dlinks.piano) {
          throw new Error("5-stem tracks are incomplete 🤣");
        }
        break;
    }
  },

  download: async (link, stems = 'spleeter:2stems') => {
    if (!link) {
      return {
        status: false,
        code: 400,
        result: {
          error: "Where's the link?! What are you trying to download? 😤"
        }
      };
    }

    if (!musicara.isUrl(link)) {
      return {
        status: false,
        code: 400,
        result: {
          error: "Invalid link! Use a valid YouTube link 😒"
        }
      };
    }

    if (!musicara.steamx[stems]) {
      return {
        status: false,
        code: 400,
        result: {
          error: "Invalid format! Choose a valid one 😤",
          available_stems: musicara.steamx
        }
      };
    }

    const id = musicara.youtube(link);
    if (!id) {
      return {
        status: false,
        code: 400,
        result: {
          error: "Failed to extract YouTube link! Make sure it's correct 😒"
        }
      };
    }

    try {
      const response = await musicara.request(link, { stems });
      if (!response.status) return response;

      const dlinks = musicara.parse(response.result.data);

      musicara.vt(dlinks, stems);

      const result = {
        type: "audio",
        stems: stems,
        thumbnail: `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
        download: { ...dlinks },
        id: id
      };

      return {
        status: true,
        code: 200,
        result: result
      };
    } catch (error) {
      return {
        status: false,
        code: 500,
        result: {
          error: error.message || "Server is busy right now 😎"
        }
      };
    }
  }
};

module.exports = { musicara };
