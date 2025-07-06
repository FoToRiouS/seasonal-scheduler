"use server";

import { fetchAuth } from "@/service/BackendService";
import { GroupTelegram } from "@/interfaces/GroupTelegram";

export const getGroups = async (userId?: string): Promise<GroupTelegram[]> => {
    const response = await fetchAuth(`/api/groups/list/${userId}`);
    return response.json();
};

export const createGroup = async (
    userId: string | undefined,
    group: GroupTelegram,
): Promise<GroupTelegram> => {
    console.log("USERID", userId, "GROUP", group);
    const response = await fetchAuth(`/api/groups/${userId}`, {
        method: "POST",
        body: JSON.stringify(group),
    });
    return await response.json();
};

export const updateGroup = async (group: GroupTelegram): Promise<GroupTelegram> => {
    const response = await fetchAuth(`/api/groups/${group.id}`, {
        method: "PUT",
        body: JSON.stringify(group),
    });
    return await response.json();
};
