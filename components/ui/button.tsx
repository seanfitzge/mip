import * as React from "react"
import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost"
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "primary" &&
          "bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90",
        variant === "secondary" &&
          "bg-muted px-4 py-2 text-foreground hover:bg-muted/80",
        variant === "ghost" &&
          "bg-transparent px-3 py-2 text-foreground hover:bg-muted",
        className
      )}
      {...props}
    />
  )
}
