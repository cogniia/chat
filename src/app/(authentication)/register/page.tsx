'use client'

import * as React from "react"
import Image from "next/image"
import { UserRegisterForm } from "./components/user-register-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RegisterPage() {
    const [isAlertDialogOpen, setIsAlertDialogOpen] = React.useState(false)

    return (
        <>
            <div className={`${!isAlertDialogOpen && 'hidden'} absolute w-full h-full bg-zinc-900/60 z-10`} />
            <div className="container relative h-screen flex-col items-center justify-center sm:grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 ">
                <div className="p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 mb-16 sm:w-[350px]">
                        <Image src='/cogniia.svg' width={180} height={54} alt={"logo-long"} />
                    </div>

                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-left mb-3">
                            <h1 className="text-2xl font-bold tracking-tight text-purple-700">
                                Cadastro
                            </h1>
                        </div>
                        <UserRegisterForm />

                        <div className="items-center justify-center flex flex-col w-full">
                            <p className="text-sm text-grey-800">
                                Já possui cadastro?
                            </p>
                            <Link href="/login">
                                <Button
                                    variant='outline'
                                    label="Faça login clicando aqui"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative hidden h-full  lg:flex">
                    <Image src='/Cadastro-Illustration.svg' fill objectFit="cover" alt={"logo-long"} />
                </div>
            </div>
        </>
    )
}