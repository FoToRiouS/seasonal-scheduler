import { useGenerateGroupToken } from "@/queries/GroupQueries";
import { useUserSession } from "@/hooks/useUserSession";
import { ActionIcon, Anchor, Button, CopyButton, Modal, Stack, Text, TextInput } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";

interface Props {
    opened: boolean;
    onClose: () => void;
}

const linkGroup = "https://t.me/FotolistaBot?startgroup=";

export const ModalGroupToken = ({ opened, onClose }: Props) => {
    const { session } = useUserSession();
    const { mutate: generateGroupToken, isPending } = useGenerateGroupToken();

    const [token, setToken] = useState("");

    useEffect(() => {
        if (opened) {
            generateGroupToken(session!.userId, {
                onSuccess: (token) => {
                    setToken(token);
                },
            });
        } else {
            setToken("");
        }
    }, [opened]);

    const linkToCopy = useMemo(() => linkGroup + token, [token]);

    return (
        <Modal opened={opened} onClose={onClose} title={<Text fw={"bold"}>Adicionar Novo Grupo</Text>}>
            <Stack gap={"xl"}>
                <Text size={"sm"} c={"dimmed"}>
                    Para adicionar um novo grupo ao bot, copie o link abaixo e adicione-o a um grupo. Após a
                    mensagem de sucesso do bot pode recarregar a página que o grupo deve aparecer.
                </Text>
                <TextInput
                    rightSection={
                        <CopyButton value={linkToCopy}>
                            {({ copied, copy }) => (
                                <ActionIcon
                                    variant={"subtle"}
                                    onClick={copy}
                                    color={copied ? "teal" : "gray"}
                                    disabled={isPending}
                                >
                                    <FaCopy />
                                </ActionIcon>
                            )}
                        </CopyButton>
                    }
                    value={isPending ? "Carregando Link.." : linkToCopy}
                    readOnly
                />
                <Stack gap={5}>
                    <Anchor href={linkToCopy} target="_blank" w={"100%"}>
                        <Button
                            leftSection={<FaExternalLinkAlt />}
                            w={"100%"}
                            disabled={isPending}
                            onClick={onClose}
                        >
                            Acessar Link do Grupo
                        </Button>
                    </Anchor>
                    <Button variant={"outline"} onClick={onClose}>
                        Cancelar
                    </Button>
                </Stack>
            </Stack>
        </Modal>
    );
};
