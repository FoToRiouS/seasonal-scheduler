import React, { useEffect, useState } from "react";
import {
    ActionIcon,
    Box,
    Button,
    Divider,
    Grid,
    Group,
    Image,
    Menu,
    Modal,
    Stack,
    Text,
} from "@mantine/core";
import { useUpdateAnimeSeason } from "@/queries/AnimeQueries";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { getDayOfExhibition } from "@/service/MyAnimeListService";
import { StartSeason } from "@/interfaces/AnimeMAL";
import { FaGear, FaX } from "react-icons/fa6";
import { RatingAnime } from "@/components/animes/shared/RatingAnime";
import { BadgeSeason } from "@/components/animes/shared/BadgeSeason";
import { TextareaWithCounter } from "@/components/shared/TextareaWithCounter";
import { ModalAddSeason } from "@/components/animes/modals/ModalAddSeason";
import { useSeasonContext } from "@/components/animes/provider/useSeasonContext";
import { AnimeSeason } from "@/interfaces/AnimeSeason";
import { AnimeSeasonUpdateDTO } from "@/interfaces/AnimeSeasonUpdateDTO";
import { useNotifications } from "@/hooks/useNotifications";
import { AnimeBackend } from "@/interfaces/AnimeBackend";
import { SelectWatchServices } from "@/components/animes/shared/SelectWatchServices";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { ModalRemoveSeason } from "@/components/animes/modals/ModalRemoveSeason";
import { useAnimesUtils } from "@/hooks/useAnimesOrders";

interface IModalAnimeProps {
    isOpen: boolean;
    onClose: () => void;
    fetchedAnime: FetchedAnime;
    index: number;
    updateOnList: (index: number, animeBack: AnimeBackend | null) => void;
    removeFromList: (index: number) => void;
}

interface FormValues {
    startSeason: StartSeason;
    review: string;
    preview: string;
    services: string[];
}

export const ModalAnime = ({
    isOpen,
    onClose,
    fetchedAnime,
    index,
    updateOnList,
    removeFromList,
}: IModalAnimeProps) => {
    const { showSuccess, showError } = useNotifications();
    const { season, year } = useSeasonContext();
    const { animeBackend, animeMal } = fetchedAnime;
    const { orderByAnimeSeason } = useAnimesUtils();

    const [openedModalAddSeason, { open: openModalAddSeason, close: closeModalAddSeason }] =
        useDisclosure(false);
    const [openedModalRemoveSeason, { open: openModalRemoveSeason, close: closeModalRemoveSeason }] =
        useDisclosure(false);

    const [animeBackendToUpdate, setAnimeBackendToUpdate] = useState(animeBackend!);
    const [selectedAnimeSeason, setSelectedAnimeSeason] = useState<AnimeSeason>();
    const [selectedWatchServices, setSelectedWatchServices] = useState(
        animeBackend?.watchServices.map((ws) => ws.id)!,
    );

    const { mutate: update, isPending: isUpdating } = useUpdateAnimeSeason();

    const formTexts = useForm({
        mode: "uncontrolled",
        initialValues: {
            review: "",
            preview: "",
        },
    });

    useEffect(() => {
        const selectedAnimeSeason = animeBackend?.animeSeasons.find(
            (as) => as.season.season === season && as.season.year === year,
        );
        if (selectedAnimeSeason) {
            setSelectedAnimeSeason(selectedAnimeSeason);
        }
    }, []);

    useEffect(() => {
        if (animeBackend) {
            // Atualiza o estado com as informações do animeBackend, provavelmente depois de adicionar uma nova temporada,
            // evitando que se percam informações que nao foram salvas
            setAnimeBackendToUpdate((prev) => ({
                ...prev,
                animeSeasons: animeBackend.animeSeasons.map((as) => {
                    // Tenta encontrar um animeSeason correspondente em prev
                    const foundInPrev = prev.animeSeasons.find(
                        (prevSeason) =>
                            prevSeason.season.season === as.season.season &&
                            prevSeason.season.year === as.season.year,
                    );

                    // Se encontrado, retorna o de prev, caso contrário, retorna 'as'
                    return foundInPrev ? foundInPrev : as;
                }),
            }));

            const stillExistsSelected = animeBackend.animeSeasons.some(
                (as) =>
                    as.season.season === selectedAnimeSeason?.season.season &&
                    as.season.year === selectedAnimeSeason?.season.year,
            );
            if (!stillExistsSelected) {
                setSelectedAnimeSeason(animeBackend.animeSeasons[0]);
            }
        }
    }, [animeBackend]);

    const getUpdatedAnimeSeason = (): AnimeSeason | undefined => {
        if (selectedAnimeSeason) {
            return {
                ...selectedAnimeSeason,
                previewText: formTexts.getValues().preview,
                reviewText: formTexts.getValues().review,
            };
        }
    };

    const updateAnimeSeasons = (animeSeasons: AnimeSeason[], updatedAnimeSeason: AnimeSeason | undefined) => {
        return animeSeasons.map((as) =>
            (
                as.season.season === updatedAnimeSeason?.season.season &&
                as.season.year === updatedAnimeSeason?.season.year
            ) ?
                updatedAnimeSeason!
            :   as,
        );
    };

    const handleSelectAnimeSeason = (animeSeason: AnimeSeason) => {
        const updatedAnimeSeason = getUpdatedAnimeSeason();

        setAnimeBackendToUpdate((prev) => ({
            ...prev,
            animeSeasons: updateAnimeSeasons(prev.animeSeasons, updatedAnimeSeason),
        }));

        setSelectedAnimeSeason(animeSeason);
    };

    useEffect(() => {
        formTexts.setValues({
            preview: selectedAnimeSeason?.previewText,
            review: selectedAnimeSeason?.reviewText,
        });
    }, [selectedAnimeSeason]);

    const handleUpdateAnimeSeason = () => {
        //Precisa ser feito, para evitar que os textos sejam atualizados memso sem trocar a temporada selecionada
        const updatedAnimeSeason = getUpdatedAnimeSeason();
        const animeSeasonUpdate: AnimeSeasonUpdateDTO = {
            animeBackId: animeBackend!.id,
            services: selectedWatchServices,
            animeSeasons: updateAnimeSeasons(animeBackendToUpdate.animeSeasons, updatedAnimeSeason),
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
                                            {orderByAnimeSeason(animeBackendToUpdate.animeSeasons).map(
                                                (s) => (
                                                    <BadgeSeason
                                                        key={s.season.season + s.season.year}
                                                        startSeason={s.season}
                                                        onClick={() => handleSelectAnimeSeason(s)}
                                                        variant={
                                                            (
                                                                selectedAnimeSeason?.season.season ===
                                                                    s.season.season &&
                                                                selectedAnimeSeason?.season.year ===
                                                                    s.season.year
                                                            ) ?
                                                                "filled"
                                                            :   "outline"
                                                        }
                                                    />
                                                ),
                                            )}
                                        </Group>
                                    )}
                                    <TextareaWithCounter
                                        maxCounter={900}
                                        label="Preview"
                                        key={formTexts.key("preview")}
                                        {...formTexts.getInputProps("preview")}
                                        rows={3}
                                    />
                                    <TextareaWithCounter
                                        maxCounter={900}
                                        label="Review"
                                        key={formTexts.key("review")}
                                        {...formTexts.getInputProps("review")}
                                        rows={3}
                                    />
                                    <Divider my={5} />
                                    <SelectWatchServices
                                        selectedWatchServices={selectedWatchServices}
                                        setSelectedWatchServices={setSelectedWatchServices}
                                    />
                                    <Group mt="auto" gap="xs" grow preventGrowOverflow={false}>
                                        <Menu position={"top"}>
                                            <Menu.Target>
                                                <ActionIcon color={"violet.8"} h={"100%"} maw={50}>
                                                    <FaGear />
                                                </ActionIcon>
                                            </Menu.Target>
                                            <Menu.Dropdown>
                                                <Menu.Item onClick={openModalRemoveSeason}>
                                                    Excluir Temporada
                                                </Menu.Item>
                                                <Menu.Item onClick={openModalAddSeason}>
                                                    Adicionar Temporada
                                                </Menu.Item>
                                            </Menu.Dropdown>
                                        </Menu>
                                        <Button
                                            variant="filled"
                                            mt="auto"
                                            onClick={handleUpdateAnimeSeason}
                                            loading={isUpdating}
                                        >
                                            Salvar Alterações
                                        </Button>
                                    </Group>
                                </>
                            )}
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Modal>
            <ModalAddSeason
                opened={openedModalAddSeason}
                onClose={closeModalAddSeason}
                anime={animeMal}
                updateOnList={updateOnList}
                index={index}
            />
            <ModalRemoveSeason
                opened={openedModalRemoveSeason}
                onClose={closeModalRemoveSeason}
                fetchedAnime={fetchedAnime}
                updateOnList={updateOnList}
                index={index}
                afterDeleteOptions={{
                    removeFromList: removeFromList,
                    onCompleteDeletion: onClose,
                }}
            />
        </>
    );
};
