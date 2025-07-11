import { useState } from "react";
import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from "@mantine/core";
import { useWatchServiceList } from "@/queries/WatchServiceQueries";
import classes from "./SelectWatchServices.module.css";

export const SelectWatchServices = () => {
    const { data: watchServices } = useWatchServiceList();

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
    });

    const [search, setSearch] = useState("");
    const [value, setValue] = useState<string[]>([]);

    const handleValueSelect = (val: string) =>
        setValue((current) => (current.includes(val) ? current.filter((v) => v !== val) : [...current, val]));

    const handleValueRemove = (val: string) => setValue((current) => current.filter((v) => v !== val));

    const values = value.map((item) => {
        const watchService = watchServices?.find((ws) => ws.id === item);
        return (
            <Pill
                key={item}
                withRemoveButton
                onRemove={() => handleValueRemove(item)}
                className={`${watchService?.name.toLowerCase()}`}
            >
                {watchService?.name}
            </Pill>
        );
    });

    const options =
        watchServices ?
            watchServices
                .filter((item) => item.name.toLowerCase().includes(search.trim().toLowerCase()))
                .map((item) => (
                    <Combobox.Option value={item.id} key={item.id} active={value.includes(item.id)}>
                        <Group gap="sm">
                            {value.includes(item.id) ?
                                <CheckIcon size={12} />
                            :   null}
                            <span>{item.name}</span>
                        </Group>
                    </Combobox.Option>
                ))
        :   [];

    return (
        <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
            <Combobox.DropdownTarget>
                <PillsInput onClick={() => combobox.openDropdown()}>
                    <Pill.Group className={classes.pillGroup}>
                        {values}

                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                onFocus={() => combobox.openDropdown()}
                                onBlur={() => combobox.closeDropdown()}
                                value={search}
                                placeholder="Search values"
                                onChange={(event) => {
                                    combobox.updateSelectedOptionIndex();
                                    setSearch(event.currentTarget.value);
                                }}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === "Backspace" &&
                                        search.length === 0 &&
                                        value.length > 0
                                    ) {
                                        event.preventDefault();
                                        handleValueRemove(value[value.length - 1]);
                                    }
                                }}
                            />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {options.length > 0 ? options : <Combobox.Empty>Nada Encontrado...</Combobox.Empty>}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
};
