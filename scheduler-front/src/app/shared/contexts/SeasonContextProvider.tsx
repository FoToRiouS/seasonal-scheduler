import React, {createContext, ReactNode} from "react";
import {IStartSeason} from "../interfaces/IAnime.ts";
import {AnimeSeasons} from "../services/AnimesService.ts";

interface SeasonContextProviderProps {
    year: number,
    season: AnimeSeasons,
    children: ReactNode
}

export const SeasonContext = createContext<IStartSeason>({} as IStartSeason);

export const SeasonContextProvider: React.FC<SeasonContextProviderProps> = ({year, season, children}) => {
    return (
        <SeasonContext.Provider value={{year: year, season: season as AnimeSeasons}}>
            {children}
        </SeasonContext.Provider>
    )
}