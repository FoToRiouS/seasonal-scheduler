import {AnimeSeasons} from "../../services/AnimesService.ts";
import {useQuery} from "@tanstack/react-query";
import {SchedulerBackApi} from "../../services/api/SchedulerBackApi.ts";

const getBySeason = async (year: number, season: AnimeSeasons) : Promise<number[]> => {
    const {data} = await SchedulerBackApi().get(`/animeseason/${year}/${season}`)
    return data;
}

export function useGetAnimeSeasonBySeason(year: number, season: AnimeSeasons) {
    return useQuery({
        queryFn: () => getBySeason(year, season),
        queryKey: ["anime-season-by-season", year, season],
        staleTime: 5 * 60 * 1000
    });
}