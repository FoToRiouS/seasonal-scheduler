import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { ReactNode, useEffect } from "react";
import { useListState } from "@mantine/hooks";
import { AnimeBackend } from "@/interfaces/AnimeBackend";
import { Center, SimpleGrid } from "@mantine/core";
import { CardAnimeList } from "@/components/shared/animes/CardAnimeList";
import { DefaultCardAnimeProps } from "@/components/shared/animes/CardAnime";

interface Props {
    fetchedAnimes: FetchedAnime[] | undefined;
    children: (props: DefaultCardAnimeProps) => ReactNode;
}

export const ListCardAnime = ({ fetchedAnimes, children }: Props) => {
    const [managedList, handlers] = useListState<FetchedAnime>();

    useEffect(() => {
        handlers.setState(fetchedAnimes || []);
    }, [fetchedAnimes]);

    const updateOnList = (index: number, animeBack: AnimeBackend | null) => {
        handlers.setItemProp(index, "animeBackend", animeBack);
    };

    return (
        <SimpleGrid cols={4}>
            {managedList?.map((anime, index) => (
                <Center key={anime.animeMal.id}>
                    {children({ fetchedAnime: anime, index, updateOnList })}
                </Center>
            ))}
        </SimpleGrid>
    );
};
