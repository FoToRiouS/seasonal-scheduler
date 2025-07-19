"use client";
import { Button, Group, Stack } from "@mantine/core";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { useUserSession } from "@/hooks/useUserSession";
import { useFetchAnimesForCalendar } from "@/queries/FetchedAnimeQueries";
import { CardAnimeSchedule } from "@/components/animes/cards/CardAnimeSchedule";
import { ListCardAnime } from "@/components/animes/cards/ListCardAnime";
import { useSeasonContext } from "@/components/animes/provider/useSeasonContext";
import { AnimeSearchControls } from "@/components/animes/shared/AnimeSearchControls";
import { useState } from "react";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { useDisclosure } from "@mantine/hooks";
import { ModalSendPreviewMessages } from "@/components/animes/modals/ModalSendPreviewMessages";

export const CalendarioPage = () => {
    useSetActivePage("calendar");
    const { session } = useUserSession();
    const { year, season } = useSeasonContext();

    const { data: fetchedAnimes } = useFetchAnimesForCalendar(session?.userId, year, season);
    const [controlledAnimeList, setControlledAnimeList] = useState<FetchedAnime[]>([]);

    const [openedModalPreview, { open: openModalPreview, close: closeModalPreview }] = useDisclosure(false);

    return (
        <>
            <Stack px={100}>
                <AnimeSearchControls
                    rawAnimesList={fetchedAnimes}
                    setControlledAnimeList={setControlledAnimeList}
                />
                <Group grow>
                    <Button onClick={openModalPreview}>Enviar lista de Preview</Button>
                    <Button>Enviar lista de Review</Button>
                </Group>
                <ListCardAnime fetchedAnimes={controlledAnimeList}>
                    {({ fetchedAnime, index, updateOnList, removeFromList }) => (
                        <CardAnimeSchedule
                            fetchedAnime={fetchedAnime}
                            index={index}
                            updateOnList={updateOnList}
                            removeFromList={removeFromList}
                        />
                    )}
                </ListCardAnime>
            </Stack>
            <ModalSendPreviewMessages
                opened={openedModalPreview}
                onClose={closeModalPreview}
                fetchedAnimes={controlledAnimeList}
            />
        </>
    );
};
