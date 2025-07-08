import { CardAnime, DefaultCardAnimeProps } from "@/components/shared/animes/CardAnime";
import { Button, Center, Group } from "@mantine/core";
import { RatingAnime } from "@/components/shared/animes/RatingAnime";
import { FaEye } from "react-icons/fa6";
import { ServicesAnime } from "@/components/shared/animes/ServicesAnime";

export const CardAnimeSchedule = ({ fetchedAnime, index, updateOnList }: DefaultCardAnimeProps) => {
    const { animeMal, animeBackend } = fetchedAnime;

    return (
        <CardAnime>
            <CardAnime.Image anime={animeMal}>
                <ServicesAnime animeBack={animeBackend!} />
            </CardAnime.Image>
            <CardAnime.Title anime={animeMal} />
            <Group mt="auto" justify="flex-end">
                {animeMal.mean && (
                    <Center mr="auto" h="100%">
                        <RatingAnime rating={animeMal.mean} />
                    </Center>
                )}
                <Button
                    leftSection={<FaEye />}
                    variant="gradient"
                    gradient={{ from: "pink.9", to: "violet.9" }}
                >
                    Info
                </Button>
            </Group>
        </CardAnime>
    );
};
