import { useMutation, useQuery } from "@tanstack/react-query";
import { resolveServerAction } from "@/service/BackendService";
import {
    deleteAnimeSeason,
    getAnimesBySeason,
    saveAnimeSeason,
    updateAnimeSeason,
} from "@/actions/AnimeActions";
import { AnimeSeasons } from "@/service/MyAnimeListService";
import { AnimeBackend } from "@/interfaces/AnimeBackend";
import { AnimeSeasonSaveDTO } from "@/interfaces/AnimeSeasonSaveDTO";
import { AnimeSeasonUpdateDTO } from "@/interfaces/AnimeSeasonUpdateDTO";

export const useGetAnimesBySeason = (userId: string | undefined, year: number, season: AnimeSeasons) => {
    return useQuery<AnimeBackend[]>({
        queryFn: () => resolveServerAction(getAnimesBySeason)(userId, year, season),
        queryKey: ["animes-season", userId, year, season],
        enabled: !!userId,
    });
};

export const useSaveAnimeSeason = () => {
    return useMutation<AnimeBackend, Error, AnimeSeasonSaveDTO>({
        mutationFn: resolveServerAction(saveAnimeSeason),
    });
};

export const useUpdateAnimeSeason = () => {
    return useMutation<AnimeBackend, Error, AnimeSeasonUpdateDTO>({
        mutationFn: resolveServerAction(updateAnimeSeason),
    });
};

export const useDeleteAnimeSeason = (idBackend: string | undefined, year: number, season: AnimeSeasons) => {
    return useMutation<AnimeBackend | null, Error>({
        mutationFn: () => resolveServerAction(deleteAnimeSeason)(idBackend, year, season),
    });
};
