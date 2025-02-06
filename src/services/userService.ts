import { api } from "./api";
import { ChangePasswordRequest } from "./types";

export function userDetailService(idUser: string) {
    return api.get(`/user?id=${idUser}`)
}

export function changePasswordService(idUser: ChangePasswordRequest) {
    return api.put('/changePassword', idUser)
}

export function deleteUserService(idUser?: string) {
    return api.delete(`/user`, {
        params: { id: idUser }
    })
}