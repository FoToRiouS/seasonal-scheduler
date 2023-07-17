import React from "react";
import {IAnime} from "../../../shared/interfaces/IAnime.ts";
import {useAnimeSeasonByParameters} from "../../../shared/hooks/backend/useAnimeSeasonByParameters.ts";
import {useSeasonContext} from "../../../shared/hooks/context/useSeasonContext.ts";
import {FetchedAnimeItem} from "./FetchedAnimeItem.tsx";

interface IAnimeItemProps {
    anime: IAnime
}

export const AnimeItem: React.FC<IAnimeItemProps> = ({anime}) => {
    const {id} = anime
    const {season, year} = useSeasonContext();
    const {data: animeSeason} = useAnimeSeasonByParameters(id, year, season)

    return (
        <>
            <FetchedAnimeItem anime={anime} animeSeason={animeSeason!}/>
        </>
    )
}