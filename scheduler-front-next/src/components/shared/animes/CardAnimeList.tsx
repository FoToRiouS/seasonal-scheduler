import { ActionIcon, Box, Center, Group, Tooltip } from "@mantine/core";
import { CardAnime, DefaultCardAnimeProps } from "@/components/shared/animes/CardAnime";
import { RatingAnime } from "./RatingAnime";
import { FaCheck, FaPlus, FaX } from "react-icons/fa6";
import { useState } from "react";
import { modals } from "@mantine/modals";
import { useDeleteAnimeSeason, useSaveAnimeSeason } from "@/queries/AnimeQueries";
import { useNotifications } from "@/hooks/useNotifications";
import { useUserSession } from "@/hooks/useUserSession";
import { useSeasonContext } from "@/components/shared/animes/provider/useSeasonContext";

interface ActionIconProps {
    onClick: () => void;
}

export const CardAnimeList = ({ fetchedAnime, index, updateOnList }: DefaultCardAnimeProps) => {
    const { showSuccess, showError } = useNotifications();
    const { year, season } = useSeasonContext();
    const { session } = useUserSession();
    const { animeMal, animeBackend } = fetchedAnime;

    const { mutate: saveAnimeSeason } = useSaveAnimeSeason();
    const { mutate: deleteAnimeSeason } = useDeleteAnimeSeason(animeBackend?.id);

    const handleAddAnime = () => {
        modals.openConfirmModal({
            title: "Adicionar anime ao calendário",
            children: (
                <Box>
                    <p>Você tem certeza que deseja adicionar o anime {animeMal.title} ao seu calendário?</p>
                </Box>
            ),
            labels: { confirm: "Sim", cancel: "Não" },
            confirmProps: { color: "green.8" },
            onConfirm: () => {
                saveAnimeSeason(
                    {
                        userId: session?.userId!,
                        idAnime: animeMal.id.toString(),
                        season: "summer",
                        year: 2025,
                    },
                    {
                        onSuccess: (data) => {
                            updateOnList(index, data);
                            showSuccess("Anime adicionado ao calendário!");
                        },
                        onError: showError,
                    },
                );
            },
        });
    };

    const handleRemoveAnime = () => {
        modals.openConfirmModal({
            title: "Remover anime do calendário",
            children: (
                <Box>
                    <p>Você tem certeza que deseja remover o anime {animeMal.title} do seu calendário?</p>
                </Box>
            ),
            labels: { confirm: "Sim", cancel: "Não" },
            confirmProps: { color: "red.8" },
            onConfirm: () => {
                deleteAnimeSeason(
                    { season: season, year: year },
                    {
                        onSuccess: (data) => {
                            updateOnList(index, data);
                            showSuccess("Anime excluído do calendário!");
                        },
                        onError: showError,
                    },
                );
            },
        });
    };

    return (
        <CardAnime>
            <CardAnime.Image anime={animeMal} />
            <CardAnime.Title anime={animeMal} />
            <Group mt="auto" justify="flex-end">
                {animeMal.mean && (
                    <Center mr="auto" h="100%">
                        <RatingAnime rating={animeMal.mean} />
                    </Center>
                )}
                {session ?
                    animeBackend ?
                        <ActionIconExist onClick={handleRemoveAnime} />
                    :   <ActionIconAdd onClick={handleAddAnime} />
                :   <></>}
            </Group>
        </CardAnime>
    );
};

const ActionIconAdd = ({ onClick }: ActionIconProps) => {
    return (
        <Tooltip label={"Adicionar anime ao calendário"}>
            <ActionIcon radius={"xl"} size={"xl"} color={"violet.8"} onClick={onClick}>
                <FaPlus />
            </ActionIcon>
        </Tooltip>
    );
};

const ActionIconExist = ({ onClick }: ActionIconProps) => {
    const [onHover, setOnHover] = useState(false);

    return (
        <Tooltip label={"Remover anime do calendário"}>
            <ActionIcon
                radius={"xl"}
                size={"xl"}
                color={onHover ? "red.8" : "green.8"}
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
                onClick={onClick}
            >
                {onHover ?
                    <FaX />
                :   <FaCheck />}
            </ActionIcon>
        </Tooltip>
    );
};
