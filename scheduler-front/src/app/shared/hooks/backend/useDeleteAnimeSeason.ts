import {useMutation, useQueryClient} from "@tanstack/react-query";
import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";
import {SchedulerBackApi} from "../../services/api/SchedulerBackApi.ts";
import {AnimeSeasons} from "../../services/AnimesService.ts";

const deleteQuery = async (uuid: string) : Promise<IAnimeSeason> => {
    return SchedulerBackApi().delete(`/animeseason/${uuid}`);

}
export function useDeleteAnimeSeason(idAnime: number, year: number, season: AnimeSeasons) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteQuery,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(["anime-season", idAnime, year, season])
        }
    });
}