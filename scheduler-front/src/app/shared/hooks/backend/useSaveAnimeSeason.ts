import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAnimeSeason } from "../../interfaces/IAnimeSeason.ts";
import { SchedulerBackApi } from "../../services/api/SchedulerBackApi.ts";
import { IAnimeSeasonSaveDTO } from "../../interfaces/IAnimeSeasonSaveDTO.ts";

const saveAnimeSeason = async (animeSeason: IAnimeSeasonSaveDTO): Promise<IAnimeSeason> => {
    const res = await SchedulerBackApi().post("/animeseason/", animeSeason);
    return res.data;
};
export function useSaveAnimeSeason(idAnime: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: saveAnimeSeason,
        retry: 2,
        onSuccess: (data) => {
            console.log(data.seasons);
            queryClient.invalidateQueries(["anime-season", idAnime]);
            if (data.seasons) {
                data.seasons.forEach((s) =>
                    queryClient.invalidateQueries(["anime-season-by-season", s.year, s.season]),
                );
            }
        },
    });
}
