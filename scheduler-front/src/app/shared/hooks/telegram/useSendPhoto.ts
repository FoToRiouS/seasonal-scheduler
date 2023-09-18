import {TelegramApi} from "../../services/api/TelegramApi.ts";

export const useSendPhoto = () => {

    return async (group: number, photoUrl: string, caption: string) => {
        const url = `/sendPhoto?chat_id=${group}&disable_notification=true&parse_mode=HTML&photo=${photoUrl}&caption=${caption}`;
        await TelegramApi().get(url).catch(e => console.log(e));
    }

}