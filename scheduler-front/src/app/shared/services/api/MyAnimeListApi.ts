import axios from "axios";

export const MyAnimeListApi = () => {
    return axios.create({
        baseURL: "/myanimelist"
       // baseURL: "https://api.myanimelist.net/v2"
    });
}