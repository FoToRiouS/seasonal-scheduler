import React, {ReactNode} from "react";
import {MobileMenu} from "./MobileMenu.tsx";
import {DesktopMenu} from "./DesktopMenu.tsx";
import {Group, Title} from "@mantine/core";

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
        <Group bg="gray.2"  miw="100%" mih={100} mb={50} px={50} sx={{boxShadow: "0px 4px 20px -3px rgba(0,0,0,0.75)"}}>
            <MobileMenu menuItems={items}/>
            <Title mx={{base: "auto", md: "0"}}>Menu</Title>
            <DesktopMenu menuItems={items}/>
        </Group>
        {children}
    </>)

}