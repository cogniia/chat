import { useAuthStore, User } from "@/zustand-store/authStore";
import { coreApi } from "@/api/api";
import { Create } from "../model/create.model";
import { login } from "@/api/auth/service/main";

export const me = async (): Promise<void> => {
    try {
        const response = await coreApi.get<User>("/user/me");

        useAuthStore.getState().setCurrentUser(response.data);
    } catch (error) {
        console.error("Erro ao buscar usuário", error);
        throw error;
    }
};

export const update = async (data: Partial<User>): Promise<void> => {
    try {
        await coreApi.put<Partial<User>>("/user/me", data);
    } catch (error) {
        console.error("Erro ao atualizar usuário", error);
        throw error;
    }
};

// Registers a new user and logs them
export async function createUser({
    name,
    email,
    password,
}: Create): Promise<void> {
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
}

export function deleteUser() {
    return coreApi.delete(`/user/me`);
}
