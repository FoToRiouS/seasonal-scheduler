import {
    orderByAnimeSeason,
    orderByEnglishName,
    orderByOriginalName,
    orderByRating,
} from "@/utils/AnimeOrders";

export const useAnimesUtils = () => {
    return {
        orderByRating,
        orderByOriginalName,
        orderByEnglishName,
        orderByAnimeSeason,
    };
};
