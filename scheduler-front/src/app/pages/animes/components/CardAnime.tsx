import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Group, Image, Stack, Title} from "@mantine/core";

interface ICardAnimeProps {
    image: string,
    jpnName: string,
    engName: string
    onOpen: () => void
}

export const CardAnime: React.FC<ICardAnimeProps> = ({image, jpnName, engName, onOpen}) => {
    return (
        <>
            <Card bg="dark.8" radius="lg" withBorder sx={{display: "flex", flexDirection: "column", borderWidth: "2px", borderColor: "graple"}}>
                <Card.Section bg="gray.5">
                    <Image src={image} alt={jpnName} h={450} sx={{overflow: "hidden", display: "flex", justifyContent: "center", alignItems: "center"}}/>
                </Card.Section>
                <Stack spacing={0} mb="xl">
                    <Title order={4} c={"white"} ta={"center"} lineClamp={2}>{jpnName}</Title>
                    <Title order={5} c={"white"} ta={"center"} lineClamp={2}>{engName}</Title>
                </Stack>
                <Group mt="auto" position="right">
                    <Button leftIcon={<FontAwesomeIcon icon={faEye}/>} variant="gradient" gradient={{from: "red.9", to: "grape.9"}} onClick={onOpen}>Info</Button>
                </Group>
            </Card>
        </>
    )
}