import {Template} from "../../shared/components/Template.tsx";
import {Center, Container, Loader, SimpleGrid} from "@mantine/core";
import {AnimeSeasons, getCurrentSeason} from "../../shared/services/AnimesService.ts";
import {useCallback, useEffect, useState} from "react";
import {SearchHeaderAnime} from "./components/SearchHeaderAnime.tsx";
import {useGetAnimeSeasonBySeason} from "../../shared/hooks/backend/useGetAnimeSeasonBySeason.ts";
import {AnimeSeasonItem} from "./components/AnimeSeasonItem.tsx";
import {IAnimeSeason} from "../../shared/interfaces/IAnimeSeason.ts";

export const ScheduleAnimes = () => {
    const currentYear = new Date().getFullYear();
    const currentSeason = getCurrentSeason();

    const [filteredList, setFilteredList ] = useState<IAnimeSeason[]>( []);
    const [searchValue, setSearchValue] = useState("");
    const [year, setYear] = useState<number | ''>(currentYear);
    const [season, setSeason] = useState<AnimeSeasons | null>(currentSeason);

    const {data, isLoading} = useGetAnimeSeasonBySeason(+year, season!)

    const filterList = useCallback((searchValue: string) => {
        if (data) {
            if (searchValue) {
                const fList = data.filter(a => {
                    return a.anime?.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                        a.anime?.alternativeTitles.en.toLowerCase().includes(searchValue.toLowerCase())
                })
                setFilteredList(fList);
            } else {
                setFilteredList(data);
            }
        }
    }, [data])

    useEffect(() => {
        filterList(searchValue);
        // filteredList.sort((a,b) => {
        //     if(a.anime?.title && b.anime?.title){
        //         a.anime?.title.localeCompare(b.anime?.title)
        //     } else {
        //         return 0
        //     }
        // })
    }, [searchValue, data]);

    useEffect(() => {
        setSearchValue("");
    }, [season, year]);

    return(<>
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
                                    <AnimeSeasonItem key={a.id} animeSeason={a}/>
                                )
                            })
                        }
                    </SimpleGrid>
                }
            </Container>
        </Template>
    </>)
}