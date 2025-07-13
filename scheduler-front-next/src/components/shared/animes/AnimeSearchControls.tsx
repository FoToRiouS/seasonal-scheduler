"use client";
import { Group, NumberInput, Select, TextInput } from "@mantine/core";
import dayjs from "dayjs";
import { useSeasonContext } from "@/components/shared/animes/provider/useSeasonContext";
import { FetchedAnime } from "@/interfaces/FetchedAnime";
import { useEffect } from "react";
import { AnimeSeasons } from "@/service/MyAnimeListService";
import { useAnimesUtils } from "@/hooks/useAnimesOrders";
import { useDebouncedValue, useLocalStorage } from "@mantine/hooks";
import { OrderStrategySelect } from "@/components/shared/animes/OrderStrategySelect";
import { useQueryState } from "nuqs";

interface Props {
    rawAnimesList: FetchedAnime[] | undefined;
    setControlledAnimeList: (animes: FetchedAnime[]) => void;
}

export const AnimeSearchControls = ({ rawAnimesList, setControlledAnimeList }: Props) => {
    const { year, season, setYear, setSeason } = useSeasonContext();

    const { orderByRating, orderByOriginalName, orderByEnglishName } = useAnimesUtils();
    const [orderStrategy, setOrderStrategy] = useLocalStorage<"original_name" | "english_name" | "rating">({
        key: "order_strategy",
        defaultValue: "rating",
    });

    const [search, setSearch] = useQueryState("search", { defaultValue: "" });
    const [debouncedSearch] = useDebouncedValue(search, 200);

    useEffect(() => {
        let filtered = rawAnimesList || [];

        if (debouncedSearch) {
            filtered = filtered.filter((a) => {
                return (
                    a.animeMal.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                    a.animeMal.alternativeTitles.en.toLowerCase().includes(debouncedSearch.toLowerCase())
                );
            });
        }

        if (filtered) {
            switch (orderStrategy) {
                case "original_name":
                    filtered = orderByOriginalName(filtered);
                    break;
                case "english_name":
                    filtered = orderByEnglishName(filtered);
                    break;
                case "rating":
                    filtered = orderByRating(filtered);
                    break;
            }
        }

        setControlledAnimeList(filtered);
    }, [debouncedSearch, orderStrategy, rawAnimesList]);

    return (
        <Group grow preventGrowOverflow={false}>
            <TextInput
                placeholder="Comece a digitar para filtrar pelo título"
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
            />
            <Select
                value={season}
                onChange={(e) => setSeason(e as AnimeSeasons)}
                data={[
                    { value: "winter", label: "Inverno" },
                    { value: "spring", label: "Primavera" },
                    { value: "summer", label: "Verão" },
                    { value: "fall", label: "Outono" },
                ]}
                maw={150}
            />
            <NumberInput
                value={year}
                onChange={(year) => setYear(+year)}
                min={1900}
                max={dayjs().year() + 1}
                maw={100}
            />
            <OrderStrategySelect orderStrategy={orderStrategy} setOrderStrategy={setOrderStrategy} />
        </Group>
    );
};
