"use client";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { useGetAllUsers } from "@/queries/UserQueries";
import { Stack, Title } from "@mantine/core";

export const ListaPage = () => {
    useSetActivePage("list");

    const { data } = useGetAllUsers();

    return (
        <Stack>
            {data?.map((user) => (
                <Title key={user.id}>{JSON.stringify(user)}</Title>
            ))}
        </Stack>
    );
};
