import {useMutation, useQueryClient} from "@tanstack/react-query";
import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";
import {SchedulerBackApi} from "../../services/api/SchedulerBackApi.ts";
import {AnimeSeasons} from "../../services/AnimesService.ts";

const saveAnimeSeasonq = async (animeSeason: IAnimeSeason) : Promise<IAnimeSeason> => {
    return SchedulerBackApi().post("/animeseason/", {idAnime: animeSeason.idAnime, season: animeSeason.season.season, year: animeSeason.season.year});

}
export function saveAnimeSeason(idAnime: number, year: number, season: AnimeSeasons) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: saveAnimeSeasonq,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(["anime-season", idAnime, year, season])
        }
    });
}