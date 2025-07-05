import { GroupTelegram } from "@/interfaces/GroupTelegram";
import { useQuery } from "@tanstack/react-query";
import { resolveServerAction } from "@/service/BackendService";
import { getGroups } from "@/actions/GroupActions";

export const useGroupsByUser = (userId?: string) => {
    return useQuery<GroupTelegram[]>({
        queryKey: ["groups", userId],
        queryFn: () => resolveServerAction(getGroups)(userId),
        enabled: !!userId,
    });
};
