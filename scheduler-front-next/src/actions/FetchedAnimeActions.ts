"use server";

import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { AnimeSeasons } from "@/service/MyAnimeListService";
import { getAnimesBySeason } from "@/actions/AnimeActions";
import { getAnimeMalById, getAnimesMalBySeason } from "@/actions/MalActions";

export const fetchAnimesForCalendar = async (
    userId: string,
    year: number,
    season: AnimeSeasons,
): Promise<FetchedAnime[]> => {
    console.time("Chamada getAnimesBySeason");
    const animes = await getAnimesBySeason(userId, year, season);
    console.timeEnd("Chamada getAnimesBySeason");

    console.time("Chamada getAnimesMalBySeason");
    const animesMal = await getAnimesMalBySeason(year, season);
    console.timeEnd("Chamada getAnimesMalBySeason");

    console.time("Parsing animes");
    let fetched = animes.map(
        (anime) =>
            ({
                animeBackend: anime,
                animeMal: animesMal.find((a) => a.id === anime.idAnime)!,
            }) as FetchedAnime,
    );
    console.timeEnd("Parsing animes");

    console.time("Fetching individual animes");
    const animesMalNotFetched = fetched.filter((f) => !f.animeMal);
    for (const item of animesMalNotFetched) {
        const animeMal = await getAnimeMalById(item.animeBackend!.idAnime);
        fetched = fetched.map((f) =>
            f.animeBackend!.id === item.animeBackend!.id ? { ...f, animeMal: animeMal } : f,
        );
    }
    console.timeEnd("Fetching individual animes");

    return fetched;
};

export const fetchAnimesForList = async (
    userId: string | undefined,
    year: number,
    season: AnimeSeasons,
): Promise<FetchedAnime[]> => {
    console.time("Chamada getAnimesBySeason");
    const animes = userId ? await getAnimesBySeason(userId, year, season) : [];
    console.timeEnd("Chamada getAnimesBySeason");

    console.time("Chamada getAnimesMalBySeason");
    const animesMal = await getAnimesMalBySeason(year, season);
    console.timeEnd("Chamada getAnimesMalBySeason");

    console.time("Parsing animes");
    const fetched = animesMal.map(
        (a) =>
            ({
                animeMal: a,
                animeBackend: animes.find((b) => b.idAnime === a.id)!,
            }) as FetchedAnime,
    );
    console.timeEnd("Parsing animes");

    return fetched;
};
