import {MyAnimeListApi} from "../MyAnimeListApi.ts";
import {ApiException} from "../ApiException.ts";

export interface IAnime {
    engName: string,
    jpnName: string,
    srcImg: string
}

const getBySeason = async (year: number, season: "winter" | "spring" | "summer" | "fall") : Promise<IAnime[] | ApiException> => {
    try{
        const { data } = await MyAnimeListApi().get(`/anime/season/${year}/${season}`, {
            headers: {
                "X-MAL-CLIENT-ID": "eb6aa17ec9b6961f8812f79c38318240"
            }
        });
        return data;
    } catch (e: any) {
        return new ApiException(e.message || "Erro ao consultar API!")
    }
}

const getById = async (id: number) : Promise<IAnime | ApiException> => {
    try{
        const { data } = await MyAnimeListApi().get(`/anime/${id}`);
        return data;
    } catch (e: any) {
        return new ApiException(e.message || "Erro ao consultar API!")
    }
}

const getAll = async () : Promise<IAnime[] | ApiException> => {
    try{
        const { data } = await MyAnimeListApi().get("/anime", {
            headers: {
                "X-MAL-CLIENT-ID": "eb6aa17ec9b6961f8812f79c38318240"
            }
        });
        return data;
    } catch (e: any) {
        return new ApiException(e.message || "Erro ao consultar API!")
    }
}

export const AnimesService = {
    getBySeason,
    getById,
    getAll
}