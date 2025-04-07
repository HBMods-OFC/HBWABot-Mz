const WebSocket = require('ws');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const https = require('https');
const path = require('path');

const ayesoul = {
  api: {
    base: 'https://ayesoul.com/api',
    endpoint: {
      goto: '/attachgoto',
      websocket: 'wss://goto.ayesoul.com/',
      media: 'https://media.ayesoul.com/'
    }
  },

  headers: {
    'User-Agent': 'Postify/1.0.0',
    'Origin': 'https://ayesoul.com',
    'Referer': 'https://ayesoul.com/',
    'Accept': '*/*',
    'Connection': 'keep-alive'
  },

  context: {
    messageId: null,
    question: null,
    answer: null,
    type: null
  },

  genId: (length = 21) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  },

  uploadImage: async (img) => {
    if (!img) {
      return {
        status: false,
        code: 400,
        result: {
          error: 'Path imagenya mana? Lu kira gua dukun apa, bisa tau lu mau input image yang mana 🗿'
        }
      };
    }

    const form = new FormData();
    form.append('file', fs.createReadStream(img), {
      filename: path.basename(img),
      contentType: 'image/jpeg'
    });

    const xcs = `${ayesoul.genId(7)}-|BANKAI|-${ayesoul.genId(7)}`;

    try {
      const response = await axios.post(
        `${ayesoul.api.base}${ayesoul.api.endpoint.goto}`,
        form,
        {
          headers: {
            ...ayesoul.headers,
            ...form.getHeaders(),
            'x-cache-sec': xcs
          },
          httpsAgent: new https.Agent({
            rejectUnauthorized: false,
            keepAlive: true,
            timeout: 60000
          }),
          timeout: 60000,
          maxContentLength: Infinity,
          maxBodyLength: Infinity
        }
      );

      if (!response.data?.file_id) {
        throw new Error('File IDnya kagak ada di response bree 😑');
      }

      return {
        status: true,
        code: 200,
        result: {
          file_id: response.data.file_id
        }
      };

    } catch (error) {
      return {
        status: false,
        code: 400,
        result: {
          error: 'Upload Filenya gagal bree, upload ulang aja gaksih 🤣'
        }
      };
    }
  },

  create: (query, isFollowUp, attachments = []) => ({
    input: JSON.stringify({
      event: query,
      attach: attachments,
      dateObject: new Date().toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      }),
      currentDateTimeISOString: new Date().toISOString(),
      id: ayesoul.genId(),
      "x-cache-sec": `${ayesoul.genId(7)}-|BANKAI|-${ayesoul.genId(7)}`,
      chin_tapak_dum_dum: {
        cf_config: {
          unos: "",
          dos: "",
          tres: "",
          chin: ""
        }
      },
      nostal: isFollowUp && ayesoul.context.messageId ? [{
        id: ayesoul.context.messageId,
        rank: 1,
        question: ayesoul.context.question,
        answer: ayesoul.context.answer
      }] : [],
      ultra_mode: true,
      customExcludeList: []
    })
  }),

  references: (text, sourcesRaw, refOps) => {
    if (refOps === true) {
      return text.replace(/\[(\d+(?:,\s*\d+)*)\]/g, (match, p1) => {
        const indices = p1.split(',').map(num => parseInt(num.trim()) - 1);
        const urls = indices
          .map(index => (index >= 0 && index < sourcesRaw.length) ? sourcesRaw[index] : '')
          .filter(url => url);
        return urls.length ? urls.map(url => `[${url}](${url})`).join(', ') : match;
      });
    } else if (refOps === 'delete') {
      return text.replace(/\s*\[(\d+(?:,\s*\d+)*)\]\s*/g, '');
    }
    return text;
  },

  websoket: (query, isFollowUp, attachments = [], refOps = false, count = 1) => {
    return new Promise((resolve, reject) => {
      let retryCount = 0;
      const maxRetries = 5;
      let remainingCount = count;
      let isResolved = false;

      const connect = async () => {
        if (retryCount > 0) {
          const delay = Math.min(1000 * Math.pow(2, retryCount) + Math.random() * 1000, 10000);
          await new Promise(resolve => setTimeout(resolve, delay));
        }

        const wsx = {
          headers: {
            ...ayesoul.headers,
            'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
            'Sec-WebSocket-Version': '13',
            'Upgrade': 'websocket'
          },
          agent: new https.Agent({
            rejectUnauthorized: false,
            keepAlive: true,
            timeout: 60000
          }),
          followRedirects: true,
          maxPayload: 100 * 1024 * 1024
        };

        let socket;
        try {
          socket = new WebSocket(ayesoul.api.endpoint.websocket, wsx);
        } catch (error) {
          console.error(error);
          return retry();
        }

        let response = {
          sourcesRaw: [],
          contextSources: [],
          followUpQuestions: [],
          searchPlan: '',
          answer: '',
          messageId: null,
          images: []
        };

        let isAnswer = false;
        let fullAnswer = '';
        let connectionTimeout;
        let activityTimeout;
        let pingInterval;
        let lastPong = Date.now();

        const cleanup = () => {
          clearTimeout(connectionTimeout);
          clearTimeout(activityTimeout);
          clearInterval(pingInterval);
          if (socket?.readyState === WebSocket.OPEN) {
            try {
              socket.terminate();
            } catch (error) {
              console.error(error);
            }
          }
        };

        const retry = async () => {
          cleanup();
          if (!isResolved && retryCount < maxRetries) {
            retryCount++;
            await connect();
          } else if (!isResolved) {
            isResolved = true;
            reject(new Error(`Gagal konek ${maxRetries} kali percobaan bree 🤣 Coba lagi nanti aja yak.. `));
          }
        };

        connectionTimeout = setTimeout(() => {
          if (!isResolved) retry();
        }, 30000);

        socket.on('open', () => {
          clearTimeout(connectionTimeout);
          
          pingInterval = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
              socket.ping();
              if (Date.now() - lastPong > 30000) retry();
            }
          }, 15000);

          activityTimeout = setTimeout(() => {
            if (!isResolved) retry();
          }, 30000);

          try {
            socket.send(JSON.stringify(ayesoul.create(query, isFollowUp, attachments)));
          } catch (error) {
            retry();
          }
        });

        socket.on('pong', () => {
          lastPong = Date.now();
        });

        socket.on('message', (data) => {
          clearTimeout(activityTimeout);
          
          activityTimeout = setTimeout(() => {
            if (!isResolved) retry();
          }, 30000);

          try {
            const message = JSON.parse(data);
            switch (message.status) {
              case 'SOUL XDots':
                if (message.message.sourcesRaw) {
                  response.sourcesRaw = message.message.sourcesRaw;
                }
                break;

              case 'SOUL XMeta':
                if (message.message.contextSources) {
                  response.contextSources = message.message.contextSources;
                }
                if (message.message.followUpQuestions) {
                  response.followUpQuestions = message.message.followUpQuestions;
                }
                if (message.message.genUiConfig?.searchPlan) {
                  response.searchPlan = message.message.genUiConfig.searchPlan;
                }
                break;

              case 'SOUL XType':
                if (message.message === 'gen_image') {
                  response.answer = `Otw generate ${count} gambar...`;
                }
                break;

              case 'SOUL XCraft':
                isAnswer = true;
                break;

              case 'SOUL XStream':
                if (isAnswer) {
                  fullAnswer += message.message;
                }
                break;

              case 'SOUL XImage':
                response.images.push(`${ayesoul.api.endpoint.media}${message.message}`);
                remainingCount--;
                if (remainingCount === 0) {
                  cleanup();
                  resolve(response);
                } else {
                  socket.send(JSON.stringify(ayesoul.create(query, false, [])));
                }
                break;

              case 'SOUL XOver':
                response.messageId = message.message.id;
                if (response.images.length === 0) {
                  response.answer = ayesoul.references(fullAnswer, response.sourcesRaw, refOps);
                }
                if (remainingCount === 0 && !isResolved) {
                  isResolved = true;
                  cleanup();
                  resolve(response);
                }
                break;
            }
          } catch (error) {
            console.error(error);
          }
        });

        socket.on('close', () => {
          cleanup();
          if (response.answer || response.images.length > 0) {
            if (!isResolved) {
              isResolved = true;
              resolve(response);
            }
          } else {
            retry();
          }
        });

        socket.on('error', (error) => {
          if (!isResolved) retry();
        });
      };

      connect().catch(error => {
        if (!isResolved) {
          isResolved = true;
          reject(error);
        }
      });
    });
  },

  request: async (query, options = {}) => {
    if (!query?.trim()) {
      return {
        status: false,
        code: 400,
        result: {
          error: 'Querynya kagak boleh kosong bree 😂 Capek bener ngasih tau lu 😏'
        }
      };
    }

    try {
      let isFollowUp = options.follow === true;
      let attachments = [];
      let type = 'chat';
      let refOps = options.useReferences;
      let count = options.count || 1;

      if (options.image) {
        const res = await ayesoul.uploadImage(options.image);
        if (!res.status) {
          return res;
        }

        if (!res.result?.file_id) {
          return {
            status: false,
            code: 400,
            result: {
              error: 'Hadeh, padahal udah diupload ..tapi file id nya kagak ada 😂 gaje bener..'
            }
          };
        }

        attachments.push({
          file_id: res.result.file_id,
          name: path.basename(options.image),
          type: 'jpg',
          mime: 'image/jpeg'
        });
        type = 'vision';
        isFollowUp = false;
      }

      if (ayesoul.context.type !== 'chat') {
        isFollowUp = false;
      }

      const response = await ayesoul.websoket(query, isFollowUp, attachments, refOps, count);
      
      let result;
      if (response.images && response.images.length > 0) {
        type = 'genimage';
        result = {
          status: true,
          code: 200,
          result: {
            type: 'genimage',
            count: response.images.length,
            images: response.images
          }
        };
      } else if (type === 'vision') {
        result = {
          status: true,
          code: 200,
          result: {
            type: 'vision',
            message: response.answer,
            file_id: attachments[0].file_id,
            sourcesRaw: response.sourcesRaw || [],
            contextSources: response.contextSources || [],
            followUpQuestions: response.followUpQuestions || []
          }
        };
      } else {
        result = {
          status: true,
          code: 200,
          result: {
            type: 'chat',
            message: response.answer,
            sourcesRaw: response.sourcesRaw || [],
            contextSources: response.contextSources || [],
            followUpQuestions: response.followUpQuestions || [],
            searchPlan: response.searchPlan || ''
          }
        };
      }
      
      ayesoul.context = {
        messageId: response.messageId,
        question: query,
        answer: response.answer,
        type
      };
      
      return result;

    } catch (error) {
      return {
        status: false,
        code: 400,
        result: {
          error: error.message || 'Error bree.. Fix sendiri yak ..'
        }
      };
    }
  },

  resetSession: () => {
    ayesoul.context = {
      messageId: null,
      question: null,
      answer: null,
      type: null
    };
    return {
      status: true,
      code: 200,
      result: {
        message: 'Session chat berhasil direset euy...'
      }
    };
  }
};

export { ayesoul };