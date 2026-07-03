import { AnimeDTO, AnimeMAL } from "@/schemas/generated/model";

export interface FetchedAnime {
    animeMal: AnimeMAL;
    animeBackend: AnimeDTO | null;
}
