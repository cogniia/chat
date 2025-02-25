import { Audit } from "@/api/common/model/audit.model";

export interface ChatSession extends Audit {
    user_id: string;
    thread_id: string;
    ended_at?: Date;
}
