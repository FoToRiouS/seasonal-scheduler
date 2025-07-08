"use server";

import { AnimeMAL } from "@/interfaces/AnimeMAL";
import {
    AnimeSeasons,
    fetchMAL,
    mapJsonAnimeFromId,
    mapJsonAnimeFromList,
} from "@/service/MyAnimeListService";

export const getAnimesMalBySeason = async (year: number, season: AnimeSeasons): Promise<AnimeMAL[]> => {
    const res = await fetchMAL(
        `/anime/season/${year}/${season}?limit=500&fields=alternative_titles,broadcast,media_type,start_season,mean,genres&nsfw=true`,
    );

    const data = await res.json();

    return data.data
        .map(mapJsonAnimeFromList)
        .filter((a: AnimeMAL) => a.mediaType === "tv" || a.mediaType === "ona" || a.mediaType === "ova")
        .filter(
            (a: AnimeMAL) => a.startSeason && a.startSeason.year === year && a.startSeason.season === season,
        )
        .filter((a: AnimeMAL) => a.genres && !a.genres.map((g) => g.name).includes("Hentai"));
};

export const getAnimeMalById = async (id: number): Promise<AnimeMAL> => {
    const res = await fetchMAL(
        `/anime/${id}?fields=alternative_titles,broadcast,media_type,start_season,mean,genres`,
    );
    const data = await res.json();
    return mapJsonAnimeFromId(data);
};
