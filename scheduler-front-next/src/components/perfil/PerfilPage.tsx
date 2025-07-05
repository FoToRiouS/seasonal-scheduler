"use client";
import { Tabs } from "@mantine/core";
import { PerfilDataTab } from "@/components/perfil/PerfilDataTab";
import { PerfilPasswordTab } from "@/components/perfil/PerfilPasswordTab";

export const PerfilPage = () => {
    return (
        <Tabs orientation={"vertical"} defaultValue={"profile"}>
            <Tabs.List>
                <Tabs.Tab value="profile">Perfil</Tabs.Tab>
                <Tabs.Tab value="telegram">Grupos Telegram</Tabs.Tab>
                <Tabs.Tab value="password">Alterar Senha</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="profile">
                <PerfilDataTab />
            </Tabs.Panel>
            <Tabs.Panel value="telegram">Grupos Telegram</Tabs.Panel>
            <Tabs.Panel value="password">
                <PerfilPasswordTab />
            </Tabs.Panel>
        </Tabs>
    );
};
