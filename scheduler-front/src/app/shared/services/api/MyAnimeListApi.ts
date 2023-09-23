import axios from "axios";

export const MyAnimeListApi = () => {
    return axios.create({
        baseURL: import.meta.env.MODE === "development" ? "/myanimelist" : import.meta.env.VITE_MYANIMELIST_API,
        // baseURL: "/myanimelist"
    });
}