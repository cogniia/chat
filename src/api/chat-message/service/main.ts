import { coreApi } from "@/api/api";
import { ChatMessage } from "../entity/chat-message.entity";
import { Paginate } from "@/api/common/model/paginate.model";
import { DateOrder } from "@/api/common/model/date-order.model";
import { WhereDate } from "@/api/common/model/where-date.model";

export async function getChatMessages(
    query: Partial<ChatMessage> = {},
    pagination: Paginate = { limit: 10, offset: 0 },
    order: DateOrder = {},
    whereDate: WhereDate = {},
) {
    return (
        await coreApi.get("/chat-message", {
            params: {
                ...query,
                ...pagination,
                ...order,
                ...whereDate,
            },
        })
    ).data;
}
