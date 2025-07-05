"use client";
import { Title } from "@mantine/core";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { useUserSession } from "@/hooks/useUserSession";

export const CalendarioPage = () => {
    useSetActivePage("calendar");
    const user = useUserSession();

    return <Title>{user?.name}</Title>;
};
