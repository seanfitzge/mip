"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function Input({
  className,
  type = "text",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [isFocused, setIsFocused] = React.useState(false)

  return (
    <div className="relative">
      <input
        type={type}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "flex h-14 w-full rounded-xl border border-border/50 glass px-5 text-base font-mono",
          "placeholder:text-ghost/40 placeholder:font-mono",
          "focus-visible:outline-none focus-visible:border-electricBlue/50 focus-visible:shadow-glow",
          "transition-all duration-300",
          "disabled:cursor-not-allowed disabled:opacity-40",
          "text-foreground",
          className
        )}
        {...props}
      />
      {isFocused && (
        <motion.div
          layoutId="input-focus"
          className="absolute inset-0 rounded-xl border-2 border-electricBlue/50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  )
}
