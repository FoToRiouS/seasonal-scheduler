import { AnimeSeasons } from "@/service/MyAnimeListService";

export interface AnimeMAL {
    id: number;
    title: string;
    alternativeTitles: AlternativeTitles;
    mean: number;
    mainPicture: MainPicture;
    broadcast: Broadcast;
    startSeason: StartSeason;
    mediaType: "tv" | "ona" | "ova" | "movie" | "special";
    genres: Genre[];
}

interface AlternativeTitles {
    en: string;
    ja: string;
}
interface MainPicture {
    medium: string;
    large: string;
}

interface Broadcast {
    day_of_the_week: "sunday";
    start_time: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface StartSeason {
    year: number;
    season: AnimeSeasons;
}
