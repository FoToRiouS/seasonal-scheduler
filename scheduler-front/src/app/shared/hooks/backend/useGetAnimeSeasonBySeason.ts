import {AnimeSeasons, AnimesService} from "../../services/AnimesService.ts";
import {useQuery} from "@tanstack/react-query";
import {SchedulerBackApi} from "../../services/api/SchedulerBackApi.ts";
import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";

export function useGetAnimeSeasonBySeason(year: number, season: AnimeSeasons) {
    const getBySeason = async (year: number, season: AnimeSeasons) : Promise<IAnimeSeason[]> => {
        const {data} = await SchedulerBackApi().get<IAnimeSeason[]>(`/animeseason/${year}/${season}`)
        let fetchedList = [] as IAnimeSeason[];
        for (const animeSeason of data) {
            const anime = await AnimesService.getById(animeSeason.idAnime!)
            const newAnimeSeason = {...animeSeason, anime: anime}
            fetchedList.push(newAnimeSeason);
        }
        return fetchedList;
    }

    return useQuery({
        queryFn: () => getBySeason(year, season),
        queryKey: ["anime-season-by-season", year, season],
        staleTime: 5 * 60 * 1000
    });
}