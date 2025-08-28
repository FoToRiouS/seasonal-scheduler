import { useQuery } from "@tanstack/react-query";
import { getAnimesMalBySeason } from "@/actions/MalActions";
import { resolveServerAction } from "@/service/BackendService";
import { AnimeMAL, SeasonMAL } from "@/interfaces/AnimeMAL";

export function useAnimesMalBySeason(year: number, season: SeasonMAL) {
    return useQuery<AnimeMAL[]>({
        queryFn: () => resolveServerAction(getAnimesMalBySeason)(year, season),
        queryKey: ["animes-mal-season", year, season],
    });
}
