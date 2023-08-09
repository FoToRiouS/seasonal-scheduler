import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarXmark, faEye, faPlus} from "@fortawesome/free-solid-svg-icons";
import {ActionIcon, Box, Button, Card, Group, Image, Stack, Text, Title} from "@mantine/core";
import {IAnimeSeason} from "../../../shared/interfaces/IAnimeSeason.ts";
import {useDeleteAnimeSeason} from "../../../shared/hooks/backend/useDeleteAnimeSeason.ts";
import {useSeasonContext} from "../../../shared/hooks/context/useSeasonContext.ts";
import {modals} from "@mantine/modals";
import {IAnime} from "../../../shared/interfaces/IAnime.ts";
import {useSaveAnimeSeason} from "../../../shared/hooks/backend/useSaveAnimeSeason.ts";
import {IAnimeSeasonSaveDTO} from "../../../shared/interfaces/IAnimeSeasonSaveDTO.ts";
import {RatingAnime} from "./RatingAnime.tsx";

interface ICardAnimeProps {
    anime: IAnime,
    onOpen: () => void
    animeSeason: IAnimeSeason | undefined
}

export const CardAnime: React.FC<ICardAnimeProps> = ({anime, onOpen, animeSeason}) => {
    const {season, year} = useSeasonContext();

    const {mutate: saveAnimeSeason } = useSaveAnimeSeason(anime.id, year, season);
    const {mutate: deleteAnimeSeason} = useDeleteAnimeSeason(anime.id, year, season)

    const openDeleteModal = () => {
        modals.openConfirmModal({
            title: "Retirar da lista",
            centered: true,
            children: (
                <Text size="sm">
                    Tem certeza que deseja retirar {anime!.title} da lista?
                </Text>
            ),
            labels: { confirm: 'Retirar', cancel: "Cancelar" },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteAnimeSeason(animeSeason!.id!)
        });
    }

    const openSaveModal = () => {
        modals.openConfirmModal({
            title: "Adicionar a lista",
            centered: true,
            children: (
                <Text size="sm">
                    Tem certeza que deseja adicionar {anime!.title} a lista?
                </Text>
            ),
            labels: { confirm: 'Adicionar', cancel: "Cancelar" },
            confirmProps: { color: 'green.9' },
            onConfirm: () => {
                const animeSeason: IAnimeSeasonSaveDTO = {
                    idAnime: anime!.id.toString(),
                    year: year,
                    season: season
                }
                saveAnimeSeason(animeSeason);
            }
        });
    }

    return (
        <>
            <Card bg="dark.8" radius="lg" withBorder sx={{display: "flex", flexDirection: "column", borderWidth: "2px", borderColor: "graple"}}>
                <Card.Section bg="gray.5">
                    <Image src={anime.mainPicture.large} alt={anime.title} h={450} sx={{overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center"}}/>
                </Card.Section>
                <Stack spacing={0} mb="xl">
                    <Title order={4} c={"white"} ta={"center"} lineClamp={2}>{anime.alternativeTitles ? anime.alternativeTitles.en : ""}</Title>
                    <Title order={5} c={"white"} ta={"center"} lineClamp={2}>{anime.title}</Title>
                </Stack>
                <Group>
                    {
                        animeSeason && animeSeason.previewText &&
                        <Text>PREVIEW</Text>
                    }
                    {
                        animeSeason && animeSeason.reviewText &&
                        <Text>PREVIEW</Text>
                    }
                </Group>
                <Group mt="auto" position="right">
                    {
                        anime.mean &&
                        <Box mr="auto" h="100%">
                            <RatingAnime rating={anime.mean}/>
                        </Box>
                        // <Flex h="100%" mr="auto" justify="center" align="center" bg="gray" px="sm" sx={{borderRadius: "2rem", background: "rgba(169, 169, 169, 0.5)"}}>
                        //     <Text color="yellow" mr="xs"><FontAwesomeIcon icon={faStar}/></Text>
                        //     <Text color="gray.0"> {anime.mean} </Text>
                        // </Flex>
                    }
                    {
                        animeSeason ?
                        <ActionIcon variant="gradient" gradient={{from: "red.9", to: "grape.9"}} size="lg" onClick={openDeleteModal}>
                            <FontAwesomeIcon icon={faCalendarXmark}/>
                        </ActionIcon> :
                        <ActionIcon variant="gradient" gradient={{from: "red.9", to: "grape.9"}} size="lg" onClick={openSaveModal}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </ActionIcon>
                    }
                    <Button leftIcon={<FontAwesomeIcon icon={faEye}/>} variant="gradient" gradient={{from: "red.9", to: "grape.9"}} onClick={onOpen}>Info</Button>
                </Group>
            </Card>
        </>
    )
}