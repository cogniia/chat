import { ChatSession } from "@/api/chat-session/entity/chat-session.entity";
import { Create } from "@/api/chat-session/model/create.model";
import {
    createChatSession,
    getChatSessions,
} from "@/api/chat-session/service/main";
import { DateOrder, DateOrderEnum } from "@/api/common/model/date-order.model";
import { Paginate } from "@/api/common/model/paginate.model";
import { WhereDate } from "@/api/common/model/where-date.model";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
    sessions: ChatSession[];
    isLoading: boolean;
    error: boolean;

    createChatSession: (
        currentSessions?: ChatSession[],
        payload?: Create,
    ) => Promise<void>;
    setChatSessions: (sessions: ChatSession[]) => void;
    clearChatSessions: () => void;

    getChatSessions: (
        query?: Partial<ChatSession>,
        pagination?: Paginate,
        order?: DateOrder,
        whereDate?: WhereDate,
    ) => Promise<void>;
}

export const useSessionStore = create(
    persist<SessionState>(
        (set) => ({
            sessions: [],
            isLoading: false,
            error: false,

            setChatSessions: (sessions: ChatSession[]) =>
                set(() => ({ sessions: [...sessions] })),
            clearChatSessions: () => set(() => ({ sessions: [] })),
            createChatSession: async (
                currentSessions: ChatSession[] = [],
                payload: Create = {},
            ) => {
                set({ isLoading: true, error: false });
                try {
                    const session = await createChatSession(payload);
                    set({ sessions: [...currentSessions, session] });
                } catch (error) {
                    set({ error: true });
                } finally {
                    set({ isLoading: false });
                }
            },

            getChatSessions: async (
                query: Partial<ChatSession> = {},
                pagination: Paginate = { limit: 20, offset: 0 },
                order: DateOrder = { created_at: DateOrderEnum.desc },
                whereDate: WhereDate = {},
            ) => {
                set({ isLoading: true, error: false });

                try {
                    const sessions = await getChatSessions(
                        query,
                        pagination,
                        order,
                        whereDate,
                    );

                    set({ sessions });
                } catch (ex) {
                    set({ error: true });
                } finally {
                    set({ isLoading: false });
                }
            },
        }),
        {
            name: "session-storage",
            getStorage: () => localStorage,
        },
    ),
);
