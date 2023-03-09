import { importDynamic } from '../helpers/module';

let ChatGPT: any;

const getChatGPT = async () => {
    if (!ChatGPT) {
        const { ChatGPTAPI } = await importDynamic('chatgpt');
        ChatGPT = new ChatGPTAPI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    return ChatGPT;
};

const chatGPT = async (message: string, options?: any): Promise<any> => {
    const chatGPT = await getChatGPT();

    return await chatGPT.sendMessage(message, options);
};

export { chatGPT };
