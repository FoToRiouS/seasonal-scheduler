import { AnimeSeasons } from "./AnimesService.ts";
import { IAnimeSeason } from "../interfaces/IAnimeSeason.ts";
import { SchedulerBackApi } from "./api/SchedulerBackApi.ts";
import { IWatchService } from "../interfaces/IWatchService.ts";

const getAnimeSeason = async (idAnime: number): Promise<IAnimeSeason> => {
    const { data } = await SchedulerBackApi().get("/animeseason/" + idAnime);
    return data;
};

const saveAnimeSeason = async (
    idAnime: number,
    year: number,
    season: AnimeSeasons,
): Promise<IAnimeSeason> => {
    const { data: response } = await SchedulerBackApi().post("/animeseason/", {
        idAnime: idAnime,
        season: season,
        year: year,
    });
    return response;
};

const getAllWatchServices = async (): Promise<IWatchService[]> => {
    const { data } = await SchedulerBackApi().get(`/watchservices/list`);
    return data;
};

export const BackendService = {
    getAnimeSeason,
    getAllWatchServices,
    saveAnimeSeason,
};
