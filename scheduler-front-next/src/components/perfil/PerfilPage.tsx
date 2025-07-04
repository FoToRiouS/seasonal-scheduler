"use client";
import { Tabs } from "@mantine/core";

export const PerfilPage = () => {
    return (
        <Tabs orientation={"vertical"} defaultValue={"profile"}>
            <Tabs.List>
                <Tabs.Tab value="profile">Perfil</Tabs.Tab>
                <Tabs.Tab value="telegram">Grupos Telegram</Tabs.Tab>
                <Tabs.Tab value="password">Alterar Senha</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="profile">Perfil</Tabs.Panel>
            <Tabs.Panel value="telegram">Grupos Telegram</Tabs.Panel>
            <Tabs.Panel value="password">Alterar Senha</Tabs.Panel>
        </Tabs>
    );
};
