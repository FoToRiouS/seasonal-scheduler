import React from "react";
import {MenuItemInfo} from "./Template.tsx";
import {DesktopNavbarItem} from "./DesktopNavbarItem.tsx";
import {HStack} from "@chakra-ui/react";

interface DesktopMenuProps {
    menuItems: MenuItemInfo[]
}

export const DesktopMenu: React.FC<DesktopMenuProps> = ({menuItems}) => {
    return (<>
        <HStack spacing={5} display={{base: "none", lg: "flex"}}>
        {
            menuItems.map((item) => {
                return <DesktopNavbarItem item={item}/>
            })
        }
        </HStack>
    </>)
}