import { AnimeSeason } from "@/interfaces/AnimeSeason";

export interface AnimeSeasonUpdateDTO {
    animeBackId: string;
    animeSeasons: AnimeSeason[];
    services: string[];
}
