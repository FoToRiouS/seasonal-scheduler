import { CardAnime, DefaultCardAnimeProps } from "@/components/shared/animes/CardAnime";
import { Button, Center, Group } from "@mantine/core";
import { RatingAnime } from "@/components/shared/animes/RatingAnime";
import { FaEye } from "react-icons/fa6";
import { ServicesAnime } from "@/components/shared/animes/ServicesAnime";
import { useDisclosure } from "@mantine/hooks";
import { ModalAnime } from "@/components/shared/animes/ModalAnime";

export const CardAnimeSchedule = ({ fetchedAnime, index, updateOnList }: DefaultCardAnimeProps) => {
    const { animeMal, animeBackend } = fetchedAnime;
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
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
                        onClick={open}
                    >
                        Info
                    </Button>
                </Group>
            </CardAnime>
            <ModalAnime
                isOpen={opened}
                onClose={close}
                fetchedAnime={fetchedAnime}
                updateOnList={updateOnList}
                index={index}
            />
        </>
    );
};
