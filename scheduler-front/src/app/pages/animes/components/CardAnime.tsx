import React from "react";
import {Card, CardBody, Flex, Heading, Image} from "@chakra-ui/react";

interface ICardAnimeProps {
    image: string,
    jpnName: string,
    engName: string
}

const fontSize = "md"

export const CardAnime: React.FC<ICardAnimeProps> = ({image, jpnName, engName}) => {
    return (
        <Card bg={"blackAlpha.800"} maxW={"sm"} minW={"sm"} minH={"full"}>
            <CardBody>
                <Image src={image} alt={jpnName} borderRadius={"lg"} minW={"full"} mb={3}/>
                <Flex direction={"column"} align={"center"}>
                    <Heading color={"white"} fontSize={fontSize} textAlign={"center"} mb={2}>{jpnName}</Heading>
                    <Heading color={"white"} fontSize={fontSize} textAlign={"center"}>{engName}</Heading>
                </Flex>
            </CardBody>
        </Card>
    )
}