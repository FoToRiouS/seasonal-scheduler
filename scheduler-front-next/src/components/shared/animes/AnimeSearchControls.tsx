import { Group, NumberInput, Select, TextInput } from "@mantine/core";
import dayjs from "dayjs";
import { useSeasonContext } from "@/components/shared/animes/provider/useSeasonContext";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { useEffect, useState } from "react";

interface Props {
    rawAnimesList: FetchedAnime[];
    setControlledAnimeList: (animes: FetchedAnime[]) => void;
}

export const AnimeSearchControls = ({ rawAnimesList, setControlledAnimeList }: Props) => {
    const { year, season, setYear, setSeason } = useSeasonContext();

    const [search, setSearch] = useState("");
    useEffect(() => {
        setControlledAnimeList(
            rawAnimesList.filter((a) => a.animeMal.title.toLowerCase().includes(search.toLowerCase())),
        );
    }, [search]);

    return (
        <Group grow preventGrowOverflow={false}>
            <TextInput
                placeholder="Comece a digitar para filtrar pelo título"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <Select
                value={season}
                onChange={(e) => setSeason(e)}
                data={[
                    { value: "winter", label: "Inverno" },
                    { value: "spring", label: "Primavera" },
                    { value: "summer", label: "Verão" },
                    { value: "fall", label: "Outono" },
                ]}
                maw={150}
            />
            <NumberInput
                value={year}
                onChange={(year) => setYear(+year)}
                min={1900}
                max={dayjs().year() + 1}
                maw={100}
            />
        </Group>
    );
};
