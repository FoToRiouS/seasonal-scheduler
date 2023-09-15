import {useMutation, useQueryClient} from "@tanstack/react-query";
import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";
import {SchedulerBackApi} from "../../services/api/SchedulerBackApi.ts";
import {AnimeSeasons} from "../../services/AnimesService.ts";

interface DeleteRequest {
    uuid: string,
    year: number,
    season: AnimeSeasons
}

const deleteQuery = async (deleteRequest: DeleteRequest) : Promise<IAnimeSeason> => {
    return SchedulerBackApi().delete(`/animeseason/${deleteRequest.uuid}/${deleteRequest.year}/${deleteRequest.season}`);

}
export function useDeleteAnimeSeason(idAnime: number, year: number, season: AnimeSeasons) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: deleteQuery,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(["anime-season", idAnime, year, season]);
            queryClient.invalidateQueries(["anime-season-by-season", year, season]);
        }
    });
}