import { Alert, Box, Button, Group, List, Modal, Stack, Text } from "@mantine/core";
import { useUserSession } from "@/hooks/useUserSession";
import { useGroupsByUser } from "@/queries/GroupQueries";
import Link from "next/link";
import { useState } from "react";
import { useSeasonContext } from "@/components/animes/provider/useSeasonContext";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { FaCircleExclamation } from "react-icons/fa6";
import { useNotifications } from "@/hooks/useNotifications";
import { SeasonMAL } from "@/interfaces/AnimeMAL";
import { GroupTelegram } from "@/interfaces/GroupTelegram";
import { GroupsSelect } from "@/components/animes/shared/GroupsSelect";

interface Props {
    opened: boolean;
    onClose: () => void;
    type: "preview" | "review";
    fetchedAnimes: FetchedAnime[];
    sendMessageFn: (
        fetchedAnimes: FetchedAnime[],
        year: number,
        season: SeasonMAL,
        groups: GroupTelegram[],
    ) => Promise<void>;
    emptyAnimeMessageFn: (fetchedAnimes: FetchedAnime[], year: number, season: SeasonMAL) => FetchedAnime[];
}

export const ModalSendMessagesBase = ({
    opened,
    onClose,
    fetchedAnimes,
    type,
    sendMessageFn,
    emptyAnimeMessageFn,
}: Props) => {
    const { showSuccess, showError } = useNotifications();
    const { user } = useUserSession();
    const { data: groups } = useGroupsByUser(user?.id);
    const { year, season } = useSeasonContext();

    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const emptyPreviewMessages = emptyAnimeMessageFn(fetchedAnimes, year, season);

    const getFullNameAnime = (fetchedAnime: FetchedAnime) => {
        if (fetchedAnime.animeMal.alternative_titles.en) {
            return `${fetchedAnime.animeMal.alternative_titles.en} (${fetchedAnime.animeMal.title})`;
        }
        return `${fetchedAnime.animeMal.title}`;
    };

    const handleSendMessages = () => {
        showSuccess("Enviando suas mensagens em segundo plano. Pode continuar navegando");
        const groupsToSend = groups?.filter((g) => selectedGroups.includes(g.groupId));
        if (groupsToSend && groupsToSend.length > 0) {
            sendMessageFn(fetchedAnimes, year, season, groupsToSend)
                .then(() => showSuccess("Mensagens enviadas com sucesso"))
                .catch(showError);
        }
        onClose();
    };

    return (
        <Modal opened={opened} onClose={onClose} title={`Enviar mensagens de ${type}`}>
            {!groups || groups.length === 0 ?
                <Box fz={14} c={"red"}>
                    Você não possui nenhum grupo cadastrado, para poder usar esta função cadastre ao menos um
                    grupo {""}
                    <Link href={"/perfil?tab=telegram"}>aqui.</Link>
                </Box>
            :   <Stack gap={5}>
                    <Text fz={15}>Selecione os grupos que desejam enviar as mensagens:</Text>
                    <GroupsSelect selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups} />
                    {emptyPreviewMessages.length > 0 && (
                        <Alert
                            title={"Atenção: Conteúdo não será enviado"}
                            variant={"light"}
                            icon={<FaCircleExclamation />}
                            color={"yellow"}
                            my={"md"}
                        >
                            <Stack gap={5} c={"yellow.8"}>
                                <Text fz={12}>
                                    Os seguintes animes não possuem {type}, portanto não serão enviados:
                                </Text>
                                <List size={"xs"}>
                                    {emptyPreviewMessages.map((a) => (
                                        <List.Item key={a.animeBackend?.id}>{getFullNameAnime(a)}</List.Item>
                                    ))}
                                </List>
                            </Stack>
                        </Alert>
                    )}
                    <Group grow>
                        <Button variant={"outline"} onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleSendMessages}
                            disabled={!selectedGroups || selectedGroups.length === 0}
                        >
                            Enviar Mensagens
                        </Button>
                    </Group>
                </Stack>
            }
        </Modal>
    );
};
