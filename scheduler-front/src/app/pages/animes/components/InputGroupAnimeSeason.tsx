import {Button, Group, NumberInput, Select} from "@mantine/core";
import {AnimeSeasons} from "../../../shared/services/AnimesService.ts";
import React, {useState} from "react";
import {useSaveAnimeSeason} from "../../../shared/hooks/backend/useSaveAnimeSeason.ts";
import {IAnime} from "../../../shared/interfaces/IAnime.ts";
import {IAnimeSeasonSaveDTO} from "../../../shared/interfaces/IAnimeSeasonSaveDTO.ts";

interface InputGroupAnimeSeasonProps {
    anime: IAnime,
    initialYear: number,
    initialSeason: AnimeSeasons
}

export const InputGroupAnimeSeason: React.FC<InputGroupAnimeSeasonProps> = ({anime, initialSeason, initialYear}) => {
    const currentYear = new Date().getFullYear();

    const [year, setYear] = useState<number | ''>(initialYear);
    const [season, setSeason] = useState<AnimeSeasons | null>(initialSeason);

    const {mutate: save, isLoading: isSaving } = useSaveAnimeSeason(anime!.id, +year, season!);

    const handleSaveAnimeSeason = () => {
        const animeSeason: IAnimeSeasonSaveDTO = {
            idAnime: anime!.id.toString(),
            year: +year,
            season: season!
        }
        save(animeSeason);
    }

    return (<>
        <Group grow noWrap>
            <Select value={season} onChange={(e) => setSeason(e as AnimeSeasons)} data={[
                {value: "winter", label: "Inverno"},
                {value: "spring", label: "Primavera"},
                {value: "summer", label: "Verão"},
                {value: "fall", label: "Outono"}
            ]}/>
            <NumberInput defaultValue={year} onChange={setYear} min={1900} max={currentYear}/>
            <Button color="grape.8" onClick={handleSaveAnimeSeason} loading={isSaving}>
                {isSaving ? "Adicionando..." : "Adicionar"}
            </Button>
        </Group>
    </>)
}