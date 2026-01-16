const ws = require('ws');
const axios = require('axios');
const FormData = require('form-data');

class Pixnova {
    constructor() {
        this.headers = {
            'authority': 'api.pixnova.ai',
            'accept': 'application/json, text/plain, */*',
            'accept-language': 'en-US,en;q=0.9',
            'origin': 'https://pixnova.ai',
            'referer': 'https://pixnova.ai/',
            'theme-version': '83EmcUoQTUv50LhNx0VrdcK8rcGexcP35FcZDcpgWsAXEyO4xqL5shCY6sFIWB2Q',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'x-code': Date.now().toString()
        };
    }
    
    _createSocket = async (endpoint, data) => {
        return new Promise((resolve, reject) => {
            const session_hash = Math.random().toString(36).substring(2);
            // WebSocket 403 pumpelh nan headers kan telh tel angai
            const socket = new ws(`wss://pixnova.ai/${endpoint}/queue/join`, {
                headers: {
                    'Origin': 'https://pixnova.ai',
                    'User-Agent': this.headers['user-agent']
                }
            });
            
            socket.on('message', (msg) => {
                const d = JSON.parse(msg.toString('utf8'));
                
                if (d.msg === 'send_hash') {
                    socket.send(JSON.stringify({ session_hash }));
                } else if (d.msg === 'send_data') {
                    socket.send(JSON.stringify({ data, session_hash }));
                } else if (d.msg === 'process_completed') {
                    socket.close();
                    if (d.output && d.output.result) {
                        resolve(`https://oss-global.pixnova.ai/${d.output.result[0]}`);
                    } else {
                        reject(new Error("Process completed but no output found."));
                    }
                }
            });
            
            socket.on('error', (err) => {
                socket.close();
                reject(err);
            });
        });
    }
    
    _upload = async (buffer) => {
        try {
            const form = new FormData();
            form.append('file', buffer, {
                filename: `${Date.now()}_rynn.jpg`,
                contentType: 'image/jpeg'
            });
            form.append('request_from', '2');
            
            const { data } = await axios.post('https://api.pixnova.ai/api/upload_img', form, {
                headers: {
                    ...this.headers,
                    ...form.getHeaders()
                }
            });
            
            return data;
        } catch (error) {
            throw new Error(`Upload failed: ${error.response?.data?.message || error.message}`);
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
                if (data.data.status === 3) throw new Error("Face generation failed on server.");
                await new Promise(res => setTimeout(res, 2000));
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
        if (!_gender.includes(gender.toLowerCase())) throw new Error(`Available genders: ${_gender.join(', ')}`);
        
        return this._createSocket('demo-ai-baby', {
            gender: gender.toLowerCase(),
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
}

module.exports = Pixnova;