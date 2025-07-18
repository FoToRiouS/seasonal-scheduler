import { fetchTelegram } from "@/service/TelegramService";

export const useSendMessage = () => {
    return async (group: number, message: string) => {
        const uri = `/sendMessage?chat_id=${group}&disable_notification=true&text=${message}`;
        await fetchTelegram(uri);
    };
};
