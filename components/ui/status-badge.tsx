"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type StatusLevel = "optimal" | "good" | "moderate" | "at-risk" | "needs-data"

const statusMap: Record<
  StatusLevel,
  { 
    label: string
    bgColor: string
    textColor: string
    borderColor: string
    glowColor: string
    icon: string
    animate: boolean
  }
> = {
  optimal: { 
    label: "Optimal", 
    bgColor: "bg-laserGreen/10", 
    textColor: "text-laserGreen",
    borderColor: "border-laserGreen/30",
    glowColor: "shadow-glow-success",
    icon: "✓",
    animate: true
  },
  good: { 
    label: "Good", 
    bgColor: "bg-electricBlue/10", 
    textColor: "text-electricBlue",
    borderColor: "border-electricBlue/30",
    glowColor: "shadow-glow",
    icon: "→",
    animate: false
  },
  moderate: { 
    label: "Moderate", 
    bgColor: "bg-neonCyan/10", 
    textColor: "text-neonCyan",
    borderColor: "border-neonCyan/30",
    glowColor: "",
    icon: "⚡",
    animate: false
  },
  "at-risk": { 
    label: "At Risk", 
    bgColor: "bg-hotMagenta/10", 
    textColor: "text-hotMagenta",
    borderColor: "border-hotMagenta/30",
    glowColor: "shadow-glow-accent",
    icon: "⚠",
    animate: true
  },
  "needs-data": { 
    label: "Needs Data", 
    bgColor: "bg-charcoal", 
    textColor: "text-ghost/60",
    borderColor: "border-border/30",
    glowColor: "",
    icon: "?",
    animate: false
  }
}

export function StatusBadge({ status, className }: { status: StatusLevel; className?: string }) {
  const meta = statusMap[status]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "inline-flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-sm",
        meta.bgColor,
        meta.borderColor,
        "hover:" + meta.glowColor,
        "transition-all duration-300",
        className
      )}
    >
      <motion.span
        animate={meta.animate ? {
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        } : {}}
        transition={meta.animate ? {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        } : {}}
        className="relative flex items-center justify-center"
      >
        {meta.animate && (
          <span className={cn(
            "absolute inset-0 rounded-full animate-ping",
            meta.textColor.replace("text-", "bg-"),
            "opacity-30"
          )} />
        )}
        <span className={cn(
          "relative text-sm font-bold",
          meta.textColor
        )}>
          {meta.icon}
        </span>
      </motion.span>
      
      <span className={cn(
        "text-sm font-mono font-bold uppercase tracking-wide",
        meta.textColor
      )}>
        {meta.label}
      </span>
    </motion.div>
  )
}
