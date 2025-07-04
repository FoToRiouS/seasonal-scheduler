"use client";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { Stack, Title } from "@mantine/core";
import { useSession } from "@/hooks/useSession";

export const ListaPage = () => {
    useSetActivePage("list");
    const session = useSession();

    return (
        <Stack>
            <Title>{JSON.stringify(session)}</Title>
        </Stack>
    );
};
