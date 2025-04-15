const axios = require('axios');
const CryptoJS = require('crypto-js');
const fs = require('fs');
const path = require('path');

const ghibliGenerator = {
    api: {
        base: 'https://ghibli-image-generator.com',
        imageBase: 'https://imgs.ghibli-image-generator.com',
        endpoints: {
            fileExists: '/api/trpc/uploads.chatFileExists?batch=1',
            signed: '/api/trpc/uploads.signedUploadUrl?batch=1', 
            create: '/api/trpc/ai.create4oImage?batch=1',
            task: '/api/trpc/ai.getTaskInfo?batch=1'
        }
    },

    defaults: {
        prompt: "restyle image in studio ghibli style, keep all details",
        mime: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
        fmt: ['jpg', 'jpeg', 'png', 'webp'],
        size: {
            "1:1": "Square - 1:1",
            "3:2": "Landscape - 3:2",
            "2:3": "Portrait - 2:3"
        }
    },

    headers: {
        'authority': 'ghibli-image-generator.com',
        'accept': 'application/json',
        'content-type': 'application/json',
        'origin': 'https://ghibli-image-generator.com',
        'referer': 'https://ghibli-image-generator.com/',
        'user-agent': 'Postify/1.0.0'
    },

    axiosInstance: axios.create({
        timeout: 30000,
        validateStatus: status => status >= 200 && status < 300
    }),

    isImage: (input) => {
        if (!input || input.trim() === '') return {
            valid: false,
            error: "Come on bro, what are you trying to generate with empty input? 🗿"
        };

        try {
            if (input.startsWith('http://') || input.startsWith('https://')) {
                new URL(input);
                const ext = input.split('.').pop().toLowerCase();
                if (!ghibliGenerator.defaults.fmt.includes(ext)) return {
                    valid: false,
                    error: `Image format not supported, make sure it's one of: ${ghibliGenerator.defaults.fmt.join(', ')} 😑`,
                    format: ext
                };
                return { valid: true, isUrl: true };
            }

            if (!fs.existsSync(input)) return {
                valid: false,
                error: "File not found at the given path 😂",
                path: input
            };

            const ext = path.extname(input).toLowerCase().replace('.','');
            if (!ghibliGenerator.defaults.fmt.includes(ext)) return {
                valid: false,
                error: `File format not supported, make sure it's one of: ${ghibliGenerator.defaults.fmt.join(', ')}`,
                format: ext
            };

            const stats = fs.statSync(input);
            if (stats.size === 0) return {
                valid: false,
                error: "The file is corrupted or empty 😂",
                path: input
            };

            return { valid: true, isUrl: false };
        } catch (error) {
            return {
                valid: false,
                error: "Whoa, that input is invalid 😂",
                input: input
            };
        }
    },

    isSize: (size) => {
        if(!size) return true;
        if(!ghibliGenerator.defaults.size[size]) {
            const as = Object.entries(ghibliGenerator.defaults.size)
                .map(([key, value]) => `${value} (${key})`)
                .join(', ');
            return {
                valid: false,
                error: `What size did you choose? 😑 That's not in the list. Choose one of: ${as} 🗿`
            };
        }
        return true;
    },

    images: async (url) => {
        try {
            const response = await axios.get(url, {
                responseType: 'arraybuffer',
                timeout: 30000,
                headers: ghibliGenerator.headers
            });

            const ext = url.split('.').pop().toLowerCase();
            const file = new File(
                [response.data],
                `image_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`,
                { type: `image/${ext}` }
            );

            return file.size > 0 ? 
                   { status: true, file, mime: `image/${ext}` } :
                   { status: false, error: "The downloaded file is empty 😲 What do you want to generate, air? 😂" };

        } catch (error) {
            return {
                status: false,
                error: "Image download failed, try again later 🥴"
            };
        }
    },

    process: async (imageUrl, options = {}) => {
        try {
            const response = await ghibliGenerator.axiosInstance.post(
                `${ghibliGenerator.api.base}${ghibliGenerator.api.endpoints.create}`,
                {
                    "0": {
                        "json": {
                            imageUrl,
                            prompt: options.prompt || ghibliGenerator.defaults.prompt,
                            size: options.size || "1:1"
                        }
                    }
                },
                { headers: ghibliGenerator.headers }
            );

            const taskId = response.data[0]?.result?.data?.json?.data?.taskId;
            return taskId ? 
                   { status: true, result: { taskId } } :
                   { status: false, result: { error: "No Task ID found, maybe the API is acting up 🥴" } };

        } catch (error) {
            return { status: false, result: { error: error.message } };
        }
    },

    wftc: async (taskId) => {
        let attempts = 0;
        while (attempts < 30) {
            try {
                const response = await ghibliGenerator.axiosInstance.get(
                    `${ghibliGenerator.api.base}${ghibliGenerator.api.endpoints.task}`,
                    {
                        params: {
                            input: JSON.stringify({
                                "0": { "json": { "taskId": taskId } }
                            })
                        },
                        headers: ghibliGenerator.headers
                    }
                );

                const data = response.data[0]?.result?.data?.json?.data;
                console.log(`✨ Status: ${data.status}, ⏳ Progress: ${data.progress}`);

                if (data.status === 'SUCCESS' && data.successFlag === 1) {
                    return {
                        status: true,
                        code: 200,
                        result: { url: data.response.resultUrls[0], taskId }
                    };
                }

                if (['GENERATE_FAILED', 'FAILED'].includes(data.status)) {
                    return {
                        status: false,
                        code: 500,
                        result: { error: "Yay 🎉 \nImage generation failed 😂 .." }
                    };
                }

                if (data.status === 'GENERATING') {
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    attempts++;
                    continue;
                }

            } catch (error) {
                if (attempts >= 29) return {
                    status: false,
                    code: 408,
                    result: { error: "Timeout 😴" }
                };
                await new Promise(resolve => setTimeout(resolve, 2000));
                attempts++;
            }
        }
    },

    generate: async (input, options = {}) => {
        const inputx = ghibliGenerator.isImage(input);
        if (!inputx.valid) return {
            status: false,
            code: 400,
            result: inputx
        };

        if (options.size) {
            const sizex = ghibliGenerator.isSize(options.size);
            if (sizex !== true) return {
                status: false,
                code: 400,
                result: sizex
            };
        }

        try {
            let file;
            if (inputx.isUrl) {
                const dl = await ghibliGenerator.images(input);
                if (!dl.status) return {
                    status: false,
                    code: 400,
                    result: dl
                };
                file = dl.file;
            } else {
                const fileData = fs.readFileSync(input);
                const ext = path.extname(input).toLowerCase().replace('.','');
                file = new File(
                    [fileData],
                    `image_${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`,
                    { type: `image/${ext}` }
                );
            }

            const hashx = `original/${CryptoJS.SHA256(input).toString()}_${Date.now()}_${Math.random().toString(36).slice(2)}.${file.name.split('.').pop()}`;

            const uploadx = await ghibliGenerator.axiosInstance.post(
                `${ghibliGenerator.api.base}${ghibliGenerator.api.endpoints.signed}`,
                { "0": { "json": { "path": hashx, "bucket": "ghibli-image-generator" } } },
                { headers: ghibliGenerator.headers }
            ).then(res => res.data[0]?.result?.data?.json);

            if (!uploadx) throw new Error("No upload link returned, something's wrong 🌝");

            await ghibliGenerator.axiosInstance.put(uploadx, file, {
                headers: { 'Content-Type': file.type }
            });

            const imageUrl = `${ghibliGenerator.api.imageBase}/${hashx}`;
            const res = await ghibliGenerator.process(imageUrl, options);

            return res.status ? 
                   await ghibliGenerator.wftc(res.result.taskId) :
                   { status: false, code: 500, result: { error: "Failed to generate image 🥴" } };

        } catch (error) {
            return {
                status: false,
                code: error.response?.status || 500,
                result: { error: error.message }
            };
        }
    }
};

module.exports = { ghibliGenerator };
