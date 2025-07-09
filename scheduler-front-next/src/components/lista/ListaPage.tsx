"use client";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { Stack } from "@mantine/core";
import { useUserSession } from "@/hooks/useUserSession";
import { useFetchAnimesForList } from "@/queries/FetchedAnimeQueries";
import { CardAnimeList } from "@/components/shared/animes/CardAnimeList";
import { useState } from "react";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { ListCardAnime } from "@/components/shared/animes/ListCardAnime";
import { AnimeSeasons } from "@/service/MyAnimeListService";
import { AnimeSearchControls } from "@/components/shared/animes/AnimeSearchControls";
import { useSeasonContext } from "@/components/shared/animes/provider/useSeasonContext";

export const ListaPage = () => {
    useSetActivePage("list");
    const { session } = useUserSession();
    const { year, season } = useSeasonContext();

    const { data: fetchedAnimes } = useFetchAnimesForList(session?.userId, year, season as AnimeSeasons);
    const [controlledAnimeList, setControlledAnimeList] = useState<FetchedAnime[]>([]);

    return (
        <Stack px={100}>
            <AnimeSearchControls
                rawAnimesList={fetchedAnimes}
                setControlledAnimeList={setControlledAnimeList}
            />
            <ListCardAnime fetchedAnimes={controlledAnimeList}>
                {({ fetchedAnime, index, updateOnList }) => (
                    <CardAnimeList fetchedAnime={fetchedAnime} index={index} updateOnList={updateOnList} />
                )}
            </ListCardAnime>
        </Stack>
    );
};
