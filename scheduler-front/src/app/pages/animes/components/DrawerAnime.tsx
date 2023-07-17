import React, {useEffect, useState} from "react";
import {getDayOfExhibition} from "../../../shared/services/AnimesService.ts";
import {IAnime} from "../../../shared/interfaces/IAnime.ts";
import {useSaveAnimeSeason} from "../../../shared/hooks/backend/useSaveAnimeSeason.ts";
import {Button, Chip, Divider, Grid, Group, Image, Modal, SimpleGrid, Stack, Text, Textarea} from "@mantine/core";
import {useToggle} from "@mantine/hooks";
import {useWatchServiceList} from "../../../shared/hooks/backend/useWatchServiceList.ts";
import {useUpdateAnimeSeason} from "../../../shared/hooks/backend/useUpdateAnimeSeason.ts";
import {IAnimeSeasonUpdateDTO} from "../../../shared/interfaces/IAnimeSeasonUpdateDTO.ts";
import {IAnimeSeasonSaveDTO} from "../../../shared/interfaces/IAnimeSeasonSaveDTO.ts";
import {useSeasonContext} from "../../../shared/hooks/context/useSeasonContext.ts";
import {IAnimeSeason} from "../../../shared/interfaces/IAnimeSeason.ts";

interface IModalAnimeProps {
    isOpen: boolean
    onClose: () => void
    anime: IAnime | undefined
    animeSeason: IAnimeSeason | undefined
}

export const DrawerAnime : React.FC<IModalAnimeProps> = ({isOpen, onClose,  anime, animeSeason}) => {

    const [value, toggle] = useToggle(["outline", "filled"])
    const {season, year} = useSeasonContext();

    const [services, setServices] = useState([] as string[]);
    const [preview, setPreview] = useState("");
    const [review, setReview] = useState("");

    const {data: watchServices} = useWatchServiceList();

    const {mutate: save, isLoading: isSaving } = useSaveAnimeSeason(anime!.id, year, season);
    const {mutate: update, isLoading: isUpdating } = useUpdateAnimeSeason(anime!.id, year, season);

    const handleSaveAnimeSeason = () => {
        const animeSeason: IAnimeSeasonSaveDTO = {
            idAnime: anime!.id.toString(),
            year: year,
            season: season
        }
        save(animeSeason);
    }

    const handleUpdateAnimeSeason = () => {
        const animeSeasonUpdate: IAnimeSeasonUpdateDTO = {
            id: animeSeason?.id as string,
            previewText: preview,
            reviewText: review,
            services: services
        }
        update(animeSeasonUpdate);
    }

    useEffect(() => {
        if(animeSeason?.idAnime){
            setPreview(animeSeason.previewText ? animeSeason.previewText : "");
            setReview(animeSeason.reviewText ? animeSeason.reviewText : "");
            setServices(animeSeason.services  ? animeSeason.services : [])
        }
    }, [animeSeason])

    return (
        <>
            <Modal opened={isOpen} onClose={onClose} title={anime!.title}  centered size="xl" radius="lg" closeOnClickOutside={false}>
                <Grid columns={2}>
                    <Grid.Col xs={2} lg={1}>
                        <Image src={anime!.mainPicture.large} w="100%" radius="md"/>
                    </Grid.Col>
                    <Grid.Col xs={2} lg={1}>
                        <Stack h="100%">
                            <Group spacing="xs">
                                <Text fw="bold">Nome:</Text>
                                <Text>
                                    {anime!.title}
                                    {
                                        anime!.alternativeTitles.en ? " ("+anime!.alternativeTitles.en+")" : undefined
                                    }
                                </Text>
                            </Group>
                            {
                                anime!.mean ?
                                    <Group spacing="xs">
                                        <Text fw="bold">Score:</Text>
                                        <Text>{anime!.mean}</Text>
                                    </Group>
                                    : undefined
                            }

                            {
                                anime!.broadcast ? (
                                    <Group spacing="xs">
                                        <Text fw="bold">Exibição:</Text>
                                        <Text tt={"capitalize"}>{getDayOfExhibition(anime!.broadcast.day_of_the_week, anime!.broadcast.start_time)}</Text>
                                    </Group>
                                ) : undefined
                            }

                            {
                                animeSeason && <>
                                    <Divider my={5}/>
                                    <Textarea label="Preview" value={preview} onChange={e => setPreview(e.currentTarget.value)}/>
                                    <Textarea label="Review" value={review} onChange={e => setReview(e.currentTarget.value)}/>
                                    <Chip.Group multiple value={services} onChange={setServices}>
                                        <SimpleGrid cols={2}>
                                        {
                                            watchServices?.sort((w1, w2) => {
                                                if ( w1.name < w2.name ){
                                                    return -1;
                                                }
                                                if ( w1.name > w2.name ){
                                                    return 1;
                                                }
                                                return 0;
                                            }).map(w => {
                                                return <Chip key={w.id}
                                                             value={w.id}
                                                             color={w.color}
                                                             variant="filled"
                                                             styles={{label: {width: "100%", justifyContent: "center"}}}>{w.name}</Chip>
                                            })
                                        }
                                        </SimpleGrid>
                                    </Chip.Group>
                                    <Button variant={value} color={"grape.9"} mt="auto" loading={isUpdating}
                                            onMouseEnter={() => toggle()}
                                            onMouseLeave={() => toggle()}
                                            onClick={handleUpdateAnimeSeason}>
                                        {isUpdating ? "Salvando..." : "Salvar"}
                                    </Button>
                                </>
                            }
                            {
                                !animeSeason && <>
                                    <Button variant={value} color={"green.9"} mt="auto" loading={isSaving}
                                            onMouseEnter={() => toggle()}
                                            onMouseLeave={() => toggle()}
                                            onClick={handleSaveAnimeSeason}>
                                        {isUpdating ? "Adicionando..." : "Adicionar a Temporada"}
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