import {AnimesService} from "../../services/AnimesService.ts";
import {useQuery} from "@tanstack/react-query";

export function useAnimeById(id: number) {
    return useQuery({
        queryFn: () => AnimesService.getById(id),
        queryKey: ["animes-season", id],
        staleTime: 5 * 60 * 1000
    });
}onst 