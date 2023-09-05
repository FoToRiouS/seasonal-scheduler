import {useGroups} from "../backend/useGroups.ts";
import {IAnime} from "../../interfaces/IAnime.ts";
import {useSendPhoto} from "./useSendPhoto.ts";
import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";
import {useMemo} from "react";
import {useAnimesSeasonUtils} from "../utils/useAnimesSeasonUtils.ts";

export const useSendListTelegram = (animeSeasons: IAnimeSeason[]) => {
    const { data} = useGroups();
    const sendPhoto = useSendPhoto();
    const {orderByRating} = useAnimesSeasonUtils();

    const sortedList = useMemo(() => orderByRating(animeSeasons, "asc"), [animeSeasons]);

    const handleSendMessage = (group:number, anime: IAnime, message: string) => {
        const title = anime.title;
        const enTitle = anime.alternativeTitles.en;
        const formattedTitle = enTitle ? `${enTitle} (${title})` : `${title}`;

        let caption = `<b>${formattedTitle}</b>` + "%0A%0A" + message;
        caption = caption.replace("&", "%26amp;");

        sendPhoto(group, anime.mainPicture.large, caption).then(undefined);
    }

    const timer = (ms: number) => new Promise(res => setTimeout(res, ms))

    const emptyPreviews = () : IAnimeSeason[] => {
        return sortedList.filter(a => !(a.previewText));
    }

    const emptyReviews = () : IAnimeSeason[] => {
        return sortedList.filter(a => !(a.reviewText));
    }

    const sendPreviewMessages = async () => {
        for (const g of data!){
            for (const anime of sortedList) {
                if(anime.previewText){
                    handleSendMessage(g, anime.anime!, anime.previewText);
                    await timer(3500);
                }
            }
        }
    }

    const sendReviewMessages = async () => {
        for (const g of data!){
            for (const anime of sortedList) {
                if(anime.reviewText) {
                    handleSendMessage(g, anime.anime!, anime.reviewText);
                    await timer(3500);
                }
            }
        }
    }

    return {
        sendPreviewMessages,
        sendReviewMessages,
        emptyPreviews,
        emptyReviews
    }
}