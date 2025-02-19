import { coreApi } from "./api";

export function userDetailService(idUser: string) {
    return coreApi.get(`/user/me`);
}

export function deleteUserService() {
    return coreApi.delete(`/user/me`);
}
