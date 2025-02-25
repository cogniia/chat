import { useAuthStore, User } from "@/zustand-store/authStore";
import { coreApi } from "@/api/api";
import Cookie from "js-cookie";
import { LoginRequest } from "@/api/auth/model/login-request.model";
import { LoginResponse } from "@/api/auth/model/login-response.model";
import { useChatStore } from "@/zustand-store/chatStore";

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
