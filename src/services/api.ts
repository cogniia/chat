import axios, { AxiosResponse } from 'axios';
import { useAuthStore } from '../zustand-store/authStore';
import { StatusCodeEnum } from './types';
import { logout } from './authService';

const api = axios.create({
    baseURL: 'https://cogniia.com.br:3000/',
    headers: {
        "Content-Type": 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().user?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    async (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        if (error.response.status === StatusCodeEnum.UNAUTHORIZED) {
            console.log(error.response.status)
            logout();
            window.location.reload();
        }
        return Promise.reject(error);
    }
);

const apiAI = axios.create({
    baseURL: 'https://cogniia-ai.onrender.com',
    headers: {
        "Content-Type": 'application/json',
        'Access-Control-Allow-Origin': '*'
    }
});

export { api, apiAI };
