import React, {ReactNode} from "react";
import {MobileMenu} from "./MobileMenu.tsx";
import {DesktopMenu} from "./DesktopMenu.tsx";
import {Box, Group, Title} from "@mantine/core";

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
                {nome: "Animes da Temporada", link: "/animes/list"},
                {nome: "Calendário", link: "/animes/schedule"}
            ]},
        {nome: "Login", link: "/login"}
    ]

    return(<>
        <Group c="white"  miw="100%" mih={100} mb={50} px={50} position="center"
           sx={(theme) => ({
               boxShadow: "0px 4px 20px -3px rgba(0,0,0,0.75)",
               backgroundImage: theme.fn.gradient({ from: 'grape.9', to: 'grape.6', deg: 0 }),
            })}>
            <MobileMenu menuItems={items}/>
            <Title mx={{base: "auto", md: "0"}}>Menu</Title>
            <DesktopMenu menuItems={items}/>
        </Group>
        <Box>
            {children}
        </Box>
    </>)

}