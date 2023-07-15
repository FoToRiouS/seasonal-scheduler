import {Grid, NumberInput, Select, TextInput} from "@mantine/core";
import {AnimeSeasons} from "../../../shared/services/AnimesService.ts";
import React from "react";

interface SearchHeaderAnimeProps {
    searchValue: string,
    setSearchValue: (searchValue: string) => void,
    season: AnimeSeasons | null,
    setSeason: (season: AnimeSeasons) => void,
    year: number | "",
    setYear: (year: number) => void,
    currentYear: number
}

export const SearchHeaderAnime: React.FC<SearchHeaderAnimeProps> = ({searchValue, setSearchValue, season, setSeason, year, setYear, currentYear}) => {
    return(<>
        <Grid gutter="xs" mb={40}>
            <Grid.Col span={8}>
                <TextInput placeholder={"Nome..."} value={searchValue} onChange={e => setSearchValue(e.currentTarget.value)} styles={{root: {flexGrow: 1} }}/>
            </Grid.Col>
            <Grid.Col span={2}>
                <Select value={season} onChange={(e) => setSeason(e as AnimeSeasons)} data={[
                    {value: "winter", label: "Inverno"},
                    {value: "spring", label: "Primavera"},
                    {value: "summer", label: "Verão"},
                    {value: "fall", label: "Outono"}
                ]}/>
            </Grid.Col>
            <Grid.Col span={2}>
                <NumberInput defaultValue={year} onChange={setYear} min={1900} max={currentYear}/>
            </Grid.Col>
        </Grid>
    </>)
}