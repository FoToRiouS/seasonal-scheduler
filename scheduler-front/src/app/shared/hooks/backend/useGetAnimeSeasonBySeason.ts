import {AnimeSeasons, AnimesService} from "../../services/AnimesService.ts";
import {useQuery} from "@tanstack/react-query";
import {SchedulerBackApi} from "../../services/api/SchedulerBackApi.ts";
import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";

const getBySeason = async (year: number, season: AnimeSeasons) : Promise<IAnimeSeason[]> => {
    const {data} = await SchedulerBackApi().get(`/animeseason/${year}/${season}`)

    for(const animeSeason of data) {
        animeSeason.anime = await AnimesService.getById(animeSeason.idAnime!);
    }
    return data;
}

export function useGetAnimeSeasonBySeason(year: number, season: AnimeSeasons) {
    return useQuery({
        queryFn: () => getBySeason(year, season),
        queryKey: ["anime-season-by-season", year, season],
        staleTime: 5 * 60 * 1000
    });
}