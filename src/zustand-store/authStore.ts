import { LoginResponse } from "@/api/auth/model/login-response.model";
import { User } from "@/api/user/entity/user.entity";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
    user: User | null;
    tokens: Partial<LoginResponse> | null;

    setCurrentUser: (user: User) => void;
    clearCurrentUser: () => void;

    setTokens: (tokens: Partial<LoginResponse>) => void;
    clearTokens: () => void;
}

export const useAuthStore = create(
    persist<AuthState>(
        (set) => ({
            user: null,
            setCurrentUser: (user: User) => set(() => ({ user })),
            clearCurrentUser: () => set(() => ({ user: null })),

            tokens: null,
            setTokens: (tokens: Partial<LoginResponse>) =>
                set(() => ({ tokens })),
            clearTokens: () => set(() => ({ user: null })),
        }),
        {
            name: "auth-storage",
            // getStorage: () => localStorage,
            storage: createJSONStorage(() => localStorage),
        },
    ),
);
