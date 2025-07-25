import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { useSeasonContext } from "@/components/animes/provider/useSeasonContext";
import { useMemo, useState } from "react";
import { GroupsSelect } from "@/components/animes/shared/GroupsSelect";
import { sendTextMessage } from "@/actions/TelegramActions";
import { useNotifications } from "@/hooks/useNotifications";

interface Props {
    opened: boolean;
    onClose: () => void;
    fetchedAnime: FetchedAnime;
}

export const ModalSendUniqueMessage = ({ opened, onClose, fetchedAnime }: Props) => {
    const { showSuccess, showError } = useNotifications();
    const { year, season } = useSeasonContext();
    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

    const animeSeason = useMemo(
        () =>
            fetchedAnime.animeBackend?.animeSeasons.find(
                (as) => as.season.year === year && as.season.season === season,
            ),
        [fetchedAnime, year, season],
    );

    const handleSendMessage = (type: "preview" | "review") => {
        sendTextMessage(
            fetchedAnime,
            year,
            season,
            selectedGroups,
            type === "preview" ? "previewText" : "reviewText",
        )
            .then(() => {
                showSuccess("Mensagem enviada com sucesso");
            })
            .catch(showError);
        onClose();
    };

    return (
        <Modal opened={opened} onClose={onClose} title={<Text fw={500}>Enviar mensagem única</Text>}>
            <Stack gap={5}>
                <Text>Selecione os grupos que deseja enviar a mensagem:</Text>
                <GroupsSelect selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups} />
                <Group grow mt={"md"}>
                    <Button
                        disabled={selectedGroups.length === 0 || !animeSeason?.previewText}
                        onClick={() => handleSendMessage("preview")}
                    >
                        Preview
                    </Button>
                    <Button
                        disabled={selectedGroups.length === 0 || !animeSeason?.reviewText}
                        onClick={() => handleSendMessage("review")}
                    >
                        Review
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
};
