import {Box, Flex, Group, Image} from "@mantine/core";
import React from "react";
import {useWatchServicesFunctions} from "../../../shared/hooks/backend/useWatchServicesFunctions.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTv} from "@fortawesome/free-solid-svg-icons";

export const ServicesAnime : React.FC<{services: string[]}> = ({services}) => {
    const {getIcon} = useWatchServicesFunctions();

    return(
        <Flex mt="auto" justify="center" align="center" bg="gray" px="sm" py={5} sx={{borderRadius: "2rem", background: "rgba(169, 169, 169, 0.5)"}}>
            <Box><FontAwesomeIcon icon={faTv} style={{color: "yellow"}}/></Box>
            <Group ml="auto">
            {
                services.map(s => (
                    <Box>
                        <Image src={getIcon(s)}/>
                    </Box>
                ))
            }
            </Group>
        </Flex>
    )
}