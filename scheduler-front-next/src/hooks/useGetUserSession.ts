import { useGetUser } from "@/queries/UserQueries";
import { useSession } from "@/hooks/useSession";

export const useGetUserSession = () => {
    const session = useSession();
    const { data } = useGetUser(session?.userId);
    return data;
};
