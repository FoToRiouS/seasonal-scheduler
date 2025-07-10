"use client";
import React, { createContext } from "react";
import { AnimeSeasons, getCurrentSeason } from "@/service/MyAnimeListService";
import { parseAsInteger, useQueryState } from "nuqs";
import dayjs from "dayjs";

interface SeasonContextProviderProps {
    year: number;
    season: AnimeSeasons;
    setYear: (year: number) => void;
    setSeason: (season: AnimeSeasons) => void;
}

export const SeasonContext = createContext<SeasonContextProviderProps>({} as SeasonContextProviderProps);

export const SeasonContextProvider = ({ children }: React.PropsWithChildren) => {
    const [year, setYear] = useQueryState("year", parseAsInteger.withDefault(dayjs().year()));
    const [season, setSeason] = useQueryState("season", { defaultValue: getCurrentSeason() });

    return (
        <SeasonContext.Provider
            value={{ year: year, season: season as AnimeSeasons, setSeason: setSeason, setYear: setYear }}
        >
            {children}
        </SeasonContext.Provider>
    );
};
