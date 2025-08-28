"use server";

import { AnimeMAL } from "@/interfaces/AnimeMAL";
import { SeasonMAL } from "@/interfaces/AnimeMAL";
import { fetchNoAuth } from "@/service/BackendService";

export const getAnimesMalBySeason = async (year: number, season: SeasonMAL): Promise<AnimeMAL[]> => {
    const res = await fetchNoAuth(`/api/mal/season/${year}/${season}`);
    return await res.json();
};

export const getAnimeMalById = async (id: number): Promise<AnimeMAL> => {
    const res = await fetchNoAuth(`/api/mal/id/${id}`);
    return await res.json();
};
