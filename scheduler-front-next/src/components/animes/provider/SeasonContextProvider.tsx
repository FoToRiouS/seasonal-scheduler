"use client";
import React, { createContext } from "react";
import { parseAsInteger, useQueryState } from "nuqs";
import dayjs from "dayjs";
import { getCurrentSeason } from "@/utils/MyAnimeListUtils";
import { SeasonMAL } from "@/interfaces/AnimeMAL";

interface SeasonContextProviderProps {
    year: number;
    season: SeasonMAL;
    setYear: (year: number) => void;
    setSeason: (season: SeasonMAL) => void;
}

export const SeasonContext = createContext<SeasonContextProviderProps>({} as SeasonContextProviderProps);

export const SeasonContextProvider = ({ children }: React.PropsWithChildren) => {
    const [year, setYear] = useQueryState("year", parseAsInteger.withDefault(dayjs().year()));
    const [season, setSeason] = useQueryState("season", { defaultValue: getCurrentSeason() });

    return (
        <SeasonContext.Provider
            value={{ year: year, season: season as SeasonMAL, setSeason: setSeason, setYear: setYear }}
        >
            {children}
        </SeasonContext.Provider>
    );
};
