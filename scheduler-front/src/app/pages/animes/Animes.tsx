import {createContext, useCallback, useEffect, useState} from "react";
import {AnimeSeasons, getCurrentSeason} from "../../shared/services/AnimesService.ts";
import {AnimeItem} from "./components/AnimeItem.tsx";
import {getAnimesBySeason} from "../../shared/hooks/animes/getAnimesBySeason.ts";
import {IAnime, IStartSeason} from "../../shared/interfaces/IAnime.ts";
import {getWatchServiceList} from "../../shared/hooks/backend/getWatchServiceList.ts";
import {Template} from "../../shared/components/Template.tsx";
import {Box, Container, Group, Loader, NumberInput, Select, SimpleGrid, Text, TextInput} from "@mantine/core";

export const SeasonContext = createContext<IStartSeason>({} as IStartSeason);

export const Animes = () => {
    const currentYear = new Date().getFullYear();
    const currentSeason = getCurrentSeason();

    const [searchValue, setSearchValue] = useState("");
    const [filteredList, setFilteredList ] = useState<IAnime[]>( []);
    const [year, setYear] = useState<number | ''>(currentYear);
    const [season, setSeason] = useState<AnimeSeasons | null>(currentSeason);

    const { data, isLoading } = getAnimesBySeason(+year, season as AnimeSeasons);
    const result = getWatchServiceList();

    const filterList = useCallback((searchValue: string) => {
        if (data) {
            if (searchValue) {
                const fList = data.filter(a => {
                    return a.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                        a.alternativeTitles.en.toLowerCase().includes(searchValue.toLowerCase())
                })
                setFilteredList(fList);
            } else {
                setFilteredList(data);
            }
        }
    }, [data])

    useEffect(() => {
        filterList(searchValue);
    }, [searchValue, data]);

    useEffect(() => {
        setSearchValue("");
    }, [season, year]);

    return (
        <>
            <SeasonContext.Provider value={{year: +year, season: season as AnimeSeasons}}>
                <Template>
                    <Box>
                    <Container maw={"70%"} mb={16}>
                        <Group>
                            <TextInput placeholder={"Nome..."} value={searchValue} onChange={e => setSearchValue(e.currentTarget.value)} styles={{root: {flexGrow: 1} }}/>
                            <Select maw={200} value={season} onChange={(e) => setSeason(e as AnimeSeasons)} data={[
                                {value: "winter", label: "Inverno"},
                                {value: "spring", label: "Primavera"},
                                {value: "summer", label: "Verão"},
                                {value: "fall", label: "Outono"}
                            ]}/>
                            <NumberInput defaultValue={year} onChange={setYear} min={1900} max={currentYear}/>
                        </Group>
                    </Container>
                    <Group>
                        {
                            result.data?.map((ws) => {
                                return (
                                    <>
                                        <Text>{ws.id}</Text>
                                        <Text>{ws.name}</Text>
                                    </>
                                )
                            })
                        }
                    </Group>
                    <Container maw={"90%"}>
                        {
                            isLoading &&
                            <Loader size="xl"/>
                        }
                        {
                            !isLoading &&
                            <SimpleGrid cols={4} spacing={6}>
                                {
                                    filteredList.map(anime => {
                                        return (
                                            <AnimeItem key={anime.id} anime={anime}/>
                                        )
                                    })
                                }
                            </SimpleGrid>
                        }
                    </Container>
                    </Box>
                </Template>
            </SeasonContext.Provider>
        </>
    )
}
