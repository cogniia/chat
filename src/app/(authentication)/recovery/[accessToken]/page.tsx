'use client'

import * as React from "react"
import Image from "next/image"

import { UserResetPasswordForm } from "./components/user-reset-password"

export default function RecoveryPage() {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false)

    return (
        <>
            <Image src='/Hexagonos-default.svg' width={142} height={151} alt="bg polygon left" className="fixed -left-6 -bottom-6 transform scale-x-[-1] md:w-[360px] md:h-[507px] md:-bottom-32 md:-left-20" />
            <Image src='/Hexagonos-default.svg' width={142} height={151} alt="bg polygon right" className="fixed -right-6 -top-6 md:w-[360px] md:h-[507px] md:-top-32 md:-right-20" />
            <div className="container relative h-screen flex flex-col items-center justify-center sm:grid md:grid lg:max-w-none ">
                <div className="p-8 pt-14">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 mb-16 sm:w-[410px]">
                        <a href="/">
                            <Image src='/cogniia.svg' width={180} height={54} alt={"logo-long"} />
                        </a>
                    </div>

                    <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[410px]">
                        <div className="flex flex-col space-y-2 text-left mb-3">
                            <h1 className="text-2xl font-bold tracking-tight text-purple-700">
                                Recuperação de senha
                            </h1>
                            <a className="text-grey-800 text-[16px]">
                                Informe uma nova senha para voltar a ter acesso à plataforma Cogniia.
                            </a>
                        </div>
                        <UserResetPasswordForm />
                    </div>
                </div>
            </div>
        </>
    )
}