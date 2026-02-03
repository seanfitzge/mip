"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type ConfidenceBadgeProps = {
  level: string
}

const CONFIDENCE_STYLES: Record<string, { 
  bg: string
  text: string
  border: string
  glow: string
  label: string 
}> = {
  STRONG: { 
    bg: "bg-laserGreen/10", 
    text: "text-laserGreen", 
    border: "border-laserGreen/30",
    glow: "shadow-glow-success",
    label: "Strong evidence" 
  },
  MODERATE: { 
    bg: "bg-neonCyan/10", 
    text: "text-neonCyan", 
    border: "border-neonCyan/30",
    glow: "shadow-glow",
    label: "Moderate evidence" 
  },
  PRELIMINARY: { 
    bg: "bg-hotMagenta/10", 
    text: "text-hotMagenta", 
    border: "border-hotMagenta/30",
    glow: "shadow-glow-accent",
    label: "Preliminary evidence" 
  },
  LIMITED: { 
    bg: "bg-hotMagenta/10", 
    text: "text-hotMagenta", 
    border: "border-hotMagenta/30",
    glow: "shadow-glow-accent",
    label: "Limited evidence" 
  },
  HIGH: { 
    bg: "bg-laserGreen/10", 
    text: "text-laserGreen", 
    border: "border-laserGreen/30",
    glow: "shadow-glow-success",
    label: "High confidence" 
  },
  LOW: { 
    bg: "bg-hotMagenta/10", 
    text: "text-hotMagenta", 
    border: "border-hotMagenta/30",
    glow: "shadow-glow-accent",
    label: "Low confidence" 
  }
}

export function ConfidenceBadge({ level }: ConfidenceBadgeProps) {
  const normalized = level.trim().toUpperCase()
  const style = CONFIDENCE_STYLES[normalized] ?? {
    bg: "bg-charcoal",
    text: "text-ghost",
    border: "border-border",
    glow: "",
    label: normalized
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-sm",
        "font-mono text-xs font-bold uppercase tracking-wide",
        style.bg,
        style.text,
        style.border,
        "hover:" + style.glow,
        "transition-all duration-300"
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", style.text.replace("text-", "bg-"))} />
      {style.label}
    </motion.div>
  )
}
