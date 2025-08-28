import { Group, Image, ThemeIcon, Tooltip } from "@mantine/core";
import React from "react";
import { AnimeBackend } from "@/interfaces/AnimeBackend";

interface Props {
    animeBack: AnimeBackend;
}

export const ServicesAnime = ({ animeBack }: Props) => {
    const services = animeBack.watchServices;

    return (
        <Group m={"sm"} gap={10}>
            {services.map((s) => (
                <Tooltip key={s.id} label={s.name}>
                    <ThemeIcon key={s.id} color={"dark.9"} radius={"xl"} size={"lg"} p={3}>
                        <Image src={s.imageSrc} />
                    </ThemeIcon>
                </Tooltip>
            ))}
        </Group>
    );
};
