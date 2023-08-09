import {Template} from "../../shared/components/Template.tsx";
import {Center, Container, Loader, SimpleGrid} from "@mantine/core";
import {AnimeSeasons, getCurrentSeason} from "../../shared/services/AnimesService.ts";
import {useCallback, useEffect, useState} from "react";
import {SearchHeaderAnime} from "./components/SearchHeaderAnime.tsx";
import {useGetAnimeSeasonBySeason} from "../../shared/hooks/backend/useGetAnimeSeasonBySeason.ts";
import {SeasonContextProvider} from "../../shared/contexts/SeasonContextProvider.tsx";
import {IAnimeSeason} from "../../shared/interfaces/IAnimeSeason.ts";
import {FetchedAnimeItem} from "./components/FetchedAnimeItem.tsx";

export const ScheduleAnimes = () => {
    const currentYear = new Date().getFullYear();
    const currentSeason = getCurrentSeason();

    const [filteredList, setFilteredList ] = useState<IAnimeSeason[] | undefined>( []);
    const [searchValue, setSearchValue] = useState("");
    const [year, setYear] = useState<number | ''>(currentYear);
    const [season, setSeason] = useState<AnimeSeasons | null>(currentSeason);
    const [orderStrategy, setOrderStrategy] = useState<"rating" | "name">("rating")

    const {data, isLoading} = useGetAnimeSeasonBySeason(+year, season!)
    // const sendList = useSendListTelegram();

    const orderByRating = (a: IAnimeSeason, b: IAnimeSeason) => {
        const ratingA = a.anime!.mean ? a.anime!.mean : 0;
        const ratingB = b.anime!.mean ? b.anime!.mean : 0;
        if(ratingA === ratingB) return 0
        else if(ratingB > ratingA) return 1
        return -1;
    }

    const orderByName = (a: IAnimeSeason, b: IAnimeSeason) => {
        return a.anime!.title.localeCompare(b.anime!.title);
    }

    const filterAndOrderList = useCallback((searchValue: string, orderStrategy: (a: IAnimeSeason, b: IAnimeSeason) => number) => {
        if (data) {
            let filtered = data;
            if (searchValue) {
                filtered =  filtered?.filter(a => {
                    return a.anime?.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                        a.anime?.alternativeTitles.en.toLowerCase().includes(searchValue.toLowerCase())
                })
            }

            if(filtered){
                filtered = [...filtered].sort(orderStrategy)
            }
            setFilteredList(filtered);
        }
    }, [data])

    useEffect(() => {
        const strategy = orderStrategy === "rating" ? orderByRating : orderByName;
        filterAndOrderList(searchValue, strategy);
    }, [searchValue, orderStrategy, data]);

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
                        {/*{*/}
                        {/*    data &&*/}
                        {/*    <Button onClick={() => sendList(data, filteredList!)}>Enviar Lista</Button>*/}
                        {/*}*/}

                        <SimpleGrid
                            breakpoints={[
                                {minWidth: "lg", cols: 4}
                            ]}
                            spacing="xl">
                            {
                                filteredList?.map(a => {
                                    return (
                                        <FetchedAnimeItem key={a.id} animeSeason={a} anime={a.anime!}/>
                                    )
                                })
                            }
                        </SimpleGrid> </>
                    }
                </Container>
            </Template>w
        </SeasonContextProvider>
    </>)
}