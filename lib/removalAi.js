const axios = require('axios');
const FormData = require('form-data');

const removalAi = {
  api: {
    base: 'https://removal.ai',
    remove: 'https://api.removal.ai',
    endpoint: {
      webtoken: '/wp-admin/admin-ajax.php',
      remove: '/3.0/remove',
      slug: '/upload/',
    },
  },

  headers: { 'user-agent': 'Postify/1.0.0' },

  isUrl: async (link) => {
    if (!link || !link.match(/^https?:\/\/.+\/.+$/)) {
      return { valid: false, code: 400, error: "Image link is missing. Input cannot be empty." };
    }

    try {
      const response = await axios.get(link, { responseType: 'arraybuffer' });
      const contentType = response.headers['content-type'];

      if (!contentType?.startsWith('image/')) {
        return { valid: false, code: 400, error: "Provided link is not an image." };
      }

      const buffer = Buffer.from(response.data);
      if (buffer.length > 5 * 1024 * 1024) { // 5MB limit
        return { valid: false, code: 400, error: "Image file size exceeds 5MB limit." };
      }

      return {
        valid: true,
        buffer,
        fileName: link.split('/').pop().split('#')[0].split('?')[0],
        type: contentType,
      };
    } catch (err) {
      return { valid: false, code: err.response?.status || 400, error: "Failed to fetch image from the provided link. Please check the link again." };
    }
  },

  getSecurity: async () => {
    try {
      const response = await axios.get(`${removalAi.api.base}${removalAi.api.endpoint.slug}`);
      const match = response.data.match(/ajax_upload_object = (.*?);/);

      if (!match) {
        return { valid: false, code: 400, error: "Security token not found in the response." };
      }

      const securityObject = JSON.parse(match[1]);
      return { valid: true, security: securityObject.security };
    } catch (err) {
      return { valid: false, code: err.response?.status || 400, error: "Failed to retrieve security token from the endpoint." };
    }
  },

  getWebToken: async (security) => {
    if (!security) {
      return { valid: false, code: 400, error: "Security token is missing from input." };
    }

    try {
      const response = await axios.get(`${removalAi.api.base}${removalAi.api.endpoint.webtoken}`, {
        params: { action: 'ajax_get_webtoken', security },
        headers: {
          ...removalAi.headers,
          'Referer': `${removalAi.api.base}${removalAi.api.endpoint.slug}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });

      if (!response.data.success) {
        return { valid: false, code: 400, error: "Server denied access for fetching web token." };
      }

      return { valid: true, webtoken: response.data.data.webtoken };
    } catch (err) {
      return { valid: false, code: err.response?.status || 400, error: "Failed to retrieve web token from the server." };
    }
  },

  remove: async (link) => {
    const img = await removalAi.isUrl(link);
    if (!img.valid) {
      return { success: false, code: img.code, result: { error: img.error } };
    }

    const securityResponse = await removalAi.getSecurity();
    if (!securityResponse.valid) {
      return { success: false, code: securityResponse.code, result: { error: securityResponse.error } };
    }

    const webTokenResponse = await removalAi.getWebToken(securityResponse.security);
    if (!webTokenResponse.valid) {
      return { success: false, code: webTokenResponse.code, result: { error: webTokenResponse.error } };
    }

    try {
      const formData = new FormData();
      formData.append('image_file', img.buffer, {
        filename: img.fileName,
        contentType: img.type,
      });

      const response = await axios.post(`${removalAi.api.remove}${removalAi.api.endpoint.remove}`, formData, {
        headers: {
          ...removalAi.headers,
          'authority': 'api.removal.ai',
          'origin': removalAi.api.base,
          'web-token': webTokenResponse.webtoken,
          ...formData.getHeaders(),
        },
      });

      const { status, ...result } = response.data;
      return { success: true, code: 200, result };
    } catch (err) {
      return {
        success: false,
        code: err.response?.status || 400,
        result: { error: "Failed to process image removal on the Removal AI server." },
      };
    }
  },
};

module.exports = { removalAi };
