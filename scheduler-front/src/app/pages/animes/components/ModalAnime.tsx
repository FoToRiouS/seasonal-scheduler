import React, {useEffect, useState} from "react";
import {getDayOfExhibition} from "../../../shared/services/AnimesService.ts";
import {IAnime} from "../../../shared/interfaces/IAnime.ts";
import {Box, Button, Chip, Divider, Grid, Group, Image, Modal, SimpleGrid, Stack, Text, Textarea} from "@mantine/core";
import {useWatchServiceList} from "../../../shared/hooks/backend/useWatchServiceList.ts";
import {useUpdateAnimeSeason} from "../../../shared/hooks/backend/useUpdateAnimeSeason.ts";
import {IAnimeSeasonUpdateDTO} from "../../../shared/interfaces/IAnimeSeasonUpdateDTO.ts";
import {useSeasonContext} from "../../../shared/hooks/context/useSeasonContext.ts";
import {IAnimeSeason} from "../../../shared/interfaces/IAnimeSeason.ts";
import {RatingAnime} from "./RatingAnime.tsx";
import {notifications} from "@mantine/notifications";
import {InputGroupAnimeSeason} from "./InputGroupAnimeSeason.tsx";

interface IModalAnimeProps {
    isOpen: boolean
    onClose: () => void
    anime: IAnime | undefined
    animeSeason: IAnimeSeason | undefined
}

export const ModalAnime : React.FC<IModalAnimeProps> = ({isOpen, onClose,  anime, animeSeason}) => {

    const {season, year} = useSeasonContext();

    const [services, setServices] = useState([] as string[]);
    const [preview, setPreview] = useState("");
    const [review, setReview] = useState("");

    const {data: watchServices} = useWatchServiceList();

    const {mutate: update, isLoading: isUpdating, isSuccess } = useUpdateAnimeSeason(anime!.id, year, season);

    const onUpdateSuccess = () => {
        notifications.show({
            title: 'Salvo com sucesso',
            message: 'Informações foram salvas com sucesso!',
            color: "green",
            autoClose: 5000
        })
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

    useEffect(() => {
        if(isSuccess){
            onUpdateSuccess();
            onClose();
        }
    }, [isSuccess]);

    return (
        <>
            <Modal opened={isOpen} onClose={onClose} title={anime!.title}  centered size={880} radius="lg" closeOnClickOutside={false}>
                <Grid columns={2}>
                    <Grid.Col xs={2} lg={1}>
                        <Box pos="relative">
                            <Image src={anime!.mainPicture.large} w="100%" radius="md"/>
                            {
                                anime?.mean &&
                                <Box pos="absolute" bottom={15} right={15}>
                                    <RatingAnime rating={anime.mean}/>
                                </Box>
                            }
                        </Box>
                    </Grid.Col>
                    <Grid.Col xs={2} lg={1}>
                        <Stack h="100%">
                            <Group spacing="xs" noWrap>
                                <Text fw="bold">Nome:</Text>
                                <Text>
                                    {anime!.title}
                                    {
                                        anime!.alternativeTitles.en ? " ("+anime!.alternativeTitles.en+")" : undefined
                                    }
                                </Text>
                            </Group>
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
                                    <Stack mt="auto" spacing="xs" >
                                        <Button variant="filled" color={"grape.9"} mt="auto" loading={isUpdating}
                                                onClick={handleUpdateAnimeSeason}>
                                            {isUpdating ? "Salvando..." : "Salvar Alterações"}
                                        </Button>
                                        <InputGroupAnimeSeason anime={anime!} initialYear={year} initialSeason={season}/>
                                    </Stack>
                                </>
                            }
                            {
                                !animeSeason && <>
                                    <Box mt="auto">
                                        <InputGroupAnimeSeason anime={anime!} initialYear={year} initialSeason={season}/>
                                    </Box>
                                </>
                            }
                        </Stack>
                    </Grid.Col>
                </Grid>
            </Modal>
        </>
    )

}