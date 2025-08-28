"use server";

import { fetchTelegram } from "@/service/TelegramService";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { GroupTelegram } from "@/interfaces/GroupTelegram";
import { orderByEnglishName, orderByOriginalName, orderByRating } from "@/utils/AnimeOrders";
import { AnimeSeason } from "@/interfaces/AnimeSeason";
import { getSeasonInPortuguese } from "@/utils/MyAnimeListUtils";
import { SeasonMAL } from "@/interfaces/AnimeMAL";

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
    season: SeasonMAL,
) => {
    const typeText = type === "preview" ? "Preview" : "Review";
    await sendMessage(group, `%23fotolista ${typeText}-${getSeasonInPortuguese(season)}/${year}`);
};

const handleSendMessage = (group: string, animeSeason: FetchedAnime, message: string) => {
    const { animeMal, animeBackend } = animeSeason;

    const title = animeMal.title;
    const enTitle = animeMal.alternative_titles.en;
    const formattedTitle = enTitle ? `${enTitle} (${title})` : `${title}`;
    const formattedRating = animeMal.mean ? `<b>Nota MAL:</b> ${animeMal.mean} %0A%0A` : "";
    const formattedServices =
        animeBackend?.watchServices ?
            `<b>Onde Assistir:</b> ${animeBackend.watchServices.map((s) => s.name).join(", ")} %0A%0A`
        :   "";

    let caption = `<b>${formattedTitle}</b>` + "%0A%0A" + formattedRating + formattedServices + message;
    caption = escapeHtml(caption);
    sendPhoto(group, animeMal.main_picture.large, caption).then(undefined);
};

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const sendTextMessage = async (
    fetchedAnime: FetchedAnime,
    year: number,
    season: SeasonMAL,
    groups: GroupTelegram[] | string[],
    textName: Exclude<keyof AnimeSeason, "season">,
) => {
    const animeSeasonToSend = fetchedAnime.animeBackend?.animeSeasons.find(
        (as) => as.season.year === year && as.season.season === season,
    );

    for (const group of groups) {
        const groupId = typeof group === "string" ? group : group.groupId;

        if (animeSeasonToSend && animeSeasonToSend[textName]) {
            handleSendMessage(groupId, fetchedAnime, animeSeasonToSend[textName]);
        }
    }
};

export const sendTextMessages = async (
    fetchedAnimes: FetchedAnime[],
    year: number,
    season: SeasonMAL,
    groups: GroupTelegram[] | string[],
    orderStrategy: "rating" | "englishName" | "originalName",
    textName: Exclude<keyof AnimeSeason, "season">,
) => {
    let sortedList;
    switch (orderStrategy) {
        case "rating":
            sortedList = orderByRating(fetchedAnimes, "asc");
            break;
        case "englishName":
            sortedList = orderByEnglishName(fetchedAnimes);
            break;
        case "originalName":
            sortedList = orderByOriginalName(fetchedAnimes);
            break;
    }

    for (const group of groups) {
        const groupId = typeof group === "string" ? group : group.groupId;

        await handleSendHashtag(groupId, textName === "previewText" ? "preview" : "review", year, season);
        for (const anime of sortedList) {
            const animeSeasonToSend = anime.animeBackend?.animeSeasons.find(
                (as) => as.season.year === year && as.season.season === season,
            );
            if (animeSeasonToSend && animeSeasonToSend[textName]) {
                handleSendMessage(groupId, anime, animeSeasonToSend[textName]);
                await timer(3500);
            }
        }
    }
};

export const sendPreviewMessages = async (
    fetchedAnimes: FetchedAnime[],
    year: number,
    season: SeasonMAL,
    groups: GroupTelegram[],
) => {
    return sendTextMessages(fetchedAnimes, year, season, groups, "englishName", "previewText");
};

export const sendReviewMessages = async (
    fetchedAnimes: FetchedAnime[],
    year: number,
    season: SeasonMAL,
    groups: GroupTelegram[],
) => {
    return sendTextMessages(fetchedAnimes, year, season, groups, "rating", "reviewText");
};
