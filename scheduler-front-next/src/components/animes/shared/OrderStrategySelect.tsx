import { FaFont, FaLanguage, FaStar } from "react-icons/fa6";
import { Button, Menu, Tooltip } from "@mantine/core";
import { useMemo } from "react";

interface Props {
    orderStrategy: "original_name" | "english_name" | "rating";
    setOrderStrategy: (ot: "original_name" | "english_name" | "rating") => void;
}

interface OrderType {
    label: string;
    value: "original_name" | "english_name" | "rating";
    icon: React.ReactNode;
}

const orderTypes: OrderType[] = [
    { label: "Nome Original", value: "original_name", icon: <FaLanguage /> },
    { label: "Nome em Inglês", value: "english_name", icon: <FaFont /> },
    { label: "Nota", value: "rating", icon: <FaStar /> },
];

export const OrderStrategySelect = ({ orderStrategy, setOrderStrategy }: Props) => {
    const selectedOrderStrategy = useMemo(
        () => orderTypes.find((ot) => ot.value === orderStrategy),
        [orderStrategy],
    );

    const handleOrderStrategyChange = (ot: OrderType) => {
        setOrderStrategy(ot.value);
    };

    return (
        <Menu>
            <Menu.Target>
                <Tooltip label={`Ordernando por: ${selectedOrderStrategy?.label}`}>
                    <Button maw={150} variant={"outline"} leftSection={selectedOrderStrategy?.icon}>
                        Ordenação
                    </Button>
                </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
                {orderTypes.map((ot) => (
                    <Menu.Item
                        key={ot.value}
                        onClick={() => handleOrderStrategyChange(ot)}
                        leftSection={ot.icon}
                    >
                        {ot.label}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
};
