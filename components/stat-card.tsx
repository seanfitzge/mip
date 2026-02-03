"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { MiniLineChart } from "@/components/charts/mini-line-chart"
import { cn } from "@/lib/utils"

type StatCardProps = {
  title: string
  value: string
  description?: string
  delta?: string
  deltaTone?: "success" | "warning" | "critical" | "neutral"
  trend?: number[]
  statusTone?: "success" | "warning" | "critical" | "primary" | "neutral"
}

const toneClasses: Record<NonNullable<StatCardProps["deltaTone"]>, string> = {
  success: "text-laserGreen font-semibold",
  warning: "text-hotMagenta font-semibold",
  critical: "text-hotMagenta font-bold",
  neutral: "text-ghost/60"
}

const borderTones: Record<NonNullable<StatCardProps["statusTone"]>, string> = {
  success: "border-t-4 border-t-laserGreen",
  warning: "border-t-4 border-t-hotMagenta",
  critical: "border-t-4 border-t-hotMagenta",
  primary: "border-t-4 border-t-electricBlue",
  neutral: "border-t-4 border-t-border"
}

const glowTones: Record<NonNullable<StatCardProps["statusTone"]>, string> = {
  success: "hover:shadow-glow-success",
  warning: "hover:shadow-glow-accent",
  critical: "hover:shadow-glow-accent",
  primary: "hover:shadow-glow",
  neutral: "hover:shadow-float"
}

export function StatCard({
  title,
  value,
  description,
  delta,
  deltaTone = "neutral",
  trend,
  statusTone = "primary"
}: StatCardProps) {
  return (
    <Card className={cn(
      "p-4 sm:p-5 lg:p-6 relative overflow-hidden group",
      borderTones[statusTone],
      glowTones[statusTone]
    )}>
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500"
      />
      
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-mono font-semibold uppercase tracking-ultra text-ghost/50">
            {title}
          </p>
          {statusTone === "success" && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-laserGreen shadow-glow-success"
            />
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl lg:text-metric font-bold tracking-tighter"
        >
          <span className="text-gradient">{value}</span>
        </motion.div>
        
        {delta && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={cn("text-sm font-mono", toneClasses[deltaTone])}
          >
            {delta}
          </motion.p>
        )}
        
        {trend && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-2"
          >
            <MiniLineChart
              points={trend}
              height={48}
              ariaLabel={`${title} seven-day trend`}
            />
          </motion.div>
        )}
        
        {description && (
          <p className="text-xs text-ghost/60 font-mono leading-relaxed pt-1 border-t border-border/30">
            {description}
          </p>
        )}
      </div>
    </Card>
  )
}
