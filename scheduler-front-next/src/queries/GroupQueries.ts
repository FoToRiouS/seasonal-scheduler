import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    groupCreate,
    groupDelete,
    groupGenerateRegisterToken,
    groupGetGroups,
    groupUpdate,
} from "@/schemas/generated/api";
import { GroupDTO, RegisterTokenDTO } from "@/schemas/generated/model";

export const useGroupsByUser = (userId?: string) => {
    return useQuery({
        queryKey: ["groups", userId],
        queryFn: () => {
            if (!userId) {
                throw new Error("User ID is required");
            }
            return groupGetGroups(userId);
        },
        select: (data) => data.data,
        enabled: !!userId,
    });
};

export const useCreateGroup = (userId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (dto: GroupDTO) => {
            if (!userId) {
                throw new Error("User ID is required");
            }
            return groupCreate(userId, dto);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups", userId] });
        },
    });
};

export const useUpdateGroup = (userId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (group: GroupDTO) => groupUpdate(group.id!, group),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups", userId] });
        },
    });
};

export const useDeleteGroup = (userId?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (groupId: string) => groupDelete(groupId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["groups", userId] });
        },
    });
};

export const useGenerateGroupToken = () => {
    return useMutation({
        mutationFn: (dto: RegisterTokenDTO) => groupGenerateRegisterToken(dto),
    });
};
