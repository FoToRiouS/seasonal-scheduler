import { useQuery } from "@tanstack/react-query";
import { BackendService } from "../../services/BackendService.ts";

export function useWatchServiceList() {
    return useQuery({
        queryFn: () => BackendService.getAllWatchServices(),
        queryKey: ["watch-services-list"],
        staleTime: Infinity,
    });
}
