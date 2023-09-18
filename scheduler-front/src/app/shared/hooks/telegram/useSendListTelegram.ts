import {useGroups} from "../backend/useGroups.ts";
import {IAnime} from "../../interfaces/IAnime.ts";
import {useSendPhoto} from "./useSendPhoto.ts";
import {IAnimeSeason} from "../../interfaces/IAnimeSeason.ts";
import {useMemo} from "react";
import {useAnimesSeasonUtils} from "../utils/useAnimesSeasonUtils.ts";
import {AnimeSeasons, getSeasonInPortuguese} from "../../services/AnimesService.ts";
import {useSendMessage} from "./useSendMessage.ts";

export const useSendListTelegram = (animeSeasons: IAnimeSeason[], year: number, season: AnimeSeasons) => {
    const { data} = useGroups();
    const sendMessage = useSendMessage();
    const sendPhoto = useSendPhoto();
    const {orderByRating} = useAnimesSeasonUtils();

    const sortedList = useMemo(() => orderByRating(animeSeasons, "asc"), [animeSeasons]);

    const handleSendHashtag = async (group: number, type: "preview" | "review") => {
        const typeText = type === "preview" ? "Preview" : "Review";
        await sendMessage(group, `%23fotolista ${typeText}-${getSeasonInPortuguese(season)}/${year}`);
    }

    const handleSendMessage = (group:number, anime: IAnime, message: string) => {
        const title = anime.title;
        const enTitle = anime.alternativeTitles.en;
        const formattedTitle = enTitle ? `${enTitle} (${title})` : `${title}`;
        const formattedRating = anime.mean ? `<b>Nota MAL:</b> ${anime.mean} %0A%0A` : "";

        let caption = `<b>${formattedTitle}</b>` + "%0A%0A" + formattedRating + message;
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
            await handleSendHashtag(g, "preview");
            for (const anime of sortedList) {
                const toSend = !!anime.previewText && (
                    anime.seasons?.length === 1 ||
                    (
                        anime.anime?.startSeason.year === year && anime.anime?.startSeason.season === season
                    )
                );
                if(toSend){
                    handleSendMessage(g, anime.anime!, anime.previewText!);
                    await timer(3500);
                }
            }
        }
    }

    const sendReviewMessages = async () => {
        for (const g of data!){
            await handleSendHashtag(g, "review");
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