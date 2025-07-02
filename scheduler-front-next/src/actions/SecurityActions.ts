"use server";

import { AuthenticationRequest } from "@/interfaces/AuthenticationRequest";
import { signIn as signInServer, signOut as signOutServer } from "@/security/authOptions";
import { SignInResponse } from "@/security/interfaces/SignInResponse";

export const signIn = async (loginRequest: AuthenticationRequest): Promise<SignInResponse> => {
    try {
        const res = await signInServer("user_provider", {
            ...loginRequest,
            redirect: false,
        });
        console.log("RESPONSE", res);
        return { ok: true };
    } catch (e: any) {
        return { ok: false, error: e.errorType };
    }
};

export const signOut = async () => {
    return signOutServer();
};
