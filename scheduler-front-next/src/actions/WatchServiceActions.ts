"use server";
import { fetchAuth } from "@/service/BackendService";
import { WatchService } from "@/interfaces/WatchService";

export const getAllWatchServices = async (): Promise<WatchService[]> => {
    const res = await fetchAuth(`/api/watchservices/list`);
    return await res.json();
};
