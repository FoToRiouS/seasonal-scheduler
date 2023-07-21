import {Template} from "../../shared/components/Template.tsx";
import {Button, Center, Container, Loader, SimpleGrid} from "@mantine/core";
import {AnimeSeasons, getCurrentSeason} from "../../shared/services/AnimesService.ts";
import {useCallback, useEffect, useState} from "react";
import {SearchHeaderAnime} from "./components/SearchHeaderAnime.tsx";
import {useGetAnimeSeasonBySeason} from "../../shared/hooks/backend/useGetAnimeSeasonBySeason.ts";
import {useAnimesBySeason} from "../../shared/hooks/myanimelist/useAnimesBySeason.ts";
import {IAnime} from "../../shared/interfaces/IAnime.ts";
import {AnimeItem} from "./components/AnimeItem.tsx";
import {SeasonContextProvider} from "../../shared/contexts/SeasonContextProvider.tsx";
import {useSendListTelegram} from "../../shared/hooks/telegram/useSendListTelegram.ts";

export const ScheduleAnimes = () => {
    const currentYear = new Date().getFullYear();
    const currentSeason = getCurrentSeason();

    const [filteredList, setFilteredList ] = useState<IAnime[] | undefined>( []);
    const [searchValue, setSearchValue] = useState("");
    const [year, setYear] = useState<number | ''>(currentYear);
    const [season, setSeason] = useState<AnimeSeasons | null>(currentSeason);
    const [orderStrategy, setOrderStrategy] = useState<"rating" | "name">("rating")

    const {data} = useGetAnimeSeasonBySeason(+year, season!)
    const {data: animes, isLoading} = useAnimesBySeason(+year, season!)
    const sendList = useSendListTelegram();

    const orderByRating = (a: IAnime, b: IAnime) => {
        const ratingA = a.mean ? a.mean : 0;
        const ratingB = b.mean ? b.mean : 0;
        if(ratingA === ratingB) return 0
        else if(ratingB > ratingA) return 1
        return -1;
    }

    const orderByName = (a: IAnime, b: IAnime) => {
        return a.title.localeCompare(b.title);
    }

    const filterAndOrderList = useCallback((searchValue: string, orderStrategy: (a: IAnime, b: IAnime) => number) => {
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
                filtered = [...filtered].sort(orderStrategy)
            }
            setFilteredList(filtered);
        }
    }, [data, animes])

    useEffect(() => {
        const strategy = orderStrategy === "rating" ? orderByRating : orderByName;
        filterAndOrderList(searchValue, strategy);
    }, [searchValue, orderStrategy, animes, data]);

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
                                        currentYear={currentYear}
                                        orderStrategy={orderStrategy}
                                        setOrderStrategy={setOrderStrategy}/>

                    {
                        isLoading &&
                        <Center>
                            <Loader size="xl" color="grape.9"/>
                        </Center>
                    }
                    {
                        !isLoading && <>
                        <Button onClick={() => sendList(filteredList)}>Enviar Lista</Button>
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
                        </SimpleGrid> </>
                    }
                </Container>
            </Template>
        </SeasonContextProvider>
    </>)
}