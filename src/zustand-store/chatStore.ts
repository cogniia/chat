import { getMessagesHistory, sendMessageToAI } from '@/services/chatService'
import { IResponseMessageFromAI, IResquestMessageHistory } from '@/services/types'
import { create } from 'zustand'

type Store = {
    isLoading: boolean
    error: boolean
    getHistory: (request: IResquestMessageHistory, currentMessages: IResponseMessageFromAI[]) => void
    messages: IResponseMessageFromAI[]
    currentMessages: IResponseMessageFromAI[]
    lastMessage: IResponseMessageFromAI | null
    sendMessage: (sessionId: string | undefined, userIdExt: string | undefined, prompt: string, scroll: () => void) => void
    prompt: string
    setPrompt: (prompt: string) => void
    clearData: () => void
}

export const useChatStore = create<Store>((set) => ({
    isLoading: false,
    error: false,
    messages: [],
    currentMessages: [],
    lastMessage: null,
    prompt: '',
    setPrompt: (prompt: string) => { set({ prompt }) },
    clearData: () => {
        set({ messages: [], currentMessages: [], lastMessage: null, prompt: '', error: false, isLoading: false })
    },
    getHistory: async (request: IResquestMessageHistory, currentMessages: IResponseMessageFromAI[]) => {
        set({ isLoading: true, error: false });

        try {
            const response = await getMessagesHistory(request);
            const messages: IResponseMessageFromAI[] = response?.data;
            const lastMessage = messages[messages.length - 1];

            if (currentMessages.length > 0) {
                set({ messages: [...messages, ...currentMessages], lastMessage });
            } else {
                set({ messages, lastMessage });
            }


        } catch (ex) {
            set({ error: true });
        } finally {
            set({ isLoading: false });
        }
    },
    sendMessage: async (sessionId: string | undefined, userIdExt: string | undefined, prompt: string) => {
        set((state) => ({
            isLoading: true,
            error: false,
            messages: [
                ...state.messages,
                {
                    sender_type: 'User',
                    session_id: sessionId,
                    user_id_ext: '5',
                    text: prompt,
                },
            ],
        }));

        try {
            const response = await sendMessageToAI({
                create_session: sessionId === '',
                session_id: sessionId,
                user_id_ext: userIdExt,
                text: prompt,
                sender_type: 'user',
            });

            const aiMessage = response?.data;

            set((state) => ({
                messages: [...state.messages, aiMessage],
                prompt: '',
            }));

            scroll()

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