"use server";

import { fetchTelegram } from "@/service/TelegramService";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { AnimeSeasons, getSeasonInPortuguese } from "@/service/MyAnimeListService";
import { GroupTelegram } from "@/interfaces/GroupTelegram";
import { orderByEnglishName, orderByRating } from "@/utils/AnimeOrders";

function escapeHtml(html: string): string {
    let escapedHtml = html;
    const escapeMap: { [key: string]: string } = {
        "&": "&amp;",
        "\n": "%0A",
    };

    for (let escapeMapKey in escapeMap) {
        const regex = new RegExp(escapeMapKey, "g");
        escapedHtml = escapedHtml.replace(regex, (match) => escapeMap[match]);
    }
    return escapedHtml;
}

const sendMessage = async (group: string, message: string) => {
    const uri = `/sendMessage?chat_id=${group}&disable_notification=true&text=${message}`;
    await fetchTelegram(uri);
};

const sendPhoto = async (group: string, photoUrl: string, caption: string) => {
    const url = `/sendPhoto?chat_id=${group}&disable_notification=true&parse_mode=HTML&photo=${photoUrl}&caption=${caption}`;
    await fetchTelegram(url).catch((e) => console.log(e));
};

const handleSendHashtag = async (
    group: string,
    type: "preview" | "review",
    year: number,
    season: AnimeSeasons,
) => {
    const typeText = type === "preview" ? "Preview" : "Review";
    await sendMessage(group, `%23fotolista ${typeText}-${getSeasonInPortuguese(season)}/${year}`);
};

const handleSendMessage = (group: string, animeSeason: FetchedAnime, message: string) => {
    const { animeMal, animeBackend } = animeSeason;

    const title = animeMal.title;
    const enTitle = animeMal.alternativeTitles.en;
    const formattedTitle = enTitle ? `${enTitle} (${title})` : `${title}`;
    const formattedRating = animeMal.mean ? `<b>Nota MAL:</b> ${animeMal.mean} %0A%0A` : "";
    const formattedServices =
        animeBackend?.watchServices ?
            `<b>Onde Assistir:</b> ${animeBackend.watchServices.map((s) => s.name).join(", ")} %0A%0A`
        :   "";

    let caption = `<b>${formattedTitle}</b>` + "%0A%0A" + formattedRating + formattedServices + message;
    caption = escapeHtml(caption);
    sendPhoto(group, animeMal.mainPicture.large, caption).then(undefined);
};

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const sendPreviewMessages = async (
    fetchedAnimes: FetchedAnime[],
    year: number,
    season: AnimeSeasons,
    groups: GroupTelegram[],
) => {
    const sortedList = orderByEnglishName(fetchedAnimes);

    for (const group of groups) {
        await handleSendHashtag(group.groupId, "preview", year, season);
        for (const anime of sortedList) {
            const animeSeasonToSend = anime.animeBackend?.animeSeasons.find(
                (as) => as.season.year === year && as.season.season === season,
            );
            if (animeSeasonToSend && animeSeasonToSend.previewText) {
                handleSendMessage(group.groupId, anime, animeSeasonToSend.previewText);
                await timer(3500);
            }
        }
    }
};

export const sendReviewMessages = async (
    fetchedAnimes: FetchedAnime[],
    year: number,
    season: AnimeSeasons,
    groups: GroupTelegram[],
) => {
    const sortedList = orderByRating(fetchedAnimes, "asc");

    for (const group of groups!) {
        await handleSendHashtag(group.groupId, "review", year, season);
        for (const anime of sortedList) {
            const animeSeasonToSend = anime.animeBackend?.animeSeasons.find(
                (as) => as.season.year === year && as.season.season === season,
            );
            if (animeSeasonToSend && animeSeasonToSend.reviewText) {
                handleSendMessage(group.groupId, anime, animeSeasonToSend.reviewText);
                await timer(3500);
            }
        }
    }
};
