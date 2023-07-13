import {
    Box,
    Button,
    Divider,
    FormControl,
    FormLabel,
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
    Text,
    Textarea
} from "@chakra-ui/react";
import React, {useContext, useEffect, useState} from "react";
import {getDayOfExhibition} from "../../../shared/services/AnimesService.ts";
import {IAnime} from "../../../shared/interfaces/IAnime.ts";
import {SeasonContext} from "../Animes.tsx";
import {getAnimeSeasonByParameters} from "../../../shared/hooks/backend/getAnimeSeasonByParameters.ts";
import {saveAnimeSeason} from "../../../shared/hooks/backend/saveAnimeSeason.ts";
import {IAnimeSeason} from "../../../shared/interfaces/IAnimeSeason.ts";


interface IModalAnimeProps {
    isOpen: boolean
    onClose: () => void
    anime: IAnime
}

export const ModalAnime : React.FC<IModalAnimeProps> = ({isOpen, onClose,  anime}) => {
    const {id, alternativeTitles, title, mainPicture, broadcast, mean} = anime;

    const {season, year} = useContext(SeasonContext);
    const [colorScheme, setColorScheme] = useState("outline")

    const {data: animeSeason} = getAnimeSeasonByParameters(id, year, season)
    const {mutate, } = saveAnimeSeason(anime.id, year, season);

    const handleSaveAnimeSeason = () => {
        const animeSeason: IAnimeSeason = {
            idAnime: anime.id.toString(),
            season: {
                season: season,
                year: year
            }
        }
        mutate(animeSeason);
    }

    useEffect(() => {
        console.log(animeSeason)
    }, [])

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

                                {
                                    animeSeason && <>
                                        <Divider my={5}/>
                                        <FormControl>
                                            <FormLabel>Preview</FormLabel>
                                            <Textarea resize="none"/>
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Review</FormLabel>
                                            <Textarea resize="none"/>
                                        </FormControl>
                                        <Spacer/>
                                        <Button variant={colorScheme} colorScheme={"blue"}
                                                onMouseEnter={() => setColorScheme("solid")}
                                                onMouseLeave={() => setColorScheme("outline")}
                                                onClick={handleSaveAnimeSeason}>
                                            Salvar
                                        </Button>
                                    </>
                                }
                                {
                                    !animeSeason && <>
                                        <Spacer/>
                                        <Button variant={colorScheme} colorScheme={"green"}
                                                onMouseEnter={() => setColorScheme("solid")}
                                                onMouseLeave={() => setColorScheme("outline")}
                                                onClick={handleSaveAnimeSeason}>
                                            Adicionar a Temporada
                                        </Button>
                                    </>
                                }

                            </Stack>
                        </SimpleGrid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )

}