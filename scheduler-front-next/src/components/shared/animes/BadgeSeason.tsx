import React from "react";
import { Badge, BadgeProps } from "@mantine/core";
import { getSeasonInPortuguese } from "@/service/MyAnimeListService";
import { StartSeason } from "@/interfaces/AnimeMAL";

interface BadgeSeasonProps {
    startSeason: StartSeason;
    variant?: BadgeProps["variant"];
    onClick?: () => void;
}

export const BadgeSeason = ({ startSeason, variant, onClick }: BadgeSeasonProps) => {
    return (
        <Badge color="violet.8" size="md" style={{ cursor: "pointer" }} variant={variant} onClick={onClick}>
            {getSeasonInPortuguese(startSeason.season) + "/" + startSeason.year}
        </Badge>
    );
};
