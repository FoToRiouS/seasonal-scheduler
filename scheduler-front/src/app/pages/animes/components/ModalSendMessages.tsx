import {Button, Group, List, Modal, Stack, Text} from "@mantine/core";
import {IAnimeSeason} from "../../../shared/interfaces/IAnimeSeason.ts";
import {useMemo, useState} from "react";
import {useSendListTelegram} from "../../../shared/hooks/telegram/useSendListTelegram.ts";

type ModalSendMessagesProps = {
    opened: boolean,
    onClose: () => void,
    animesSeason: IAnimeSeason[]
}

export const ModalSendMessages : React.FC<ModalSendMessagesProps> = ({opened, onClose, animesSeason}) => {
    const {sendReviewMessages, sendPreviewMessages, emptyPreviews, emptyReviews} = useSendListTelegram(animesSeason);
    const [method, setMethod] = useState<"preview" | "review" | null>();

    const emptyList = useMemo(() => {
        if(method === "preview"){
            return emptyPreviews();
        } else {
            return emptyReviews();
        }
    }, [method])

    const handleClose = () => {
        setMethod(null);
        onClose();
    }

    return(
        <Modal opened={opened} onClose={handleClose} title="Método de Envio" size="xl" withCloseButton>
            <Stack>
            {
                !method && <>
                <Text>Qual o método de envio?</Text>
                <Group position="right">
                    <Button onClick={() => setMethod("preview")}>Enviar Preview</Button>
                    <Button onClick={() => setMethod("review")}>Enviar Review</Button>
                </Group></>
            }
            {
                method && <>
                <Text>Os seguintes animes não tem o {method} preenchido e não serão enviados:</Text>
                <List withPadding>
                {
                    emptyList.map(a => <List.Item key={a.id}>{
                        a.anime?.alternativeTitles.en
                            ? a.anime.alternativeTitles.en + ` (${a.anime.title})`
                            : a.anime?.title
                    }</List.Item>)
                }
                </List>
                <Text>Tem certeza que deseja enviar?</Text>
                <Group position="right">
                    <Button onClick={() => setMethod(null)}>Voltar</Button>
                    <Button>Enviar Lista</Button>
                </Group></>
            }
            </Stack>
        </Modal>
    )
}