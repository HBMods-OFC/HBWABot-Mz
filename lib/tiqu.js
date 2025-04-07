const axios = require('axios');
const CryptoJS = require('crypto-js');

const tiqu = {
  api: {
    base: 'https://wapi.tiqu.cc/api/all/'
  },

  regex: {
    tiktok: /^https?:\/\/(www\.|m\.|vt\.)?tiktok\.com/,
    douyin: /^https?:\/\/(v\.|www\.)?douyin\.com/,
    instagram: /^https?:\/\/(www\.)?instagram\.com/,
    twitter: /^https?:\/\/(www\.)?(twitter\.com|x\.com)/,
    xiaohongshu: /^https?:\/\/(www\.xiaohongshu\.com|xhslink\.com)/
  },

  headers: {
    'accept': '*/*',
    'user-agent': 'Postify/1.0.0',
    'referer': 'https://tiqu.cc/'
  },

  constants: {
    secretKey: 'bfa95f704ce74c5cba31820ea1c0da05'
  },

  himex: function(url, t) {
    const paramex = `t=${t}&url=${url}`;
    return CryptoJS.HmacSHA256(paramex, this.constants.secretKey).toString(CryptoJS.enc.Hex);
  },

  enc: function(hex) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(hex));
  },

  isUrl: function(url) {
    if (!url?.trim()) {
      return {
        status: false,
        code: 400,
        result: { error: 'Where is the link? Are you serious about downloading? 🗿' }
      };
    }

    try {
      new URL(url);
    } catch {
      return {
        status: false,
        code: 400,
        result: { error: 'Invalid link, please check again 👎🏻' }
      };
    }

    const isValid = Object.values(this.regex).some(regex => regex.test(url));
    if (!isValid) {
      return {
        status: false,
        code: 400,
        result: { error: 'This link is not supported. Use a TikTok, Douyin, Instagram, Twitter, or Xiaohongshu link.' }
      };
    }

    return { status: true, code: 200 };
  },

  download: async function(url) {
    const validation = this.isUrl(url);
    if (!validation.status) return validation;

    const t = Date.now().toString();
    const hex = this.himex(url, t);
    const sign = this.enc(hex);

    try {
      const response = await axios.get(
        `${this.api.base}?url=${encodeURIComponent(url)}&t=${t}&sign=${encodeURIComponent(sign)}`,
        { headers: { ...this.headers, t, sign } }
      );

      if (!response.data || !Object.keys(response.data).length) {
        return { status: false, code: 500, result: { error: 'No response received 🤷🏻' } };
      }

      return { status: true, code: 200, result: response.data };
    } catch (error) {
      return { status: false, code: error.response?.status || 500, result: { error: 'An error occurred while processing 🗿' } };
    }
  }
};

module.exports = { tiqu };