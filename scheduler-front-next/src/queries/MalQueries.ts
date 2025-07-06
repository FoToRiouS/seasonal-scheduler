import { useQuery } from "@tanstack/react-query";
import { AnimeSeasons } from "@/service/MyAnimeListService";
import { getBySeason } from "@/actions/MalActions";
import { resolveServerAction } from "@/service/BackendService";
import { AnimeMAL } from "@/interfaces/AnimeMAL";

export function useAnimesBySeason(year: number, season: AnimeSeasons) {
    return useQuery<AnimeMAL[]>({
        queryFn: () => resolveServerAction(getBySeason)(year, season),
        queryKey: ["animes-season", year, season],
    });
}
