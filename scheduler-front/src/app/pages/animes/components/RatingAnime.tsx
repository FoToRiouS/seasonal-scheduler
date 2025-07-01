import React from "react";
import { Flex, FlexProps, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

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
            sx={{ borderRadius: "2rem", background: "rgba(169, 169, 169, 0.5)" }}
        >
            <Text color="yellow" mr="xs">
                <FontAwesomeIcon icon={faStar} />
            </Text>
            <Text color="gray.0"> {rating} </Text>
        </Flex>
    );
};
