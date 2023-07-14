import React, {useContext, useEffect, useState} from "react";
import {getDayOfExhibition} from "../../../shared/services/AnimesService.ts";
import {IAnime} from "../../../shared/interfaces/IAnime.ts";
import {SeasonContext} from "../Animes.tsx";
import {getAnimeSeasonByParameters} from "../../../shared/hooks/backend/getAnimeSeasonByParameters.ts";
import {saveAnimeSeason} from "../../../shared/hooks/backend/saveAnimeSeason.ts";
import {IAnimeSeason} from "../../../shared/interfaces/IAnimeSeason.ts";
import {Button, Grid, Group, Image, Menu, Modal, Stack, Text, Textarea} from "@mantine/core";
import Divider = Menu.Divider;


interface IModalAnimeProps {
    isOpen: boolean
    onClose: () => void
    anime: IAnime
}

function Spacer() {
    return null;
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
            <Modal opened={isOpen} onClose={onClose} title={title}  centered size="xl">
                <Grid>
                    <Grid.Col span={6}>
                        <Image src={mainPicture.large} w="100%" radius="md"/>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Stack>
                            <Group spacing={3}>
                                <Text fw="bold">Nome:</Text>
                                <Text>
                                    {title}
                                    {alternativeTitles.en ? " ("+alternativeTitles.en+")" : undefined}
                                </Text>
                            </Group>
                            {
                                mean ?
                                    <Group spacing={3}>
                                        <Text fw="bold">Score:</Text>
                                        <Text>{mean}</Text>
                                    </Group>
                                    : undefined
                            }

                            {
                                broadcast ? (
                                    <Group spacing={3}>
                                        <Text fw="bold">Exibição:</Text>
                                        <Text tt={"capitalize"}>{getDayOfExhibition(broadcast.day_of_the_week, broadcast.start_time)}</Text>
                                    </Group>
                                ) : undefined
                            }

                            {
                                animeSeason && <>
                                    <Divider my={5}/>
                                    <Textarea label="Preview"/>
                                    <Textarea label="review"/>
                                    <Button variant={colorScheme} color={"blue"}
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
                                    <Button variant={colorScheme} color={"green"}
                                            onMouseEnter={() => setColorScheme("solid")}
                                            onMouseLeave={() => setColorScheme("outline")}
                                            onClick={handleSaveAnimeSeason}>
                                        Adicionar a Temporada
                                    </Button>
                                </>
                            }

                        </Stack>
                    </Grid.Col>
                </Grid>
            </Modal>
        </>
    )

}