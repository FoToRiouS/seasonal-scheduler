"use client";
import { Stack } from "@mantine/core";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { useUserSession } from "@/hooks/useUserSession";
import { useFetchAnimesForCalendar } from "@/queries/FetchedAnimeQueries";
import { CardAnimeSchedule } from "@/components/shared/animes/CardAnimeSchedule";
import { ListCardAnime } from "@/components/shared/animes/ListCardAnime";
import { useSeasonContext } from "@/components/shared/animes/provider/useSeasonContext";
import { AnimeSearchControls } from "@/components/shared/animes/AnimeSearchControls";

export const CalendarioPage = () => {
    useSetActivePage("calendar");
    const { session } = useUserSession();
    const { year, season } = useSeasonContext();

    const { data: fetchedAnimes } = useFetchAnimesForCalendar(session?.userId, year, season);

    return (
        <Stack px={100}>
            <AnimeSearchControls />
            <ListCardAnime fetchedAnimes={fetchedAnimes}>
                {({ fetchedAnime, index, updateOnList }) => (
                    <CardAnimeSchedule
                        fetchedAnime={fetchedAnime}
                        index={index}
                        updateOnList={updateOnList}
                    />
                )}
            </ListCardAnime>
        </Stack>
    );
};
