import {useWatchServiceList} from "./useWatchServiceList.ts";
import {useEffect, useRef} from "react";

export const useWatchServicesFunctions = () => {
    const {data} = useWatchServiceList();

    let mapImages = useRef(new Map<string, string>());
    useEffect(() => {
        mapImages.current.set("3acbc99b-d54d-4d24-8b9e-3705307fea39", "/Netflix.png");
        mapImages.current.set("9b03dffd-7217-4bb1-b2d3-4daa4772ff2e", "/Internet.png");
        mapImages.current.set("33d9f629-40d6-4e6f-a05c-8cb450e80c69", "/Crunchyroll.png");
        mapImages.current.set("dd1cfef9-9dac-48ea-b6d2-ac8a9a673196", "/Disney+.png");
        mapImages.current.set("974b904a-999f-44d2-aab5-d3ed07babcc4", "/Star+.png");
    }, []);

    const getService = (id: string) => {
        return data?.find(d => d.id === id);
    }

    const getIcon = (id: string) => {
        return mapImages.current.get(id);
    }

    return {
        getService,
        getIcon
    }

}