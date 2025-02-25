import { useAuthStore } from "@/zustand-store/authStore";
import { coreApi } from "@/api/api";
import { Create } from "../model/create.model";
import { startAuthCycle } from "@/api/auth/service/main";
import { User } from "../entity/user.entity";

export const me = async (token?: string): Promise<void> => {
    try {
        const response = await getMe(token);

        useAuthStore.getState().setCurrentUser(response);
    } catch (error) {
        console.error("Erro ao buscar usuário", error);
        throw error;
    }
};

export async function getMe(token?: string): Promise<User> {
    try {
        const headers = token
            ? { Authorization: `Bearer ${token}` }
            : undefined;
        const response = (await coreApi.get<User>("/user/me", { headers }))
            .data;
        return response;
    } catch (error) {
        console.error("Erro ao buscar usuário", error);
        throw error;
    }
}

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

        await startAuthCycle({ email: user.email, password });
    } catch (error) {
        console.error("Erro ao fazer login", error);
        throw error;
    }
}

export function deleteUser() {
    return coreApi.delete(`/user/me`);
}
