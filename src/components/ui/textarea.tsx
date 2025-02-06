import * as React from "react"

import { cn } from "@/lib/utils"
import { ArrowUp, ArrowUpCircle } from "lucide-react"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onSend: () => void;
  disabled?: boolean
  value?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="flex flex-row relative items-center justify-center max-w-[630px] w-full">
        <textarea
          className={cn(
            "flex min-h-[44px] max-w-[630px] max-h-52 w-full rounded-3xl border border-grey-700 bg-background pl-6 pr-14 py-2 text-[16px] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:border-none focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          disabled={props.disabled}
          {...props}
        />
        <button type="button" className="absolute right-4" onClick={props.onSend} disabled={props.disabled || props.value === ''}>
          <ArrowUpCircle size={35} className={cn("text-white bg-purple-400 rounded-full", props.disabled || props.value === '' ? 'text-grey-500 bg-white ' : 'text-white bg-purple-400 ')} />
        </button>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
