import React from "react";
import {MenuItemInfo} from "./Template.tsx";
import {DesktopNavbarItem} from "./DesktopNavbarItem.tsx";
import {Group} from "@mantine/core";

interface DesktopMenuProps {
    menuItems: MenuItemInfo[]
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({menuItems}) => {
    return (<>
        <Group ml="auto" display={{base: "none", lg: "flex"}}>
        {
            menuItems.map((item) => {
                return <DesktopNavbarItem item={item}/>
            })
        }
        </Group>
    </>)
}