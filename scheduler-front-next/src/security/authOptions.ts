import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { InvalidSigninError } from "@/security/InvalidSigninError";
import { jwtDecode } from "jwt-decode";
import { userLogin, userRefreshToken } from "@/schemas/generated/api";
import { AuthenticationRequestDTO, AuthenticationResponseDTO } from "@/schemas/generated/model";

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
                    login: credentials?.username,
                    password: credentials?.password,
                } as AuthenticationRequestDTO;

                try {
                    const res = await userLogin(payload);
                    const user = res.data as User;
                    if (user) {
                        return user;
                    }
                } catch (e) {
                    const error = e as Error;
                    const parsedError = JSON.parse(error.message);
                    throw new InvalidSigninError(parsedError.exceptionName, parsedError.message);
                }
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            if (account) {
                const auth = user as unknown as AuthenticationResponseDTO;
                token.userId = auth.userId;
                token.accessToken = auth.accessToken;
                token.refreshToken = auth.refreshToken;
                token.expireAt = jwtDecode<{ exp: number }>(auth.accessToken).exp * 1000;
            } else if (Date.now() < token.expireAt) {
                //Verifica se o token não expirou e apenas retorna o token
                return token;
            } else {
                //Verifica se o token expirou e tenta dar refresh no access token baseado no refresh token
                try {
                    const res = await userRefreshToken(token.refreshToken);
                    const auth = res.data;

                    token.accessToken = auth.accessToken!;
                    token.refreshToken = auth.refreshToken!;
                    token.expireAt = jwtDecode<{ exp: number }>(auth.accessToken!).exp * 1000;
                    return token;
                } catch {
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
