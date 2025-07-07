import { useQuery } from "@tanstack/react-query";
import { resolveServerAction } from "@/service/BackendService";
import { getAnimesBySeason } from "@/actions/AnimeActions";
import { AnimeSeasons } from "@/service/MyAnimeListService";
import { AnimeBackend } from "@/interfaces/AnimeBackend";

export const useGetAnimesBySeason = (userId: string, year: number, season: AnimeSeasons) => {
    return useQuery<AnimeBackend[]>({
        queryFn: () => resolveServerAction(getAnimesBySeason)(userId, year, season),
        queryKey: ["animes-season", userId, year, season],
    });
};