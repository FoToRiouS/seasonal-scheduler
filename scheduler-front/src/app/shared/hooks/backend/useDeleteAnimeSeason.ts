import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAnimeSeason } from "../../interfaces/IAnimeSeason.ts";
import { SchedulerBackApi } from "../../services/api/SchedulerBackApi.ts";
import { AnimeSeasons } from "../../services/AnimesService.ts";

interface DeleteRequest {
    uuid: string;
    year: number;
    season: AnimeSeasons;
}

const deleteQuery = async (deleteRequest: DeleteRequest): Promise<IAnimeSeason> => {
    const res = await SchedulerBackApi().delete(
        `/animeseason/${deleteRequest.uuid}/${deleteRequest.year}/${deleteRequest.season}`,
    );
    return res.data;
};
export function useDeleteAnimeSeason(idAnime: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteQuery,
        retry: 2,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries(["anime-season", idAnime]);
            console.log(data?.seasons);
            if (data?.seasons) {
                data.seasons.forEach((s) => {
                    queryClient.invalidateQueries(["anime-season-by-season", s.year, s.season]);
                });
            }
            queryClient.invalidateQueries(["anime-season-by-season", variables.year, variables.season]);
        },
    });
}
