import { useAuthStore } from "@/zustand-store/authStore";
import { coreApi } from "@/api/api";
import Cookie from "js-cookie";
import { LoginRequest } from "@/api/auth/model/login-request.model";
import { LoginResponse } from "@/api/auth/model/login-response.model";
import { useChatStore } from "@/zustand-store/chatStore";
import { useSessionStore } from "@/zustand-store/sessionStore";
import { me } from "@/api/user/service/main";

export async function login({ email, password }: LoginRequest): Promise<void> {
    try {
        const { token, refresh_token } = (
            await coreApi.post<LoginResponse>("/user/auth/token", {
                email,
                password,
            })
        ).data;

        useAuthStore.getState().setTokens({ token, refresh_token });

        Cookie.set("token", token ?? "");
        Cookie.set("refresh_token", refresh_token ?? "");
    } catch (error) {
        console.error("Erro ao fazer login", error);
        throw error;
    }
}

export async function refreshToken(): Promise<void> {
    try {
        const { token, refresh_token } = (
            await coreApi.post<LoginResponse>("/user/auth/refresh-token", {
                refresh_token: useAuthStore.getState().tokens?.refresh_token,
            })
        ).data;

        useAuthStore.getState().setTokens({ token, refresh_token });

        Cookie.set("token", token ?? "");
        Cookie.set("refresh_token", refresh_token ?? "");
    } catch (error) {
        Cookie.set("token", "");
        Cookie.set("refresh_token", "");
        console.error("Erro ao fazer login", error);
        throw error;
    }
}

export async function startAuthCycle({
    email,
    password,
}: LoginRequest): Promise<void> {
    try {
        logout();
        await login({ email, password });
        await me();
        setInterval(async () => await refreshToken(), 1000 * 30 * 10);
    } catch (error) {
        throw error;
    }
}

// Old name is forgotPassword
export function resetPassword(email: string) {
    return coreApi.post("/user/auth/reset-password", { email });
}

export function logout(): void {
    useAuthStore.getState().clearCurrentUser();
    useAuthStore.getState().clearTokens();
    useChatStore.getState().clearData();
    useSessionStore.getState().clearChatSessions();

    Cookie.remove("token");
    Cookie.remove("refresh_token");
}
