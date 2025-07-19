"use client";
import { Tabs } from "@mantine/core";
import { PerfilDataTab } from "@/components/perfil/PerfilDataTab";
import { PerfilPasswordTab } from "@/components/perfil/PerfilPasswordTab";
import { PerfilGroupsTab } from "@/components/perfil/PerfilGroupsTab";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useSetActivePage } from "@/hooks/useSetActivePage";

export const PerfilPage = () => {
    useSetActivePage("profile");
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    if (searchParams.get("tab") === "true") {
    }

    const activeTab = useMemo(() => {
        const activeTab = searchParams.get("tab");
        if (activeTab) {
            return activeTab;
        } else {
            return "profile";
        }
    }, [searchParams.get("tab")]);

    return (
        <Tabs
            orientation={"vertical"}
            defaultValue={"profile"}
            value={activeTab}
            onChange={(tab) => router.push(`${pathname}?tab=${tab}`)}
        >
            <Tabs.List>
                <Tabs.Tab value="profile">Perfil</Tabs.Tab>
                <Tabs.Tab value="telegram">Grupos Telegram</Tabs.Tab>
                <Tabs.Tab value="password">Alterar Senha</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="profile">
                <PerfilDataTab />
            </Tabs.Panel>
            <Tabs.Panel value="telegram">
                <PerfilGroupsTab />
            </Tabs.Panel>
            <Tabs.Panel value="password">
                <PerfilPasswordTab />
            </Tabs.Panel>
        </Tabs>
    );
};
