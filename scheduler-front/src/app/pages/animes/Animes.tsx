import {createContext, useCallback, useEffect, useState} from "react";
import {AnimeSeasons, getCurrentSeason} from "../../shared/services/api/animes/AnimesService.ts";
import {
    Container,
    Heading,
    HStack,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    SimpleGrid,
    Spinner,
    Stack,
    Text
} from "@chakra-ui/react";
import {AnimeItem} from "./components/AnimeItem.tsx";
import {useAnimesBySeason} from "../../shared/hooks/animes/useAnimesBySeason.ts";
import {IAnime, IStartSeason} from "../../shared/interfaces/IAnime.ts";
import {useWatchServiceList} from "../../shared/hooks/backend/useWatchServiceList.ts";

export const SeasonContext = createContext<IStartSeason>({} as IStartSeason);

export const Animes = () => {
    const currentYear = new Date().getFullYear();
    const currentSeason = getCurrentSeason();

    const [searchValue, setSearchValue] = useState("");
    const [filteredList, setFilteredList ] = useState<IAnime[]>( []);
    const [year, setYear] = useState(currentYear);
    const [season, setSeason] = useState<AnimeSeasons>(currentSeason);

    const { data, isLoading } = useAnimesBySeason(year, season);
    const result = useWatchServiceList();

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
            <SeasonContext.Provider value={{year: year, season: season}}>
                <Container bg="tomato" minW={"full"} mb={16} centerContent>
                    <Heading>Animes da Temporada</Heading>
                </Container>
                <Container maxW={"70%"} mb={16}>
                    <Stack>
                        <HStack w={"full"}>
                            <Select defaultValue={season} onChange={e => setSeason(e.currentTarget.value as AnimeSeasons)}>
                                <option value={"winter"} >Inverno</option>
                                <option value={"spring"}>Primavera</option>
                                <option value={"summer"}>Verão</option>
                                <option value={"fall"}>Outono</option>
                            </Select>
                            <NumberInput defaultValue={year} onChange={(valueAsString) => setYear(+valueAsString)} min={1900} max={currentYear}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </HStack>
                        <Input placeholder={"Nome..."} value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
                    </Stack>
                </Container>
                <HStack>
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
                </HStack>
                <Container maxW={"90%"} centerContent>
                    {
                        isLoading &&
                        <Spinner size={"xl"}/>
                    }
                    {
                        !isLoading &&
                        <SimpleGrid columns={[1, 4]} gap={6}>
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
            </SeasonContext.Provider>
        </>
    )
}
