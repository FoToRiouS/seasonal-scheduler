import { FetchedAnime } from "@/interfaces/FetchedAnime";

export const useAnimesUtils = () => {
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

    const orderByRating = (animesSeason: FetchedAnime[]) => {
        return [...animesSeason].sort(ratingStrategy);
    };

    const orderByOriginalName = (animesSeason: FetchedAnime[]) => {
        return [...animesSeason].sort(originalNameStrategy);
    };

    const orderByEnglishName = (animesSeason: FetchedAnime[]) => {
        return [...animesSeason].sort(englishNameStrategy);
    };

    return {
        orderByRating,
        orderByOriginalName,
        orderByEnglishName,
    };
};
