import React from "react";
import {MenuItemInfo} from "./Template.tsx";
import {Button, Collapse, useDisclosure, VStack} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faCircleChevronDown} from "@fortawesome/free-solid-svg-icons";

interface MobileNavbarItemProps {
    item: MenuItemInfo
}
export const MobileNavbarItem: React.FC<MobileNavbarItemProps> = ({item}) => {
    const navigate = useNavigate();
    const {isOpen, onToggle} = useDisclosure();

    return(<>
        <VStack align={"start"}>
            {
                !item.subItems &&
                <Button variant="link" onClick={() => navigate(item.link as string)}>{item.nome}</Button>
            }
            {
                item.subItems &&
                <>
                <Button variant="link" onClick={onToggle}
                        rightIcon={
                            isOpen ? <FontAwesomeIcon icon={faChevronDown}/> : <FontAwesomeIcon icon={faCircleChevronDown} />
                        }>{item.nome}</Button>
                <Collapse in={isOpen} animateOpacity>
                    <VStack align={"start"}>
                        {
                            item.subItems?.map(si => {
                                return <Button ms={5} variant="link" onClick={() => navigate(si.link as string)}>{si.nome}</Button>
                            })
                        }
                    </VStack>
                </Collapse>
                </>
            }
        </VStack>
    </>)
}