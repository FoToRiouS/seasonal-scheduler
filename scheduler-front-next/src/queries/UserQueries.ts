import { UserRegister } from "@/interfaces/UserRegister";
import { allUsers, registerUser } from "@/actions/UserActions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { resolveServerAction } from "@/service/BackendService";

export const useRegisterUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (user: UserRegister) => resolveServerAction(registerUser)(user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useGetAllUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: allUsers,
    });
};
