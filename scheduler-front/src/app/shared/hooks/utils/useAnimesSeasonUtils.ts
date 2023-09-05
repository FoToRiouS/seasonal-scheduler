import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";

export const useAnimesSeasonUtils = () => {

    const ratingStrategy = (a: IAnimeSeason, b: IAnimeSeason) => {
        const ratingA = a.anime!.mean ? a.anime!.mean : 0;
        const ratingB = b.anime!.mean ? b.anime!.mean : 0;
        if(ratingA === ratingB) return 0
        else if(ratingB > ratingA) return 1
        return -1;
    }

    const nameStrategy = (a: IAnimeSeason, b: IAnimeSeason) => {
        return a.anime!.title.localeCompare(b.anime!.title);
    }

    const orderByRating = (animesSeason: IAnimeSeason[], direction: "asc" | "desc" | undefined | null) => {
        if(direction && direction === "asc"){
            return [...animesSeason].sort((a1, a2) => ratingStrategy(a1, a2) * -1)
        }
        return [...animesSeason].sort(ratingStrategy);
    }

    const orderByName = (animesSeason: IAnimeSeason[]) => {
        return [...animesSeason].sort(nameStrategy)
    }

    return {
        orderByRating,
        orderByName
    }
}