const ws = require('ws');
const axios = require('axios');
const FormData = require('form-data');

class Pixnova {
    constructor() {
        this.headers = {
            'theme-version': '83EmcUoQTUv50LhNx0VrdcK8rcGexcP35FcZDcpgWsAXEyO4xqL5shCY6sFIWB2Q',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36',
            'x-code': Date.now().toString()
        };
    }
    
    _createSocket = async (endpoint, data) => {
        return new Promise((resolve, reject) => {
            const session_hash = Math.random().toString(36).substring(2);
            const socket = new ws(`wss://pixnova.ai/${endpoint}/queue/join`);
            
            socket.on('message', (msg) => {
                const d = JSON.parse(msg.toString('utf8'));
                
                if (d.msg === 'send_hash') {
                    socket.send(JSON.stringify({ session_hash }));
                } else if (d.msg === 'send_data') {
                    socket.send(JSON.stringify({ data }));
                } else if (d.msg === 'process_completed') {
                    socket.close();
                    resolve(`https://oss-global.pixnova.ai/${d.output.result[0]}`);
                }
            });
            
            socket.on('error', reject);
        });
    }
    
    _upload = async (buffer) => {
        try {
            const form = new FormData();
            form.append('file', buffer, `${Date.now()}_rynn.jpg`);
            form.append('request_from', '2');
            const { data } = await axios.post('https://api.pixnova.ai/api/upload_img', form, {
                headers: {
                    ...this.headers,
                    ...form.getHeaders()
                }
            });
            
            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    faceswap = async ({ source, face }) => {
        try {
            if (!source || !Buffer.isBuffer(source)) throw new Error('Source image buffer is required');
            if (!face || !Buffer.isBuffer(face)) throw new Error('Face image buffer is required');
             
            const [f1, f2] = await Promise.all([
                this._upload(source),
                this._upload(face)
            ]);
            const { data: task } = await axios.post('https://api.pixnova.ai/api/generate_face', {
                source_image: f1.data,
                face_image: f2.data,
                request_from: 2
            }, {
                headers: this.headers
            });
             
            while (true) {
                const { data } = await axios.post('https://api.pixnova.ai/api/check_status', {
                    task_id: task.data.task_id,
                    request_from: 2
                }, {
                    headers: this.headers
                });
                
                if (data.data.status === 2) return `https://art-global.yimeta.ai/${data.data.result_image}`;
                await new Promise(res => setTimeout(res, 1000));
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    changeclothes = async (buffer, prompt = 'nude') => {
        if (!buffer || !Buffer.isBuffer(buffer)) throw new Error('Image buffer is required');
        
        return this._createSocket('cloth-change', {
            source_image: `data:image/jpeg;base64,${buffer.toString('base64')}`,
            prompt: prompt,
            cloth_type: 'full_outfits',
            request_from: 2,
            type: 1
        });
    }
    
    facecutout = async (buffer) => {
        if (!buffer || !Buffer.isBuffer(buffer)) throw new Error('Image buffer is required');
        
        return this._createSocket('demo-face-cutout', {
            source_image: `data:image/jpeg;base64,${buffer.toString('base64')}`,
            request_from: 2
        });
    }
    
    aibaby = async ({ father, mother, gender = 'boy' } = {}) => {
        const _gender = ['boy', 'girl'];
        
        if (!father || !Buffer.isBuffer(father)) throw new Error('Father image buffer is required');
        if (!mother || !Buffer.isBuffer(mother)) throw new Error('Mother image buffer is required');
        if (!_gender.includes(gender)) throw new Error(`Available genders: ${_gender.join(', ')}`);
        
        return this._createSocket('demo-ai-baby', {
            gender: gender,
            father_image: `data:image/jpeg;base64,${father.toString('base64')}`,
            mother_image: `data:image/jpeg;base64,${mother.toString('base64')}`,
            request_from: 2
        });
    }
    
    img2anime = async (buffer, { strength = 0.5, prompt = '(masterpiece), best quality', negative_prompt = '(worst quality, low quality:1.4), (greyscale, monochrome:1.1), cropped, lowres , username, blurry, trademark, watermark, title, multiple view, Reference sheet, curvy, plump, fat, strabismus, clothing cutout, side slit,worst hand, (ugly face:1.2), extra leg, extra arm, bad foot, text, name' } = {}) => {
        if (!buffer || !Buffer.isBuffer(buffer)) throw new Error('Image buffer is required');
        
        return this._createSocket('demo-photo2anime', {
            source_image: `data:image/jpeg;base64,${buffer.toString('base64')}`,
            strength: strength,
            prompt: prompt,
            negative_prompt: negative_prompt,
            request_from: 2
        });
    }

    img2ghibli = async (buffer, { prompt = '(masterpiece), best quality', negative_prompt = '(worst quality, low quality:1.4), (greyscale, monochrome:1.1), cropped, lowres , username, blurry, trademark, watermark, title, multiple view, Reference sheet, curvy, plump, fat, strabismus, clothing cutout, side slit,worst hand, (ugly face:1.2), extra leg, extra arm, bad foot, text, name' } = {}) => {
        if (!buffer || !Buffer.isBuffer(buffer)) throw new Error('Image buffer is required');
        
        return this._createSocket('demo-image2image-series', {
            style_name: 'ghibli',
            source_image: `data:image/jpeg;base64,${buffer.toString('base64')}`,
            prompt: prompt,
            negative_prompt: negative_prompt,
            request_from: 2
        });
    }
    
    txt2ghibli = async (prompt, { ratio = '1:1' } = {}) => {
        const _ratio = {
            '1:1': { width: 1024, height: 1024 },
            '3:4': { width: 896, height: 1152 },
            '4:3': { width: 1152, height: 896 },
            '9:16': { width: 768, height: 1344 },
            '16:9': { width: 1344, height: 768 },
            '2:3': { width: 832, height: 1216 },
            '3:2': { width: 1216, height: 832 }
        };
        
        if (!prompt) throw new Error('Prompt is required');
        if (!Object.keys(_ratio).includes(ratio)) throw new Error(`Available ratios: ${Object.keys(_ratio).join(', ')}`);
        
        return this._createSocket('demo-text2image-series', {
            prompt: prompt,
            model: 'meinamix_meinaV11.safetensors',
            lora: ['Studio_Chibli_Style_offset:0.7'],
            width: _ratio[ratio].width,
            height: _ratio[ratio].height,
            cfg: 7,
            radio: ratio,
            request_from: 2
        });
    }
}

module.exports = Pixnova
