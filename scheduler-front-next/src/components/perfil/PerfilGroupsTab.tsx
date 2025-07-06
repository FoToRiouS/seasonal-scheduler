import { Alert, Box, Button, Center, Group, Stack, Table, Text } from "@mantine/core";
import { FaCircleInfo, FaPencil, FaTrashCan } from "react-icons/fa6";
import { useGroupsByUser } from "@/queries/GroupQueries";
import { useUserSession } from "@/hooks/useUserSession";
import { useDisclosure } from "@mantine/hooks";
import { ModalGroup } from "@/components/perfil/ModalGroup";
import { useMemo, useState } from "react";
import { GroupTelegram } from "@/interfaces/GroupTelegram";

export const PerfilGroupsTab = () => {
    const { session } = useUserSession();
    const { data: groups, isPending } = useGroupsByUser(session?.userId);

    const [openedModal, { open: openModal, close: closeModal }] = useDisclosure(false);
    const [selectedGroup, setSelectedGroup] = useState<GroupTelegram | null>();

    const orderedGroups = useMemo(() => groups?.sort((a, b) => a.name.localeCompare(b.name)), [groups]);

    return (
        <>
            <Stack align={"center"}>
                <Stack w={500}>
                    <Alert w={"100%"} title={"Informações"} icon={<FaCircleInfo />}>
                        <Text size={"sm"} c={"blue"}>
                            Para inserir um grupo, clique em "Novo Grupo"
                        </Text>
                    </Alert>
                    <Button
                        disabled={isPending}
                        onClick={() => {
                            setSelectedGroup(null);
                            openModal();
                        }}
                    >
                        Novo Grupo
                    </Button>
                    <Table>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Nome</Table.Th>
                                <Table.Th w={100}>ID</Table.Th>
                                <Table.Th w={100} />
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {orderedGroups &&
                                orderedGroups.length > 0 &&
                                orderedGroups.map((group) => (
                                    <Table.Tr key={group.id}>
                                        <Table.Td>{group.name}</Table.Td>
                                        <Table.Td>{group.groupId}</Table.Td>
                                        <Table.Td>
                                            <Group>
                                                <Box
                                                    onClick={() => {
                                                        setSelectedGroup(group);
                                                        openModal();
                                                    }}
                                                    className={"cursor-pointer"}
                                                >
                                                    <FaPencil />
                                                </Box>
                                                <Box>
                                                    <FaTrashCan className={"cursor-pointer"} />
                                                </Box>
                                            </Group>
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
            <ModalGroup opened={openedModal} onClose={closeModal} selectedGroup={selectedGroup} />
        </>
    );
};
