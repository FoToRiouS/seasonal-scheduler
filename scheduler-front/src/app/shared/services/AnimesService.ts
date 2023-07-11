import {MyAnimeListApi} from "./api/MyAnimeListApi.ts";
import {IAnime} from "../interfaces/IAnime.ts";

export type AnimeSeasons = "winter" | "spring" | "summer" | "fall";

export function getCurrentSeason() {
    const month = new Date().getMonth();
    if(month === 12 || (month >= 1  && month <= 2)) {
        return "winter";
    } else if(month >= 3  && month <= 5){
        return "spring";
    } else if(month >= 6  && month <= 8){
        return "summer";
    } else {
        return "fall";
    }
}

export function getDayOfExhibition(day: string, hour: string) {
    const days = new Map<string, string>();
    days.set("monday", "segunda");
    days.set("tuesday", "terça");
    days.set("wednesday", "quarta");
    days.set("thursday", "quinta");
    days.set("friday", "sexta");
    days.set("saturday", "sábado");
    days.set("sunday", "domingo");

    const daysIndex = ["monday", "tuesday", "wednesday", "thursday","friday","saturday", "sunday"];
    let dayIndex = daysIndex.indexOf(day);

    let newHour = hour;

    const hourSplit = hour.split(":");

    const oldDate = new Date();
    oldDate.setHours(+hourSplit[0], +hourSplit[1])

    const newDate = new Date(oldDate);
    newDate.setTime(oldDate.getTime() - (12 * 60 * 60 * 1000));

    if(oldDate.getDay() != newDate.getDay()){
        dayIndex = dayIndex == 0 ? 6 : dayIndex-1
        newHour = newDate.getHours() + ":" + ("0" + newDate.getMinutes()).slice(-2);
    }

    return days.get(daysIndex[dayIndex]) + " as " + newHour;
}

const animeApiHeaders = {"X-MAL-CLIENT-ID": "eb6aa17ec9b6961f8812f79c38318240"}

export const mapJsonAnime = (node: any) => {
    return <IAnime> {
        id: node.node.id,
        title: node.node.title,
        alternativeTitles: node.node.alternative_titles,
        mainPicture: node.node.main_picture,
        mean: node.node.mean,
        broadcast: node.node.broadcast,
        mediaType: node.node.media_type,
        startSeason: node.node.start_season
    }
}

const getBySeason = async (year: number, season: AnimeSeasons): Promise<IAnime[]>  => {
    const { data } = await MyAnimeListApi().get(`/anime/season/${year}/${season}?limit=500&fields=alternative_titles,broadcast,media_type,start_season,mean`, {
        headers: animeApiHeaders
    });

    return data.data.map(mapJsonAnime)
        .filter((a:IAnime) => a.mediaType === "tv" || a.mediaType === "ona" || a.mediaType === "ova")
        .filter((a:IAnime) => a.startSeason.year === year && a.startSeason.season === season)
        .sort((a1:IAnime, a2:IAnime) => {
            return a1.title.localeCompare(a2.title);
        });
}

const getById = async (id: number) : Promise<IAnime> => {
    const { data } = await MyAnimeListApi().get(`/anime/${id}?fields=alternative_titles,broadcast,media_type,start_season`, {
        headers: animeApiHeaders
    });
    return data;
}

export const AnimesService = {
    getBySeason,
    getById,
}