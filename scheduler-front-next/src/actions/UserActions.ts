"use server";

import { UserRegister } from "@/interfaces/UserRegister";
import { fetchNoAuth } from "@/service/BackendService";
import { User } from "@/interfaces/User";

export const registerUser = async (user: UserRegister): Promise<User> => {
    const response = await fetchNoAuth("/api/user", {
        method: "POST",
        body: JSON.stringify(user),
    });
    return response.json();
};

export const allUsers = async (): Promise<User[]> => {
    const response = await fetchNoAuth("/api/user/all");
    return response.json();
};
