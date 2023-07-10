import axios from "axios";

export const SchedulerBackApi = () => {
    return axios.create({
        baseURL: "http://localhost:8080"
    });
}