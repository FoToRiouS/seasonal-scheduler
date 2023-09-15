import {useMutation, useQueryClient} from "@tanstack/react-query";
import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";
import {SchedulerBackApi} from "../../services/api/SchedulerBackApi.ts";
import {IAnimeSeasonSaveDTO} from "../../interfaces/IAnimeSeasonSaveDTO.ts";
import {AnimeSeasons} from "../../services/AnimesService.ts";

const saveAnimeSeason = async (animeSeason: IAnimeSeasonSaveDTO) : Promise<IAnimeSeason> => {
    return SchedulerBackApi().post("/animeseason/", animeSeason);

}
export function useSaveAnimeSeason(idAnime: number, year: number, season: AnimeSeasons) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: saveAnimeSeason,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(["anime-season", idAnime]);
            queryClient.invalidateQueries(["anime-season-by-season", year, season]);
        }
    });
}