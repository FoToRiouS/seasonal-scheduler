import { useContext } from "react";
import { SeasonContext } from "@/components/animes/provider/SeasonContextProvider";

export const useSeasonContext = () => {
    return useContext(SeasonContext);
};
