import { Box, Group, Image } from "@mantine/core";
import React from "react";
import { AnimeBackend } from "@/interfaces/AnimeBackend";

interface Props {
    animeBack: AnimeBackend;
}

export const ServicesAnime = ({ animeBack }: Props) => {
    const services = animeBack.watchServices;

    return (
        <Group
            px="sm"
            py={5}
            m={"sm"}
            style={{ borderRadius: "2rem", backgroundColor: "rgb(0,0,0,.4)", flexGrow: 0 }}
        >
            {services.map((s) => (
                <Box key={s.id}>
                    <Image src={s.imageSrc} />
                </Box>
            ))}
        </Group>
    );
};
