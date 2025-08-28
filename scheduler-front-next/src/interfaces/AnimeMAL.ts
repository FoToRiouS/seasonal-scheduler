export interface AnimeMAL {
    id: number;
    title: string;
    alternative_titles: AlternativeTitles;
    mean: number;
    main_picture: MainPicture;
    broadcast: Broadcast;
    start_season: StartSeason;
    media_type: "tv" | "ona" | "ova" | "movie" | "special";
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
    season: SeasonMAL;
}

export type SeasonMAL = "winter" | "spring" | "summer" | "fall";
