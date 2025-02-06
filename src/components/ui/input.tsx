import * as React from "react"

import { cn } from "@/lib/utils"
import { TriangleAlert, Eye, EyeOff } from 'lucide-react'


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  helperText?: string | null;
  error?: boolean
  passwordIcon?: boolean
  showPassword?: boolean
  setShowPassword?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, helperText, error, passwordIcon = false, showPassword = false, setShowPassword, ...props }, ref) => {
    return (
      <div>
        <div className="flex flex-row relative items-center">
          <input
            type={showPassword ? 'text' : type}
            className={cn(
              "flex h-12 w-full rounded-3xl border-[2px] border-input bg-background px-6 py-4 text-[16px] placeholder:text-muted-foreground hover:border-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className,
              `${error && "border-danger-300 focus-visible:ring-0 hover:border-danger-300"}`
            )}
            ref={ref}
            {...props}
          />
          {
            passwordIcon && (
              <button type="button" className="absolute right-4" onClick={setShowPassword}>
                {
                  showPassword ?
                    <EyeOff className="text-purple-700" />
                    :
                    <Eye className="text-purple-700" />
                }
              </button>
            )
          }
        </div>
        {
          helperText &&
          <a className={cn("absolute mt-2 text-xs text-grey-700 flex gap-1",
            error && "text-danger-300"
          )}>
            {
              error &&
              <TriangleAlert size={14} className="text-danger-300" />
            }
            {helperText}
          </a>
        }
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
