import {useQuery} from "@tanstack/react-query";
import {BackendService} from "../../services/BackendService.ts";

export function useAnimeSeasonByParameters(idAnime: number) {
    return useQuery({
        queryFn: () => BackendService.getAnimeSeason(idAnime),
        queryKey: ["anime-season", idAnime],
        staleTime: 5 * 60 * 1000
    });
}