import { useAuthStore, User } from "@/zustand-store/authStore";
import { useChatStore } from "@/zustand-store/chatStore";
import { coreApi } from "./api";
import Cookie from "js-cookie";
import { LoginRequest, LoginResponse, RegisterRequest } from "./types";

export const login = async ({
    email,
    password,
}: LoginRequest): Promise<void> => {
    try {
        const { token, refresh_token } = (
            await coreApi.post<LoginResponse>("/user/auth/token", {
                email,
                password,
            })
        ).data;
        const data = {
            token,
            sessionIds: [],
        };

        useAuthStore.getState().setCurrentUserData(data);

        Cookie.set("token", token ?? "");
        Cookie.set("refresh_token", refresh_token ?? "");
    } catch (error) {
        console.error("Erro ao fazer login", error);
        throw error;
    }
};

export const me = async (): Promise<void> => {
    try {
        const response = await coreApi.get<User>("/user/me");

        useAuthStore.getState().setCurrentUser(response.data);
    } catch (error) {
        console.error("Erro ao buscar usuário", error);
        throw error;
    }
};

export const updateMe = async (data: Partial<User>): Promise<void> => {
    try {
        await coreApi.put<Partial<User>>("/user/me", data);
    } catch (error) {
        console.error("Erro ao atualizar usuário", error);
        throw error;
    }
};

// Registers a new user and logs them
export const register = async ({
    name,
    email,
    password,
}: RegisterRequest): Promise<void> => {
    try {
        const user = (
            await coreApi.post<User>("/user", {
                name,
                email,
                password,
            })
        ).data;

        await login({ email: user.email, password });
    } catch (error) {
        console.error("Erro ao fazer login", error);
        throw error;
    }
};

// Old name is forgotPassword
export function resetPassword(email: string) {
    return coreApi.post("/user/auth/reset-password", { email });
}

export const logout = (): void => {
    useAuthStore.getState().clearCurrentUser();
    useAuthStore.getState().clearCurrentUserData();
    useChatStore.getState().clearData();

    Cookie.remove("token");
};
