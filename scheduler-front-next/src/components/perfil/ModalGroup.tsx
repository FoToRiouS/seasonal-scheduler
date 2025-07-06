import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { z } from "zod/v4";
import { useForm } from "@mantine/form";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useNotifications } from "@/hooks/useNotifications";
import { GroupTelegram } from "@/interfaces/GroupTelegram";
import { useCreateGroup, useUpdateGroup } from "@/queries/GroupQueries";
import { useUserSession } from "@/hooks/useUserSession";
import { useEffect, useMemo } from "react";

interface Props {
    opened: boolean;
    onClose: () => void;
    selectedGroup?: GroupTelegram | null;
}

const schema = z.object({
    name: z.string().min(1, "O nome é obrigatório"),
    groupId: z.string().min(1, "O ID do grupo é obrigatório"),
});
type schemaType = z.infer<typeof schema>;

export const ModalGroup = ({ opened, onClose, selectedGroup }: Props) => {
    const { showSuccess, showError } = useNotifications();
    const { session } = useUserSession();

    const { mutate: createGroup, isPending: pendingCreate } = useCreateGroup(session?.userId);
    const { mutate: updateGroup, isPending: pendingUpdate } = useUpdateGroup(session?.userId);

    const pendingState = useMemo(() => pendingCreate || pendingUpdate, [pendingUpdate, pendingCreate]);

    const form = useForm<schemaType>({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            groupId: "",
        },
        validate: zod4Resolver(schema),
    });

    useEffect(() => {
        if (opened && selectedGroup) {
            form.setValues({
                name: selectedGroup.name,
                groupId: selectedGroup.groupId,
            });
        } else {
            form.reset();
        }
    }, [opened, selectedGroup]);

    const onSubmit = (values: schemaType) => {
        const groupTelegram: GroupTelegram = {
            id: selectedGroup ? selectedGroup.id : null,
            name: values.name,
            groupId: values.groupId,
        };

        if (selectedGroup) {
            updateGroup(groupTelegram, {
                onSuccess: () => {
                    showSuccess("Grupo atualizado com sucesso");
                    onClose();
                },
                onError: showError,
            });
        } else {
            createGroup(groupTelegram, {
                onSuccess: () => {
                    showSuccess("Grupo criado com sucesso");
                    onClose();
                },
                onError: showError,
            });
        }
    };

    return (
        <Modal opened={opened} onClose={onClose} closeOnClickOutside={false} title={"Grupo do Telegram"}>
            <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack>
                    <TextInput label="Nome do Grupo" key={form.key("name")} {...form.getInputProps("name")} />
                    <TextInput
                        label="ID do Grupo"
                        key={form.key("groupId")}
                        {...form.getInputProps("groupId")}
                    />
                    <Group grow>
                        <Button type="submit" loading={pendingState}>
                            Salvar
                        </Button>
                        <Button onClick={onClose} variant="outline">
                            Cancelar
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};
