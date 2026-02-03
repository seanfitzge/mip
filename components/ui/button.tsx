"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "neon"
}

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const MotionButton = motion.button

  return (
    <MotionButton
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={cn(
        "relative inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-xl px-8 text-sm font-bold tracking-wide transition-all duration-300 overflow-hidden group",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-electricBlue",
        "disabled:pointer-events-none disabled:opacity-40",
        "before:absolute before:inset-0 before:transition-all before:duration-300",
        variant === "primary" &&
          "bg-gradient-primary text-white shadow-glow hover:shadow-glow-accent before:bg-gradient-accent before:opacity-0 hover:before:opacity-100",
        variant === "secondary" &&
          "glass border border-border/50 text-foreground hover:border-electricBlue/50 hover:shadow-glow",
        variant === "ghost" &&
          "bg-transparent text-foreground hover:glass hover:border hover:border-border/50",
        variant === "outline" &&
          "border-2 border-electricBlue/30 bg-transparent text-electricBlue hover:bg-electricBlue/10 hover:border-electricBlue hover:shadow-glow",
        variant === "neon" &&
          "bg-neonCyan/10 border-2 border-neonCyan text-neonCyan hover:bg-neonCyan/20 hover:shadow-glow-success text-neon",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {props.children}
      </span>
      {/* Shimmer effect on hover */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </span>
    </MotionButton>
  )
}
