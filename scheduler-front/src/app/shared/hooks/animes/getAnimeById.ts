import {AnimesService} from "../../services/AnimesService.ts";
import {useQuery} from "@tanstack/react-query";

export function getAnimeBySeason(id: number) {
    return useQuery({
        queryFn: () => AnimesService.getById(id),
        queryKey: ["animes-season", id]
    });
}onst 