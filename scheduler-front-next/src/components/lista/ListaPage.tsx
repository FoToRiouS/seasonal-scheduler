"use client";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { useGetAllUsers } from "@/queries/UserQueries";
import { Stack, Title } from "@mantine/core";
import { useSession } from "@/hooks/useSession";

export const ListaPage = () => {
    useSetActivePage("list");

    const { data } = useGetAllUsers();

    const session = useSession();

    return (
        <Stack>
            {data?.map((user) => (
                <Title key={user.id}>{JSON.stringify(user)}</Title>
            ))}
            <Title>{JSON.stringify(session)}</Title>
        </Stack>
    );
};
