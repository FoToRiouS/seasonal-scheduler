"use client";
import { MenuItemDefinition } from "@/components/layout/Layout";
import { Center, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useLayoutContext } from "@/hooks/useLayoutContext";
import { useMemo } from "react";

interface Props {
    item: MenuItemDefinition;
}

export const MenuItem = ({ item }: Props) => {
    const router = useRouter();
    const { activePageKey } = useLayoutContext();

    const menuItemStyle = useMemo(
        () =>
            activePageKey === item.key ? "bg-white/15 cursor-pointer" : "hover:bg-white/15 cursor-pointer",
        [activePageKey],
    );

    return (
        <Center h={"100%"} px={"md"} className={menuItemStyle} onClick={() => router.push(item.link)}>
            <Title c={"white"} fw={"bold"} order={4}>
                {item.label}
            </Title>
        </Center>
    );
};
