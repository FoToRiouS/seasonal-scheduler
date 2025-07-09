import { Button, Group, NumberInput, Select } from "@mantine/core";
import React, { useState } from "react";
import { AnimeMAL } from "@/interfaces/AnimeMAL";
import { AnimeSeasons } from "@/service/MyAnimeListService";
import { useSaveAnimeSeason } from "@/queries/AnimeQueries";
import { AnimeSeasonSaveDTO } from "@/interfaces/AnimeSeasonSaveDTO";
import { useUserSession } from "@/hooks/useUserSession";

interface InputGroupAnimeSeasonProps {
    anime: AnimeMAL;
    initialYear: number;
    initialSeason: AnimeSeasons;
}

export const InputGroupAnimeSeason: React.FC<InputGroupAnimeSeasonProps> = ({
    anime,
    initialSeason,
    initialYear,
}) => {
    const { session } = useUserSession();
    const currentYear = new Date().getFullYear();

    const [year, setYear] = useState<number | string>(initialYear);
    const [season, setSeason] = useState<AnimeSeasons | null>(initialSeason);

    const { mutate: save, isPending: isSaving } = useSaveAnimeSeason();

    const handleSaveAnimeSeason = () => {
        const animeSeason: AnimeSeasonSaveDTO = {
            userId: session!.userId,
            idAnime: anime!.id.toString(),
            year: +year,
            season: season!,
        };
        save(animeSeason);
    };

    return (
        <>
            <Group gap="xs" wrap={"nowrap"}>
                <Select
                    value={season}
                    onChange={(e) => setSeason(e as AnimeSeasons)}
                    w={280}
                    data={[
                        { value: "winter", label: "Inverno" },
                        { value: "spring", label: "Primavera" },
                        { value: "summer", label: "Verão" },
                        { value: "fall", label: "Outono" },
                    ]}
                />
                <NumberInput
                    defaultValue={year}
                    onChange={(e) => setYear(e)}
                    min={1900}
                    max={currentYear + 1}
                />
                <Button color="grape.8" onClick={handleSaveAnimeSeason} loading={isSaving}>
                    {isSaving ? "Adicionando..." : "Adicionar ao Calendário"}
                </Button>
            </Group>
        </>
    );
};
