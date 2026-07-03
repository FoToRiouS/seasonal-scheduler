import { useQuery } from "@tanstack/react-query";
import { myanimelistFindBySeason } from "@/schemas/generated/api";
import { SeasonMAL } from "@/interfaces/SeasonMAL";

export function useAnimesMalBySeason(year: number, season: SeasonMAL) {
    return useQuery({
        queryFn: () => myanimelistFindBySeason(year, season),
        queryKey: ["animes-mal-season", year, season],
        select: (data) => data.data,
    });
}
