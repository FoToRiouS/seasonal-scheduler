import { useQuery } from "@tanstack/react-query";
import { AnimeSeasons } from "@/service/MyAnimeListService";
import { getAnimesMalBySeason } from "@/actions/MalActions";
import { resolveServerAction } from "@/service/BackendService";
import { AnimeMAL } from "@/interfaces/AnimeMAL";

export function useAnimesBySeason(year: number, season: AnimeSeasons) {
    return useQuery<AnimeMAL[]>({
        queryFn: () => resolveServerAction(getAnimesMalBySeason)(year, season),
        queryKey: ["animes-mal-season", year, season],
    });
}
