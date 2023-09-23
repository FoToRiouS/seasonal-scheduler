import axios from "axios";

export const TelegramApi = () => {
    return axios.create({
        baseURL: import.meta.env.MODE === "development" ? "/telegram" : import.meta.env.VITE_TELEGRAM_API,

        // baseURL: "https://api.myanimelist.net/v2"
    });
}