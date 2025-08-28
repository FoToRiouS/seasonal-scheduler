import React, { useEffect, useState } from "react";
import {
    ActionIcon,
    Box,
    Button,
    Card,
    Center,
    Divider,
    Flex,
    Group,
    Image,
    Modal,
    Stack,
    Tabs,
    Text,
    Title,
} from "@mantine/core";
import { useUpdateAnimeSeason } from "@/queries/AnimeQueries";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { StartSeason } from "@/interfaces/AnimeMAL";
import { FaX } from "react-icons/fa6";
import { RatingAnime } from "@/components/animes/shared/RatingAnime";
import { TextareaWithCounter } from "@/components/shared/TextareaWithCounter";
import { ModalAddSeason } from "@/components/animes/modals/ModalAddSeason";
import { useSeasonContext } from "@/components/animes/provider/useSeasonContext";
import { AnimeSeason } from "@/interfaces/AnimeSeason";
import { AnimeSeasonUpdateDTO } from "@/interfaces/AnimeSeasonUpdateDTO";
import { useNotifications } from "@/hooks/useNotifications";
import { AnimeBackend } from "@/interfaces/AnimeBackend";
import { SelectWatchServices } from "@/components/animes/shared/selectWatchServices/SelectWatchServices";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { ModalRemoveSeason } from "@/components/animes/modals/ModalRemoveSeason";
import { useAnimesUtils } from "@/hooks/useAnimesOrders";
import classes from "./css/ModalAnime.module.css";
import { ModalSendUniqueMessage } from "@/components/animes/modals/ModalSendUniqueMessage";
import { getDayOfExhibition, getSeasonInPortuguese } from "@/utils/MyAnimeListUtils";

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
    const [openedModalSendMessage, { open: openModalSendMessage, close: closeModalSendMessage }] =
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
                size={1000}
                radius="lg"
                closeOnClickOutside={false}
                classNames={{
                    body: classes.modalBody,
                }}
            >
                <Box pos="absolute" right={20} top={10} style={{ zIndex: 99 }}>
                    <ActionIcon
                        variant="gradient"
                        gradient={{ from: "violet", to: "grape" }}
                        radius="xl"
                        onClick={onClose}
                    >
                        <FaX />
                    </ActionIcon>
                </Box>

                <Flex h={600}>
                    <Box pos="relative">
                        <Center maw={500} style={{ overflow: "hidden" }}>
                            <Image src={animeMal.main_picture.large} h={"100%"} w={"auto"} radius="md" />
                        </Center>

                        {animeMal.mean && (
                            <Box pos="absolute" bottom={15} right={15}>
                                <RatingAnime rating={animeMal.mean} />
                            </Box>
                        )}
                    </Box>
                    <Stack>
                        <Stack
                            gap="xs"
                            style={{ overflowY: "auto", flexGrow: 1 }}
                            mih={0}
                            px={"md"}
                            pt={"xs"}
                        >
                            <Stack gap={0} pr="xl">
                                {animeMal.alternative_titles.en ?
                                    <>
                                        <Title order={4} c={"gray.9"}>
                                            {animeMal.alternative_titles.en}
                                        </Title>
                                        <Text c={"gray.6"} fw={400}>
                                            {animeMal.title}
                                        </Text>
                                    </>
                                :   <Title order={3} c={"gray.9"}>
                                        {animeMal.title}
                                    </Title>
                                }
                            </Stack>

                            <Card bg="gray.1" radius="md">
                                <Stack gap={0}>
                                    <Text fz={"xs"} c={"gray.6"} fw={500}>
                                        Dia da Exibição
                                    </Text>
                                    {animeMal.broadcast ?
                                        <Text tt={"capitalize"} c={"gray.9"} fw={500}>
                                            {getDayOfExhibition(
                                                animeMal.broadcast.day_of_the_week,
                                                animeMal.broadcast.start_time,
                                            )}
                                        </Text>
                                    :   <Text c={"red.8"}>Não Informado</Text>}
                                </Stack>
                                <Stack gap={5} mt={"sm"}>
                                    <Text fz={"xs"} c={"gray.6"} fw={500}>
                                        Onde Assistir
                                    </Text>
                                    <SelectWatchServices
                                        selectedWatchServices={selectedWatchServices}
                                        setSelectedWatchServices={setSelectedWatchServices}
                                    />
                                </Stack>
                            </Card>

                            {animeBackendToUpdate && (
                                <>
                                    {animeBackendToUpdate.animeSeasons && (
                                        <Tabs
                                            color={"violet.9"}
                                            classNames={{
                                                tab: classes.tabsTab,
                                                tabLabel: classes.tabsTabLabel,
                                            }}
                                            value={
                                                (selectedAnimeSeason?.season.season ?? "") +
                                                selectedAnimeSeason?.season.year.toString()
                                            }
                                        >
                                            <Tabs.List>
                                                {orderByAnimeSeason(animeBackendToUpdate.animeSeasons).map(
                                                    (s) => (
                                                        <Tabs.Tab
                                                            key={s.season.season + s.season.year}
                                                            onClick={() => handleSelectAnimeSeason(s)}
                                                            value={s.season.season + s.season.year}
                                                        >
                                                            {getSeasonInPortuguese(s.season.season) +
                                                                "/" +
                                                                s.season.year}
                                                        </Tabs.Tab>
                                                    ),
                                                )}
                                                <Center ml="auto">
                                                    <Button
                                                        variant={"transparent"}
                                                        onClick={openModalAddSeason}
                                                    >
                                                        + Adiconar
                                                    </Button>
                                                </Center>
                                            </Tabs.List>
                                        </Tabs>
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
                                </>
                            )}
                        </Stack>
                        <Stack gap={0} style={{ background: "#F3F4F6" }} h={55}>
                            <Divider />
                            <Group
                                grow
                                preventGrowOverflow={false}
                                p={"sm"}
                                wrap={"nowrap"}
                                align={"center"}
                                h={"100%"}
                            >
                                <Button
                                    variant={"subtle"}
                                    color={"red"}
                                    size={"xs"}
                                    onClick={openModalRemoveSeason}
                                >
                                    Remover Temporada
                                </Button>
                                <Button
                                    variant={"subtle"}
                                    color={"dark"}
                                    size={"xs"}
                                    disabled={
                                        !(selectedAnimeSeason?.previewText || selectedAnimeSeason?.reviewText)
                                    }
                                    onClick={openModalSendMessage}
                                >
                                    Enviar ao Telegram
                                </Button>
                                <Button
                                    variant="filled"
                                    size={"xs"}
                                    onClick={handleUpdateAnimeSeason}
                                    loading={isUpdating}
                                >
                                    Salvar Alterações
                                </Button>
                            </Group>
                        </Stack>
                    </Stack>
                </Flex>
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
            <ModalSendUniqueMessage
                opened={openedModalSendMessage}
                onClose={closeModalSendMessage}
                fetchedAnime={fetchedAnime}
            />
        </>
    );
};
