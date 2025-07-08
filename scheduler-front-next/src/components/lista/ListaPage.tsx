"use client";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { Center, SimpleGrid, Stack } from "@mantine/core";
import { CardAnime } from "@/components/shared/animes/CardAnime";
import { useUserSession } from "@/hooks/useUserSession";
import { useFetchAnimesForList } from "@/queries/FetchedAnimeQueries";
import { CardAnimeList } from "@/components/shared/animes/CardAnimeList";
import { useEffect, useMemo } from "react";
import { useListState } from "@mantine/hooks";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { AnimeBackend } from "@/interfaces/AnimeBackend";
import { ListCardAnime } from "@/components/shared/animes/ListCardAnime";

export const ListaPage = () => {
    useSetActivePage("list");
    const { session } = useUserSession();

    const { data: fetchedAnimes } = useFetchAnimesForList(session?.userId, 2025, "summer");

    return (
        <Stack px={100}>
            <ListCardAnime fetchedAnimes={fetchedAnimes}>
                {({ fetchedAnime, index, updateOnList }) => (
                    <CardAnimeList fetchedAnime={fetchedAnime} index={index} updateOnList={updateOnList} />
                )}
            </ListCardAnime>
        </Stack>
    );
};
