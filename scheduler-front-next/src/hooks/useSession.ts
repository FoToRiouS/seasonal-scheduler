import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

export const useSession = () => {
    const context = useContext(AuthContext);

    return context.session;
};
