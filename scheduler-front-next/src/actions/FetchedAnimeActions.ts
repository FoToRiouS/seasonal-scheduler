"use server";

import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { animeseasonGetByIdAndSeason, myanimelistFindBySeason } from "@/schemas/generated/api";
import { SeasonMAL } from "@/interfaces/SeasonMAL";

export const fetchAnimesForCalendar = async (
    userId: string,
    year: number,
    season: SeasonMAL,
): Promise<FetchedAnime[]> => {
    const animes = (await animeseasonGetByIdAndSeason(userId, year, season)).data;
    if (animes) {
        return animes.map((a) => ({ animeBackend: a, animeMal: a.animeMAL }) as FetchedAnime);
    }
    return [];
};

export const fetchAnimesForList = async (
    userId: string | undefined,
    year: number,
    season: SeasonMAL,
): Promise<FetchedAnime[]> => {
    const animes = userId ? (await animeseasonGetByIdAndSeason(userId, year, season)).data : [];
    const animesMal = (await myanimelistFindBySeason(year, season)).data;

    return animesMal.map(
        (a) =>
            ({
                animeMal: a,
                animeBackend: animes.find((b) => b.animeMAL?.id === a.id)!,
            }) as FetchedAnime,
    );
};
