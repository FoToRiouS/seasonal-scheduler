import { Alert, Button, Center, Stack, Table, Text } from "@mantine/core";
import { FaCircleInfo } from "react-icons/fa6";
import { useGroupsByUser } from "@/queries/GroupQueries";
import { useUserSession } from "@/hooks/useUserSession";

export const PerfilGroupsTab = () => {
    const { session } = useUserSession();
    const { data: groups, isPending } = useGroupsByUser(session?.userId);

    return (
        <Stack align={"center"}>
            <Stack w={500}>
                <Alert w={"100%"} title={"Informações"} icon={<FaCircleInfo />}>
                    <Text size={"sm"} c={"blue"}>
                        Para inserir um grupo, clique em "Novo Grupo"
                    </Text>
                </Alert>
                <Button disabled={isPending}>Novo Grupo</Button>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Nome</Table.Th>
                            <Table.Th w={100}>ID</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {groups &&
                            groups.length > 0 &&
                            groups.map((group) => (
                                <Table.Tr key={group.id}>
                                    <Table.Td>{group.name}</Table.Td>
                                    <Table.Td>{group.id}</Table.Td>
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
    );
};
