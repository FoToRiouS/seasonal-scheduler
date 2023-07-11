import React from "react";
import {useDisclosure} from "@chakra-ui/react";
import {ModalAnime} from "./ModalAnime.tsx";
import {CardAnime} from "./CardAnime.tsx";
import {IAnime} from "../../../shared/interfaces/IAnime.ts";

interface IAnimeItemProps {
    anime: IAnime
}

export const AnimeItem: React.FC<IAnimeItemProps> = ({anime}) => {
    const {isOpen, onOpen , onClose} = useDisclosure();
    const {mainPicture, title, alternativeTitles} = anime

    return (
        <>
            <CardAnime image={mainPicture.large} jpnName={title} engName={alternativeTitles.en} onOpen={onOpen}/>
            <ModalAnime anime={anime} isOpen={isOpen} onClose={onClose}/>
        </>
    )
}