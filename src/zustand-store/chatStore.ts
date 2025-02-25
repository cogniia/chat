import { ChatMessage } from "@/api/chat-message/entity/chat-message.entity";
import { getChatMessages } from "@/api/chat-message/service/main";
import { sendMessageToAI } from "@/api/chat/service/main";
import { DateOrder, DateOrderEnum } from "@/api/common/model/date-order.model";
import { Paginate } from "@/api/common/model/paginate.model";
import { WhereDate } from "@/api/common/model/where-date.model";
import { create } from "zustand";

type Store = {
    isLoading: boolean;
    error: boolean;
    getHistory: (
        currentMessages: ChatMessage[],
        query?: Partial<ChatMessage>,
        pagination?: Paginate,
        order?: DateOrder,
        whereDate?: WhereDate,
    ) => Promise<void>;
    messages: ChatMessage[];
    currentMessages: ChatMessage[];
    sendMessage: (
        sessionId: string | undefined,
        prompt: string,
        scroll: () => void,
    ) => void;
    prompt: string;
    setPrompt: (prompt: string) => void;
    clearData: () => void;
};

export const useChatStore = create<Store>((set) => ({
    isLoading: false,
    error: false,
    messages: [],
    currentMessages: [],
    lastMessage: null,
    prompt: "",
    setPrompt: (prompt: string) => {
        set({ prompt });
    },
    clearData: () => {
        set({
            messages: [],
            currentMessages: [],
            prompt: "",
            error: false,
            isLoading: false,
        });
    },
    getHistory: async (
        currentMessages: ChatMessage[] = [],
        query: Partial<ChatMessage> = {},
        pagination: Paginate = { limit: 20, offset: 0 },
        order: DateOrder = { created_at: DateOrderEnum.desc },
        whereDate: WhereDate = {},
    ) => {
        set({ isLoading: true, error: false });

        try {
            const messages = (
                await getChatMessages(query, pagination, order, whereDate)
            ).reverse();

            if (currentMessages.length > 0) {
                set({
                    messages: [...currentMessages, ...messages],
                });
            } else {
                set({ messages });
            }
        } catch (ex) {
            set({ error: true });
        } finally {
            set({ isLoading: false });
        }
    },
    sendMessage: async (sessionId: string | undefined, prompt: string) => {
        set((state) => ({
            isLoading: true,
            error: false,
            messages: [
                ...state.messages,
                {
                    id: "",
                    created_at: new Date(),
                    updated_at: new Date(),
                    user_id: "",
                    session_id: sessionId || "",
                    sender_type: "User",
                    text: prompt,
                },
            ],
        }));

        try {
            const response = await sendMessageToAI({
                session_id: sessionId,
                text: prompt,
            });

            const aiMessage = response;

            set((state) => ({
                messages: [...state.messages, aiMessage],
                prompt: "",
            }));

            scroll();
        } catch (e) {
            set((state) => ({
                messages: state.messages.slice(0, -1),
                error: true,
            }));
        } finally {
            set({ isLoading: false });
        }
    },
}));
