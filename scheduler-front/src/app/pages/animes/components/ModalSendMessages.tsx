import {Button, Group, List, Modal, Stack, Text} from "@mantine/core";
import {IAnimeSeason} from "../../../shared/interfaces/IAnimeSeason.ts";
import {useMemo, useState} from "react";
import {useSendListTelegram} from "../../../shared/hooks/telegram/useSendListTelegram.ts";
import {useAnimesSeasonUtils} from "../../../shared/hooks/utils/useAnimesSeasonUtils.ts";

type ModalSendMessagesProps = {
    opened: boolean,
    onClose: () => void,
    animesSeason: IAnimeSeason[]
}

export const ModalSendMessages : React.FC<ModalSendMessagesProps> = ({opened, onClose, animesSeason}) => {
    const {sendReviewMessages, sendPreviewMessages, emptyPreviews, emptyReviews} = useSendListTelegram(animesSeason);
    const [method, setMethod] = useState<"preview" | "review" | null>();
    const {orderByName, getFullName} = useAnimesSeasonUtils();

    const emptyList = useMemo(() => {
        if(method === "preview"){
            return orderByName(emptyPreviews());
        } else {
            return orderByName(emptyReviews());
        }
    }, [method])

    const handleClose = () => {
        setMethod(null);
        onClose();
    }

    const handleSendMessages = () => {
        if(method === "preview") {
            sendPreviewMessages().then(undefined);
        } else {
            sendReviewMessages().then(undefined);
        }
        handleClose();
    }


    return(
        <Modal opened={opened} onClose={handleClose} title="Método de Envio" size="lg" withCloseButton>
            <Stack>
                {
                    !method && <>
                        <Text>Qual o método de envio?</Text>
                        <Group position="right">
                            <Button variant="gradient" gradient={{ from: 'red.9', to: 'grape.9' }} onClick={() => setMethod("preview")}>Enviar Preview</Button>
                            <Button variant="gradient" gradient={{ from: 'red.9', to: 'grape.9' }} onClick={() => setMethod("review")}>Enviar Review</Button>
                        </Group></>
                }
                {
                    method && <>
                        <Text>Os seguintes animes não tem o {method} preenchido e não serão enviados:</Text>
                        <List icon="•" size="sm" withPadding>
                            {
                                emptyList.map(a => <List.Item key={a.id}>
                                    <Text lineClamp={1}>{getFullName(a.anime!)}</Text>
                                </List.Item>)
                            }
                        </List>
                        <Text>Tem certeza que deseja enviar?</Text>
                        <Group position="right">
                            <Button variant="gradient" gradient={{ from: 'red.9', to: 'grape.9' }} onClick={() => setMethod(null)}>Voltar</Button>
                            <Button
                                variant="gradient"
                                gradient={{ from: 'red.9', to: 'grape.9' }}
                                onClick={handleSendMessages}
                            >Enviar Lista</Button>
                        </Group></>
                }
            </Stack>
        </Modal>
    )
}