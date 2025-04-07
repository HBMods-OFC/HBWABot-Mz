const fetch = require('node-fetch')

class CloudflareAI {
    static models = {
        llm: [
            [1, "@cf/meta/llama-3.1-8b-instruct", "LLaMA 3.1 8B"],
            [2, "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b", "DeepSeek R1 Distill Qwen 32B"],
            [3, "@cf/qwen/qwen1.5-7b-chat-awq", "Qwen 1.5 7B Chat AWQ"],
            [4, "@cf/mistral/mistral-7b-instruct-v0.1", "Mistral 7B Instruct"]
        ],
        image: [
            [5, "@cf/bytedance/stable-diffusion-xl-lightning", "Stable Diffusion XL Lightning"],
            [6, "@cf/black-forest-labs/flux-1-schnell", "Flux 1 Schnell"]
        ],
        vision: [
            [7, "@cf/llava-hf/llava-1.5-7b-hf", "LLaVA 1.5 7B HF"]
        ]
    };

    constructor(apiKey, accountId) {
        this.apiKey = apiKey;
        this.accountId = accountId;
    }

    async ask({ modelId, messages = null, params = {}, imageBuffer = null }) {
        const modelArr = Object.values(CloudflareAI.models).flat().find(m => m[0] === modelId);
        if (!modelArr) throw new Error("Model ID is not valid! Choose the best, nyaw~");

        const [id, model] = modelArr;
        const url = `https://api.cloudflare.com/client/v4/accounts/${this.accountId}/ai/run/${model}`;

        let payload = { ...params };
        let headers = {
            "Authorization": `Bearer ${this.apiKey}`,
        };

        if (modelId >= 1 && modelId <= 4) {
            if (!Array.isArray(messages) || messages.length === 0) throw new Error("Messages in the form of array, dong!");
            payload.messages = messages;
            headers["Content-Type"] = "application/json";
        } else if (imageBuffer) {
            payload.image = [...new Uint8Array(imageBuffer)];
            headers["Content-Type"] = "application/json";
        } else {
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(url, {
            method: "POST",
            headers,
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`Eventually fetch: ${response.statusText}, try again~`);

        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.startsWith("image/")) {
            return await response.arrayBuffer();
        } else {
            return await response.json();
        }
    }
}

const apiKey = "GxCXqOSv2L4eoKHplnB0KQhIAqV6W7NxhZDd-9ua";
const accountId = "cfbbfe078c8b87485795f14f47927bd9";
const cfAI = new CloudflareAI(apiKey, accountId);

module.exports = cfAI
