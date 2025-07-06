import { Avatar, Box, Center, Overlay, Text } from "@mantine/core";
import { User } from "@/interfaces/User";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { ModalProfileImages } from "@/components/perfil/ModalProfileImages";

interface Props {
    user: User | undefined;
}

export const ProfileImage = ({ user }: Props) => {
    const sizeImage = 150;
    const [hovered, setHovered] = useState(false);
    const [opened, { open, close }] = useDisclosure();

    return (
        <>
            <Box
                pos={"relative"}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={"cursor-pointer"}
            >
                <Avatar size={sizeImage} name={user?.name} src={user?.profileImageSrc} pos={"relative"} />
                {hovered && (
                    <Overlay color="#000" backgroundOpacity={0.5} radius={sizeImage} onClick={open}>
                        <Center h={"100%"}>
                            <Text size={"sm"} c={"white"}>
                                Alterar imagem
                            </Text>
                        </Center>
                    </Overlay>
                )}
            </Box>
            <ModalProfileImages opened={opened} onClose={close} />
        </>
    );
};
