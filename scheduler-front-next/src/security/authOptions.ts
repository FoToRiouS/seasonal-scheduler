import NextAuth from "next-auth";
import { AuthenticationRequest } from "@/interfaces/AuthenticationRequest";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, refreshToken } from "@/actions/UserActions";
import { InvalidSigninError } from "@/security/InvalidSigninError";
import { AuthenticationResponse } from "@/interfaces/AuthenticationResponse";
import { jwtDecode } from "jwt-decode";

export const { handlers, signIn, signOut, auth } = NextAuth({
    session: {
        maxAge: 3 * 24 * 60 * 60, //3 Dias
    },
    providers: [
        CredentialsProvider({
            id: "user_provider",
            name: "User",
            credentials: {
                username: { label: "Usuário" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                const payload = {
                    username: credentials?.username,
                    password: credentials?.password,
                } as unknown as AuthenticationRequest;

                const res = await login(payload);

                const ret = await res.json();
                if (!res.ok) {
                    throw new InvalidSigninError(ret.exceptionName, ret.message);
                }

                const user = ret;
                if (res.ok && user) {
                    return user;
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account) {
                const auth = user as unknown as AuthenticationResponse;
                token.userId = auth.userId;
                token.accessToken = auth.accessToken;
                token.refreshToken = auth.refreshToken;
                token.expireAt = jwtDecode<{ exp: number }>(auth.accessToken).exp * 1000;
            } else if (Date.now() < token.expireAt) {
                //Verifica se o token não expirou e apenas retorna o token
                return token;
            } else {
                //Verifica se o token expirou e tenta dar refresh no access token baseado no refresh token
                const res = await refreshToken(token.refreshToken); //JwtFetchs.refreshToken();
                if (res.ok) {
                    const auth = (await res.json()) as AuthenticationResponse;

                    token.accessToken = auth.accessToken;
                    token.refreshToken = auth.refreshToken;
                    token.expireAt = jwtDecode<{ exp: number }>(auth.accessToken).exp * 1000;
                    return token;
                } else {
                    if (res.status !== 401) {
                        console.error("Error refreshing access token", res);
                    }
                    // await AuthFetchs.signOut()
                    return { ...token, error: "RefreshAccessTokenError" as const };
                }
            }
            return token;
        },

        async session({ session, token }) {
            session.userId = token.userId;
            session.accessToken = token.accessToken;
            session.error = token.error;
            return session;
        },

        authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth;
        },
    },
    pages: {
        signIn: "/login",
    },
});
