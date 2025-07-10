import React from "react";
import { Badge, BadgeProps } from "@mantine/core";
import { getSeasonInPortuguese } from "@/service/MyAnimeListService";
import { StartSeason } from "@/interfaces/AnimeMAL";

interface BadgeSeasonProps {
    startSeason: StartSeason;
    variant?: BadgeProps["variant"];
}

export const BadgeSeason = ({ startSeason, variant }: BadgeSeasonProps) => {
    return (
        <Badge color="violet.8" size="lg" style={{ cursor: "pointer" }} variant={variant}>
            {getSeasonInPortuguese(startSeason.season) + "/" + startSeason.year}
        </Badge>
    );
};
