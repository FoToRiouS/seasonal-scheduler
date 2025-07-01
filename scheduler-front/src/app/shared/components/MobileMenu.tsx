import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { MenuItemInfo } from "./Template.tsx";
import { MobileNavbarItem } from "./MobileNavbarItem.tsx";
import { ActionIcon, Box, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

interface MobileMenuProps {
    menuItems: MenuItemInfo[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ menuItems }) => {
    const [opened, { open, close }] = useDisclosure();

    return (
        <>
            <Box display={{ base: "block", lg: "none" }} pos="absolute">
                <ActionIcon>
                    <FontAwesomeIcon icon={faBars} onClick={open} size="2x" />
                </ActionIcon>
                <Drawer opened={opened} position="left" onClose={close} title="Menu">
                    <Drawer.Body px={0}>
                        {menuItems.map((item) => {
                            return <MobileNavbarItem key={item.nome} item={item} />;
                        })}
                    </Drawer.Body>
                </Drawer>
            </Box>
        </>
    );
};
