import {Template} from "../../shared/components/Template.tsx";
import {Container} from "@mantine/core";
import {AnimeSeasons, getCurrentSeason} from "../../shared/services/AnimesService.ts";
import {useState} from "react";
import {SearchHeaderAnime} from "./components/SearchHeaderAnime.tsx";

export const ScheduleAnimes = () => {
    const currentYear = new Date().getFullYear();
    const currentSeason = getCurrentSeason();

    const [searchValue, setSearchValue] = useState("");
    const [year, setYear] = useState<number | ''>(currentYear);
    const [season, setSeason] = useState<AnimeSeasons | null>(currentSeason);

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
            </Container>
        </Template>
    </>)
}