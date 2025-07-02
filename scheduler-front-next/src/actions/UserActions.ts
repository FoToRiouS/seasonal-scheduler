"use server";

import { UserRegister } from "@/interfaces/UserRegister";
import { fetchNoAuth } from "@/service/BackendService";
import { User } from "@/interfaces/User";
import { AuthenticationRequest } from "@/interfaces/AuthenticationRequest";

export const registerUser = async (user: UserRegister): Promise<User> => {
    const response = await fetchNoAuth("/api/user", {
        method: "POST",
        body: JSON.stringify(user),
    });
    return response.json();
};

export const login = async (payload: AuthenticationRequest): Promise<Response> => {
    return await fetchNoAuth("/api/user/login", {
        method: "POST",
        body: JSON.stringify(payload),
    });
};

export const refreshToken = async (refreshToken: string): Promise<Response> => {
    return await fetchNoAuth("/api/user/refresh-token", {
        method: "POST",
        body: refreshToken,
    });
};

export const allUsers = async (): Promise<User[]> => {
    const response = await fetchNoAuth("/api/user/all");
    return response.json();
};
