import {
    Box,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {MenuItemInfo} from "./Template.tsx";
import {MobileNavbarItem} from "./MobileNavbarItem.tsx";

interface MobileMenuProps {
    menuItems: MenuItemInfo[]
}

export const MobileMenu: React.FC<MobileMenuProps> = ({menuItems}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();

    return(<>
        <Box display={{base: "block", lg: "none"}} pos="absolute">
            <IconButton variant="outline" borderColor={"black"} icon={<FontAwesomeIcon icon={faBars} />} aria-label="Toogle Menu" onClick={onOpen}/>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <VStack align="start" spacing={5}>
                            {
                                menuItems.map((item) => {
                                    return <MobileNavbarItem item={item}/>
                                })
                            }
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    </>)

}