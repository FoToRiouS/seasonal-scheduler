import React from "react";
import {ModalAnime} from "./ModalAnime.tsx";
import {CardAnime} from "./CardAnime.tsx";
import {IAnime} from "../../../shared/interfaces/IAnime.ts";
import {useDisclosure} from "@mantine/hooks";
import {IAnimeSeason} from "../../../shared/interfaces/IAnimeSeason.ts";

interface IAnimeItemProps {
    anime: IAnime,
    animeSeason: IAnimeSeason
}

export const FetchedAnimeItem: React.FC<IAnimeItemProps> = ({anime, animeSeason}) => {
    const [opened,  {open , close}] = useDisclosure();

    return (
        <>
            <CardAnime anime={anime} onOpen={open} animeSeason={animeSeason}/>
            <ModalAnime anime={anime} animeSeason={animeSeason} isOpen={opened} onClose={close}/>
        </>
    )
}