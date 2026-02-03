"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

type MetricsStreakProps = {
  currentStreak: number
  longestStreak: number
  totalLogs: number
}

export function MetricsStreak({ currentStreak, longestStreak, totalLogs }: MetricsStreakProps) {
  const getStreakMessage = () => {
    if (currentStreak === 0) return "Start your streak today!"
    if (currentStreak === 1) return "Great start! Keep it going"
    if (currentStreak < 7) return "Building momentum"
    if (currentStreak < 14) return "Strong consistency"
    if (currentStreak < 30) return "Incredible dedication"
    return "Legendary commitment"
  }

  const getStreakColor = () => {
    if (currentStreak === 0) return "text-ghost/50"
    if (currentStreak < 7) return "text-neonCyan"
    if (currentStreak < 14) return "text-electricBlue"
    if (currentStreak < 30) return "text-laserGreen"
    return "text-gradient"
  }

  return (
    <Card className="p-6 border-2 border-laserGreen/30 hover:shadow-glow-success relative overflow-hidden">
      {/* Animated background for active streaks */}
      {currentStreak > 0 && (
        <motion.div
          animate={{ 
            opacity: [0.05, 0.15, 0.05],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-success"
        />
      )}

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="text-2xl">🔥</span>
            Logging Streak
          </h3>
          {currentStreak > 0 && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-laserGreen shadow-glow-success"
            />
          )}
        </div>

        {/* Current Streak - Hero Display */}
        <div className="text-center py-4">
          <motion.div
            key={currentStreak}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-2"
          >
            <div className={`text-6xl font-bold font-mono ${getStreakColor()}`}>
              {currentStreak}
            </div>
            <p className="text-sm font-mono uppercase tracking-ultra text-ghost/60">
              Day{currentStreak !== 1 ? 's' : ''} in a row
            </p>
          </motion.div>
        </div>

        {/* Message */}
        <div className="text-center">
          <p className="text-sm font-semibold text-laserGreen">
            {getStreakMessage()}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="glass rounded-lg p-3 border border-border/30 text-center">
            <p className="text-xs font-mono uppercase tracking-ultra text-ghost/50 mb-1">
              Longest
            </p>
            <p className="text-2xl font-bold font-mono text-electricBlue">
              {longestStreak}
            </p>
          </div>
          <div className="glass rounded-lg p-3 border border-border/30 text-center">
            <p className="text-xs font-mono uppercase tracking-ultra text-ghost/50 mb-1">
              Total Logs
            </p>
            <p className="text-2xl font-bold font-mono text-plasmaPink">
              {totalLogs}
            </p>
          </div>
        </div>

        {/* Motivational bar */}
        {currentStreak > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-ghost/50">
              <span>Next milestone</span>
              <span>{Math.ceil(currentStreak / 7) * 7} days</span>
            </div>
            <div className="h-2 bg-charcoal rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ 
                  width: `${(currentStreak % 7) / 7 * 100}%`
                }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-success"
              />
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
