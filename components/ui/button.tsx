import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost"
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-md px-6 text-base font-semibold transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-primary text-primaryForeground hover:bg-primary/90 active:bg-primary/85",
        variant === "secondary" &&
          "bg-muted text-foreground hover:bg-muted/80 active:bg-muted/70",
        variant === "ghost" &&
          "bg-transparent text-foreground hover:bg-muted active:bg-muted/70",
        className
      )}
      {...props}
    />
  )
}
