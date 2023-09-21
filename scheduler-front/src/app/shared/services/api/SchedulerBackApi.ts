import axios from "axios";

export const SchedulerBackApi = () => {
    return axios.create({
        baseURL: "/backend"
        // baseURL: "http://localhost:8080"
    });
}