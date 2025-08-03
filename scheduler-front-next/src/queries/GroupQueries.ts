import { GroupTelegram } from "@/interfaces/GroupTelegram";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { resolveServerAction } from "@/service/BackendService";
import { createGroup, deleteGroup, generateGroupToken, getGroups, updateGroup } from "@/actions/GroupActions";

export const useGroupsByUser = (userId?: string) => {
    return useQuery<GroupTelegram[]>({
        queryKey: ["groups", userId],
        queryFn: () => resolveServerAction(getGroups)(userId),
        enabled: !!userId,
    });
};

export const useCreateGroup = (userId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (group: GroupTelegram) => resolveServerAction(createGroup)(userId, group),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups", userId] });
        },
    });
};

export const useUpdateGroup = (userId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (group: GroupTelegram) => resolveServerAction(updateGroup)(group),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups", userId] });
        },
    });
};

export const useDeleteGroup = (userId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: resolveServerAction(deleteGroup),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups", userId] });
        },
    });
};

export const useGenerateGroupToken = () => {
    return useMutation<string, Error, string>({
        mutationFn: resolveServerAction(generateGroupToken),
    });
};
