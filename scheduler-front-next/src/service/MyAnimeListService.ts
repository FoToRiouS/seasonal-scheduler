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
