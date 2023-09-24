import {useWatchServiceList} from "./useWatchServiceList.ts";

const mapImages = new Map<string, string>([
    ["33414342-4339-3942-2d44-3534442d3444", "/Netflix.png"],
    ["39423033-4446-4644-2d37-3231372d3442", "/Internet.png"],
    ["33334439-4636-3239-2d34-3044362d3445", "/Crunchyroll.png"],
    ["44443143-4645-4639-2d39-4441432d3438", "/Disney+.png"],
    ["39373442-3930-3441-2d39-3939462d3434", "/Star+.png"],
]);

export const useWatchServicesFunctions = () => {
    const {data} = useWatchServiceList();

    const getService = (id: string) => {
        return data?.find(d => d.id === id);
    }

    const getIcon = (id: string) => {
        return mapImages.get(id);
    }

    return {
        getService,
        getIcon
    }

}