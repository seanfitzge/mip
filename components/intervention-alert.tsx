"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type InterventionAlertProps = {
  title: string
  details: string[]
  active: boolean
  severity?: "warning" | "critical" | "info"
}

const severityStyles = {
  critical: {
    border: "border-l-4 border-l-hotMagenta",
    bg: "bg-hotMagenta/5",
    glow: "shadow-glow-accent",
    pulseColor: "bg-hotMagenta",
    textColor: "text-hotMagenta",
    icon: "⚠",
    label: "Critical"
  },
  warning: {
    border: "border-l-4 border-l-hotMagenta",
    bg: "bg-hotMagenta/5",
    glow: "shadow-glow-accent",
    pulseColor: "bg-hotMagenta",
    textColor: "text-hotMagenta",
    icon: "⚠",
    label: "Warning"
  },
  info: {
    border: "border-l-4 border-l-neonCyan",
    bg: "bg-neonCyan/5",
    glow: "shadow-glow",
    pulseColor: "bg-neonCyan",
    textColor: "text-neonCyan",
    icon: "ℹ",
    label: "Info"
  }
}

export function InterventionAlert({
  title,
  details,
  active,
  severity = "warning"
}: InterventionAlertProps) {
  const style = severityStyles[severity]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <Card
          className={cn(
            "p-6 relative overflow-hidden",
            active && style.border,
            active && style.bg,
            active && style.glow
          )}
          aria-live={active ? "polite" : undefined}
          role="alert"
        >
          {/* Animated background pulse when active */}
          {active && (
            <motion.div
              animate={{ 
                opacity: [0.1, 0.2, 0.1],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={cn("absolute inset-0", style.bg)}
            />
          )}

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {active && (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="relative"
                  >
                    <span className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-lg font-bold text-lg",
                      style.bg,
                      style.textColor
                    )}>
                      {style.icon}
                    </span>
                    <span className={cn(
                      "absolute inset-0 rounded-lg animate-ping",
                      style.pulseColor,
                      "opacity-30"
                    )} />
                  </motion.div>
                )}
                <h3 className="text-xl font-bold tracking-tight">{title}</h3>
              </div>
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                {active ? (
                  <div className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-sm",
                    style.border.replace("border-l-4 border-l-", "border-"),
                    style.bg
                  )}>
                    <span className={cn("relative flex h-2 w-2")}>
                      <span className={cn(
                        "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                        style.pulseColor
                      )} />
                      <span className={cn(
                        "relative inline-flex rounded-full h-2 w-2",
                        style.pulseColor
                      )} />
                    </span>
                    <span className={cn("text-xs font-mono font-bold uppercase", style.textColor)}>
                      Active
                    </span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border/30">
                    <span className="w-2 h-2 rounded-full bg-laserGreen" />
                    <span className="text-xs font-mono font-bold uppercase text-ghost/60">
                      Monitoring
                    </span>
                  </div>
                )}
              </motion.div>
            </div>

            {active ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="space-y-2 pl-11"
              >
                {details.map((detail, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <span className={cn("mt-1.5 w-1 h-1 rounded-full", style.pulseColor)} />
                    <p className="text-sm text-ghost/80 font-mono leading-relaxed">{detail}</p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="text-sm text-ghost/60 font-mono"
              >
                <span className="text-laserGreen font-semibold">✓ All systems nominal.</span> Biometrics remain within baseline thresholds.
              </motion.p>
            )}
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
