"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { validateEmail } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { forgotPassword, recoveryPassword } from "@/services/authService"
import { RecoveryPasswordRequest } from "@/services/types"

interface UserRecoveryFormProps extends React.HTMLAttributes<HTMLDivElement> {
    onOpenChange?: (open: boolean) => void
}

export function UserRecoveryForm({ className, onOpenChange, ...props }: UserRecoveryFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [showOTP, setShowOTP] = React.useState<boolean>(false)

    const [isFailRequest, setIsFailRequest] = React.useState<boolean>(false)

    const [email, setEmail] = React.useState<string>('');

    const [apiMessageResponse, setApiMessageResponse] = React.useState<{ title: string, description?: string }>({ title: '', description: '' });

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault()
        setIsLoading(true)

        try {
            const response = await forgotPassword(email)
            const message = response.data.message
            setApiMessageResponse(message)
            setShowOTP(true)

        } catch (ex) {
            console.log(ex)
            setIsFailRequest(true)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AlertDialog onOpenChange={onOpenChange}>
            <AlertDialogTrigger asChild>
                <Button
                    variant='outline'
                    className="text-sm"
                    label="Esqueci minha senha"
                />
            </AlertDialogTrigger>
            <AlertDialogContent className={`${showOTP && "flex flex-col items-center justify-center"}`}>
                <AlertDialogHeader>
                    {
                        !showOTP ?
                            <div className="flex flex-col space-y-2 text-left mb-3 gap-2">
                                <h1 className="text-2xl font-bold tracking-tight text-purple-700">
                                    Esqueci minha senha
                                </h1>
                                <a className="text-grey-800 text-[16px]">
                                    Insira o e-mail que você utilizou em seu cadastro, e vamos enviar instruções para redefinir sua senha.
                                </a>
                            </div>
                            : !isFailRequest ?
                                <div className="flex flex-col space-y-2 text-left items-center max-w-80 mb-3 gap-2">
                                    <Image src='/PolygonOK.svg' width={120} height={120} alt="polygon" />
                                    <h1 className="text-2xl font-bold tracking-tight text-center text-purple-700">
                                        {apiMessageResponse?.title}
                                    </h1>
                                    <a className="text-grey-800 text-[16px]">
                                        Enviamos um código de redefinição de senha para o seu e-mail <b>{email}</b>. <br />
                                        Caso não encontre a mensagem em sua caixa de entrada, verifique o spam ou lixo eletrônico.
                                    </a>
                                </div>
                                :
                                <div className="flex flex-col space-y-2 text-left items-center max-w-80 mb-3 gap-2">
                                    <Image src='/PolygonX.svg' width={120} height={120} alt="polygon" />
                                    <h1 className="text-2xl font-bold tracking-tight text-center text-purple-700">
                                        Ocorreu um erro durante o envio da mensagem
                                    </h1>
                                    <a className="text-grey-800 text-[16px] text-center">
                                        Esse erro pode ter sido por conta da sua conexão com a internet ou algum problema no nosso servidor.
                                        Por favor tente novamente em alguns minutos.
                                    </a>
                                </div>
                    }
                </AlertDialogHeader>

                <form className={`${showOTP && "hidden"}`} onSubmit={onSubmit}>
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
                        />
                        <Button
                            disabled={isLoading || !validateEmail(email)}
                            isLoading={isLoading}
                            label="Enviar instruções para meu e-mail"
                        />
                    </div>
                </form>
                <div className={`${!showOTP && 'hidden'} w-full flex flex-col gap-4 items-center max-w-80 justify-center mb-4`}>
                    <Link href={`/recovery/${email}`}>
                        <Button disabled={!validateEmail(email)} label="Próximo" />
                    </Link>
                </div>
                <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel onClick={() => {
                        setEmail('')
                        setShowOTP(false)
                    }} className="w-full">
                        {showOTP ? 'Voltar para o login' : 'Cancelar'}
                    </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}