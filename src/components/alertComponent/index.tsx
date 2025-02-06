import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Icons } from "../icons";

interface IAlertDialogComponent {
    error?: boolean
    actionError?: boolean
    icon?: boolean
    show: boolean;
    title: string;
    description?: string;
    cancelText: string;
    actionText?: string;
    onAction?: () => void;
    onCancel?: () => void;
    isLoading?: boolean
}

export function AlertDialogComponent({
    error = false,
    actionError = false,
    icon = true,
    show,
    title,
    description,
    cancelText,
    actionText,
    onAction,
    onCancel,
    isLoading
}: IAlertDialogComponent) {
    const handleCancel = () => {
        if (onCancel) {
            return onCancel();
        }
    };

    const handleAction = () => {
        if (onAction) {
            return onAction();
        }
    };

    return (
        <AlertDialog open={show}>
            <AlertDialogContent className="max-w-[410px] p-10 items-center gap-6 flex flex-col">
                {
                    (!error && icon) &&
                    (<Image src='/PolygonOK.svg' width={120} height={120} alt="polygon" />)
                }{
                    (error && icon) &&
                    (<Image src='/PolygonX.svg' width={120} height={120} alt="polygon" />)
                }
                <AlertDialogHeader className="items-center flex flex-col">
                    <AlertDialogTitle className="text-purple-700 text-2xl text-center font-bold">{title}</AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-grey-800 text-[16px]s">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col items-center w-full gap-3">
                    {
                        actionText && (
                            <AlertDialogAction
                                className={
                                    cn(actionError && "bg-red-600 hover:border-red-600 hover:text-red-600",
                                        "w-full"
                                    )}
                                onClick={handleAction}>
                                {
                                    isLoading ?
                                        <Icons.spinner />
                                        :
                                        actionText
                                }
                            </AlertDialogAction>
                        )
                    }
                    <AlertDialogCancel onClick={handleCancel}>{cancelText}</AlertDialogCancel>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}