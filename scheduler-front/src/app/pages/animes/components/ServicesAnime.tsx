import {Box, Group, Image} from "@mantine/core";
import React from "react";
import {useWatchServicesFunctions} from "../../../shared/hooks/backend/useWatchServicesFunctions.ts";

export const ServicesAnime : React.FC<{services: string[]}> = ({services}) => {
    const {getIcon} = useWatchServicesFunctions();

    return(
        <Group px="sm" py={5} sx={{borderRadius: "2rem", backgroundColor: "rgb(0,0,0,.4)"}} pos="absolute" top={5} left={5}>
            {
                services.map(s => (
                    <Box key={s}>
                        <Image src={getIcon(s)}/>
                    </Box>
                ))
            }
        </Group>
    )
}