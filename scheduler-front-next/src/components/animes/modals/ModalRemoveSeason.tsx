import { Button, ComboboxData, Group, Modal, Select, Stack, Text } from "@mantine/core";
import React, { useMemo } from "react";
import { StartSeason } from "@/interfaces/AnimeMAL";
import { AnimeSeasons, getSeasonInPortuguese } from "@/service/MyAnimeListService";
import { useDeleteAnimeSeason } from "@/queries/AnimeQueries";
import { useNotifications } from "@/hooks/useNotifications";
import { AnimeBackend } from "@/interfaces/AnimeBackend";
import { useForm } from "@mantine/form";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { modals } from "@mantine/modals";
import { useSeasonContext } from "@/components/animes/provider/useSeasonContext";
import { z } from "zod/v4";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useAnimesUtils } from "@/hooks/useAnimesOrders";

interface Props {
    opened: boolean;
    onClose: () => void;
    onAfterDelete?: () => void;
    fetchedAnime: FetchedAnime;
    index: number;
    updateOnList: (index: number, animeBack: AnimeBackend | null) => void;
    afterDeleteOptions?: AfterDelete;
}

interface AfterDelete {
    removeFromList: (index: number) => void;
    onAfterDelete?: () => void;
    onCompleteDeletion?: () => void;
}

const schema = z.object({
    animeSeason: z.string().min(1, "Selecione uma temporada"),
});

export const ModalRemoveSeason: React.FC<Props> = ({
    fetchedAnime,
    index,
    updateOnList,
    opened,
    onClose,
    afterDeleteOptions,
}) => {
    const { showSuccess, showError } = useNotifications();
    const { year, season } = useSeasonContext();
    const { animeMal, animeBackend } = fetchedAnime;
    const { orderByAnimeSeason } = useAnimesUtils();

    const animeSeasonsOptions: ComboboxData | undefined = useMemo(
        () =>
            orderByAnimeSeason(animeBackend?.animeSeasons).map((s) => ({
                value: `${s.season.year}#${s.season.season}`,
                label: getSeasonInPortuguese(s.season.season) + "/" + s.season.year,
            })),
        [animeBackend],
    );

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            animeSeason: "",
        },
        validate: zod4Resolver(schema),
    });

    const { mutate: deleteAnimeSeason } = useDeleteAnimeSeason(animeBackend?.id);

    const handleDeleteSeason = (animeSeasonId: string) => {
        const startSeason: StartSeason = {
            season: animeSeasonId.split("#")[1] as AnimeSeasons,
            year: parseInt(animeSeasonId.split("#")[0]),
        };

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
            onConfirm: () =>
                deleteAnimeSeason(startSeason, {
                    onSuccess: (data) => {
                        const needRemove = startSeason.year === year && startSeason.season === season;
                        if (data) {
                            showSuccess(
                                `Anime excluído do calendário ${getSeasonInPortuguese(startSeason.season)}/${startSeason.year}!`,
                            );
                            if (needRemove) {
                                removeAnimeFromList(data);
                            } else {
                                updateOnList(index, data);
                            }
                        } else {
                            removeAnimeFromList(data);
                            if (afterDeleteOptions?.onCompleteDeletion) {
                                afterDeleteOptions.onCompleteDeletion();
                            }
                        }

                        onClose();
                        if (afterDeleteOptions?.onAfterDelete) {
                            afterDeleteOptions.onAfterDelete();
                        }
                    },
                    onError: showError,
                }),
        });
    };

    const removeAnimeFromList = (animeBack: AnimeBackend | null) => {
        if (afterDeleteOptions && afterDeleteOptions.removeFromList) {
            afterDeleteOptions.removeFromList(index);
        } else {
            updateOnList(index, animeBack);
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} size={"xs"} title={"Excluir temporada"}>
            <form onSubmit={form.onSubmit((values) => handleDeleteSeason(values.animeSeason))}>
                <Stack gap="xs">
                    <Select
                        data={animeSeasonsOptions}
                        {...form.getInputProps("animeSeason")}
                        key={form.key("animeSeason")}
                    />
                    <Group grow>
                        <Button onClick={onClose} variant={"outline"}>
                            Cancelar
                        </Button>
                        <Button type={"submit"}>Adicionar</Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};
