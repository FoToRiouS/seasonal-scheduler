import { AnimeMAL } from "@/interfaces/AnimeMAL";
import {
    Box,
    Card as CardMantine,
    Group,
    Image as ImageMantine,
    Stack,
    Title as TitleMantine,
} from "@mantine/core";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { AnimeBackend } from "@/interfaces/AnimeBackend";

export interface DefaultCardAnimeProps {
    fetchedAnime: FetchedAnime;
    index: number;
    updateOnList: (index: number, animeBack: AnimeBackend | null) => void;
}

interface WithAnimeMal {
    anime: AnimeMAL;
}

export const CardAnime = ({ children }: { children: React.ReactNode }) => {
    return (
        <CardMantine
            bg="dark.8"
            radius="lg"
            withBorder
            w={400}
            h={"100%"}
            style={{
                display: "flex",
                flexDirection: "column",
                borderWidth: "2px",
                borderColor: "graple",
            }}
        >
            {children}
        </CardMantine>
    );
};

const Image = ({ anime, children }: React.PropsWithChildren<WithAnimeMal>) => {
    return (
        <CardMantine.Section bg="gray.5" pos="relative" h={500}>
            <ImageMantine
                src={anime.mainPicture.large}
                alt={anime.title}
                h={"100%"}
                style={{
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            />
            <Group align={"start"} pos="absolute" top={0} left={0} h={"100%"} w={"100%"}>
                {children}
            </Group>
        </CardMantine.Section>
    );
};

const Title = ({ anime }: WithAnimeMal) => {
    return (
        <Stack gap={0} mb="xl">
            <TitleMantine order={4} c={"white"} ta={"center"} lineClamp={2}>
                {anime.alternativeTitles ? anime.alternativeTitles.en : ""}
            </TitleMantine>
            <TitleMantine order={5} c={"white"} ta={"center"} lineClamp={2}>
                {anime.title}
            </TitleMantine>
        </Stack>
    );
};

CardAnime.Image = Image;
CardAnime.Title = Title;
