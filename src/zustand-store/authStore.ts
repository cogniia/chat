import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
    user: User | null;
    userData: UserData | null;

    setCurrentUser: (user: User) => void;
    clearCurrentUser: () => void;

    setCurrentUserData: (user: UserData) => void;
    clearCurrentUserData: () => void;
}

export interface User {
    id: string;
    name?: string;
    email: string;
    password?: string;
}

export interface UserData {
    token?: string;
    sessionIds: string[];
}

export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            user: null,
            setCurrentUser: (user: User) => set(() => ({ user })),
            clearCurrentUser: () => set(() => ({ user: null })),

            userData: null,
            setCurrentUserData: (userData: UserData) =>
                set(() => ({ userData })),
            clearCurrentUserData: () => set(() => ({ user: null })),
        }),
        {
            name: "auth-storage",
            getStorage: () => localStorage,
        },
    ),
);
