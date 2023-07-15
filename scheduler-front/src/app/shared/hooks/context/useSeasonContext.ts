import {useContext} from "react";
import {SeasonContext} from "../../../pages/animes/ListAnimes.tsx";

export const useSeasonContext = () => {
    return useContext(SeasonContext);
}