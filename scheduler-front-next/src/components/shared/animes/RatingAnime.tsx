import React from "react";
import { Flex, FlexProps, Text } from "@mantine/core";
import { FaStar } from "react-icons/fa6";

interface RatingAnimeProps extends FlexProps {
    rating: number;
}

export const RatingAnime: React.FC<RatingAnimeProps> = ({ rating }) => {
    return (
        <Flex
            h="100%"
            justify="center"
            align="center"
            bg="gray"
            px="sm"
            style={{
                borderRadius: "2rem",
                background: "rgba(169, 169, 169, 0.5)",
            }}
        >
            <Text c="yellow" mr="xs">
                <FaStar />
            </Text>
            <Text c="gray.0"> {rating} </Text>
        </Flex>
    );
};
