import { Badge } from "@mantine/core";

interface Props {
    type: "review" | "preview";
}

export const BadgeTextInfo = ({ type }: Props) => {
    return (
        <Badge
            variant={"outline"}
            color={type === "preview" ? "green" : "blue"}
            className={type === "preview" ? "bg-green-600/30!" : "bg-blue-600/30!"}
        >
            {type === "preview" ? "Preview" : "Review"}
        </Badge>
    );
};
