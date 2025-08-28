import React from "react";
import { Badge, BadgeProps } from "@mantine/core";
import { StartSeason } from "@/interfaces/AnimeMAL";
import { getSeasonInPortuguese } from "@/utils/MyAnimeListUtils";

interface BadgeSeasonProps {
    startSeason: StartSeason;
    variant?: BadgeProps["variant"];
    onClick?: () => void;
}

export const BadgeSeason = ({ startSeason, variant, onClick }: BadgeSeasonProps) => {
    return (
        <Badge color="violet.8" size="lg" style={{ cursor: "pointer" }} variant={variant} onClick={onClick}>
            {getSeasonInPortuguese(startSeason.season) + "/" + startSeason.year}
        </Badge>
    );
};
