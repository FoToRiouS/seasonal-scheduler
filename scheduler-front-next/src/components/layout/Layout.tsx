"use client";
import { Group, Image, Stack } from "@mantine/core";
import { MenuItem } from "@/components/layout/MenuItem";
import React, { createContext, ReactNode, useMemo, useState } from "react";
import { signOut } from "@/actions/SecurityActions";
import { RxExit } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/hooks/useUserSession";

export interface MenuItemDefinition {
    key: string;
    link?: string;
    label: string;
    icon?: ReactNode;
    atRight?: boolean;
    onClick?: () => void;
    subItems?: MenuItemDefinition[];
}

interface LayoutContextProps {
    activePageKey: string;
    setActivePage: (key: string) => void;
}

export const LayoutContext = createContext<LayoutContextProps>({} as LayoutContextProps);

export interface LayoutProps extends React.PropsWithChildren {}

export const Layout = ({ children }: LayoutProps) => {
    const { user, session } = useUserSession();
    const router = useRouter();
    const [activePageKey, setActivePageKey] = useState("");

    const username = useMemo(() => (user ? user.username : ""), [user]);

    const handleLogout = async () => {
        await signOut();
        router.push("/login");
    };

    const menuItemsNotLogged: MenuItemDefinition[] = [
        { key: "list", link: "/lista", label: "Lista" },
        { key: "register", link: "/cadastro", label: "Cadastra-se", atRight: true },
        { key: "login", link: "/login", label: "Login", atRight: true },
    ];

    const menuItemsLogged: MenuItemDefinition[] = [
        { key: "list", link: "/lista", label: "Lista" },
        { key: "calendar", link: "/calendario", label: "Calendário" },
        {
            key: "profile",
            label: username,
            atRight: true,
            subItems: [
                { key: "sub-profile", link: "/perfil", label: "Perfil", icon: <CgProfile /> },
                { key: "logout", onClick: handleLogout, label: "Sair", icon: <RxExit /> },
            ],
        },
    ];

    const actualMenuItems = useMemo(
        () => (session ? menuItemsLogged : menuItemsNotLogged),
        [session, menuItemsLogged, menuItemsNotLogged],
    );

    return (
        <LayoutContext.Provider value={{ activePageKey: activePageKey, setActivePage: setActivePageKey }}>
            <Stack className={"bg-[#FDFDFD]"} gap={"xl"} pb={"xl"}>
                <Group className={"bg-[#2C3E50]"} h={80}>
                    <Image src={"/logo.png"} alt={"logo"} w={150} mr={"xl"} />
                    <Group h={"100%"} gap={0}>
                        {actualMenuItems
                            .filter((item) => !item.atRight)
                            .map((item) => (
                                <MenuItem key={item.key} item={item} />
                            ))}
                    </Group>
                    <Group ml={"auto"} h={"100%"} gap={0}>
                        {actualMenuItems
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
