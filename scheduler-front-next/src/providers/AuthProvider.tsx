"use client";
import { Session } from "next-auth";
import { createContext } from "react";

type Props = {
    children?: React.ReactNode;
    session: Session | null; //Sessão que vem do SSR
};

interface AuthContext {
    session: Session | null;
}

export const AuthContext = createContext<AuthContext>({ session: null });

export const AuthProvider = ({ children, session }: Props) => {
    return <AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>;
};
