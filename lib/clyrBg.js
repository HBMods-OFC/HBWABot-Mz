const axios = require('axios');
const clyrBg = {
  api: {
    base: "https://s5ash41h3g.execute-api.ap-south-1.amazonaws.com/default/api/v1/rmbg",
    endpoints: {
      predict: "/predict"
    }
  },

  headers: {
    'authority': 's5ash41h3g.execute-api.ap-south-1.amazonaws.com',
    'origin': 'https://clyrbg.com',
    'referer': 'https://clyrbg.com/',
    'user-agent': 'Postify/1.0.0'
  },

  isImage: (url) => {
    try {
      const ext = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
      const extension = url.split('.').pop().toLowerCase();
      return ext.includes(extension);
    } catch {
      return false;
    }
  },

  isLink: (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  getFileExt: (url) => {
    const extension = url.split('.').pop().toLowerCase();
    if (extension === 'webp') return 'webp';
    if (extension === 'jpg' || extension === 'jpeg') return 'jpeg';
    if (extension === 'png') return 'png';
    return 'png';
  },

  remove: async (img, isHD = false) => {
    if (!img) {
      return { 
        status: false, 
        code: 400, 
        result: {
          error: "Where's the image link, bro? you want to remove the background, right? Where's the image link 🗿"
        }
      };
    }

    if (!clyrBg.isLink(img)) {
      return {
        status: false,
        code: 400,
        result: {
          error: "image url link dik a ngai"
        }
      };
    }

    if (!clyrBg.isImage(img)) {
      return {
        status: false,
        code: 400,
        result: {
          error: "This is not an image link, bro 😌 Try to input the correct image link, so it can be processed immediately..."
        }
      };
    }

    if (typeof isHD !== 'boolean') {
      return {
        status: false,
        code: 400,
        result: {
          error: "The isHD parameter must be boolean (true/false) bro 🗿"
        }
      };
    }

    try {
      const ex = clyrBg.getFileExt(img);      
      const response = await axios.get(img, { responseType: 'arraybuffer' });
      const contentType = response.headers['content-type'];
      if (!contentType || !contentType.startsWith('image/')) {
        return {
          status: false,
          code: 400,
          result: {
            error: "Can't get the link to the removal results bro 🙃"
          }
        };
      }

      const b = Buffer.from(response.data, 'binary').toString('base64');

      const data = {
        file_extension: ex,
        image_bytes: b,
        hd: isHD
      };

      const result = await axios.post(`${clyrBg.api.base}${clyrBg.api.endpoints.predict}`,
        data,
        { headers: clyrBg.headers }
      );

      return {
        status: true,
        code: 200,
        result: {
          id: result.data.id,
          url: result.data.url,
          extension: ex,
          hd: isHD
        }
      };

    } catch (error) {
      if (error.code === 'ENOTFOUND') {
        return {
          status: false,
          code: 404,
          result: {
            error: "The image link can't be accessed bro 🙃 Try another image link...."
          }
        };
      }
      
      return {
        status: false,
        code: error.response?.status || 500,
        result: {
          error: error.response?.data?.message || error.message
        }
      };
    }
  }
};

module.exports = { clyrBg };