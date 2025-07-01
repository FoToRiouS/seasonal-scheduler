"use client";

import { useSetActivePage } from "@/hooks/useSetActivePage";

export const LoginPage = () => {
    useSetActivePage("login");

    return (
        <div>
            <h1>Login</h1>
        </div>
    );
};
