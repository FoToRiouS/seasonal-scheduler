import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    userGetById,
    userRegister,
    userUpdatePassword,
    userUpdateProfile,
    userUpdateProfileImage,
} from "@/schemas/generated/api";
import {
    UpdatePasswordDTO,
    UpdateProfileDTO,
    UpdateProfileImageDTO,
    UserRegisterDTO,
} from "@/schemas/generated/model";

export const useRegisterUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: UserRegisterDTO) => userRegister(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useGetUser = (id?: string) => {
    return useQuery({
        queryKey: ["user", id],
        queryFn: () => {
            if (!id) {
                throw new Error("User ID is required");
            }
            return userGetById(id);
        },
        staleTime: 60000,
        select: (data) => data.data,
        enabled: !!id,
    });
};

export const useUpdateProfile = (id?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UpdateProfileDTO) => {
            if (!id) {
                throw new Error("User ID is required");
            }
            return userUpdateProfile(id, payload);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user", id] });
        },
    });
};

export const useUpdatePassword = (id?: string) => {
    return useMutation({
        mutationFn: (payload: UpdatePasswordDTO) => {
            if (!id) {
                throw new Error("User ID is required");
            }
            return userUpdatePassword(id, payload);
        },
    });
};

export const useUpdateProfileImage = (id?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (imageSrc: UpdateProfileImageDTO) => {
            if (!id) {
                throw new Error("User ID is required");
            }
            return userUpdateProfileImage(id, imageSrc);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user", id] });
        },
    });
};
