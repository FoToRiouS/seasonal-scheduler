import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";

export const useUserSession = () => {
    return useContext(AuthContext);
};
