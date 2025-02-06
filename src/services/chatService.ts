import { IResquestMessageHistory, ISendMessageToAI } from "./types";
import { apiAI } from "./api";

export function sendMessageToAI(message: ISendMessageToAI) {
    return apiAI.post('/chat/messages', message)
}

export function getMessagesHistory(messages: IResquestMessageHistory) {
    return apiAI.get('/chat/history', {
        params: messages
    })
}