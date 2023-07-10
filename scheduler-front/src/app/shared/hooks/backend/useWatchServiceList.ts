import {useQuery} from "@tanstack/react-query";
import {IWatchService} from "../../interfaces/IWatchService.ts";
import {SchedulerBackApi} from "../../services/api/SchedulerBackApi.ts";

const getAllWatchServices = async () : Promise<IWatchService[]> => {
    const { data } = await SchedulerBackApi().get(`/watchservices/list`);
    console.log(data)
    return data;
}

export function useWatchServiceList() {
    return useQuery({
        queryFn: () => getAllWatchServices(),
        queryKey: ["watch-services-list"]
    });
}