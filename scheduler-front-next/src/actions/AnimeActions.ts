"use server";
import { fetchAuth } from "@/service/BackendService";
import { AnimeSeasons } from "@/service/MyAnimeListService";
import { AnimeBackend } from "@/interfaces/AnimeBackend";
import { AnimeSeasonSaveDTO } from "@/interfaces/AnimeSeasonSaveDTO";

export const getAnimesBySeason = async (
    userId: string,
    year: number,
    season: AnimeSeasons,
): Promise<AnimeBackend[]> => {
    const res = await fetchAuth(`/api/animeseason/${userId}/${year}/${season}`);
    return await res.json();
};

export const saveAnimeSeason = async (payload: AnimeSeasonSaveDTO): Promise<AnimeBackend> => {
    const res = await fetchAuth(`/api/animeseason/`, {
        method: "POST",
        body: JSON.stringify(payload),
    });
    return await res.json();
};

export const deleteAnimeSeason = async (
    idBackend: string,
    year: number,
    season: AnimeSeasons,
): Promise<AnimeBackend | null> => {
    const res = await fetchAuth(`/api/animeseason/${idBackend}/${year}/${season}`, {
        method: "DELETE",
    });
    if (res.status === 204) {
        return null;
    }
    return await res.json();
};
