import { AnimeMAL } from "@/interfaces/AnimeMAL";

export type AnimeSeasons = "winter" | "spring" | "summer" | "fall";

const getBaseUri = (): string => {
    const uri = process.env.MYANIMELIST_API;
    if (!uri) {
        throw new Error("Base URI for MyAnimeList must be set!");
    }
    return uri;
};

export const fetchMAL = async (input: RequestInfo | URL, init?: RequestInit | undefined): Promise<any> => {
    return await fetch(getBaseUri() + input, buildInit(init));
};

const buildInit = (init: RequestInit | undefined): RequestInit => {
    if (init) {
        return {
            ...init,
            headers:
                init.headers ?
                    {
                        ...buildHeader(),
                        ...init.headers,
                    }
                :   buildHeader(),
        };
    } else {
        return { headers: buildHeader() };
    }
};

const buildHeader = (): HeadersInit => {
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-MAL-CLIENT-ID": `${process.env.MYANIMELIST_API_TOKEN}`,
    };
};

export const mapJsonAnimeFromList = (node: any) => {
    return <AnimeMAL>{
        id: node.node.id,
        title: node.node.title,
        alternativeTitles: node.node.alternative_titles,
        mainPicture: node.node.main_picture,
        mean: node.node.mean,
        broadcast: node.node.broadcast,
        mediaType: node.node.media_type,
        startSeason: node.node.start_season,
        genres: node.node.genres,
    };
};

export const mapJsonAnimeFromId = (node: any) => {
    return <AnimeMAL>{
        id: node.id,
        title: node.title,
        alternativeTitles: node.alternative_titles,
        mainPicture: node.main_picture,
        mean: node.mean,
        broadcast: node.broadcast,
        mediaType: node.media_type,
        startSeason: node.start_season,
        genres: node.genres,
    };
};

export function getSeasonInPortuguese(animeSeason: AnimeSeasons) {
    switch (animeSeason) {
        case "summer":
            return "Verão";
        case "winter":
            return "Inverno";
        case "fall":
            return "Outono";
        case "spring":
            return "Primavera";
    }
}

export function getCurrentSeason() {
    const month = new Date().getMonth();
    if (month === 12 || (month >= 1 && month <= 2)) {
        return "winter";
    } else if (month >= 3 && month <= 5) {
        return "spring";
    } else if (month >= 6 && month <= 8) {
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

    const daysIndex = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    let dayIndex = daysIndex.indexOf(day);

    let newHour = hour;

    const hourSplit = hour ? hour.split(":") : ["00", "00"];

    const oldDate = new Date();
    oldDate.setHours(+hourSplit[0], +hourSplit[1]);

    const newDate = new Date(oldDate);
    newDate.setTime(oldDate.getTime() - 12 * 60 * 60 * 1000);

    if (oldDate.getDay() != newDate.getDay()) {
        dayIndex = dayIndex == 0 ? 6 : dayIndex - 1;
        newHour = newDate.getHours() + ":" + ("0" + newDate.getMinutes()).slice(-2);
    }

    return days.get(daysIndex[dayIndex]) + " as " + newHour;
}
