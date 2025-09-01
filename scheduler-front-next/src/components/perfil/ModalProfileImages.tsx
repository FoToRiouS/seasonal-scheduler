import { Avatar, Center, Modal, SimpleGrid } from "@mantine/core";
import profileImages from "../../data/profileImages.json";
import { useUpdateProfileImage } from "@/queries/UserQueries";
import { useUserSession } from "@/hooks/useUserSession";
import { useNotifications } from "@/hooks/useNotifications";

interface Props {
    opened: boolean;
    onClose: () => void;
}

export const ModalProfileImages = ({ opened, onClose }: Props) => {
    const { session } = useUserSession();
    const { showError } = useNotifications();
    const { mutate: updateProfile } = useUpdateProfileImage(session?.userId);

    const handleSelectImage = (image: string) => {
        updateProfile(
            { imageSrc: image },
            {
                onSuccess: () => {
                    onClose();
                },
                onError: showError,
            },
        );
    };

    return (
        <Modal opened={opened} onClose={onClose} size={"xl"} title={"Imagens de perfil"}>
            <SimpleGrid cols={4}>
                {profileImages.map((image) => {
                    return (
                        <Center key={image}>
                            <Avatar
                                key={image}
                                src={image}
                                size={100}
                                className={"cursor-pointer"}
                                onClick={() => handleSelectImage(image)}
                            />
                        </Center>
                    );
                })}
            </SimpleGrid>
        </Modal>
    );
};
