import axios from "axios";

export const TelegramApi = () => {
    return axios.create({
        baseURL: "/telegram"
        // baseURL: "https://api.myanimelist.net/v2"
    });
}