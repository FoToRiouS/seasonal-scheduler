import {useGroups} from "../backend/useGroups.ts";
import {IAnime} from "../../interfaces/IAnime.ts";
import {useSendMessage} from "./useSendMessage.ts";

export const useSendListTelegram = () => {
    const { data} = useGroups();
    const sendMessage = useSendMessage()

    return async (animes: IAnime[] | undefined) => {
        if(animes){
            console.log(animes);
            for (const g of data!){
                for (const anime of animes) {
                    await sendMessage(g, anime.title)
                    setTimeout(() => {}, 2000)
                }
            }
        }
    };
}