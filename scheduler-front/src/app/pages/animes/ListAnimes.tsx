import { useCallback, useEffect, useState } from "react";
import { AnimeSeasons, getCurrentSeason } from "../../shared/services/AnimesService.ts";
import { AnimeItem } from "./components/AnimeItem.tsx";
import { useAnimesBySeason } from "../../shared/hooks/myanimelist/useAnimesBySeason.ts";
import { IAnime } from "../../shared/interfaces/IAnime.ts";
import { Template } from "../../shared/components/Template.tsx";
import { Box, Center, Container, Loader, SimpleGrid } from "@mantine/core";
import { SearchHeaderAnime } from "./components/SearchHeaderAnime.tsx";
import { SeasonContextProvider } from "../../shared/contexts/SeasonContextProvider.tsx";
import { useAnimesUtils } from "../../shared/hooks/utils/useAnimesUtils.ts";

export const ListAnimes = () => {
    const currentYear = new Date().getFullYear();
    const currentSeason = getCurrentSeason();

    const [searchValue, setSearchValue] = useState("");
    const [filteredList, setFilteredList] = useState<IAnime[]>([]);
    const [year, setYear] = useState<number | "">(currentYear);
    const [season, setSeason] = useState<AnimeSeasons | null>(currentSeason);
    const [orderStrategy, setOrderStrategy] = useState<"rating" | "name">("name");
    const { orderByRating, orderByName } = useAnimesUtils();

    const { data, isLoading } = useAnimesBySeason(+year, season as AnimeSeasons);

    const filterList = useCallback(
        (searchValue: string, orderStrategy: "rating" | "name") => {
            if (data) {
                let filtered = data;
                if (searchValue) {
                    filtered = data.filter((a) => {
                        return (
                            a.title.toLowerCase().includes(searchValue.toLowerCase()) ||
                            a.alternativeTitles.en.toLowerCase().includes(searchValue.toLowerCase())
                        );
                    });
                }

                if (filtered) {
                    filtered = orderStrategy === "rating" ? orderByRating(filtered) : orderByName(filtered);
                }
                setFilteredList(filtered);
            }
        },
        [data],
    );

    useEffect(() => {
        const strategy = orderStrategy === "rating" ? "rating" : "name";
        filterList(searchValue, strategy);
    }, [searchValue, orderStrategy, data]);

    useEffect(() => {
        setSearchValue("");
    }, [season, year]);

    return (
        <>
            <SeasonContextProvider year={+year} season={season as AnimeSeasons}>
                <Template>
                    <Box>
                        <Container maw={{ xs: "100%", lg: "80%" }} mb={16}>
                            <SearchHeaderAnime
                                searchValue={searchValue}
                                setSearchValue={setSearchValue}
                                season={season}
                                setSeason={setSeason}
                                year={year}
                                setYear={setYear}
                                currentYear={currentYear}
                                orderStrategy={orderStrategy}
                                setOrderStrategy={setOrderStrategy}
                            />
                            {isLoading && (
                                <Center>
                                    <Loader size="xl" color="grape.9" />
                                </Center>
                            )}
                            {!isLoading && (
                                <SimpleGrid breakpoints={[{ minWidth: "lg", cols: 4 }]} spacing="xl">
                                    {filteredList.map((anime) => {
                                        return <AnimeItem key={anime.id} anime={anime} />;
                                    })}
                                </SimpleGrid>
                            )}
                        </Container>
                    </Box>
                </Template>
            </SeasonContextProvider>
        </>
    );
};
