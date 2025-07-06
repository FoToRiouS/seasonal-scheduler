import { UserRegister } from "@/interfaces/UserRegister";
import { getUser, registerUser, updatePassword, updateProfile } from "@/actions/UserActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { resolveServerAction } from "@/service/BackendService";
import { User } from "@/interfaces/User";
import { UserUpdateProfile } from "@/interfaces/UserUpdateProfile";
import { UserUpdatePassword } from "@/interfaces/UserUpdatePassword";

export const useRegisterUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: UserRegister) => resolveServerAction(registerUser)(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useGetUser = (id?: string) => {
    console.log("AUTH PROVIDER");
    return useQuery<User>({
        queryKey: ["user", id],
        queryFn: () => resolveServerAction(getUser)(id),
        staleTime: 60000,
        enabled: !!id,
    });
};

export const useUpdateProfile = (id?: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: UserUpdateProfile) => resolveServerAction(updateProfile)(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({ queryKey: ["user", id] });
        },
    });
};

export const useUpdatePassword = (id?: string) => {
    return useMutation({
        mutationFn: (payload: UserUpdatePassword) => resolveServerAction(updatePassword)(id, payload),
    });
};
