import {useMutation, useQueryClient} from "@tanstack/react-query";
import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";
import {SchedulerBackApi} from "../../services/api/SchedulerBackApi.ts";

const saveAnimeSeasonq = async (animeSeason: IAnimeSeason) : Promise<IAnimeSeason> => {
    return SchedulerBackApi().post("/animeseason/", {idAnime: animeSeason.id, season: animeSeason.season.season, year: animeSeason.season.year});

}
export function saveAnimeSeason() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: saveAnimeSeasonq,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(["anime-season"])
        }
    });
}