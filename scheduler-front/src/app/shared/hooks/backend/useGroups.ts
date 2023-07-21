import {SchedulerBackApi} from "../../services/api/SchedulerBackApi.ts";
import {useQuery} from "@tanstack/react-query";

export const useGroups = () => {

    const getGroups = async (): Promise<number[]> => {
        const { data } = await SchedulerBackApi().get<number[]>("/groups/list");
        console.log(data);
        return data;
    }

    return useQuery({
        queryFn: getGroups,
        queryKey: ["get-groups"]
    })

}