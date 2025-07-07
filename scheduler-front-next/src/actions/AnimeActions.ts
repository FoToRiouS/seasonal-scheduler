import { fetchAuth } from "@/service/BackendService";
import { AnimeSeasons } from "@/service/MyAnimeListService";
import { AnimeBackend } from "@/interfaces/AnimeBackend";

export const getAnimesBySeason = async (userId: string, year: number, season: AnimeSeasons): Promise<AnimeBackend[]> => {
    const res = await fetchAuth(`/animeseason/${userId}/${year}/${season}`);
    return await res.json();
};