"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type DailyMetricsPromptProps = {
  hasLoggedToday: boolean
  onComplete: () => void
  onDismiss: () => void
}

export function DailyMetricsPrompt({ 
  hasLoggedToday, 
  onComplete,
  onDismiss 
}: DailyMetricsPromptProps) {
  const [isVisible, setIsVisible] = useState(!hasLoggedToday)
  const [stage, setStage] = useState(0)
  const [metrics, setMetrics] = useState({
    weight: "",
    sleep: "",
    recovery: ""
  })

  useEffect(() => {
    if (!hasLoggedToday) {
      // Dramatic entrance sequence
      const timer1 = setTimeout(() => setStage(1), 500)
      const timer2 = setTimeout(() => setStage(2), 1000)
      const timer3 = setTimeout(() => setStage(3), 1500)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [hasLoggedToday])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add your API call here to save metrics
    setStage(4) // Success state
    setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 2000)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-voidBlack/95 backdrop-blur-xl overflow-y-auto"
      >
        {/* Animated gradient orbs */}
        <motion.div
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-primary blur-[150px]"
        />
        <motion.div
          animate={{ 
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.3, 1],
            rotate: [0, -180, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full bg-gradient-accent blur-[150px]"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-10" />

        {/* Main content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative z-10 w-full max-w-2xl my-auto"
        >
          {stage === 4 ? (
            // Success State
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center space-y-8 py-12"
            >
              {/* Success icon */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 1, ease: "easeOut" },
                  scale: { duration: 0.5, delay: 0.5 }
                }}
                className="mx-auto w-32 h-32 rounded-full bg-gradient-success flex items-center justify-center shadow-glow-success"
              >
                <span className="text-6xl">✓</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter">
                  <span className="text-gradient">Metrics Logged</span>
                </h2>
                <p className="text-base sm:text-lg text-laserGreen font-mono mt-4">
                  MISSION COMPLETE • DATA SYNCHRONIZED
                </p>
              </motion.div>
            </motion.div>
          ) : (
            // Form State
            <Card className="p-6 sm:p-8 lg:p-10 border-2 border-electricBlue/30 shadow-glow relative overflow-hidden">
              {/* Pulsing background */}
              <motion.div
                animate={{ 
                  opacity: [0.05, 0.15, 0.05],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-primary"
              />

              <div className="relative z-10 space-y-4 sm:space-y-6 lg:space-y-8">
                {/* Header */}
                <div className="text-center space-y-3 sm:space-y-4 lg:space-y-6">
                  {/* Critical badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={stage >= 1 ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border-2 border-neonCyan bg-neonCyan/10">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonCyan opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-neonCyan shadow-glow-success" />
                      </span>
                      <span className="text-sm font-mono font-bold uppercase tracking-ultra text-neonCyan">
                        Daily Check-In Required
                      </span>
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={stage >= 2 ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="space-y-2 sm:space-y-3"
                  >
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter">
                      <span className="text-gradient">Log Today's Metrics</span>
                    </h2>
                    <div className="h-1 w-16 sm:w-24 mx-auto bg-gradient-primary rounded-full" />
                  </motion.div>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={stage >= 2 ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base text-ghost/70 max-w-lg mx-auto leading-relaxed"
                  >
                    Your biometric data powers the intelligence engine. 
                    <span className="text-neonCyan font-semibold"> Consistent logging unlocks maximum insights.</span>
                  </motion.p>
                </div>

                {/* Form */}
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  onSubmit={handleSubmit}
                  className="space-y-4 sm:space-y-5 lg:space-y-6"
                >
                  {/* Weight */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-mono font-semibold uppercase tracking-wide text-ghost/70">
                      <span className="w-6 h-6 rounded-md bg-gradient-primary flex items-center justify-center text-white text-xs">
                        1
                      </span>
                      Body Weight (kg)
                    </label>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="72.5"
                      value={metrics.weight}
                      onChange={(e) => setMetrics({ ...metrics, weight: e.target.value })}
                      required
                      className="text-lg"
                    />
                  </div>

                  {/* Sleep */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-mono font-semibold uppercase tracking-wide text-ghost/70">
                      <span className="w-6 h-6 rounded-md bg-gradient-primary flex items-center justify-center text-white text-xs">
                        2
                      </span>
                      Sleep Duration (hours)
                    </label>
                    <Input
                      type="number"
                      step="0.5"
                      placeholder="7.5"
                      value={metrics.sleep}
                      onChange={(e) => setMetrics({ ...metrics, sleep: e.target.value })}
                      required
                      className="text-lg"
                    />
                  </div>

                  {/* Recovery Score */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-mono font-semibold uppercase tracking-wide text-ghost/70">
                      <span className="w-6 h-6 rounded-md bg-gradient-primary flex items-center justify-center text-white text-xs">
                        3
                      </span>
                      Recovery Score (1-100)
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="100"
                      placeholder="85"
                      value={metrics.recovery}
                      onChange={(e) => setMetrics({ ...metrics, recovery: e.target.value })}
                      required
                      className="text-lg"
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      type="submit"
                      variant="neon"
                      className="flex-1 text-lg h-14"
                    >
                      <span className="flex items-center gap-2">
                        Submit Metrics
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => {
                        setIsVisible(false)
                        onDismiss()
                      }}
                      className="sm:w-auto text-ghost/50 hover:text-ghost"
                    >
                      Skip for now
                    </Button>
                  </div>
                </motion.form>

                {/* Info banner */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={stage >= 3 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="glass rounded-lg p-4 border border-laserGreen/20"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">💡</span>
                    <div className="flex-1">
                      <p className="text-xs font-mono text-ghost/70 leading-relaxed">
                        <span className="text-laserGreen font-semibold">PRO TIP:</span> Log metrics at the same time each day for maximum accuracy. Morning is ideal after waking.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.1, 0.3, 0.1],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                  className="absolute w-1 h-1 rounded-full bg-neonCyan blur-sm"
                  style={{
                    left: `${10 + i * 11}%`,
                    top: `${20 + (i % 3) * 20}%`
                  }}
                />
              ))}
            </Card>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
