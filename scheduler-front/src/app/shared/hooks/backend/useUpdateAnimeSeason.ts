import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAnimeSeason } from "../../interfaces/IAnimeSeason.ts";
import { SchedulerBackApi } from "../../services/api/SchedulerBackApi.ts";

const update = async (animeSeason: IAnimeSeason): Promise<IAnimeSeason> => {
    const res = await SchedulerBackApi().put(
        `/animeseason/${animeSeason.id ? animeSeason.id : ""}`,
        animeSeason,
    );
    return res.data;
};
export function useUpdateAnimeSeason(idAnime: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: update,
        retry: 2,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["anime-season", idAnime]);
            if (data.seasons) {
                data.seasons.forEach((s) =>
                    queryClient.invalidateQueries(["anime-season-by-season", s.year, s.season]),
                );
            }
        },
    });
}
