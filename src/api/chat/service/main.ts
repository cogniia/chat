import { apiAI } from "@/api/api";
import { SendMessageMessage } from "../model/send-chat-message.model";
import { ChatMessage } from "@/api/chat-message/entity/chat-message.entity";

export async function sendMessageToAI(
    message: SendMessageMessage,
): Promise<ChatMessage> {
    return (await apiAI.post<ChatMessage>("/chat/messages", message)).data;
}
