"use client";
import { Title } from "@mantine/core";
import { useSetActivePage } from "@/hooks/useSetActivePage";
import { useGetUserSession } from "@/hooks/useGetUserSession";

export const CalendarioPage = () => {
    useSetActivePage("calendar");
    const user = useGetUserSession();

    return <Title>{user?.name}</Title>;
};
