import { ActionIcon, Grid, Group, NumberInput, Select, TextInput, Tooltip } from "@mantine/core";
import { AnimeSeasons } from "../../../shared/services/AnimesService.ts";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown91, faArrowDownAZ } from "@fortawesome/free-solid-svg-icons";

interface SearchHeaderAnimeProps {
    searchValue: string;
    setSearchValue: (searchValue: string) => void;
    season: AnimeSeasons | null;
    setSeason: (season: AnimeSeasons) => void;
    year: number | "";
    setYear: (year: number) => void;
    currentYear: number;
    orderStrategy: "rating" | "name";
    setOrderStrategy: (strategy: "rating" | "name") => void;
}

export const SearchHeaderAnime: React.FC<SearchHeaderAnimeProps> = ({
    searchValue,
    setSearchValue,
    season,
    setSeason,
    year,
    setYear,
    currentYear,
    orderStrategy,
    setOrderStrategy,
}) => {
    return (
        <>
            <Grid gutter="xs" mb={40}>
                <Grid.Col span={12}>
                    <TextInput
                        placeholder={"Nome..."}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.currentTarget.value)}
                        styles={{ root: { flexGrow: 1 } }}
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <Select
                        value={season}
                        onChange={(e) => setSeason(e as AnimeSeasons)}
                        data={[
                            { value: "winter", label: "Inverno" },
                            { value: "spring", label: "Primavera" },
                            { value: "summer", label: "Verão" },
                            { value: "fall", label: "Outono" },
                        ]}
                    />
                </Grid.Col>
                <Grid.Col span={2}>
                    <NumberInput defaultValue={year} onChange={setYear} min={1900} max={currentYear + 1} />
                </Grid.Col>
                <Grid.Col span="content" ml="auto">
                    <Group spacing={5}>
                        <Tooltip label="Ordernar por nome">
                            <ActionIcon
                                size="lg"
                                color={orderStrategy === "name" ? "grape.9" : "gray"}
                                onClick={() => setOrderStrategy("name")}
                            >
                                <FontAwesomeIcon icon={faArrowDownAZ} />
                            </ActionIcon>
                        </Tooltip>
                        <Tooltip label="Ordernar pela nota">
                            <ActionIcon
                                size="lg"
                                color={orderStrategy === "rating" ? "grape.9" : "gray"}
                                onClick={() => setOrderStrategy("rating")}
                            >
                                <FontAwesomeIcon icon={faArrowDown91} />
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                    {/*<Radio.Group*/}
                    {/*    name="orderStrategy"*/}
                    {/*    label="Ordenação"*/}
                    {/*    description="Selecione como deseja ordernar a lista"*/}
                    {/*>*/}
                    {/*    <Group mt="xs">*/}
                    {/*        <Radio value="rating" label="Nota" />*/}
                    {/*        <Radio value="name" label="Nome" />*/}
                    {/*    </Group>*/}
                    {/*</Radio.Group>*/}
                </Grid.Col>
            </Grid>
        </>
    );
};
