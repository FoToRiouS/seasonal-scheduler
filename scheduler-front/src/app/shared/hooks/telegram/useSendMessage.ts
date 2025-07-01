import { TelegramApi } from "../../services/api/TelegramApi.ts";

export const useSendMessage = () => {
    return async (group: number, message: string) => {
        const uri = `/sendMessage?chat_id=${group}&disable_notification=true&text=${message}`;
        await TelegramApi().get(uri);
    };
};
