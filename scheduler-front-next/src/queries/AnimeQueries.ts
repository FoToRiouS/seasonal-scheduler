import { useMutation, useQuery } from "@tanstack/react-query";
import {
    animeseasonDeleteAnimeSeason,
    animeseasonGetByIdAndSeason,
    animeseasonSaveByIdAndSeason,
    animeseasonUpdateAnimeSeason,
} from "@/schemas/generated/api";
import { SeasonMAL } from "@/interfaces/SeasonMAL";
import { AnimeSaveDTO, AnimeUpdateDTO, StartSeason } from "@/schemas/generated/model";

export const useGetAnimesBySeason = (userId: string | undefined, year: number, season: SeasonMAL) => {
    return useQuery({
        queryFn: () => {
            if (!userId) {
                throw new Error("User ID is required");
            }
            return animeseasonGetByIdAndSeason(userId, year, season);
        },
        queryKey: ["animes-season", userId, year, season],
        select: (data) => data.data,
        enabled: !!userId,
    });
};

export const useSaveAnimeSeason = () => {
    return useMutation({
        mutationFn: (dto: AnimeSaveDTO) => animeseasonSaveByIdAndSeason(dto),
    });
};

export const useUpdateAnimeSeason = (animeBackendId: string) => {
    return useMutation({
        mutationFn: (dto: AnimeUpdateDTO) => animeseasonUpdateAnimeSeason(animeBackendId, dto),
    });
};

export const useDeleteAnimeSeason = (idBackend: string | undefined) => {
    return useMutation({
        mutationFn: (season: StartSeason) => {
            if (!idBackend) {
                throw new Error("ID Backend is required");
            }
            return animeseasonDeleteAnimeSeason(idBackend, season.year!, season.season!);
        },
    });
};
