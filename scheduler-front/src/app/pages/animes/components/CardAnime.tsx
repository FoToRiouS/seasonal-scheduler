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

const fontSize = "md"

export const CardAnime: React.FC<ICardAnimeProps> = ({image, jpnName, engName, onOpen}) => {
    return (
        <>
            <Card bg="black" radius="lg" withBorder>
                <Card.Section>
                    <Image src={image} alt={jpnName}/>
                </Card.Section>
                <Stack spacing="xs">
                    <Title order={3} c={"white"} fs={fontSize} ta={"center"} mb={2}>{jpnName}</Title>
                    <Title order={3} c={"white"} fs={fontSize} ta={"center"}>{engName}</Title>
                </Stack>
                <Group position="right">
                    <Button leftIcon={<FontAwesomeIcon icon={faEye}/>} onClick={onOpen}>Info</Button>
                </Group>
            </Card>
        </>
    )
}