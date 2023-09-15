import {useMutation, useQueryClient} from "@tanstack/react-query";
import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";
import {SchedulerBackApi} from "../../services/api/SchedulerBackApi.ts";
import {AnimeSeasons} from "../../services/AnimesService.ts";

const update = async (animeSeason: IAnimeSeason) : Promise<IAnimeSeason> => {
    return SchedulerBackApi().put(`/animeseason/${animeSeason.id ? animeSeason.id : ""}`, animeSeason);

}
export function useUpdateAnimeSeason(idAnime: number, year: number, season: AnimeSeasons) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: update,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(["anime-season", idAnime])
            queryClient.invalidateQueries(["anime-season-by-season", year, season]);
        }
    });
}