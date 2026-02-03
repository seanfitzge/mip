import * as React from "react"
import { cn } from "@/lib/utils"

type StatusLevel = "optimal" | "good" | "moderate" | "at-risk" | "needs-data"

const statusMap: Record<
  StatusLevel,
  { label: string; color: string; shape: "circle" | "triangle" | "diamond" | "ring"; icon: string }
> = {
  optimal: { label: "Optimal", color: "bg-success", shape: "circle", icon: "✓" },
  good: { label: "Good", color: "bg-primary", shape: "circle", icon: "—" },
  moderate: { label: "Moderate", color: "bg-warning", shape: "triangle", icon: "⚠" },
  "at-risk": { label: "At Risk", color: "bg-critical", shape: "diamond", icon: "!" },
  "needs-data": { label: "Needs Data", color: "border border-mutedForeground text-mutedForeground", shape: "ring", icon: "?" }
}

export function StatusBadge({ status, className }: { status: StatusLevel; className?: string }) {
  const meta = statusMap[status]

  return (
    <div className={cn("inline-flex items-center gap-2 text-sm font-semibold", className)}>
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center text-xs font-semibold text-white",
          meta.color,
          meta.shape === "circle" && "rounded-full",
          meta.shape === "ring" && "rounded-full bg-transparent text-mutedForeground",
          meta.shape === "triangle" && "clip-triangle",
          meta.shape === "diamond" && "rotate-45"
        )}
        aria-hidden="true"
      >
        <span className={cn(meta.shape === "diamond" && "-rotate-45")}>{meta.icon}</span>
      </span>
      <span>{meta.label}</span>
    </div>
  )
}
