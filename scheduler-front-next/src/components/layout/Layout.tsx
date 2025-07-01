"use client";
import { Group, Image, Stack } from "@mantine/core";
import { MenuItem } from "@/components/layout/MenuItem";
import { createContext, useState } from "react";

export interface MenuItemDefinition {
    key: string;
    link: string;
    label: string;
    atRight?: boolean;
}

interface LayoutContextProps {
    activePageKey: string;
    setActivePage: (key: string) => void;
}

export const LayoutContext = createContext<LayoutContextProps>({} as LayoutContextProps);

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const [activePageKey, setActivePageKey] = useState("");

    const menuItemsNotLogged: MenuItemDefinition[] = [
        { key: "list", link: "/lista", label: "Lista" },
        { key: "register", link: "/cadastro", label: "Cadastra-se", atRight: true },
        { key: "login", link: "/login", label: "Login", atRight: true },
    ];

    return (
        <LayoutContext.Provider value={{ activePageKey: activePageKey, setActivePage: setActivePageKey }}>
            <Stack className={"bg-[#FDFDFD]"} gap={"xl"}>
                <Group className={"bg-[#2C3E50]"} h={80}>
                    <Image src={"/logo.png"} alt={"logo"} w={150} mr={"xl"} />
                    <Group h={"100%"} gap={0}>
                        {menuItemsNotLogged
                            .filter((item) => !item.atRight)
                            .map((item) => (
                                <MenuItem key={item.key} item={item} />
                            ))}
                    </Group>
                    <Group ml={"auto"} h={"100%"} gap={0}>
                        {menuItemsNotLogged
                            .filter((item) => item.atRight)
                            .map((item) => (
                                <MenuItem key={item.key} item={item} />
                            ))}
                    </Group>
                </Group>

                {children}
            </Stack>
        </LayoutContext.Provider>
    );
};
