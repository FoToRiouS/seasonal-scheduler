"use client";
import { Session } from "next-auth";
import { createContext } from "react";
import { User } from "@/interfaces/User";
import { useGetUser } from "@/queries/UserQueries";

type Props = {
    session: Session | null; //Sessão que vem do SSR
} & React.PropsWithChildren;

interface AuthContext {
    session: Session | null | undefined;
    user: User | null | undefined;
}

export const AuthContext = createContext<AuthContext>({ session: null, user: null });

export const AuthProvider = ({ children, session }: Props) => {
    const { data: user } = useGetUser(session?.userId);

    return <AuthContext.Provider value={{ session, user }}>{children}</AuthContext.Provider>;
};
