import {Template} from "../../shared/components/Template.tsx";
import {Center, Container, Loader, SimpleGrid} from "@mantine/core";
import {AnimeSeasons, getCurrentSeason} from "../../shared/services/AnimesService.ts";
import {useCallback, useEffect, useState} from "react";
import {SearchHeaderAnime} from "./components/SearchHeaderAnime.tsx";
import {useGetAnimeSeasonBySeason} from "../../shared/hooks/backend/useGetAnimeSeasonBySeason.ts";
import {useAnimesBySeason} from "../../shared/hooks/myanimelist/useAnimesBySeason.ts";
import {IAnime} from "../../shared/interfaces/IAnime.ts";
import {AnimeItem} from "./components/AnimeItem.tsx";
import {SeasonContextProvider} from "../../shared/contexts/SeasonContextProvider.tsx";

export const ScheduleAnimes = () => {
    const currentYear = new Date().getFullYear();
    const currentSeason = getCurrentSeason();

    const [filteredList, setFilteredList ] = useState<IAnime[] | undefined>( []);
    const [searchValue, setSearchValue] = useState("");
    const [year, setYear] = useState<number | ''>(currentYear);
    const [season, setSeason] = useState<AnimeSeasons | null>(currentSeason);

    const {data} = useGetAnimeSeasonBySeason(+year, season!)
    const {data: animes, isLoading} = useAnimesBySeason(+year, season!)

    const filterAndOrderList = useCallback((searchValue: string) => {
        if (data) {
            let filtered = animes?.filter(a => {
                return data.includes(a.id)
            })
            if (searchValue) {
                filtered =  filtered?.filter(a => {
                    return a.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                        a.alternativeTitles.en.toLowerCase().includes(searchValue.toLowerCase())
                })
            }

            if(filtered){
                filtered = [...filtered].sort((a,b) => {
                    return b.mean - a.mean;
                })
            }

            setFilteredList(filtered);
        }
    }, [data, animes])

    useEffect(() => {
        filterAndOrderList(searchValue);
    }, [searchValue, animes, data]);

    useEffect(() => {
        setSearchValue("");
    }, [season, year]);

    return(<>
        <SeasonContextProvider year={+year} season={season as AnimeSeasons} >
            <Template>
                <Container maw={{xs: "100%", lg: "80%"}} mb={16}>
                    <SearchHeaderAnime  searchValue={searchValue}
                                        setSearchValue={setSearchValue}
                                        season={season}
                                        setSeason={setSeason}
                                        year={year}
                                        setYear={setYear}
                                        currentYear={currentYear} />
                    {
                        isLoading &&
                        <Center>
                            <Loader size="xl" color="grape.9"/>
                        </Center>
                    }
                    {
                        !isLoading &&
                        <SimpleGrid
                            breakpoints={[
                                {minWidth: "lg", cols: 4}
                            ]}
                            spacing="xl">
                            {
                                filteredList?.map(a => {
                                    return (
                                        <AnimeItem key={a.id} anime={a}/>
                                    )
                                })
                            }
                        </SimpleGrid>
                    }
                </Container>
            </Template>
        </SeasonContextProvider>
    </>)
}