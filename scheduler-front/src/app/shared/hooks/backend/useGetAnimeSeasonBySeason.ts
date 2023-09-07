import {AnimeSeasons, AnimesService} from "../../services/AnimesService.ts";
import {useQuery} from "@tanstack/react-query";
import {SchedulerBackApi} from "../../services/api/SchedulerBackApi.ts";
import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";
import {IAnime, IStartSeason} from "../../interfaces/IAnime.ts";

export function useGetAnimeSeasonBySeason(year: number, season: AnimeSeasons) {
    const getBySeason = async (year: number, season: AnimeSeasons) : Promise<IAnimeSeason[]> => {
        const {data: animesSeason} = await SchedulerBackApi().get<IAnimeSeason[]>(`/animeseason/${year}/${season}`)

        const seasons = [...new Set(animesSeason.map(as => JSON.stringify(as.season)))];
        let animes = [] as IAnime[];
        for(const s of seasons){
            const season = JSON.parse(s) as IStartSeason;
            console.log(season)
            animes = [...animes, ...await AnimesService.getBySeason(season.year, season.season)]
        }

        let fetchedList = [] as IAnimeSeason[];
        animesSeason.forEach(as => {
            const anime = animes.find(a => a.id === as.idAnime!);
            const newAnimeSeason = {...as, anime: anime}
            fetchedList.push(newAnimeSeason);
        })
        return fetchedList;
    }

    return useQuery({
        queryFn: () => getBySeason(year, season),
        queryKey: ["anime-season-by-season", year, season],
        staleTime: 5 * 60 * 1000
    });
}