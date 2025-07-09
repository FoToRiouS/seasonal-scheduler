import React from "react";
import { ActionIcon, Badge, rem } from "@mantine/core";
import { FaX } from "react-icons/fa6";
import { getSeasonInPortuguese } from "@/service/MyAnimeListService";
import { StartSeason } from "@/interfaces/AnimeMAL";

interface BadgeSeasonProps {
    startSeason: StartSeason;
    close?: () => void;
}

export const BadgeSeason = ({ startSeason, close }: BadgeSeasonProps) => {
    const removeButtonBadge = (
        <ActionIcon size="xs" color="grape" radius="xl" variant="transparent" onClick={close}>
            <FaX style={{ fontSize: rem(10) }} />
        </ActionIcon>
    );

    return (
        <Badge color="grape" rightSection={removeButtonBadge} pr={3}>
            {getSeasonInPortuguese(startSeason.season) + "/" + startSeason.year}
        </Badge>
    );
};
