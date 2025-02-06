'use client'
import * as React from 'react'
import { cn } from "@/lib/utils"
import { TriangleAlert } from 'lucide-react';
interface AlertComponentProps extends React.HTMLAttributes<HTMLDivElement> {
    helperText: string | null
}
export function AlertToastComponent({ className, helperText, ...props }: AlertComponentProps) {
    return (
        <div className={cn(className, "rounded-xl px-4 py-2 bg-danger-300")}>
            <a className={cn("text-sm text-white flex gap-2 items-center"
            )}>
                <TriangleAlert size={24} className="text-white" />
                {helperText}
            </a>
        </div>
    );
}