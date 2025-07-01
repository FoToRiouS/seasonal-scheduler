import React from "react";
import { FetchedAnimeItem } from "./FetchedAnimeItem.tsx";
import { IAnimeSeason } from "../../../shared/interfaces/IAnimeSeason.ts";
import { useAnimeById } from "../../../shared/hooks/myanimelist/useAnimeById.ts";

interface IAnimeItemProps {
    animeSeason: IAnimeSeason;
}

export const AnimeSeasonItem: React.FC<IAnimeItemProps> = ({ animeSeason }) => {
    const { data: anime } = useAnimeById(animeSeason.idAnime!);

    return <>{anime && <FetchedAnimeItem anime={anime} animeSeason={animeSeason} />}</>;
};
