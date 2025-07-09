import { useQuery } from "@tanstack/react-query";
import { getAllWatchServices } from "@/actions/WatchServiceActions";
import { resolveServerAction } from "@/service/BackendService";
import { WatchService } from "@/interfaces/WatchService";

export function useWatchServiceList() {
    return useQuery<WatchService[]>({
        queryFn: resolveServerAction(getAllWatchServices),
        queryKey: ["watch-services-list"],
        staleTime: Infinity,
    });
}
