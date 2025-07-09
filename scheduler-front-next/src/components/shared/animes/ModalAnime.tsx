import React, { useState } from "react";
import {
    ActionIcon,
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    Group,
    Image,
    Modal,
    SimpleGrid,
    Stack,
    Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { useWatchServiceList } from "@/queries/WatchServiceQueries";
import { useDeleteAnimeSeason } from "@/queries/AnimeQueries";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { getDayOfExhibition, getSeasonInPortuguese } from "@/service/MyAnimeListService";
import { StartSeason } from "@/interfaces/AnimeMAL";
import { FaX } from "react-icons/fa6";
import { RatingAnime } from "@/components/shared/animes/RatingAnime";
import { BadgeSeason } from "@/components/shared/animes/BadgeSeason";
import { TextareaWithCounter } from "@/components/shared/TextareaWithCounter";
import { InputGroupAnimeSeason } from "@/components/shared/animes/InputGroupAnimeSeason";

interface IModalAnimeProps {
    isOpen: boolean;
    onClose: () => void;
    fetchedAnime: FetchedAnime;
}

export const ModalAnime = ({ isOpen, onClose, fetchedAnime }: IModalAnimeProps) => {
    // const { season, year } = useSeasonContext();
    const season = "summer";
    const year = 2025;

    const { animeBackend, animeMal } = fetchedAnime;

    const [services, setServices] = useState([] as string[]);
    const [preview, setPreview] = useState("");
    const [review, setReview] = useState("");

    const { data: watchServices } = useWatchServiceList();

    // const { mutate: update, isLoading: isUpdating, isSuccess } = useUpdateAnimeSeason(anime!.id);
    const { mutate: deleteAnimeSeason } = useDeleteAnimeSeason(animeBackend?.id, year, season);

    const openDeleteModal = (startSeason: StartSeason) => {
        modals.openConfirmModal({
            title: "Retirar da lista",
            centered: true,
            children: (
                <Text size="sm">
                    Tem certeza que deseja retirar {animeMal.title} do calendário de{" "}
                    {getSeasonInPortuguese(startSeason.season)} de {startSeason.year} ?
                </Text>
            ),
            labels: { confirm: "Retirar", cancel: "Cancelar" },
            confirmProps: { color: "red" },
            onConfirm: () => deleteAnimeSeason(undefined),
        });
    };

    const onUpdateSuccess = () => {
        notifications.show({
            title: "Salvo com sucesso",
            message: "Informações foram salvas com sucesso!",
            color: "green",
            autoClose: 5000,
        });
    };

    // const handleUpdateAnimeSeason = () => {
    //     const animeSeasonUpdate: IAnimeSeasonUpdateDTO = {
    //         id: animeSeason?.id as string,
    //         previewText: preview,
    //         reviewText: review,
    //         services: services,
    //     };
    //     update(animeSeasonUpdate);
    // };

    return (
        <>
            <Modal
                opened={isOpen}
                onClose={onClose}
                withCloseButton={false}
                centered
                size={880}
                radius="lg"
                closeOnClickOutside={false}
            >
                <ActionIcon
                    variant="gradient"
                    gradient={{ from: "violet", to: "grape" }}
                    radius="xl"
                    pos="absolute"
                    right={10}
                    top={10}
                    onClick={onClose}
                >
                    <FaX />
                </ActionIcon>
                <Grid columns={2}>
                    <Grid.Col span={{ base: 2, lg: 1 }}>
                        <Box pos="relative">
                            <Image src={animeMal.mainPicture.large} w="100%" radius="md" />
                            {animeMal.mean && (
                                <Box pos="absolute" bottom={15} right={15}>
                                    <RatingAnime rating={animeMal.mean} />
                                </Box>
                            )}
                        </Box>
                    </Grid.Col>
                    <Grid.Col span={{ base: 2, lg: 1 }}>
                        <Stack h="100%" gap="xs">
                            <Group gap="xs" wrap={"nowrap"} pr="xl">
                                <Text fw="bold">Nome:</Text>
                                <Text>
                                    {animeMal.title}
                                    {animeMal.alternativeTitles.en ?
                                        " (" + animeMal.alternativeTitles.en + ")"
                                    :   undefined}
                                </Text>
                            </Group>
                            {animeMal.broadcast ?
                                <Group gap="xs">
                                    <Text fw="bold">Exibição:</Text>
                                    <Text tt={"capitalize"}>
                                        {getDayOfExhibition(
                                            animeMal.broadcast.day_of_the_week,
                                            animeMal.broadcast.start_time,
                                        )}
                                    </Text>
                                </Group>
                            :   undefined}

                            {animeBackend && (
                                <>
                                    <Divider my={5} />
                                    {animeBackend.animeSeasons && (
                                        <Group justify="center">
                                            {animeBackend.animeSeasons.map((s) => (
                                                <BadgeSeason
                                                    key={s.season.season + s.season.year}
                                                    startSeason={s.season}
                                                    close={() => openDeleteModal(s.season)}
                                                />
                                            ))}
                                        </Group>
                                    )}
                                    <TextareaWithCounter
                                        maxCounter={900}
                                        label="Preview"
                                        value={preview}
                                        onChange={(e) => setPreview(e.currentTarget.value)}
                                    />
                                    {/*<Textarea label="Preview" value={preview} onChange={e => setPreview(e.currentTarget.value)}/>*/}
                                    <TextareaWithCounter
                                        maxCounter={900}
                                        label="Review"
                                        value={review}
                                        onChange={(e) => setReview(e.currentTarget.value)}
                                    />
                                    <Chip.Group multiple value={services} onChange={setServices}>
                                        <SimpleGrid cols={2}>
                                            {watchServices
                                                ?.sort((w1, w2) => {
                                                    if (w1.name < w2.name) {
                                                        return -1;
                                                    }
                                                    if (w1.name > w2.name) {
                                                        return 1;
                                                    }
                                                    return 0;
                                                })
                                                .map((w) => {
                                                    return (
                                                        <Chip
                                                            key={w.id}
                                                            value={w.id}
                                                            color={w.color}
                                                            variant="filled"
                                                            styles={{
                                                                label: {
                                                                    width: "100%",
                                                                    justifyContent: "center",
                                                                },
                                                            }}
                                                        >
                                                            {w.name}
                                                        </Chip>
                                                    );
                                                })}
                                        </SimpleGrid>
                                    </Chip.Group>
                                    <Stack mt="auto" gap="xs">
                                        <InputGroupAnimeSeason
                                            anime={animeMal}
                                            initialYear={year}
                                            initialSeason={season}
                                        />
                                        <Button variant="filled" color={"grape.9"} mt="auto">
                                            "Salvar Alterações"
                                        </Button>
                                    </Stack>
                                </>
                            )}
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Modal>
        </>
    );
};
