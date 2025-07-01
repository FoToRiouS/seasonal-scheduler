import React from "react";
import { IAnime } from "../../../shared/interfaces/IAnime.ts";
import { useAnimeSeasonByParameters } from "../../../shared/hooks/backend/useAnimeSeasonByParameters.ts";
import { FetchedAnimeItem } from "./FetchedAnimeItem.tsx";

interface IAnimeItemProps {
    anime: IAnime;
}

export const AnimeItem: React.FC<IAnimeItemProps> = ({ anime }) => {
    const { id } = anime;
    const { data: animeSeason } = useAnimeSeasonByParameters(id);

    return (
        <>
            <FetchedAnimeItem anime={anime} animeSeason={animeSeason!} />
        </>
    );
};
