import { CardAnime, DefaultCardAnimeProps } from "@/components/animes/cards/CardAnime";
import { Box, Button, Center, Group, Stack } from "@mantine/core";
import { RatingAnime } from "@/components/animes/shared/RatingAnime";
import { FaEye } from "react-icons/fa6";
import { ServicesAnime } from "@/components/animes/shared/ServicesAnime";
import { useDisclosure } from "@mantine/hooks";
import { ModalAnime } from "@/components/animes/modals/ModalAnime";
import { BadgeTextInfo } from "@/components/animes/cards/BadgeTextInfo";
import { useSeasonContext } from "@/components/animes/provider/useSeasonContext";
import { useMemo } from "react";

export const CardAnimeSchedule = ({
    fetchedAnime,
    index,
    updateOnList,
    removeFromList,
}: DefaultCardAnimeProps) => {
    const { year, season } = useSeasonContext();
    const { animeMal, animeBackend } = fetchedAnime;
    const [opened, { open, close }] = useDisclosure(false);

    const actualSeason = useMemo(
        () => animeBackend?.animeSeasons.find((as) => as.season.year === year && as.season.season === season),
        [animeBackend, year, season],
    );

    return (
        <>
            <CardAnime anime={animeMal}>
                <Box>
                    <ServicesAnime animeBack={animeBackend!} />
                </Box>
                <Stack justify={"end"} h={"100%"} p={"sm"}>
                    <CardAnime.Title anime={animeMal} />
                    <Group h={25} align={"center"}>
                        {actualSeason?.previewText && <BadgeTextInfo type={"preview"} />}
                        {actualSeason?.reviewText && <BadgeTextInfo type={"review"} />}
                    </Group>
                    <Group justify="flex-end">
                        {animeMal.mean && (
                            <Center h="100%">
                                <RatingAnime rating={animeMal.mean} />
                            </Center>
                        )}
                        <Button
                            leftSection={<FaEye />}
                            variant="gradient"
                            gradient={{ from: "pink.9", to: "violet.9" }}
                            onClick={open}
                            ml="auto"
                        >
                            Info
                        </Button>
                    </Group>
                </Stack>
            </CardAnime>
            <ModalAnime
                isOpen={opened}
                onClose={close}
                fetchedAnime={fetchedAnime}
                updateOnList={updateOnList}
                removeFromList={removeFromList}
                index={index}
            />
        </>
    );
};
