import React from "react";
import { getSeasonInPortuguese } from "../../../shared/services/AnimesService.ts";
import { ActionIcon, Badge, rem } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { IStartSeason } from "../../../shared/interfaces/IAnime.ts";

interface BadgeSeasonProps {
    startSeason: IStartSeason;
    close?: () => void;
}

export const BadgeSeason: React.FC<BadgeSeasonProps> = ({ startSeason, close }) => {
    const removeButtonBadge = (
        <ActionIcon size="xs" color="grape" radius="xl" variant="transparent" onClick={close}>
            <FontAwesomeIcon icon={faX} fontSize={rem(10)} />
        </ActionIcon>
    );

    return (
        <Badge color="grape" rightSection={removeButtonBadge} pr={3}>
            {getSeasonInPortuguese(startSeason.season) + "/" + startSeason.year}
        </Badge>
    );
};
