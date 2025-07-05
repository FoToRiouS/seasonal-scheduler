"use client";
import { Session } from "next-auth";
import { createContext } from "react";
import { User } from "@/interfaces/User";

type Props = {
    session: Session | null; //Sessão que vem do SSR
    user: User | null;
} & React.PropsWithChildren;

interface AuthContext {
    session: Session | null;
    user: User | null;
}

export const AuthContext = createContext<AuthContext>({ session: null, user: null });

export const AuthProvider = ({ children, session, user }: Props) => {
    return <AuthContext.Provider value={{ session, user }}>{children}</AuthContext.Provider>;
};
