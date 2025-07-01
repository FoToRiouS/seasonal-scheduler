import React from "react";
import { MenuItemInfo } from "./Template.tsx";
import { DesktopNavbarItem } from "./DesktopNavbarItem.tsx";
import { Group } from "@mantine/core";

interface DesktopMenuProps {
    menuItems: MenuItemInfo[];
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({ menuItems }) => {
    return (
        <>
            <Group ml="auto" h="100%" display={{ base: "none", lg: "flex" }}>
                {menuItems.map((item) => {
                    return <DesktopNavbarItem key={item.nome} item={item} />;
                })}
            </Group>
        </>
    );
};
