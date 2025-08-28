import { Button, Group, Modal, NumberInput, Select, Stack } from "@mantine/core";
import React from "react";
import { AnimeMAL, SeasonMAL } from "@/interfaces/AnimeMAL";
import { useSaveAnimeSeason } from "@/queries/AnimeQueries";
import { AnimeSeasonSaveDTO } from "@/interfaces/AnimeSeasonSaveDTO";
import { useUserSession } from "@/hooks/useUserSession";
import { useNotifications } from "@/hooks/useNotifications";
import { AnimeBackend } from "@/interfaces/AnimeBackend";
import { useForm } from "@mantine/form";
import { z } from "zod/v4";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useSeasonContext } from "@/components/animes/provider/useSeasonContext";
import { getSeasonInPortuguese } from "@/utils/MyAnimeListUtils";

interface Props {
    opened: boolean;
    onClose: () => void;
    anime: AnimeMAL;
    index: number;
    updateOnList: (index: number, animeBack: AnimeBackend | null) => void;
    onSuccess?: () => void;
}

const schema = z.object({
    year: z.number().min(1900, "Obrigatório"),
    season: z.string().min(1, "Obrigatório"),
});

export const ModalAddSeason: React.FC<Props> = ({
    anime,
    index,
    updateOnList,
    opened,
    onClose,
    onSuccess,
}) => {
    const { showSuccess, showError } = useNotifications();
    const { year, season } = useSeasonContext();
    const { session } = useUserSession();
    const currentYear = new Date().getFullYear();

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            year: year,
            season: season,
        },
        validate: zod4Resolver(schema),
    });

    const { mutate: save, isPending: isSaving } = useSaveAnimeSeason();

    const handleSaveAnimeSeason = (year: number, season: SeasonMAL) => {
        const animeSeason: AnimeSeasonSaveDTO = {
            userId: session!.userId,
            idAnime: anime!.id.toString(),
            year: +year,
            season: season!,
        };
        save(animeSeason, {
            onSuccess: (data) => {
                showSuccess(`Anime adicionado a temporada ${getSeasonInPortuguese(season!)}/${year}!`);
                onClose();
                updateOnList(index, data);
                if (onSuccess) {
                    onSuccess();
                }
            },
            onError: showError,
        });
    };

    return (
        <Modal opened={opened} onClose={onClose} size={"xs"} title={"Adicionar temporada"}>
            <form onSubmit={form.onSubmit((values) => handleSaveAnimeSeason(values.year, values.season))}>
                <Stack gap="xs">
                    <Group gap={5} wrap={"nowrap"}>
                        <Select
                            {...form.getInputProps("season")}
                            key={form.key("season")}
                            data={[
                                { value: "winter", label: "Inverno" },
                                { value: "spring", label: "Primavera" },
                                { value: "summer", label: "Verão" },
                                { value: "fall", label: "Outono" },
                            ]}
                        />
                        <NumberInput
                            {...form.getInputProps("year")}
                            key={form.key("year")}
                            w={100}
                            min={1900}
                            max={currentYear + 1}
                        />
                    </Group>
                    <Group grow>
                        <Button loading={isSaving} onClick={onClose} variant={"outline"}>
                            Cancelar
                        </Button>
                        <Button loading={isSaving} type={"submit"}>
                            Adicionar
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};
