import axios from "axios";

export const SchedulerBackApi = () => {
    return axios.create({
        baseURL: import.meta.env.MODE === "development" ? "/backend" : import.meta.env.VITE_BACKEND_URI,
        // baseURL: "http://localhost:8080"
    });
}