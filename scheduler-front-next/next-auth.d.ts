import "next-auth/jwt";

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        userId: string;
        accessToken: string;
        error?: "RefreshAccessTokenError";
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
        userId: string;
        accessToken: string;
        refreshToken: string;
        expireAt: number;
        error?: "RefreshAccessTokenError";
    }
}
