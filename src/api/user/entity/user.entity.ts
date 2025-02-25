import { Audit } from "@/api/common/model/audit.model";

export interface User extends Audit {
    name?: string;
    email: string;
    password?: string;
}
