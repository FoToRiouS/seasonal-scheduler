"use client";
import { Center, SimpleGrid, Stack } from "@mantine/core";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { useUserSession } from "@/hooks/useUserSession";
import { useFetchAnimesForCalendar } from "@/queries/FetchedAnimeQueries";
import { CardAnime } from "@/components/shared/animes/CardAnime";
import { CardAnimeSchedule } from "@/components/shared/animes/CardAnimeSchedule";
import { useListState } from "@mantine/hooks";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { useEffect } from "react";
import { AnimeBackend } from "@/interfaces/AnimeBackend";

export const CalendarioPage = () => {
    useSetActivePage("calendar");
    const { session } = useUserSession();

    const [fetchedAnimes, handlers] = useListState<FetchedAnime>();
    const { data } = useFetchAnimesForCalendar(session?.userId, 2025, "summer");

    useEffect(() => {
        handlers.setState(data || []);
    }, [data]);

    const updateOnList = (index: number, animeBack: AnimeBackend | null) => {
        handlers.setItemProp(index, "animeBackend", animeBack);
    };

    return (
        <Stack px={100}>
            <SimpleGrid cols={4}>
                {fetchedAnimes?.map((anime, index) => (
                    <Center key={anime.animeBackend!.id}>
                        <CardAnimeSchedule fetchedAnime={anime} index={index} updateOnList={() => {}} />
                    </Center>
                ))}
            </SimpleGrid>
        </Stack>
    );
};
