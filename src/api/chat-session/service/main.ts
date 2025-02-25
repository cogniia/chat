import { coreApi } from "@/api/api";
import { Paginate } from "@/api/common/model/paginate.model";
import { DateOrder } from "@/api/common/model/date-order.model";
import { WhereDate } from "@/api/common/model/where-date.model";
import { ChatSession } from "../entity/chat-session.entity";

export async function getChatSessions(
    query: Partial<ChatSession> = {},
    pagination: Paginate = { limit: 10, offset: 0 },
    order: DateOrder = {},
    whereDate: WhereDate = {},
): Promise<ChatSession[]> {
    return (
        await coreApi.get<ChatSession[]>("/chat-session", {
            params: {
                ...query,
                ...pagination,
                ...order,
                ...whereDate,
            },
        })
    ).data;
}
