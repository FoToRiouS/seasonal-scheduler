import { Box, Button, Checkbox, Group, List, Modal, Stack, Text, Tooltip } from "@mantine/core";
import { useUserSession } from "@/hooks/useUserSession";
import { useGroupsByUser } from "@/queries/GroupQueries";
import Link from "next/link";
import { useState } from "react";
import { useSeasonContext } from "@/components/animes/provider/useSeasonContext";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { AnimeUtils } from "@/utils/AnimeUtils";

interface Props {
    opened: boolean;
    onClose: () => void;
    fetchedAnimes: FetchedAnime[];
}

export const ModalSendPreviewMessages = ({ opened, onClose, fetchedAnimes }: Props) => {
    const { user } = useUserSession();
    const { data: groups } = useGroupsByUser(user?.id);
    const { year, season } = useSeasonContext();

    const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
    const emptyPreviewMessages = AnimeUtils.emptyPreviews(fetchedAnimes, year, season);

    const getFullNameAnime = (fetchedAnime: FetchedAnime) => {
        if (fetchedAnime.animeMal.alternativeTitles.en) {
            return `${fetchedAnime.animeMal.alternativeTitles.en} (${fetchedAnime.animeMal.title})`;
        }
        return `${fetchedAnime.animeMal.title}`;
    };

    return (
        <Modal opened={opened} onClose={onClose} title={"Enviar mensagens de preview"}>
            {!groups || groups.length === 0 ?
                <Box fz={14} c={"red"}>
                    Você não possui nenhum grupo cadastrado, para poder usar esta função cadastre ao menos um
                    grupo {""}
                    <Link href={"/perfil?tab=telegram"}>aqui.</Link>
                </Box>
            :   <Stack gap={5}>
                    <Text fz={15}>Selecione os grupos que desejam enviar as mensagens:</Text>
                    <Checkbox.Group value={selectedGroups} onChange={setSelectedGroups}>
                        {groups.map((g) => (
                            <Checkbox color={"violet.8"} value={g.groupId} label={g.name} key={g.id} />
                        ))}
                    </Checkbox.Group>
                    {emptyPreviewMessages.length > 0 && (
                        <Stack c="red" gap={5} my={"lg"} w={"99%"}>
                            <Text fz={12}>
                                Os seguintes animes não possuem preview, portanto não serão enviados:
                            </Text>
                            <List size={"xs"}>
                                {emptyPreviewMessages.map((a) => (
                                    <Tooltip label={getFullNameAnime(a)}>
                                        <List.Item key={a.animeBackend?.id}>{getFullNameAnime(a)}</List.Item>
                                    </Tooltip>
                                ))}
                            </List>
                        </Stack>
                    )}
                    <Group grow>
                        <Button>Enviar</Button>
                        <Button variant={"outline"} onClick={onClose}>
                            Cancelar
                        </Button>
                    </Group>
                </Stack>
            }
        </Modal>
    );
};
