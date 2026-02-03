import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "muted" | "outline"
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide",
        variant === "default" && "bg-primary text-primaryForeground",
        variant === "muted" && "bg-muted text-mutedForeground",
        variant === "outline" && "border border-border text-foreground",
        className
      )}
      {...props}
    />
  )
}
