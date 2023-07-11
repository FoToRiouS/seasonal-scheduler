import React from "react";
import {MenuItemInfo} from "./Template.tsx";
import {Button, Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";

interface DesktopNavbarItemProps {
    item: MenuItemInfo
}
export const DesktopNavbarItem: React.FC<DesktopNavbarItemProps> = ({item}) => {
    const navigate = useNavigate();

    return(<>
        {
            !item.subItems &&
            <Button variant="link" onClick={() => navigate(item.link as string)}>{item.nome}</Button>
        }
        {
            item.subItems &&
            <Menu>
                <MenuButton as={Button} variant="link" rightIcon={<FontAwesomeIcon icon={faChevronDown} />}>
                    {item.nome}
                </MenuButton>
                <MenuList>
                    {
                        item.subItems?.map(si => {
                            return <MenuItem as="a" href={si.link}>{si.nome}</MenuItem>
                        })
                    }
                </MenuList>
            </Menu>
        }
    </>)
}