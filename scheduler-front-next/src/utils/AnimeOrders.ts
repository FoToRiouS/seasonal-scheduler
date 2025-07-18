import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { AnimeSeason } from "@/interfaces/AnimeSeason";
import { AnimeSeasons } from "@/service/MyAnimeListService";

const seasonOrder: Record<AnimeSeasons, number> = {
    winter: 0,
    spring: 1,
    summer: 2,
    fall: 3,
};

const ratingStrategy = (a: FetchedAnime, b: FetchedAnime) => {
    const ratingA = a.animeMal.mean ? a.animeMal.mean : 0;
    const ratingB = b.animeMal.mean ? b.animeMal.mean : 0;
    if (ratingA === ratingB) return 0;
    else if (ratingB > ratingA) return 1;
    return -1;
};

const originalNameStrategy = (a: FetchedAnime, b: FetchedAnime) => {
    return a.animeMal.title.localeCompare(b.animeMal.title);
};

const englishNameStrategy = (a: FetchedAnime, b: FetchedAnime) => {
    const aName = a.animeMal.alternativeTitles.en ? a.animeMal.alternativeTitles.en : a.animeMal.title;
    const bName = b.animeMal.alternativeTitles.en ? b.animeMal.alternativeTitles.en : b.animeMal.title;

    return aName.localeCompare(bName);
};

const animeSeasonStrategy = (a: AnimeSeason, b: AnimeSeason) => {
    // Primeiro, compare os anos
    if (a.season.year !== b.season.year) {
        return a.season.year - b.season.year; // Ordena por ano ascendente
    }

    // Se os anos forem iguais, compare pela ordem da estação
    return seasonOrder[a.season.season] - seasonOrder[b.season.season];
};

export const orderByRating = (animesSeason: FetchedAnime[], direction?: "asc" | "desc") => {
    const sortDirection = direction || "desc";
    if (sortDirection === "asc") {
        return [...animesSeason].sort(ratingStrategy).reverse();
    }
    return [...animesSeason].sort(ratingStrategy);
};

export const orderByOriginalName = (animesSeason: FetchedAnime[]) => {
    return [...animesSeason].sort(originalNameStrategy);
};

export const orderByEnglishName = (animesSeason: FetchedAnime[]) => {
    return [...animesSeason].sort(englishNameStrategy);
};

export const orderByAnimeSeason = (animesSeason: AnimeSeason[] | undefined) => {
    return animesSeason ? [...animesSeason].sort(animeSeasonStrategy) : [];
};
