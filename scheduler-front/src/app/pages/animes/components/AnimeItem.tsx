import React from "react";
import {ModalAnime} from "./ModalAnime.tsx";
import {CardAnime} from "./CardAnime.tsx";
import {IAnime} from "../../../shared/interfaces/IAnime.ts";
import {useDisclosure} from "@mantine/hooks";
import {useAnimeSeasonByParameters} from "../../../shared/hooks/backend/useAnimeSeasonByParameters.ts";
import {useSeasonContext} from "../../../shared/hooks/context/useSeasonContext.ts";

interface IAnimeItemProps {
    anime: IAnime
}

export const AnimeItem: React.FC<IAnimeItemProps> = ({anime}) => {
    const [opened,  {open , close}] = useDisclosure();
    const {id, mainPicture, title, alternativeTitles} = anime

    const {season, year} = useSeasonContext();

    const {data: animeSeason} = useAnimeSeasonByParameters(id, year, season)

    return (
        <>
            <CardAnime idAnime={id} image={mainPicture.large} jpnName={title} engName={alternativeTitles.en} onOpen={open} animeSeason={animeSeason}/>
            <ModalAnime anime={anime} animeSeason={animeSeason} isOpen={opened} onClose={close}/>
        </>
    )
}