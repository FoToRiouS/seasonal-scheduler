import React, { useEffect, useState } from "react";
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
import { modals } from "@mantine/modals";
import { useWatchServiceList } from "@/queries/WatchServiceQueries";
import { useDeleteAnimeSeason, useUpdateAnimeSeason } from "@/queries/AnimeQueries";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { getDayOfExhibition, getSeasonInPortuguese } from "@/service/MyAnimeListService";
import { StartSeason } from "@/interfaces/AnimeMAL";
import { FaX } from "react-icons/fa6";
import { RatingAnime } from "@/components/shared/animes/RatingAnime";
import { BadgeSeason } from "@/components/shared/animes/BadgeSeason";
import { TextareaWithCounter } from "@/components/shared/TextareaWithCounter";
import { InputGroupAnimeSeason } from "@/components/shared/animes/InputGroupAnimeSeason";
import { useSeasonContext } from "@/components/shared/animes/provider/useSeasonContext";
import { AnimeSeason } from "@/interfaces/AnimeSeason";
import { AnimeSeasonUpdateDTO } from "@/interfaces/AnimeSeasonUpdateDTO";
import { useNotifications } from "@/hooks/useNotifications";
import { AnimeBackend } from "@/interfaces/AnimeBackend";
import { SelectWatchServices } from "@/components/shared/animes/SelectWatchServices";

interface IModalAnimeProps {
    isOpen: boolean;
    onClose: () => void;
    fetchedAnime: FetchedAnime;
    index: number;
    updateOnList: (index: number, animeBack: AnimeBackend | null) => void;
}

interface FormValues {
    startSeason: StartSeason;
    review: string;
    preview: string;
    services: string[];
}

export const ModalAnime = ({ isOpen, onClose, fetchedAnime, index, updateOnList }: IModalAnimeProps) => {
    const { showSuccess, showError } = useNotifications();
    const { season, year } = useSeasonContext();
    const { animeBackend, animeMal } = fetchedAnime;

    const [animeBackendToUpdate, setAnimeBackendToUpdate] = useState(animeBackend!);
    const [selectedAnimeSeason, setSelectedAnimeSeason] = useState<AnimeSeason>();
    const [selectedWatchServices, setSelectedWatchServices] = useState(
        animeBackend?.watchServices.map((ws) => ws.id)!,
    );

    useEffect(() => {
        const selectedAnimeSeason = animeBackend?.animeSeasons.find(
            (as) => as.season.season === season && as.season.year === year,
        );
        if (selectedAnimeSeason) {
            setSelectedAnimeSeason(selectedAnimeSeason);
        }
    }, []);

    const handleChangePreviewText = (text: string) => {
        setSelectedAnimeSeason(
            (prev) =>
                prev && {
                    ...prev,
                    previewText: text,
                },
        );
    };

    const handleChangeReviewText = (text: string) => {
        setSelectedAnimeSeason((prev) => {
            if (prev) {
                return {
                    ...prev,
                    reviewText: text,
                };
            }
        });
    };

    useEffect(() => {
        setAnimeBackendToUpdate((prev) => ({
            ...prev,
            animeSeasons: prev.animeSeasons.map((as) =>
                (
                    as.season.season === selectedAnimeSeason?.season.season &&
                    as.season.year === selectedAnimeSeason?.season.year
                ) ?
                    selectedAnimeSeason!
                :   as,
            ),
        }));
    }, [selectedAnimeSeason]);

    const { data: watchServices } = useWatchServiceList();

    const { mutate: update, isPending: isUpdating } = useUpdateAnimeSeason();
    const { mutate: deleteAnimeSeason } = useDeleteAnimeSeason(animeBackendToUpdate?.id, year, season);

    const handleDeleteSeason = (startSeason: StartSeason) => {
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

    const handleUpdateAnimeSeason = () => {
        const animeSeasonUpdate: AnimeSeasonUpdateDTO = {
            animeBackId: animeBackend!.id,
            services: selectedWatchServices,
            animeSeasons: animeBackendToUpdate.animeSeasons,
        };
        update(animeSeasonUpdate, {
            onSuccess: (data) => {
                showSuccess("Informações foram salvas com sucesso!");
                updateOnList(index, data);
                onClose();
            },
        });
    };

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

                            {animeBackendToUpdate && (
                                <>
                                    <Divider my={5} />
                                    {animeBackendToUpdate.animeSeasons && (
                                        <Group justify="center">
                                            {animeBackendToUpdate.animeSeasons.map((s) => (
                                                <BadgeSeason
                                                    key={s.season.season + s.season.year}
                                                    startSeason={s.season}
                                                    onClick={() => setSelectedAnimeSeason(s)}
                                                    variant={
                                                        (
                                                            selectedAnimeSeason?.season.season ===
                                                                s.season.season &&
                                                            selectedAnimeSeason?.season.year === s.season.year
                                                        ) ?
                                                            "filled"
                                                        :   "outline"
                                                    }
                                                />
                                            ))}
                                        </Group>
                                    )}
                                    <TextareaWithCounter
                                        maxCounter={900}
                                        label="Preview"
                                        value={selectedAnimeSeason?.previewText}
                                        onChange={(e) => handleChangePreviewText(e.currentTarget.value)}
                                    />
                                    {/*<Textarea label="Preview" value={preview} onChange={e => setPreview(e.currentTarget.value)}/>*/}
                                    <TextareaWithCounter
                                        maxCounter={900}
                                        label="Review"
                                        value={selectedAnimeSeason?.reviewText}
                                        onChange={(e) => handleChangeReviewText(e.currentTarget.value)}
                                    />
                                    <SelectWatchServices />
                                    <Chip.Group
                                        multiple
                                        value={selectedWatchServices}
                                        onChange={setSelectedWatchServices}
                                    >
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
                                        <Button variant="filled" mt="auto" onClick={handleUpdateAnimeSeason}>
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
