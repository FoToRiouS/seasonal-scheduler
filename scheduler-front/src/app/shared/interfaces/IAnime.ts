import {AnimeSeasons} from "../services/AnimesService.ts";

export interface IAnime {
    id: number,
    title: string,
    alternativeTitles: IAlternativeTitles,
    mean: number,
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

export interface IStartSeason {
    year: number,
    season: AnimeSeasons
}