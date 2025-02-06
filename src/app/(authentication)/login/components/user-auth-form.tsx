"use client"

import * as React from "react"

import { cn, validateEmail } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { UserRecoveryForm } from "./user-recovery-form"
import { fadeBackgroundControllStore } from "@/zustand-store/fade-backgroung"
import { login } from "@/services/authService"
import { useRouter } from "next/navigation"
import { AlertDialogComponent } from "@/components/alertComponent"
import { AlertToastComponent } from "../../../../components/alert"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const { setIsAlertDialogOpen } = fadeBackgroundControllStore()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [showPassword, setShowPassword] = React.useState<boolean>(false)
    const [showDialog, setShowDialog] = React.useState<boolean>(false)

    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const router = useRouter()

    const handleAction = () => {
        console.log("Action confirmed!");
        setShowDialog(false); // Fechar o dialog após a ação
    };

    const handleCancel = () => {
        console.log("Action cancelled!");
        setShowDialog(false); // Fechar o dialog ao cancelar
    };

    async function onSubmitLogin(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)
        await login({ email, password })
            .then(() => {
                setIsLoading(false)
                router.replace('/')
            }).catch(e => {
                setIsLoading(false)
                setShowDialog(true);
            })
    }

    return (
        <>
            <AlertToastComponent
                helperText={'E-mail e/ou senha inválidos! Por favor verifique seus dados e tente novamente.'}
                className={!showDialog ? 'hidden' : ''}
            />
            <div className={cn("grid", className)} {...props}>

                <div className="grid gap-10">
                    <div className="grid gap-4">
                        <Label className="text-purple-700 font-semibold text-[16px]" htmlFor="email">
                            E-mail
                        </Label>
                        <Input
                            id="email"
                            placeholder="nome@exemplo.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setEmail(e.target.value)}
                            helperText={email && !validateEmail(email) ? 'Formato de e-mail inválido. Por favor verifique o campo e tente novamente.' : ''}
                            error={email && !validateEmail(email) ? true : false}
                        />
                    </div>
                    <div className="grid gap-4">
                        <Label className="text-purple-700 font-semibold text-[16px]" htmlFor="password">
                            Senha
                        </Label>
                        <Input
                            id="password"
                            placeholder="Digite sua senha aqui"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="current-password"
                            autoCorrect="off"
                            disabled={isLoading}
                            onChange={(e) => setPassword(e.target.value)}
                            passwordIcon
                            showPassword={showPassword}
                            setShowPassword={() => setShowPassword(!showPassword)}
                        />
                        <div className="flex justify-end w-full">
                            <UserRecoveryForm onOpenChange={(open) => setIsAlertDialogOpen(open)} />
                        </div>
                    </div>
                    <Button
                        disabled={isLoading || !validateEmail(email) || password === ''}
                        isLoading={isLoading}
                        label="Entrar"
                        onClick={onSubmitLogin}
                    />
                </div>

            </div>
        </>
    )
}