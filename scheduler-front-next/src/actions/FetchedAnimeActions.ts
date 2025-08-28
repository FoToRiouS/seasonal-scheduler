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
    // const animesMal = await getAnimesMalBySeason(year, season);
    //
    // let fetched = animes.map(
    //     (anime) =>
    //         ({
    //             animeBackend: anime,
    //             animeMal: animesMal.find((a) => a.id === anime.idAnime)!,
    //         }) as FetchedAnime,
    // );
    //
    // const animesMalNotFetched = fetched.filter((f) => !f.animeMal);
    // for (const item of animesMalNotFetched) {
    //     const animeMal = await getAnimeMalById(item.animeBackend!.idAnime);
    //     fetched = fetched.map((f) =>
    //         f.animeBackend!.id === item.animeBackend!.id ? { ...f, animeMal: animeMal } : f,
    //     );
    // }

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
