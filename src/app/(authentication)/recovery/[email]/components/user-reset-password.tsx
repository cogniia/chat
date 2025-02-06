"use client"

import * as React from "react"

import { cn, validatePassword } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertComponent } from "./alert"
import { RecoveryPasswordRequest } from "@/services/types"
import { login, recoveryPassword } from "@/services/authService"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { useParams, useRouter } from 'next/navigation'
import { AlertDialogComponent } from "@/components/alertComponent"
import Cookies from "js-cookie"

interface UserResetPasswordFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserResetPasswordForm({ className, ...props }: UserResetPasswordFormProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [showAlert, setShowAlert] = React.useState<boolean>(false)
    const [showError, setShowError] = React.useState<boolean>(false)

    const { email } = useParams();
    const userEmail = typeof email === 'string' ? email?.replace('%40', '@') : email[0]?.replace('%40', '@')
    const [token, setToken] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = React.useState<string>('');

    const [apiMessageResponse, setApiMessageResponse] = React.useState<{ title: string, description?: string }>({ title: '', description: '' });

    async function handleRecovery() {
        setIsLoading(true)
        setShowError(false)
        const user: RecoveryPasswordRequest = {
            email: userEmail, newPassword: password, token
        }
        try {
            const response = await recoveryPassword(user)
            setApiMessageResponse(response?.data?.message)
            setShowAlert(true)
            setTimeout(async () => {
                await login({ email: userEmail, password }).then(() => router.refresh())
            }, 1000)
        } catch (ex: any) {
            setApiMessageResponse(ex?.response?.data?.message)
            setShowError(true)
            console.log(ex)
        } finally {
            setIsLoading(false)
        }
    }

    React.useEffect(() => {
        if (Cookies.get('token')) {
            router.push('/')
        }
    }, [Cookies.get('token')])

    return (
        <div className={cn("grid", className)} {...props}>
            {
                showError && (
                    <AlertComponent helperText={apiMessageResponse?.title} />
                )
            }
            <AlertDialogComponent show={showAlert} title={apiMessageResponse?.title} description={""} cancelText={""} isLoading={isLoading} />

            <div className="grid gap-10 mt-4">
                {
                    !validatePassword(password, passwordConfirmation).isValid && validatePassword(password, passwordConfirmation).id === 2 &&
                    <AlertComponent helperText={validatePassword(password, passwordConfirmation).message} />
                }
                <div className="grid gap-4">
                    <Label className="text-purple-700 font-semibold text-[16px]" htmlFor="password">
                        Nova senha
                    </Label>
                    <Input
                        id="password"
                        placeholder="Digite aqui uma nova senha"
                        type="password"
                        autoCapitalize="none"
                        autoComplete="new-password"
                        autoCorrect="off"
                        disabled={isLoading}
                        onChange={(e) => setPassword(e.target.value)}
                        helperText={!validatePassword(password, passwordConfirmation).isValid && validatePassword(password, passwordConfirmation).id === 1 ? validatePassword(password, passwordConfirmation)?.message : ''}
                        error={!validatePassword(password, passwordConfirmation).isValid && password.length > 0 && validatePassword(password, passwordConfirmation).id === 1}
                    />
                </div>
                <div className="grid gap-4">
                    <Label className="text-purple-700 font-semibold text-[16px]" htmlFor="passwordConfirmation">
                        Repetir nova senha
                    </Label>
                    <Input
                        id="passwordConfirmation"
                        placeholder="Digite aqui novamente a nova senha"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                        error={!validatePassword(password, passwordConfirmation).isValid && passwordConfirmation.length > 0}
                    />
                </div>
                <div className="grid gap-4">
                    <Label className="text-purple-700 font-semibold text-[16px]" htmlFor="passwordConfirmation">
                        Insira o código que enviamos para o seu e-mail
                    </Label>
                    <div className="flex justify-center">
                        <InputOTP
                            maxLength={6}
                            value={token}
                            onChange={(value) => setToken(value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </div>
                </div>

                <Button
                    disabled={isLoading || !validatePassword(password, passwordConfirmation).isValid || !token}
                    isLoading={isLoading}
                    label="Confirmar nova senha"
                    type="submit"
                    onClick={handleRecovery}
                />
            </div>

        </div>
    )
}