import {Template} from "../../shared/components/Template.tsx";
import {Button, Center, Container, Loader, SimpleGrid} from "@mantine/core";
import {AnimeSeasons, getCurrentSeason} from "../../shared/services/AnimesService.ts";
import {useCallback, useEffect, useState} from "react";
import {SearchHeaderAnime} from "./components/SearchHeaderAnime.tsx";
import {useGetAnimeSeasonBySeason} from "../../shared/hooks/backend/useGetAnimeSeasonBySeason.ts";
import {SeasonContextProvider} from "../../shared/contexts/SeasonContextProvider.tsx";
import {IAnimeSeason} from "../../shared/interfaces/IAnimeSeason.ts";
import {FetchedAnimeItem} from "./components/FetchedAnimeItem.tsx";
import {useAnimesSeasonUtils} from "../../shared/hooks/utils/useAnimesSeasonUtils.ts";
import {useDisclosure} from "@mantine/hooks";
import {ModalSendMessages} from "./components/ModalSendMessages.tsx";

export const ScheduleAnimes = () => {
    const currentYear = new Date().getFullYear();
    const currentSeason = getCurrentSeason();
    const [opened, { open, close }] = useDisclosure(false);

    const [filteredList, setFilteredList ] = useState<IAnimeSeason[] | undefined>( []);
    const [searchValue, setSearchValue] = useState("");
    const [year, setYear] = useState<number | ''>(currentYear);
    const [season, setSeason] = useState<AnimeSeasons | null>(currentSeason);
    const [orderStrategy, setOrderStrategy] = useState<"rating" | "name">("rating")
    const {orderByRating, orderByName} = useAnimesSeasonUtils();

    const {data, isLoading} = useGetAnimeSeasonBySeason(+year, season!)
    // const sendList = useSendListTelegram();

    const filterAndOrderList = useCallback((searchValue: string, orderStrategy: "rating" | "name") => {
        if (data) {
            let filtered = data;
            if (searchValue) {
                filtered =  filtered?.filter(a => {
                    return a.anime?.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                        a.anime?.alternativeTitles.en.toLowerCase().includes(searchValue.toLowerCase())
                })
            }

            if(filtered){
                filtered = orderStrategy === "rating" ? orderByRating(filtered, "desc") : orderByName(filtered);
            }
            setFilteredList(filtered);
        }
    }, [data])

    useEffect(() => {
        const strategy = orderStrategy === "rating" ? "rating" : "name";
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
                        {
                            data && <>
                            <Button size="lg" w="100%" mb="md" uppercase variant="gradient" gradient={{ from: 'red.9', to: 'grape.9' }} onClick={open}>Enviar Lista</Button>
                            <ModalSendMessages opened={opened} onClose={close} animesSeason={data}/></>
                        }

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
                        </SimpleGrid>
                        </>
                    }
                </Container>
            </Template>
        </SeasonContextProvider>
    </>)
}