import { AnimeSeasons, AnimesService } from "../../services/AnimesService.ts";
import { useQuery } from "@tanstack/react-query";

export function useAnimesBySeason(year: number, season: AnimeSeasons) {
    return useQuery({
        queryFn: () => AnimesService.getBySeason(year, season),
        queryKey: ["animes-season", year, season],
    });
}
