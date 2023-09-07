import {Flex, Group, Text} from "@mantine/core";
import React from "react";
import {useWatchServiceList} from "../../../shared/hooks/backend/useWatchServiceList.ts";

export const ServicesAnime : React.FC<{services: string[]}> = ({services}) => {
    const {data: watchServices, isSuccess} = useWatchServiceList();

    return(
        <Flex mt="auto" justify="center" align="center" bg="gray" px="sm" sx={{borderRadius: "2rem", background: "rgba(169, 169, 169, 0.5)"}}>
            <Text>S</Text>
            <Group ml="auto">
            {
                isSuccess &&
                services.map(s => (
                    <Text>{
                        watchServices!.find(w => w.id === s)!.name.charAt(0)
                    }</Text>)
                )
            }
            </Group>
        </Flex>
    )
}