import axios from "axios";

export const TelegramApi = () => {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;

    return axios.create({
        // baseURL: import.meta.env.MODE === "development" ? "/telegram" : import.meta.env.VITE_TELEGRAM_API,
        baseURL: `/telegram/bot${token}`,
    });
};
