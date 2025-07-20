import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { ModalSendMessagesBase } from "@/components/animes/modals/ModalSendMessagesBase";
import { sendPreviewMessages } from "@/actions/TelegramActions";
import { AnimeUtils } from "@/utils/AnimeUtils";

interface Props {
    opened: boolean;
    onClose: () => void;
    fetchedAnimes: FetchedAnime[];
}

export const ModalSendPreview = ({ opened, onClose, fetchedAnimes }: Props) => {
    return (
        <ModalSendMessagesBase
            opened={opened}
            onClose={onClose}
            type={"preview"}
            fetchedAnimes={fetchedAnimes}
            sendMessageFn={sendPreviewMessages}
            emptyAnimeMessageFn={AnimeUtils.emptyPreviews}
        />
    );
};
