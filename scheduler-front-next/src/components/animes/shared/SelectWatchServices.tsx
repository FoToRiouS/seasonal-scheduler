import React from "react";
import { Chip, SimpleGrid, Stack, Text } from "@mantine/core";
import { useWatchServiceList } from "@/queries/WatchServiceQueries";

interface Props {
    selectedWatchServices: string[];
    setSelectedWatchServices: (value: string[]) => void;
}

const ColorSchema: { [key: string]: string } = {
    crunchyroll: "#F47521",
    netflix: "#E50914",
    other: "#6A6A6A",
    "disney-plus": "#113CCF",
    "amazon-prime": "#00A8E1",
    "hbo-max": "#8C00FF",
};

export const SelectWatchServices = ({ selectedWatchServices, setSelectedWatchServices }: Props) => {
    const { data: watchServices } = useWatchServiceList();

    return (
        <Stack gap={5}>
            <Text size="sm" fw={500}>
                Onde Assistir
            </Text>
            <Chip.Group multiple value={selectedWatchServices} onChange={setSelectedWatchServices}>
                <SimpleGrid cols={3}>
                    {watchServices
                        ?.sort((w1, w2) => {
                            if (w1.name < w2.name) {
                                return -1;
                            }
                            if (w1.name > w2.name) {
                                return 1;
                            }
                            return 0;
                        })
                        .map((w) => {
                            return (
                                <Chip
                                    key={w.id}
                                    value={w.id}
                                    variant="filled"
                                    color={ColorSchema[w.nameId]}
                                    styles={{
                                        label: {
                                            width: "100%",
                                            justifyContent: "center",
                                        },
                                    }}
                                >
                                    {w.name}
                                </Chip>
                            );
                        })}
                </SimpleGrid>
            </Chip.Group>
        </Stack>
    );
};
