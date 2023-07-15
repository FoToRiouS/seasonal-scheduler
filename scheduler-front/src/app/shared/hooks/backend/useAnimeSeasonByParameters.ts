import {useQuery} from "@tanstack/react-query";
import {AnimeSeasons} from "../../services/AnimesService.ts";
import {BackendService} from "../../services/BackendService.ts";

export function useAnimeSeasonByParameters(idAnime: number, year: number, season: AnimeSeasons) {
    return useQuery({
        queryFn: () => BackendService.getAnimeSeason(idAnime, year, season),
        queryKey: ["anime-season", idAnime, year, season]
    });
}