import { useContext } from "react";
import { LayoutContext } from "@/components/layout/Layout";

export const useLayoutContext = () => {
    return useContext(LayoutContext);
};
