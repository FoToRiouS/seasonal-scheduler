import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarXmark, faEye} from "@fortawesome/free-solid-svg-icons";
import {ActionIcon, Button, Card, Group, Image, Stack, Text, Title} from "@mantine/core";
import {IAnimeSeason} from "../../../shared/interfaces/IAnimeSeason.ts";
import {useDeleteAnimeSeason} from "../../../shared/hooks/backend/useDeleteAnimeSeason.ts";
import {useSeasonContext} from "../../../shared/hooks/context/useSeasonContext.ts";
import {modals} from "@mantine/modals";

interface ICardAnimeProps {
    idAnime: number,
    image: string,
    jpnName: string,
    engName: string
    onOpen: () => void
    animeSeason: IAnimeSeason | undefined
}

export const CardAnime: React.FC<ICardAnimeProps> = ({idAnime, image, jpnName, engName, onOpen, animeSeason}) => {
    const {season, year} = useSeasonContext();
    const {mutate: deleteAnimeSeason} = useDeleteAnimeSeason(idAnime, year, season)

    const openDeleteModal = () => {
        modals.openConfirmModal({
            title: "Retirar da lista",
            centered: true,
            children: (
                <Text size="sm">
                    Tem certeza que deseja retirar {jpnName} da lista?
                </Text>
            ),
            labels: { confirm: 'Retirar', cancel: "Cancelar" },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteAnimeSeason(animeSeason!.id!)
        });
    }

    return (
        <>
            <Card bg="dark.8" radius="lg" withBorder sx={{display: "flex", flexDirection: "column", borderWidth: "2px", borderColor: "graple"}}>
                <Card.Section bg="gray.5">
                    <Image src={image} alt={jpnName} h={450} sx={{overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center"}}/>
                </Card.Section>
                <Stack spacing={0} mb="xl">
                    <Title order={4} c={"white"} ta={"center"} lineClamp={2}>{jpnName}</Title>
                    <Title order={5} c={"white"} ta={"center"} lineClamp={2}>{engName}</Title>
                </Stack>
                <Group mt="auto" position="right">
                    {
                        animeSeason &&
                        <ActionIcon variant="gradient" gradient={{from: "red.9", to: "grape.9"}} size="lg" mr="auto" onClick={openDeleteModal}>
                            <FontAwesomeIcon icon={faCalendarXmark}/>
                        </ActionIcon>
                    }
                    <Button leftIcon={<FontAwesomeIcon icon={faEye}/>} variant="gradient" gradient={{from: "red.9", to: "grape.9"}} onClick={onOpen}>Info</Button>
                </Group>
            </Card>
        </>
    )
}