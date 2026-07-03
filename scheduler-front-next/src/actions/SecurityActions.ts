"use server";

import { signIn as signInServer, signOut as signOutServer } from "@/security/authOptions";
import { SignInResponse } from "@/security/interfaces/SignInResponse";
import { AuthenticationRequestDTO } from "@/schemas/generated/model";

export const signIn = async (loginRequest: AuthenticationRequestDTO): Promise<SignInResponse> => {
    try {
        const res = await signInServer("user_provider", {
            ...loginRequest,
            redirect: false,
        });
        return { ok: true };
    } catch (e: any) {
        return { ok: false, error: e.errorType };
    }
};

export const signOut = async () => {
    return signOutServer();
};
