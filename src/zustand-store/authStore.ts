import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    user: User | null;
    setCurrentUser: (user: User) => void;
    clearCurrentUser: () => void;
}

export interface User {
    token?: string;
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    sessionIds: string[]
}

export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            user: null,
            setCurrentUser: (user: User) => set(() => ({ user })),
            clearCurrentUser: () => set(() => ({ user: null })),
        }),
        {
            name: 'auth-storage',
            getStorage: () => localStorage
        }
    )
);
