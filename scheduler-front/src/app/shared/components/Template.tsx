import React, {ReactNode} from "react";
import {MobileMenu} from "./MobileMenu.tsx";
import {Box, Button, Center, Group, Image} from "@mantine/core";
import {useNavigate} from "react-router-dom";

interface TemplateProps {
    children: ReactNode
}

export interface MenuItemInfo {
    nome: string;
    link?: string
    subItems?: MenuItemInfo[]
}

export const Template: React.FC<TemplateProps> = ({children}) => {
    const navigate = useNavigate();

    const items: MenuItemInfo[] = [
        {nome: "Animes", subItems: [
                {nome: "Animes da Temporada", link: "/animes/list"},
                {nome: "Calendário", link: "/animes/schedule"}
            ]}
    ]

    return(<>
        <Group c="white"  miw="100%" h={100} mb={50} px={50} position="center"
           sx={(theme) => ({
               boxShadow: "0px 4px 20px -3px rgba(0,0,0,0.75)",
               backgroundImage: theme.fn.gradient({ from: 'red.9', to: 'grape.9', deg: 0 }),
            })}>
            <MobileMenu menuItems={items}/>
            <Center>
                <Button variant="gradient" gradient={{ from: 'red.9', to: 'grape.9' }} onClick={() => navigate("/animes/list")}>Lista</Button>
                <Box w={200} mx="lg">
                    <Image fit="contain" src="/logo.png"/>
                </Box>
                <Button variant="gradient" gradient={{ from: 'red.9', to: 'grape.9' }} onClick={() => navigate("/animes/schedule")}>Calendário</Button>
            </Center>
        </Group>
        <Box>
            {children}
        </Box>
    </>)

}