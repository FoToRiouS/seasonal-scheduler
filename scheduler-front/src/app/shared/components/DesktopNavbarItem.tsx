import React from "react";
import {MenuItemInfo} from "./Template.tsx";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {Button, Menu} from "@mantine/core";

interface DesktopNavbarItemProps {
    item: MenuItemInfo
}
export const DesktopNavbarItem: React.FC<DesktopNavbarItemProps> = ({item}) => {
    const navigate = useNavigate();

    return(<>
        {
            !item.subItems &&
            <Button variant="subtle" color="gray" onClick={() => navigate(item.link as string)}>{item.nome}</Button>
        }
        {
            item.subItems &&
            <Menu withArrow arrowPosition={"center"}>
                <Menu.Target>
                    <Button variant="subtle" color="gray" rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                        {item.nome}
                    </Button>
                </Menu.Target>
                <Menu.Dropdown>
                    {
                        item.subItems?.map(si => {
                            return <Menu.Item key={si.nome} onClick={() => navigate(si.link as string)}>{si.nome}</Menu.Item>
                        })
                    }
                </Menu.Dropdown>
            </Menu>
        }
    </>)
}