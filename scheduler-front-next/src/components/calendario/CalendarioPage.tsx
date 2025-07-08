"use client";
import { Center, SimpleGrid, Stack } from "@mantine/core";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { useUserSession } from "@/hooks/useUserSession";
import { useFetchAnimesForCalendar } from "@/queries/FetchedAnimeQueries";
import { CardAnime } from "@/components/shared/animes/CardAnime";

export const CalendarioPage = () => {
    useSetActivePage("calendar");
    const { session } = useUserSession();

    const { data: fetchedAnimes } = useFetchAnimesForCalendar(session?.userId, 2025, "summer");

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
