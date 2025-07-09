import { useContext } from "react";
import { SeasonContext } from "@/components/shared/animes/provider/SeasonContextProvider";

export const useSeasonContext = () => {
    return useContext(SeasonContext);
};
