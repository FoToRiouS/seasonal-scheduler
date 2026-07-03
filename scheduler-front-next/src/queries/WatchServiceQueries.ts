import { useQuery } from "@tanstack/react-query";
import { watchserviceListAll } from "@/schemas/generated/api";

export function useWatchServiceList() {
    return useQuery({
        queryFn: () => watchserviceListAll(),
        queryKey: ["watch-services-list"],
        select: (data) => data.data,
        staleTime: Infinity,
    });
}
