import { AnimeSeason } from "@/interfaces/AnimeSeason";
import { WatchService } from "@/interfaces/WatchService";
import { AnimeMAL } from "@/interfaces/AnimeMAL";

export interface AnimeBackend {
    id: string;
    animeMAL: AnimeMAL;
    animeSeasons: AnimeSeason[];
    watchServices: WatchService[];
}
