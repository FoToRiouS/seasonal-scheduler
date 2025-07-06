"use client";
import { MenuItemDefinition } from "@/components/layout/Layout";
import { Center, Group, Menu, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useLayoutContext } from "@/hooks/useLayoutContext";
import { useMemo } from "react";
import { FaChevronDown } from "react-icons/fa6";
import classes from "./MenuItem.module.css";

interface Props {
    item: MenuItemDefinition;
}

export const MenuItem = ({ item }: Props) => {
    const router = useRouter();
    const { activePageKey } = useLayoutContext();

    const menuItemStyle = useMemo(
        () =>
            activePageKey === item.key ? "bg-white/15 cursor-pointer" : "hover:bg-white/15 cursor-pointer",
        [activePageKey],
    );

    const handleOnClick = (item: MenuItemDefinition) => {
        if (item.onClick) {
            item.onClick();
        } else {
            router.push(item.link!);
        }
    };

    const titleElement = (
        <Group gap={"xs"}>
            {item.prefix && item.prefix}
            <Title c={"white"} fw={"bold"} order={4}>
                {item.label}
            </Title>
        </Group>
    );

    return !item.subItems ?
            <Center h={"100%"} px={"md"} className={menuItemStyle} onClick={() => handleOnClick(item)}>
                {titleElement}
            </Center>
        :   <Menu offset={0} width="target" classNames={classes}>
                <Menu.Target>
                    <Center h={"100%"} px={"md"} className={"cursor-pointer"}>
                        <Group>
                            {titleElement}
                            <FaChevronDown className={"text-white"} />
                        </Group>
                    </Center>
                </Menu.Target>
                <Menu.Dropdown>
                    {item.subItems.map((subItem) => (
                        <Menu.Item
                            key={subItem.key}
                            onClick={() => handleOnClick(subItem)}
                            leftSection={subItem.icon || undefined}
                        >
                            {subItem.label}
                        </Menu.Item>
                    ))}
                </Menu.Dropdown>
            </Menu>;
};
