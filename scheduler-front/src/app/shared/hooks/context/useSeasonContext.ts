import { useContext } from "react";
import { SeasonContext } from "../../contexts/SeasonContextProvider.tsx";

export const useSeasonContext = () => {
    return useContext(SeasonContext);
};
