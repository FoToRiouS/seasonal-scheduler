import React from "react";
import { Box, FlexProps, Group, Text } from "@mantine/core";
import { FaStar } from "react-icons/fa6";

interface RatingAnimeProps extends FlexProps {
    rating: number;
}

export const RatingAnime: React.FC<RatingAnimeProps> = ({ rating }) => {
    return (
        <Group
            bg="gray"
            px="sm"
            gap={5}
            align={"center"}
            style={{
                borderRadius: "2rem",
                background: "rgba(169, 169, 169, 0.5)",
            }}
        >
            <Box c={"yellow"} fz={20}>
                <FaStar />
            </Box>
            <Text c="gray.0"> {rating} </Text>
        </Group>
    );
};
