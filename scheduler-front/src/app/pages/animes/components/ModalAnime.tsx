import {
    Box,
    Button,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    SimpleGrid,
    Spacer,
    Stack,
    Text
} from "@chakra-ui/react";
import React, {useContext, useState} from "react";
import {getDayOfExhibition} from "../../../shared/services/api/animes/AnimesService.ts";
import {IAnime} from "../../../shared/interfaces/IAnime.ts";
import {SeasonContext} from "../Animes.tsx";


interface IModalAnimeProps {
    isOpen: boolean
    onClose: () => void
    anime: IAnime
}

export const ModalAnime : React.FC<IModalAnimeProps> = ({isOpen, onClose,  anime}) => {
    const {alternativeTitles, title, mainPicture, broadcast, mean} = anime;

    const [colorScheme, setColorScheme] = useState("outline")

    const {season, year} = useContext(SeasonContext);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered size={"4xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader noOfLines={1}>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody mb={5}>
                        <SimpleGrid columns={[1,null,2]} gap={10}>
                            <Box boxShadow={"dark-lg"} borderRadius={"lg"} overflow={"hidden"}>
                                <Image src={mainPicture.large} w={"full"}/>
                            </Box>
                            <Stack>
                                <HStack spacing={3}>
                                    <Text as={"b"}>Nome:</Text>
                                    <Text>
                                        {title}
                                        {alternativeTitles.en ? " ("+alternativeTitles.en+")" : undefined}
                                    </Text>
                                </HStack>
                                {
                                    mean ?
                                    <HStack spacing={3}>
                                        <Text as={"b"}>Score:</Text>
                                        <Text>{mean}</Text>
                                    </HStack>
                                    : undefined
                                }

                                {
                                    broadcast ? (
                                        <HStack spacing={3}>
                                            <Text as={"b"}>Exibição:</Text>
                                            <Text textTransform={"capitalize"}>{getDayOfExhibition(broadcast.day_of_the_week, broadcast.start_time)}</Text>
                                        </HStack>
                                    ) : undefined
                                }
                                <Spacer/>
                                <Button variant={colorScheme} colorScheme={"green"}
                                        onMouseEnter={() => setColorScheme("solid")}
                                        onMouseLeave={() => setColorScheme("outline")}>
                                    Adicionar a Temporada
                                </Button>
                            </Stack>
                        </SimpleGrid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}