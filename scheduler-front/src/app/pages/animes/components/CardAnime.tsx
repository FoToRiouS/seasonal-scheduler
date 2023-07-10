import React from "react";
import {Button, Card, CardBody, CardFooter, Flex, Heading, Image, Spacer} from "@chakra-ui/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";

interface ICardAnimeProps {
    image: string,
    jpnName: string,
    engName: string
    onOpen: () => void
}

const fontSize = "md"

export const CardAnime: React.FC<ICardAnimeProps> = ({image, jpnName, engName, onOpen}) => {
    return (
        <>
            <Card bg={"blackAlpha.800"} maxW={"sm"} minW={"sm"} minH={"full"}>
                <CardBody>
                    <Flex minW={"full"} maxH={450} mb={3} overflow={"hidden"} justify={"center"} align={"center"} borderRadius={"lg"} border={"1px"} borderColor={"white"} >
                        <Image src={image} alt={jpnName} borderRadius={"lg"}/>
                    </Flex>
                    <Spacer/>
                    <Flex direction={"column"} align={"center"}>
                        <Heading color={"white"} fontSize={fontSize} textAlign={"center"} mb={2}>{jpnName}</Heading>
                        <Heading color={"white"} fontSize={fontSize} textAlign={"center"}>{engName}</Heading>
                    </Flex>
                </CardBody>
                <CardFooter display={"flex"} justify={"end"}>
                    <Button leftIcon={<FontAwesomeIcon icon={faEye}/>} onClick={onOpen}>Info</Button>
                </CardFooter>
            </Card>
        </>
    )
}