import { Audit } from "@/api/common/model/audit.model";

export interface ChatMessage extends Audit {
    session_id: string;
    user_id: string;
    text: string;
    thread_id: string;
}
