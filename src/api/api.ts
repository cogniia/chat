import axios, { AxiosResponse } from "axios";
import { useAuthStore } from "../zustand-store/authStore";
import { StatusCodeEnum } from "./types";
import { logout } from "./auth/service/main";

const coreApi = axios.create({
    baseURL: process.env.CORE_API_URL || "https://core-api-msqf.onrender.com",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

coreApi.interceptors.request.use((config) => {
    const token = useAuthStore.getState().userData?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

coreApi.interceptors.response.use(
    async (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error.response.status === StatusCodeEnum.UNAUTHORIZED) {
            console.log(error.response.status);
            logout();
            window.location.reload();
        }
        return Promise.reject(error);
    },
);

const apiAI = axios.create({
    baseURL: process.env.AI_URL || "https://cogniia-ai.onrender.com",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
});

apiAI.interceptors.request.use((config) => {
    const token = useAuthStore.getState().userData?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiAI.interceptors.response.use(
    async (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error.response.status === StatusCodeEnum.UNAUTHORIZED) {
            console.log(error.response.status);
            logout();
            window.location.reload();
        }
        return Promise.reject(error);
    },
);

export { coreApi, apiAI };
