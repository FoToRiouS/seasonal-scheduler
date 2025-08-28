"use server";

import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { AnimeSeasons } from "@/service/MyAnimeListService";
import { getAnimesBySeason } from "@/actions/AnimeActions";

export const fetchAnimesForCalendar = async (
    userId: string,
    year: number,
    season: AnimeSeasons,
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

    return animes.map((a) => ({ animeBackend: a, animeMal: a.animeMal })) as FetchedAnime[];
};

export const fetchAnimesForList = async (
    userId: string | undefined,
    year: number,
    season: AnimeSeasons,
): Promise<FetchedAnime[]> => {
    const animes = userId ? await getAnimesBySeason(userId, year, season) : [];

    // const animesMal = await getAnimesMalBySeason(year, season);
    //
    // const fetched = animesMal.map(
    //     (a) =>
    //         ({
    //             animeMal: a,
    //             animeBackend: animes.find((b) => b.idAnime === a.id)!,
    //         }) as FetchedAnime,
    // );

    return animes.map((a) => ({ animeBackend: a, animeMal: a.animeMal })) as FetchedAnime[];
};
