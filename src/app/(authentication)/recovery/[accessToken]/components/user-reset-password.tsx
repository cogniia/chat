"use client";

import * as React from "react";
import { cn, validatePassword } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertComponent } from "./alert";
import { me, update } from "@/api/user/service/main";
import { useParams, useRouter } from "next/navigation";
import { AlertDialogComponent } from "@/components/alertComponent";
import Cookies from "js-cookie";
import { useAuthStore } from "@/zustand-store/authStore";
import { startAuthCycle } from "@/api/auth/service/main";

interface UserResetPasswordFormProps
    extends React.HTMLAttributes<HTMLDivElement> {}

export function UserResetPasswordForm({
    className,
    ...props
}: UserResetPasswordFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [showAlert, setShowAlert] = React.useState<boolean>(false);
    const [showError, setShowError] = React.useState<boolean>(false);

    const { accessToken } = useParams();
    const [password, setPassword] = React.useState<string>("");
    const [passwordConfirmation, setPasswordConfirmation] =
        React.useState<string>("");

    const [apiMessageResponse, setApiMessageResponse] = React.useState<{
        title: string;
        description?: string;
    }>({ title: "", description: "" });

    async function handleRecovery() {
        setIsLoading(true);
        setShowError(false);
        try {
            useAuthStore.getState().setTokens({
                token:
                    typeof accessToken === "string"
                        ? accessToken
                        : accessToken.join(),
            });
            await update({ password });
            await me();
            // setApiMessageResponse(response?.data?.message);
            setShowAlert(true);
            setTimeout(async () => {
                await startAuthCycle({
                    email:
                        useAuthStore.getState().user?.email.toLowerCase() || "",
                    password,
                }).then(() => router.refresh());
            });
        } catch (ex: any) {
            setApiMessageResponse(ex?.response?.data?.message);
            setShowError(true);
            console.log(ex);
        } finally {
            setIsLoading(false);
        }
    }

    React.useEffect(() => {
        if (Cookies.get("token")) {
            router.push("/");
        }
    }, [Cookies.get("token")]);

    return (
        <div className={cn("grid", className)} {...props}>
            {showError && (
                <AlertComponent helperText={apiMessageResponse?.title} />
            )}
            <AlertDialogComponent
                show={showAlert}
                title={apiMessageResponse?.title}
                description={""}
                cancelText={""}
                isLoading={isLoading}
            />

            <div className="grid gap-10 mt-4">
                {!validatePassword(password, passwordConfirmation).isValid &&
                    validatePassword(password, passwordConfirmation).id ===
                        2 && (
                        <AlertComponent
                            helperText={
                                validatePassword(password, passwordConfirmation)
                                    .message
                            }
                        />
                    )}
                <div className="grid gap-4">
                    <Label
                        className="text-purple-700 font-semibold text-[16px]"
                        htmlFor="password"
                    >
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
                        helperText={
                            !validatePassword(password, passwordConfirmation)
                                .isValid &&
                            validatePassword(password, passwordConfirmation)
                                .id === 1
                                ? validatePassword(
                                      password,
                                      passwordConfirmation,
                                  )?.message
                                : ""
                        }
                        error={
                            !validatePassword(password, passwordConfirmation)
                                .isValid &&
                            password.length > 0 &&
                            validatePassword(password, passwordConfirmation)
                                .id === 1
                        }
                    />
                </div>
                <div className="grid gap-4">
                    <Label
                        className="text-purple-700 font-semibold text-[16px]"
                        htmlFor="passwordConfirmation"
                    >
                        Repetir nova senha
                    </Label>
                    <Input
                        id="passwordConfirmation"
                        placeholder="Digite aqui novamente a nova senha"
                        type="password"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={isLoading}
                        onChange={(e) =>
                            setPasswordConfirmation(e.target.value)
                        }
                        error={
                            !validatePassword(password, passwordConfirmation)
                                .isValid && passwordConfirmation.length > 0
                        }
                    />
                </div>

                <Button
                    disabled={
                        isLoading ||
                        !validatePassword(password, passwordConfirmation)
                            .isValid ||
                        password !== passwordConfirmation
                    }
                    isLoading={isLoading}
                    label="Confirmar nova senha"
                    type="submit"
                    onClick={handleRecovery}
                />
            </div>
        </div>
    );
}
