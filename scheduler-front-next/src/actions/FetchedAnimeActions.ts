"use server";

import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { SeasonMAL } from "@/interfaces/AnimeMAL";
import { getAnimesBySeason } from "@/actions/AnimeActions";
import { getAnimesMalBySeason } from "@/actions/MalActions";

export const fetchAnimesForCalendar = async (
    userId: string,
    year: number,
    season: SeasonMAL,
): Promise<FetchedAnime[]> => {
    const animes = await getAnimesBySeason(userId, year, season);
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
    const animes = userId ? await getAnimesBySeason(userId, year, season) : [];
    const animesMal = await getAnimesMalBySeason(year, season);

    return animesMal.map(
        (a) =>
            ({
                animeMal: a,
                animeBackend: animes.find((b) => b.animeMAL.id === a.id)!,
            }) as FetchedAnime,
    );
};
