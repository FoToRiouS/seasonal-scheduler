import React from "react";
import {MenuItemInfo} from "./Template.tsx";
import {useNavigate} from "react-router-dom";
import {NavLink} from "@mantine/core";

interface MobileNavbarItemProps {
    item: MenuItemInfo
}
export const MobileNavbarItem: React.FC<MobileNavbarItemProps> = ({item}) => {
    const navigate = useNavigate();

    return(<>
        {
            !item.subItems &&
            <NavLink label={item.nome} onClick={() => navigate(item.link as string)} w="100%"/>
        }
        {
            item.subItems &&
            <>
            <NavLink label={item.nome}>
                {
                    item.subItems?.map(si => {
                        return <NavLink label={si.nome} onClick={() => navigate(si.link as string)} w="100%"/>
                    })
                }
            </NavLink>
            </>
        }
    </>)
}