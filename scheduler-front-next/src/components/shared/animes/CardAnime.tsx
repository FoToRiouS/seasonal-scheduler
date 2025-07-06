import { AnimeMAL } from "@/interfaces/AnimeMAL";
import { Box, Button, Card, Group, Image, Stack, Title } from "@mantine/core";
import { FaEye } from "react-icons/fa6";
import { RatingAnime } from "@/components/shared/animes/RatingAnime";

interface ICardAnimeProps {
    anime: AnimeMAL;
}

export const CardAnime = ({ anime }: ICardAnimeProps) => {
    return (
        <>
            <Card
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
                <Card.Section bg="gray.5" pos="relative" h={500}>
                    <Image
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
                </Card.Section>
                <Stack gap={0} mb="xl">
                    <Title order={4} c={"white"} ta={"center"} lineClamp={2}>
                        {anime.alternativeTitles ? anime.alternativeTitles.en : ""}
                    </Title>
                    <Title order={5} c={"white"} ta={"center"} lineClamp={2}>
                        {anime.title}
                    </Title>
                </Stack>
                <Group mt="auto">
                    {anime.mean && (
                        <Box mr="auto" h="100%">
                            <RatingAnime rating={anime.mean} />
                        </Box>
                    )}
                    <Button
                        leftSection={<FaEye />}
                        variant="gradient"
                        gradient={{ from: "red.9", to: "grape.9" }}
                    >
                        Info
                    </Button>
                </Group>
            </Card>
        </>
    );
};
