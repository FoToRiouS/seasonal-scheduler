import { AnimeMAL } from "@/interfaces/AnimeMAL";
import { AspectRatio, Box, Image as ImageMantine, Stack, Text, Title as TitleMantine } from "@mantine/core";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { AnimeBackend } from "@/interfaces/AnimeBackend";
import { PropsWithChildren } from "react";

export interface DefaultCardAnimeProps {
    fetchedAnime: FetchedAnime;
    index: number;
    updateOnList: (index: number, animeBack: AnimeBackend | null) => void;
    removeFromList: (index: number) => void;
}

interface WithAnimeMal {
    anime: AnimeMAL;
}

export const CardAnime = ({ children, anime }: PropsWithChildren<WithAnimeMal>) => {
    return (
        <>
            <AspectRatio
                ratio={425 / 600}
                pos="relative"
                className={
                    "bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden shadow-lg group"
                }
                w={"100%"}
            >
                <ImageMantine
                    src={anime.main_picture.large}
                    alt={anime.title}
                    className={"transition-transform duration-300 group-hover:scale-105"}
                />
                <Box
                    className={
                        "relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-3/5 after:bg-gradient-to-t after:from-black after:via-black/80 after:via-[40%] after:to-transparent after:rounded-b-lg"
                    }
                    pos={"absolute"}
                    top={0}
                    left={0}
                />
                <Stack pos={"absolute"} top={0} left={0} h={"100%"} w={"100%"} p={"sm"}>
                    {children}
                </Stack>
            </AspectRatio>
        </>
    );
};

const Title = ({ anime }: WithAnimeMal) => {
    if (anime.alternative_titles.en) {
    }

    return (
        <Stack gap={0}>
            {anime.alternative_titles.en ?
                <>
                    <TitleMantine order={3} c={"white"} lineClamp={2}>
                        {anime.alternative_titles.en}
                    </TitleMantine>
                    <Text c={"dimmed"} fw={"bold"} lineClamp={2}>
                        {anime.title}
                    </Text>
                </>
            :   <TitleMantine order={3} c={"white"} lineClamp={2}>
                    {anime.title}
                </TitleMantine>
            }
        </Stack>
    );
};

CardAnime.Title = Title;
