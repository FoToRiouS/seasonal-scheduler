import { AnimeSeason } from "@/interfaces/AnimeSeason";
import { WatchService } from "@/interfaces/WatchService";

export interface AnimeBackend {
    id: string;
    idAnime: number;
    animeSeasons: AnimeSeason[];
    watchServices: WatchService[];
}
