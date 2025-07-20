import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { ModalSendMessagesBase } from "@/components/animes/modals/ModalSendMessagesBase";
import { sendReviewMessages } from "@/actions/TelegramActions";
import { AnimeUtils } from "@/utils/AnimeUtils";

interface Props {
    opened: boolean;
    onClose: () => void;
    fetchedAnimes: FetchedAnime[];
}

export const ModalSendReview = ({ opened, onClose, fetchedAnimes }: Props) => {
    return (
        <ModalSendMessagesBase
            opened={opened}
            onClose={onClose}
            type={"review"}
            fetchedAnimes={fetchedAnimes}
            sendMessageFn={sendReviewMessages}
            emptyAnimeMessageFn={AnimeUtils.emptyReviews}
        />
    );
};
