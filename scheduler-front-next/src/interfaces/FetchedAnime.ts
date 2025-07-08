import { AnimeMAL } from "@/interfaces/AnimeMAL";
import { AnimeBackend } from "@/interfaces/AnimeBackend";

export interface FetchedAnime {
    animeMal: AnimeMAL;
    animeBackend: AnimeBackend;
}
