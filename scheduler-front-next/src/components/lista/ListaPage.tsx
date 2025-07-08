"use client";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { Center, SimpleGrid, Stack } from "@mantine/core";
import { CardAnime } from "@/components/shared/animes/CardAnime";
import { useUserSession } from "@/hooks/useUserSession";
import { useFetchAnimesForList } from "@/queries/FetchedAnimeQueries";

export const ListaPage = () => {
    useSetActivePage("list");
    const { session } = useUserSession();

    const { data: fetchedAnimes } = useFetchAnimesForList(session?.userId, 2025, "summer");

    return (
        <Stack px={100}>
            <SimpleGrid cols={4}>
                {fetchedAnimes?.map((anime) => (
                    <Center key={anime.animeMal.id}>
                        <CardAnime anime={anime.animeMal} />
                    </Center>
                ))}
            </SimpleGrid>
        </Stack>
    );
};
