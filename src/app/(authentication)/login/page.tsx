'use client'
import * as React from "react"
import Image from "next/image"

import { UserAuthForm } from "./components/user-auth-form"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { fadeBackgroundControllStore } from "@/zustand-store/fade-backgroung"

export default function AuthenticationPage() {
    const { isAlertDialogOpen } = fadeBackgroundControllStore()
    return (
        <>
            <div className={`${!isAlertDialogOpen && 'hidden'} fixed w-[200vw] h-[200vh] bg-zinc-900/60 z-10`} />
            <div className="container relative h-screen flex-col items-center justify-center sm:grid md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 ">
                <div className="p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 mb-16 sm:w-[350px]">
                        <Image src='/cogniia.svg' width={180} height={54} alt={"logo-long"} />
                    </div>

                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-left mb-3">
                            <h1 className="text-2xl font-bold tracking-tight text-purple-700">
                                Login
                            </h1>
                        </div>
                        <UserAuthForm />

                        <div className="items-center justify-center flex flex-col w-full">
                            <p className="text-sm text-grey-800">
                                Ainda não tem acesso?
                            </p>
                            <Link href="/register">
                                <Button
                                    variant='outline'
                                    label="Cadastre-se agora clicando aqui"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="relative hidden h-full  lg:flex">
                    <Image src='/Login-Illustration.svg' fill className="object-cover" alt={"logo-long"} />
                </div>
            </div>
        </>
    )
}