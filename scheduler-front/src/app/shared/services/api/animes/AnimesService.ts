import {MyAnimeListApi} from "../MyAnimeListApi.ts";
import {ApiException} from "../ApiException.ts";

export interface IAnime {
    id: number,
    title: string,
    alternativeTitles: IAlternativeTitles,
    mainPicture: IMainPicture,
    broadcast: IBroadcast,
    startSeason: IStartSeason,
    mediaType: "tv" | "ona" | "ova" | "movie" | "special"
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
    day_of_the_week: "sunday",
    start_time: string
}

interface IStartSeason {
    year: number,
    season: "winter" | "spring" | "summer" | "fall"
}

const headers = {"X-MAL-CLIENT-ID": "eb6aa17ec9b6961f8812f79c38318240"}

const mapJsonAnime = (node: any) => {
    return <IAnime> {
        id: node.node.id,
        title: node.node.title,
        alternativeTitles: node.node.alternative_titles,
        mainPicture: node.node.main_picture,
        broadcast: node.node.broadcast,
        mediaType: node.node.media_type,
        startSeason: node.node.start_season
    }
}

const getBySeason = async (year: number, season: "winter" | "spring" | "summer" | "fall") : Promise<IAnime[] | ApiException> => {
    try{
        const { data } = await MyAnimeListApi().get(`/anime/season/${year}/${season}?limit=500&fields=alternative_titles,broadcast,media_type,start_season`, {
            headers: headers
        });

        return data.data.map(mapJsonAnime)
            .filter((a:IAnime) => a.mediaType === "tv" || a.mediaType === "ona" || a.mediaType === "ova")
            .filter((a:IAnime) => a.startSeason.year === year && a.startSeason.season === season)
            .sort((a1:IAnime, a2:IAnime) => {
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
        return data.data.map(mapJsonAnime);
    } catch (e: any) {
        return new ApiException(e.message || "Erro ao consultar API!")
    }
}

export const AnimesService = {
    getBySeason,
    getById,
}