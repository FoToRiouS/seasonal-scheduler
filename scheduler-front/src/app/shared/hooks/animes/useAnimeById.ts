import {AnimesService} from "../../services/api/animes/AnimesService.ts";
import {useQuery} from "@tanstack/react-query";

export function useAnimeBySeason(id: number) {
    return useQuery({
        queryFn: () => AnimesService.getById(id),
        queryKey: ["animes-season", id]
    });
}