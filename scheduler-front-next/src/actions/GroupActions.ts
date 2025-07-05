"use server";

import { fetchAuth } from "@/service/BackendService";
import { GroupTelegram } from "@/interfaces/GroupTelegram";

export const getGroups = async (userId?: string): Promise<GroupTelegram[]> => {
    const response = await fetchAuth(`/api/groups/list/${userId}`);
    return response.json();
};
