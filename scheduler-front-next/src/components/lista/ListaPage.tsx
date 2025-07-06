"use client";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { Center, SimpleGrid, Stack } from "@mantine/core";
import { useAnimesBySeason } from "@/queries/MalQueries";
import { useEffect } from "react";
import { CardAnime } from "@/components/shared/animes/CardAnime";

export const ListaPage = () => {
    useSetActivePage("list");
    const { data: animes } = useAnimesBySeason(2025, "summer");

    useEffect(() => {
        console.log(animes);
    }, [animes]);

    return (
        <Stack px={100}>
            <SimpleGrid cols={4}>
                {animes?.map((anime) => (
                    <Center key={anime.id}>
                        <CardAnime anime={anime} />
                    </Center>
                ))}
            </SimpleGrid>
        </Stack>
    );
};
