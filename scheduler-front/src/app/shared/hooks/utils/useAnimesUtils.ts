import {IAnime} from "../../interfaces/IAnime.ts";

export const useAnimesUtils = () => {

    const ratingStrategy = (a: IAnime, b: IAnime) => {
        const ratingA = a!.mean ? a!.mean : 0;
        const ratingB = b!.mean ? b!.mean : 0;
        if(ratingA === ratingB) return 0
        else if(ratingB > ratingA) return 1
        return -1;
    }

    const nameStrategy = (a: IAnime, b: IAnime) => {
        return a!.title.localeCompare(b!.title);
    }

    const orderByRating = (animesSeason: IAnime[]) => {
        return [...animesSeason].sort(ratingStrategy)
    }

    const orderByName = (animesSeason: IAnime[]) => {
        return [...animesSeason].sort(nameStrategy)
    }

    return {
        orderByRating,
        orderByName
    }
}