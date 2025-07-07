import { AnimeSeason } from "@/interfaces/AnimeSeason";

export interface AnimeBackend {
    id?: string;
    idAnime?: number;
    animeSeasons?: AnimeSeason[];
    services?: string[];
}
