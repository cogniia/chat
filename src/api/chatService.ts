import { IResquestMessageHistory, ISendMessageToAI } from "./types";
import { apiAI } from "./api";

export function getMessagesHistory(messages: IResquestMessageHistory) {
    return apiAI.get("/chat/history", {
        params: messages,
    });
}

