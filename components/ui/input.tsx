import * as React from "react"
import { cn } from "@/lib/utils"

export function Input({
  className,
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-md border border-border bg-background px-4 text-base",
        "placeholder:text-mutedForeground focus-visible:outline-none focus-visible:border-primary",
        "focus-visible:ring-2 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}
