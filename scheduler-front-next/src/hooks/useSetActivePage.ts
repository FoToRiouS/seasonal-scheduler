import { useLayoutContext } from "@/hooks/useLayoutContext";
import { useEffect } from "react";

export const useSetActivePage = (pageKey: string) => {
    const { setActivePage } = useLayoutContext();

    useEffect(() => {
        setActivePage(pageKey);
    }, []);
};
