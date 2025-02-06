'use client'
import { AlertDialogComponent } from "@/components/alertComponent";
import { BreadcrumbComponent } from "@/components/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { encryptPassword, verifyHashPassword } from "@/lib/utils";
import { changePasswordService } from "@/services/userService";
import { useAuthStore } from "@/zustand-store/authStore";
import { useState } from "react";

export default function ChangePassword() {
    const { user, setCurrentUser } = useAuthStore()
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)

    const [errorPassword, setErrorPassword] = useState(false)

    const [showDialog, setShowDialog] = useState<boolean>(false)
    const [errorDialog, setErrorDialog] = useState<boolean>(false)
    const [titleDialog, setTitleDialog] = useState<string>('')
    const [descriptionDialog, setDescriptionDialog] = useState<string>('')
    const [cancelButtonDialog, setCancelButtonDialog] = useState<string>('')

    async function passwordValidation() {
        const isCurrentPasswordValid = await verifyHashPassword(oldPassword, user?.password ?? '')
        if (oldPassword.length > 0) {
            if (!isCurrentPasswordValid) {
                return true
            }
            return false
        }
        return false
    }

    async function handleChangePassword() {
        setIsLoading(true)

        if (await passwordValidation()) {
            setErrorPassword(await passwordValidation())
            setIsLoading(false)
            return
        }

        await changePasswordService({ id: user?.id, oldPassword, newPassword })
            .then(async () => {
                setTitleDialog('Senha alterada com sucesso!')
                setDescriptionDialog('Utilize sua nova senha ao realizar um novo acesso à plataforma.')
                setCancelButtonDialog('Voltar para seu perfil')
                setErrorDialog(false)
                setShowDialog(true)

                setErrorPassword(false)
                setCurrentUser({ ...user, password: await encryptPassword(newPassword), sessionIds: user?.sessionIds ?? [] })
            }).catch(e => {
                setTitleDialog('Ocorreu um erro durante a alteração de senha')
                setDescriptionDialog('Houve um problema de comunicação em nosso servidor e não foi possível alterar sua senha no momento. Por favor tente novamente mais tarde.')
                setCancelButtonDialog('Voltar para seu perfil')
                setErrorDialog(true)
                setShowDialog(true)
            }).finally(() => setIsLoading(false))
    }

    const handleAction = () => {
        setShowDialog(false); // Fechar o dialog após a ação
    };

    const handleCancel = () => {
        setShowDialog(false); // Fechar o dialog ao cancelar
    };

    return (
        <section className="relative h-full flex flex-col items-center p-4 pt-16">
            <AlertDialogComponent
                show={showDialog}
                title={titleDialog}
                description={descriptionDialog}
                cancelText={cancelButtonDialog}
                onAction={handleAction}
                onCancel={handleCancel}
                error={errorDialog}
            />
            <div className="max-w-4xl w-full flex flex-col">
                <div className="w-full mb-4">
                    <BreadcrumbComponent key={'bread'} tree={[{ name: 'Seu Perfil', path: '/profile' }]} currentPage={{ name: 'Alterar Senha' }} />
                </div>
                <Label className="text-3xl text-purple-700 font-bold">
                    Alterar Senha
                </Label>
                <div className="mt-24 flex relative flex-col">
                    <Label className="text-[16px] text-grey-800 mb-8">
                        Para alterar sua senha de acesso, preencha o primeiro campo com a senha que utiliza atualmente para acessar a plataforma, e o segundo campo com sua nova senha.
                    </Label>
                    <div className="flex flex-wrap gap-9 items-center sm:flex-nowrap sm:flex-row">
                        <div className="w-full mt-14">
                            <Label className="text-grey-800 mb-4 text-[16px]">
                                Senha Antiga
                            </Label>
                            <Input
                                id="oldpassword"
                                placeholder="Digite aqui sua senha antiga"
                                type="password"
                                autoCapitalize="none"
                                autoCorrect="off"
                                disabled={isLoading}
                                autoComplete="current-password"
                                onChange={(e) => setOldPassword(e.target.value)}
                                helperText={errorPassword ? "A senha está incorreta. Tente novamente." : ''}
                                error={errorPassword}
                                passwordIcon
                                showPassword={isPasswordVisible}
                                setShowPassword={() => setIsPasswordVisible(!isPasswordVisible)}
                            />
                        </div>
                        <div className="w-full mt-14">
                            <Label className="text-grey-800 mb-4 text-[16px]">
                                Nova Senha
                            </Label>
                            <Input
                                id="newpassword"
                                placeholder="Digite aqui sua nova senha"
                                type="password"
                                autoCapitalize="none"
                                autoCorrect="off"
                                autoComplete="new-password"
                                disabled={isLoading}
                                onChange={(e) => setNewPassword(e.target.value)}
                                helperText="A senha deve ter no mínimo 8 caracteres."
                                error={newPassword.length > 0 && newPassword.length < 8}
                                passwordIcon
                                showPassword={isNewPasswordVisible}
                                setShowPassword={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                            />
                        </div>
                    </div>
                    <div className="w-full flex justify-end mt-8">
                        <Button
                            className="w-fit mt-5 self-end"
                            disabled={isLoading || oldPassword.length === 0 || newPassword.length < 8}
                            onClick={handleChangePassword}
                            isLoading={isLoading}
                            label='Confirmar nova senha'
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}