import {MyAnimeListApi} from "../MyAnimeListApi.ts";
import {ApiException} from "../ApiException.ts";

export interface IAnime {
    title: string,
    alternativeTitles: IAlternativeTitles,
    mainPicture: IMainPicture,
    broadcast: IBroadcast
}

interface IAlternativeTitles {
    en: string,
    ja: string
}
interface IMainPicture {
    medium: string,
    large: string
}

interface IBroadcast {
    "day_of_the_week": string,
    start_time: string
}

const headers = {"X-MAL-CLIENT-ID": "eb6aa17ec9b6961f8812f79c38318240"}

const getBySeason = async (year: number, season: "winter" | "spring" | "summer" | "fall") : Promise<IAnime[] | ApiException> => {
    try{
        const { data } = await MyAnimeListApi().get(`/anime/season/${year}/${season}?limit=500&fields=alternative_titles,broadcast`, {
            headers: headers
        });

        return data.data.map((node: any) => {
            return <IAnime> {
                title: node.node.title,
                alternativeTitles: node.node.alternative_titles,
                mainPicture: node.node.main_picture,
                broadcast: node.node.broadcast
            }
        }).sort((a1:IAnime, a2:IAnime) => {
            return a1.title.localeCompare(a2.title);
        });
    } catch (e: any) {
        return new ApiException(e.message || "Erro ao consultar API!")
    }
}

const getById = async (id: number) : Promise<IAnime | ApiException> => {
    try{
        const { data } = await MyAnimeListApi().get(`/anime/${id}`, {
            headers: headers
        });
        return data;
    } catch (e: any) {
        return new ApiException(e.message || "Erro ao consultar API!")
    }
}

const getAll = async () : Promise<IAnime[] | ApiException> => {
    try{
        const { data } = await MyAnimeListApi().get("/anime",{
            headers: headers
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