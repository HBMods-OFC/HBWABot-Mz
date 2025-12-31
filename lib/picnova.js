/* *PIXNOVA AI BABY*
 * Author: ShiroNexo~
 * Cuma ubah-ubah doangs 
 * Ori: https://gist.github.com/ShiroNexo/6180aa26ba67b95c7499eed03eadc52b
 */

const axios = require('axios')
const crypto = require('crypto')
const WebSocket = require('ws')
const fs = require('fs')

const APP_ID = "aifaceswap"
const DEVICE_ID = "817ddfb1-ea6c-4e07-b37d-3aa9281e4fb7"
const GSE = "1H5tRtzsBkqXcaJ"
const PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwlO+boC6cwRo3UfXVBadaYwcX
0zKS2fuVNY2qZ0dgwb1NJ+/Q9FeAosL4ONiosD71on3PVYqRUlL5045mvH2K9i8b
AFVMEip7E6RMK6tKAAif7xzZrXnP1GZ5Rijtqdgwh+YmzTo39cuBCsZqK9oEoeQ3
r/myG9S+9cR5huTuFQIDAQAB
-----END PUBLIC KEY-----`

const generateRandomString = (length) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const bytes = crypto.randomBytes(length)
    let result = ''
    for (let i = 0; i < length; i++) {
        result += chars[bytes[i] % chars.length]
    }
    return result
}

const aesEncrypt = (plainText, key, iv) => {
    const keyBuffer = Buffer.from(key, 'utf8')
    const ivBuffer = Buffer.from(iv, 'utf8')
    const cipher = crypto.createCipheriv('aes-128-cbc', keyBuffer, ivBuffer)
    cipher.setAutoPadding(true)

    let encrypted = cipher.update(plainText, 'utf8')
    encrypted = Buffer.concat([encrypted, cipher.final()])

    return encrypted.toString('base64')
}

const aesEncryptSimple = (value, secret) => aesEncrypt(`${APP_ID}:${value}`, secret, secret)

const signx = () => {
    const timestamp = Math.floor(Date.now() / 1000)
    const nonce = Math.random().toString(36).substring(2, 12)
    const aesSecret = generateRandomString(16)

    const aesSecretBuffer = Buffer.from(aesSecret, 'utf8')
    const secretKeyHexBuffer = crypto.publicEncrypt(
        {
            key: PUBLIC_KEY,
            padding: crypto.constants.RSA_PKCS1_PADDING
        },
        aesSecretBuffer
    )
    const secretKeyHex = secretKeyHexBuffer.toString('hex')

    const dataToSign = `${APP_ID}:${GSE}:${timestamp}:${nonce}:${secretKeyHex}`
    const sign = aesEncrypt(dataToSign, aesSecret, aesSecret)

    return { app_id: APP_ID, t: timestamp, nonce, sign, secret_key: secretKeyHex, aesSecret }
}

const normalizeImageInput = async (input) => {
    if (Buffer.isBuffer(input)) {
        return `data:image/png;base64,${input.toString('base64')}`
    }
    if (typeof input === 'string') {
        if (input.startsWith('http://') || input.startsWith('https://')) {
            try {
                const { data } = await axios.get(input, { responseType: 'arraybuffer' })
                return `data:image/png;base64,${Buffer.from(data).toString('base64')}`
            } catch (error) {
                console.error(`Error fetching image from URL: ${input}`, error)
                throw new Error(`Failed to fetch image from URL: ${input}`)
            }
        }
        if (input.startsWith('data:image/')) {
            return input
        }

        try {
            const buffer = fs.readFileSync(input)
            return `data:image/png;base64,${buffer.toString('base64')}`
        } catch (error) {
            console.error(`Error reading image file: ${input}`, error)
            throw new Error(`Failed to read image file: ${input}`)
        }
    }
    throw new Error('Unsupported image input type. Must be Buffer, URL string, base64 string, or file path string.')
}

async function Baby(fatherInput, motherInput, gender) {
    const { secret_key, aesSecret } = signx()
    const fp1 = aesEncryptSimple(DEVICE_ID, aesSecret)

    const wsUrl = `wss://pixnova.ai/demo-ai-baby/queue/join?fp=${DEVICE_ID}&fp1=${fp1}&x-guide=${secret_key}`

    let fatherBase64, motherBase64
    try {
        fatherBase64 = await normalizeImageInput(fatherInput)
        motherBase64 = await normalizeImageInput(motherInput)
    } catch (error) {
        console.error("Error processing image input:", error)
        throw error
    }


    return new Promise((resolve, reject) => {
        const ws = new WebSocket(wsUrl, {
            headers: {
                'Origin': 'https://pixnova.ai',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0',
            }
        })

        ws._isResolvedOrRejected = false
        const originalResolve = resolve
        const originalReject = reject
        resolve = (value) => {
            if (!ws._isResolvedOrRejected) {
                ws._isResolvedOrRejected = true
                originalResolve(value)
            }
        }
         reject = (reason) => {
            if (!ws._isResolvedOrRejected) {
                ws._isResolvedOrRejected = true
                 originalReject(reason)
            }
        }

        ws.on('open', () => console.log('🟢 Connected to WebSocket'))

        ws.on('message', (data) => {
            try {
                const parsed = JSON.parse(data.toString())

                if (parsed.msg === 'send_hash') {
                    const sessionHash = generateRandomString(12)
                    ws.send(JSON.stringify({ session_hash: sessionHash }))
                } else if (parsed.msg === 'send_data') {
                    if (gender !== 'boy' && gender !== 'girl') {
                         console.error('Invalid gender specified:', gender)
                         ws.close(1008, 'Invalid gender input')
                         return reject(new Error('Invalid gender specified. Must be "boy" or "girl".'))
                    }

                    const payload = {
                        data: {
                            gender: gender,
                            father_image: fatherBase64,
                            mother_image: motherBase64,
                            request_from: 2
                        }
                    }
                    ws.send(JSON.stringify(payload))
                } else if (parsed.msg === 'process_completed' && parsed.success) {
                    if (parsed.output && parsed.output.result && parsed.output.result[0]) {
                        const resultUrl = `https://oss-global.pixnova.ai/${parsed.output.result[0]}`
                        console.log('\n✅ Process Completed!')
                        ws.close()
                        resolve(resultUrl)
                    } else {
                        console.error('Process completed but result structure is unexpected:', parsed)
                        ws.close(1008, 'Unexpected result structure')
                        reject(new Error('Process completed but result structure is unexpected.'))
                    }
                } else if (parsed.success === false) {
                    console.error('API reported processing error:', parsed)
                     ws.close(1008, 'API processing error')
                    reject(new Error(`API processing error: ${parsed.msg || 'Unknown error'}`))
                }

            } catch (err) {
                console.error('Error processing WebSocket message:', err)
                ws.close(1011, 'Internal server error during message processing')
                reject(err)
            }
        })

        ws.on('error', (err) => {
            console.error('❌ WebSocket error:', err)
            reject(err)
        })

        ws.on('close', (code, reason) => {
             console.log(`🔵 WebSocket connection closed with code ${code}, reason: ${reason.toString()}`)
             if (code !== 1000 && !ws._isResolvedOrRejected) {
                 reject(new Error(`WebSocket closed unexpectedly with code ${code}: ${reason.toString()}`))
             }
        })
    })
}

async function Example() {
    try {
        const father = 'https://muslim-helalee-thread.netlify.app/images/Testimonials/man-2.jpg'
        const mother = 'https://img.freepik.com/premium-photo/woman-with-smile-her-face_662214-596878.jpg'

        const resultUrl = await Baby(father, mother, "boy")
        console.log('URL:', resultUrl)
    } catch (err) {
        throw Error(err.message)
    }
}

Example()