const getBaseUri = (): string => {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const uri = process.env.TELEGRAM_API;
    if (!uri || !token) {
        throw new Error("Base URI and token for Telegram must be set!");
    }
    return `${uri}/bot${token}`;
};

export const fetchTelegram = async (input: RequestInfo | URL) => {
    return await fetch(getBaseUri() + input);
};
