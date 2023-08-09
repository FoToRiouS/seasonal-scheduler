import {useGroups} from "../backend/useGroups.ts";
import {IAnime} from "../../interfaces/IAnime.ts";
import {useSendPhoto} from "./useSendPhoto.ts";
import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";

export const useSendListTelegram = () => {
    const { data} = useGroups();
    const sendPhoto = useSendPhoto();

    const handleSendMessage = (group:number, anime: IAnime, animeSeason: IAnimeSeason) => {
        const title = anime.title;
        const enTitle = anime.alternativeTitles.en;
        const text = animeSeason.previewText ? animeSeason.previewText : "";
        const formattedTitle = enTitle ? `${enTitle} (${title})` : `${title}`;

        let caption = `<b>${formattedTitle}</b>` + "%0A%0A" + text;
        caption = caption.replace("&", "%26amp;");

        sendPhoto(group, anime.mainPicture.large, caption).then(undefined);
    }

    const timer = (ms: number) => new Promise(res => setTimeout(res, ms))

    return async (animeSeasons: IAnimeSeason[], animes: IAnime[]) => {
        for (const g of data!){
            for (const anime of animes) {
                const animeSeason = animeSeasons?.find(a => a.idAnime === anime.id)
                handleSendMessage(g, anime!, animeSeason!);
                await timer(3500);
            }
        }
    };
}