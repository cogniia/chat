import { useAuthStore, User } from '@/zustand-store/authStore';
import { useChatStore } from '@/zustand-store/chatStore';
import { api } from './api';
import Cookie from 'js-cookie';
import { LoginRequest, LoginResponse, RecoveryPasswordRequest, RegisterRequest, RegisterResponse } from './types';
import { encryptPassword } from '@/lib/utils';

export const login = async ({ email, password }: LoginRequest): Promise<void> => {
    try {
        const response = await api.post<LoginResponse>('/login', { email, password });
        const data = { ...response.data.body, password }

        let user: User = data;
        user.password = await encryptPassword(password);

        useAuthStore.getState().setCurrentUser(user);

        Cookie.set('token', user.token ?? '');
    } catch (error) {
        console.error('Erro ao fazer login', error);
        throw error;
    }
};

export const register = async ({ nome, email, password }: RegisterRequest): Promise<void> => {
    try {
        const response = await api.post<RegisterResponse>('/user', { nome, email, password });
        const user = response.data.body;

        await login({ email: user.email, password });

    } catch (error) {
        console.error('Erro ao fazer login', error);
        throw error;
    }
};

export function forgotPassword(email: string) {
    return api.put('/forgetPassword', { email })
}

export function recoveryPassword(user: RecoveryPasswordRequest) {
    return api.put('/recoveryPassword', user)
}

export const logout = (): void => {
    useAuthStore.getState().clearCurrentUser();
    useChatStore.getState().clearData()

    Cookie.remove('token');

};
