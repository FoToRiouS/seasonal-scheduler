import { useGroupsByUser } from "@/queries/GroupQueries";
import { useUserSession } from "@/hooks/useUserSession";
import { Checkbox } from "@mantine/core";

interface Props {
    selectedGroups: string[];
    setSelectedGroups: (value: string[]) => void;
}

export const GroupsSelect = ({ selectedGroups, setSelectedGroups }: Props) => {
    const { user } = useUserSession();
    const { data: groups } = useGroupsByUser(user?.id);

    if (groups) {
        return (
            <Checkbox.Group value={selectedGroups} onChange={setSelectedGroups}>
                {groups.map((g) => (
                    <Checkbox color={"violet.8"} value={g.groupId} label={g.name} key={g.id} />
                ))}
            </Checkbox.Group>
        );
    }
};
