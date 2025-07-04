import { UserRegister } from "@/interfaces/UserRegister";
import { getUser, registerUser } from "@/actions/UserActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { resolveServerAction } from "@/service/BackendService";
import { User } from "@/interfaces/User";

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
    return useQuery<User>({
        queryKey: ["user", id],
        queryFn: () => resolveServerAction(getUser)(id),
        staleTime: 60000,
        enabled: !!id,
    });
};
