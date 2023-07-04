import axios from "axios";

export const MyAnimeListApi = () => {
    return axios.create({
        baseURL: "https://api.myanimelist.net/v2"
    });
}