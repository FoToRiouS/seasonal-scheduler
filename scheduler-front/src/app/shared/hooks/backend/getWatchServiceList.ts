import {useQuery} from "@tanstack/react-query";
import {BackendService} from "../../services/BackendService.ts";

export function getWatchServiceList() {
    return useQuery({
        queryFn: () => BackendService.getAllWatchServices(),
        queryKey: ["watch-services-list"]
    });
}