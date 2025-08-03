import { Alert, Box, Button, Center, Group, Stack, Table, Text } from "@mantine/core";
import { FaCircleInfo, FaPencil, FaTrashCan } from "react-icons/fa6";
import { useDeleteGroup, useGroupsByUser } from "@/queries/GroupQueries";
import { useUserSession } from "@/hooks/useUserSession";
import { useDisclosure } from "@mantine/hooks";
import { ModalGroup } from "@/components/perfil/ModalGroup";
import { useMemo, useState } from "react";
import { GroupTelegram } from "@/interfaces/GroupTelegram";
import { modals } from "@mantine/modals";
import { useNotifications } from "@/hooks/useNotifications";
import { ModalGroupToken } from "@/components/perfil/ModalGroupToken";

export const PerfilGroupsTab = () => {
    const { session } = useUserSession();
    const { showError, showSuccess } = useNotifications();
    const { data: groups, isPending } = useGroupsByUser(session?.userId);

    const [openedGroupModal, { open: openGroupModal, close: closeGroupModal }] = useDisclosure(false);
    const [openedGroupToken, { open: openGroupToken, close: closeGroupToken }] = useDisclosure(false);
    const [selectedGroup, setSelectedGroup] = useState<GroupTelegram | null>();
    const { mutate: deleteGroup } = useDeleteGroup(session?.userId);

    const orderedGroups = useMemo(() => groups?.sort((a, b) => a.name.localeCompare(b.name)), [groups]);

    const handleDelete = (group: GroupTelegram) => {
        modals.openConfirmModal({
            title: "Excluir Grupo",
            centered: true,
            children: <Text size="sm">Tem certeza que deseja excluir o grupo {group.name}?</Text>,
            labels: { confirm: "Excluir", cancel: "Cancelar" },
            confirmProps: { color: "red" },
            onConfirm: () => {
                deleteGroup(group.id, {
                    onError: showError,
                    onSuccess: () => {
                        showSuccess("Grupo excluido com sucesso!");
                    },
                });
            },
        });
    };

    return (
        <>
            <Stack align={"center"}>
                <Stack w={500}>
                    <Alert icon={<FaCircleInfo />} color={"yellow"} title="Atenção">
                        <Text size={"sm"} c={"yellow.9"}>
                            Por favor não remova o bot do grupo, ele precisa estar para que funcione
                            corretamente. Caso tenha removida é so adicioná-lo novamente pelo link ou
                            manualmente;
                        </Text>
                    </Alert>
                    <Button
                        disabled={isPending}
                        onClick={() => {
                            openGroupToken();
                        }}
                        size={"lg"}
                    >
                        Adicionar Novo Grupo
                    </Button>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Nome</Table.Th>
                                <Table.Th w={65} />
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {orderedGroups &&
                                orderedGroups.length > 0 &&
                                orderedGroups.map((group) => (
                                    <Table.Tr key={group.id}>
                                        <Table.Td>{group.name}</Table.Td>
                                        <Table.Td>
                                            <Center>
                                                <Group wrap={"nowrap"}>
                                                    <Box
                                                        onClick={() => {
                                                            setSelectedGroup(group);
                                                            openGroupModal();
                                                        }}
                                                        className={
                                                            "cursor-pointer text-gray-500 hover:text-gray-800 duration-300"
                                                        }
                                                    >
                                                        <FaPencil />
                                                    </Box>
                                                    <Box
                                                        onClick={() => handleDelete(group)}
                                                        className={
                                                            "cursor-pointer text-gray-500 hover:text-gray-800 duration-300"
                                                        }
                                                    >
                                                        <FaTrashCan />
                                                    </Box>
                                                </Group>
                                            </Center>
                                        </Table.Td>
                                    </Table.Tr>
                                ))}
                        </Table.Tbody>
                        <Table.Caption>
                            {isPending ?
                                <Center py="md">
                                    <Text c="dimmed" size="sm" fs={"italic"}>
                                        Carregando...
                                    </Text>
                                </Center>
                            :   groups &&
                                groups.length === 0 && (
                                    <Center py="md">
                                        <Text c="dimmed" size="sm">
                                            Nenhum grupo cadastrado
                                        </Text>
                                    </Center>
                                )
                            }
                        </Table.Caption>
                    </Table>
                </Stack>
            </Stack>
            <ModalGroup opened={openedGroupModal} onClose={closeGroupModal} selectedGroup={selectedGroup} />
            <ModalGroupToken opened={openedGroupToken} onClose={closeGroupToken} />
        </>
    );
};
