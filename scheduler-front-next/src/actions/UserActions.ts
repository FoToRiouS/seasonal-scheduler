"use server";

import { UserRegister } from "@/interfaces/UserRegister";
import { fetchAuth, fetchNoAuth } from "@/service/BackendService";
import { User } from "@/interfaces/User";
import { AuthenticationRequest } from "@/interfaces/AuthenticationRequest";
import { UserUpdateProfile } from "@/interfaces/UserUpdateProfile";
import { UserUpdatePassword } from "@/interfaces/UserUpdatePassword";
import { UserUpdateProfileImage } from "@/interfaces/UserUpdateProfileImage";

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

export const getUser = async (id?: string): Promise<User> => {
    const response = await fetchAuth(`/api/user/${id}`);
    return response.json();
};

export const updateProfile = async (id: string | undefined, payload: UserUpdateProfile): Promise<User> => {
    const ret = await fetchAuth(`/api/user/profile/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
    });
    return await ret.json();
};

export const updatePassword = async (
    id: string | undefined,
    payload: UserUpdatePassword,
): Promise<boolean> => {
    const res = await fetchAuth(`/api/user/password/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
    });
    return await res.json();
};

export const updateProfileImage = async (
    id: string | undefined,
    imageSrc: UserUpdateProfileImage,
): Promise<User> => {
    const res = await fetchAuth(`/api/user/profile-image/${id}`, {
        method: "PATCH",
        body: JSON.stringify(imageSrc),
    });
    return await res.json();
};
