import React from "react";
import {ModalAnime} from "./ModalAnime.tsx";
import {CardAnime} from "./CardAnime.tsx";
import {IAnime} from "../../../shared/interfaces/IAnime.ts";
import {useDisclosure} from "@mantine/hooks";

interface IAnimeItemProps {
    anime: IAnime
}

export const AnimeItem: React.FC<IAnimeItemProps> = ({anime}) => {
    const [opened,  {open , close}] = useDisclosure();
    const {mainPicture, title, alternativeTitles} = anime

    return (
        <>
            <CardAnime image={mainPicture.large} jpnName={title} engName={alternativeTitles.en} onOpen={open}/>
            <ModalAnime anime={anime} isOpen={opened} onClose={close}/>
        </>
    )
}