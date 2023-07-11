import React, {ReactNode} from "react";
import {Flex, Heading, HStack} from "@chakra-ui/react";
import {MobileMenu} from "./MobileMenu.tsx";
import {DesktopMenu} from "./DesktopMenu.tsx";

interface TemplateProps {
    children: ReactNode
}

export interface MenuItemInfo {
    nome: string;
    link?: string
    subItems?: MenuItemInfo[]
}

export const Template: React.FC<TemplateProps> = ({children}) => {

    const items: MenuItemInfo[] = [
        {nome: "Animes", subItems: [
                {nome: "Animes da Temporada", link: "/animes"},
                {nome: "Calendário", link: ""}
            ]},
        // {nome: "Animes da Temporada", link: "/animes"},
        // {nome: "Calendário", link: ""},
        {nome: "Login", link: "/login"}
    ]

    return(<>
        <HStack bg="blackAlpha.200" boxShadow="xl" minW={"full"} minH={"100px"} mb={16} px={10}>
            <MobileMenu menuItems={items}/>
            <Flex flex="1">
                <Heading mx={{base: "auto", lg: "0"}}>Menu</Heading>
            </Flex>
            <DesktopMenu menuItems={items}/>
        </HStack>
        {children}
    </>)

}