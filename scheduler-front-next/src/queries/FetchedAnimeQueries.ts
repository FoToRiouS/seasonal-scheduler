import { resolveServerAction } from "@/service/BackendService";
import { AnimeSeasons } from "@/service/MyAnimeListService";
import { fetchAnimesForCalendar, fetchAnimesForList } from "@/actions/FetchedAnimeActions";
import { useQuery } from "@tanstack/react-query";
import { FetchedAnime } from "@/interfaces/FetchedAnime";

export const useFetchAnimesForList = (userId: string | undefined, year: number, season: AnimeSeasons) => {
    return useQuery<FetchedAnime[]>({
        queryFn: () => resolveServerAction(fetchAnimesForList)(userId, year, season),
        queryKey: ["fetch-animes-list", userId, year, season],
    });
};

export const useFetchAnimesForCalendar = (userId: string | undefined, year: number, season: AnimeSeasons) => {
    return useQuery<FetchedAnime[]>({
        queryFn: () => resolveServerAction(fetchAnimesForCalendar)(userId, year, season),
        queryKey: ["fetch-animes-calendar", userId, year, season],
        enabled: !!userId,
    });
};
