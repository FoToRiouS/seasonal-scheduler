import { Button, Group, NumberInput, Popover, Select, Stack } from "@mantine/core";
import React from "react";
import { AnimeMAL } from "@/interfaces/AnimeMAL";
import { AnimeSeasons, getSeasonInPortuguese } from "@/service/MyAnimeListService";
import { useSaveAnimeSeason } from "@/queries/AnimeQueries";
import { AnimeSeasonSaveDTO } from "@/interfaces/AnimeSeasonSaveDTO";
import { useUserSession } from "@/hooks/useUserSession";
import { useNotifications } from "@/hooks/useNotifications";
import { AnimeBackend } from "@/interfaces/AnimeBackend";
import { useForm } from "@mantine/form";

interface InputGroupAnimeSeasonProps {
    anime: AnimeMAL;
    initialYear: number;
    initialSeason: AnimeSeasons;
    index: number;
    updateOnList: (index: number, animeBack: AnimeBackend | null) => void;
}

export const InputGroupAnimeSeason: React.FC<InputGroupAnimeSeasonProps> = ({
    anime,
    initialSeason,
    initialYear,
    index,
    updateOnList,
}) => {
    const { showSuccess, showError } = useNotifications();
    const { session } = useUserSession();
    const currentYear = new Date().getFullYear();

    const form = useForm({
        initialValues: {
            year: initialYear,
            season: initialSeason,
        },
    });

    const { mutate: save, isPending: isSaving } = useSaveAnimeSeason();

    const handleSaveAnimeSeason = (year: number, season: AnimeSeasons) => {
        const animeSeason: AnimeSeasonSaveDTO = {
            userId: session!.userId,
            idAnime: anime!.id.toString(),
            year: +year,
            season: season!,
        };
        save(animeSeason, {
            onSuccess: (data) => {
                showSuccess(`Anime adicionado a temporada ${getSeasonInPortuguese(season!)}/${year}!`);
                updateOnList(index, data);
            },
            onError: showError,
        });
    };

    return (
        <Popover width={250} trapFocus position="left" withArrow shadow="md">
            <Popover.Target>
                <Button maw={180}>Adicionar temporada</Button>
            </Popover.Target>
            <Popover.Dropdown>
                <form onSubmit={form.onSubmit((values) => handleSaveAnimeSeason(values.year, values.season))}>
                    <Stack gap="xs">
                        <Group wrap={"nowrap"} gap={5}>
                            <Select
                                {...form.getInputProps("season")}
                                key={form.key("season")}
                                size={"xs"}
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
                                size={"xs"}
                                min={1900}
                                max={currentYear + 1}
                            />
                        </Group>
                        <Button loading={isSaving} type={"submit"} size={"xs"}>
                            Adicionar
                        </Button>
                    </Stack>
                </form>
            </Popover.Dropdown>
        </Popover>
    );
};
