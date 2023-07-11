import {AnimeSeasons} from "./AnimesService.ts";
import {IAnimeSeason} from "../interfaces/IAnimeSeason.ts";
import {SchedulerBackApi} from "./api/SchedulerBackApi.ts";
import {IWatchService} from "../interfaces/IWatchService.ts";

const getAnimeSeason = async (idAnime: number, year: number, season: AnimeSeasons) : Promise<IAnimeSeason> => {
    const { data } = await SchedulerBackApi().get("/animeseason/" + idAnime + "/" + year + "/" + season);
    console.log(data)
    return data;
}

const getAllWatchServices = async () : Promise<IWatchService[]> => {
    const { data } = await SchedulerBackApi().get(`/watchservices/list`);
    console.log(data)
    return data;
}

export const BackendService = {
    getAnimeSeason,
    getAllWatchServices
}