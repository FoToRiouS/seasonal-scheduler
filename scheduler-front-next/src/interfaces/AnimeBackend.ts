import { AnimeSeason } from "@/interfaces/AnimeSeason";
import { WatchService } from "@/interfaces/WatchService";
import { AnimeMAL } from "@/interfaces/AnimeMAL";

export interface AnimeBackend {
    id: string;
    animeMal: AnimeMAL;
    animeSeasons: AnimeSeason[];
    watchServices: WatchService[];
}
