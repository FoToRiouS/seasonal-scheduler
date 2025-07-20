import { ActionIcon, Box, Center, Group, List, Menu, Stack, Text, ThemeIcon, Tooltip } from "@mantine/core";
import { CardAnime, DefaultCardAnimeProps } from "@/components/animes/cards/CardAnime";
import { RatingAnime } from "../shared/RatingAnime";
import { FaCheck, FaGear, FaPlus, FaTrash } from "react-icons/fa6";
import React, { useMemo } from "react";
import { modals } from "@mantine/modals";
import { useDeleteAnimeSeason, useSaveAnimeSeason } from "@/queries/AnimeQueries";
import { useNotifications } from "@/hooks/useNotifications";
import { useUserSession } from "@/hooks/useUserSession";
import { useSeasonContext } from "@/components/animes/provider/useSeasonContext";
import { ModalAddSeason } from "@/components/animes/modals/ModalAddSeason";
import { useDisclosure } from "@mantine/hooks";
import { ModalRemoveSeason } from "@/components/animes/modals/ModalRemoveSeason";
import { AnimeBackend } from "@/interfaces/AnimeBackend";
import { getSeasonInPortuguese } from "@/service/MyAnimeListService";
import { FaPlusSquare } from "react-icons/fa";

interface ActionIconAddProps {
    onClickCurrent: () => void;
    onClickOther: () => void;
}

interface ActionIconExistProps {
    onClickAdd: () => void;
    onClickRemove: () => void;
}

interface IconSeasonsProps {
    animeBackend: AnimeBackend;
}

export const CardAnimeList = ({ fetchedAnime, index, updateOnList }: DefaultCardAnimeProps) => {
    const { showSuccess, showError } = useNotifications();
    const { year, season } = useSeasonContext();
    const { session } = useUserSession();
    const { animeMal, animeBackend } = fetchedAnime;

    const [openedModalAddSeason, { open: openModalAddSeason, close: closeModalAddSeason }] =
        useDisclosure(false);
    const [openedModalRemoveSeason, { open: openModalRemoveSeason, close: closeModalRemoveSeason }] =
        useDisclosure(false);

    const { mutate: saveAnimeSeason } = useSaveAnimeSeason();
    const { mutate: deleteAnimeSeason } = useDeleteAnimeSeason(animeBackend?.id);

    const handleAddCurrent = () => {
        modals.openConfirmModal({
            title: "Adicionar anime ao calendário",
            children: (
                <Box>
                    <p>Você tem certeza que deseja adicionar o anime {animeMal.title} ao seu calendário?</p>
                </Box>
            ),
            labels: { confirm: "Sim", cancel: "Não" },
            confirmProps: { color: "green.8" },
            onConfirm: () => {
                saveAnimeSeason(
                    {
                        userId: session?.userId!,
                        idAnime: animeMal.id.toString(),
                        season: "summer",
                        year: 2025,
                    },
                    {
                        onSuccess: (data) => {
                            updateOnList(index, data);
                            showSuccess("Anime adicionado ao calendário!");
                        },
                        onError: showError,
                    },
                );
            },
        });
    };

    const handleRemoveAnime = () => {
        modals.openConfirmModal({
            title: "Remover anime do calendário",
            children: (
                <Box>
                    <p>Você tem certeza que deseja remover o anime {animeMal.title} do seu calendário?</p>
                </Box>
            ),
            labels: { confirm: "Sim", cancel: "Não" },
            confirmProps: { color: "red.8" },
            onConfirm: () => {
                deleteAnimeSeason(
                    { season: season, year: year },
                    {
                        onSuccess: (data) => {
                            updateOnList(index, data);
                            showSuccess("Anime excluído do calendário!");
                        },
                        onError: showError,
                    },
                );
            },
        });
    };

    return (
        <>
            <CardAnime anime={animeMal}>
                <Stack justify={"end"} h={"100%"}>
                    <CardAnime.Title anime={animeMal} />
                    <Group mt={"md"}>
                        {animeMal.mean ?
                            <Center h="100%">
                                <RatingAnime rating={animeMal.mean} />
                            </Center>
                        :   <div></div>}
                        {session ?
                            animeBackend ?
                                <>
                                    <IconSeasons animeBackend={animeBackend} />
                                    <ActionIconExist
                                        onClickAdd={openModalAddSeason}
                                        onClickRemove={openModalRemoveSeason}
                                    />
                                </>
                            :   <ActionIconAdd
                                    onClickOther={openModalAddSeason}
                                    onClickCurrent={handleAddCurrent}
                                />

                        :   <></>}
                    </Group>
                </Stack>
            </CardAnime>
            <ModalAddSeason
                opened={openedModalAddSeason}
                onClose={closeModalAddSeason}
                anime={animeMal}
                updateOnList={updateOnList}
                index={index}
            />
            <ModalRemoveSeason
                opened={openedModalRemoveSeason}
                onClose={closeModalRemoveSeason}
                fetchedAnime={fetchedAnime}
                updateOnList={updateOnList}
                index={index}
            />
        </>
    );
};

const ActionIconAdd = ({ onClickCurrent, onClickOther }: ActionIconAddProps) => {
    return (
        <Menu position={"top-end"}>
            <Menu.Target>
                <ActionIcon radius={"xl"} size={"xl"} color={"violet.8"} ml={"auto"}>
                    <FaPlus />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={onClickOther} leftSection={<FaPlusSquare />}>
                    Adicionar a outra temporada
                </Menu.Item>
                <Menu.Item onClick={onClickCurrent} leftSection={<FaPlus />}>
                    Adicionar a temporada atual
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

const ActionIconExist = ({ onClickAdd, onClickRemove }: ActionIconExistProps) => {
    return (
        <Menu position={"top-end"}>
            <Menu.Target>
                <ActionIcon radius={"xl"} size={"xl"} color={"violet.8"} ml={"auto"}>
                    <FaGear />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item onClick={onClickAdd} leftSection={<FaPlusSquare />}>
                    Adicionar a outra temporada
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={onClickRemove} leftSection={<FaTrash />} c={"red.8"}>
                    Remover temporada
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

const IconSeasons = ({ animeBackend }: IconSeasonsProps) => {
    const seasonsList = useMemo(
        () => (
            <>
                <Text fz={14}>Temporadas:</Text>
                <List>
                    {animeBackend.animeSeasons.map((s) => (
                        <List.Item
                            key={s.season.season + s.season.year}
                            fz={14}
                        >{`${getSeasonInPortuguese(s.season.season)}/${s.season.year}`}</List.Item>
                    ))}
                </List>
            </>
        ),
        [animeBackend],
    );

    return (
        <Tooltip label={seasonsList} position={"top"}>
            <ThemeIcon radius={"xl"} size={"xl"} color={"green.8"} style={{ cursor: "help" }}>
                <FaCheck />
            </ThemeIcon>
        </Tooltip>
    );
};
