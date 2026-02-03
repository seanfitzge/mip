"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

type StreakCelebrationProps = {
  show: boolean
  milestone: number
  onComplete: () => void
}

export function StreakCelebration({ show, milestone, onComplete }: StreakCelebrationProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string }>>([])

  useEffect(() => {
    if (show) {
      // Generate confetti particles
      const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: ['#00FFFF', '#0A84FF', '#32FF96', '#FF0080', '#8247E5'][Math.floor(Math.random() * 5)]
      }))
      setConfetti(particles)

      // Auto-close after animation
      const timer = setTimeout(() => {
        onComplete()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show, onComplete])

  const getMilestoneMessage = () => {
    if (milestone === 7) return "One Week Streak!"
    if (milestone === 14) return "Two Week Streak!"
    if (milestone === 30) return "One Month Streak!"
    if (milestone === 60) return "Two Month Streak!"
    if (milestone === 90) return "Three Month Streak!"
    if (milestone === 100) return "100 Day Streak!"
    return `${milestone} Day Streak!`
  }

  const getMilestoneEmoji = () => {
    if (milestone === 7) return "⭐"
    if (milestone === 14) return "🌟"
    if (milestone === 30) return "💎"
    if (milestone === 60) return "👑"
    if (milestone === 90) return "🏆"
    if (milestone === 100) return "🎖️"
    return "🔥"
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none"
        >
          {/* Confetti particles */}
          {confetti.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                y: '100vh',
                x: `${particle.x}vw`,
                opacity: 1,
                rotate: 0,
                scale: 1
              }}
              animate={{ 
                y: '-20vh',
                rotate: 360 * 3,
                scale: [1, 0.8, 0.6],
                opacity: [1, 1, 0]
              }}
              transition={{ 
                duration: 2 + Math.random(),
                ease: "easeOut",
                delay: Math.random() * 0.5
              }}
              className="absolute w-3 h-3 rounded-sm"
              style={{ backgroundColor: particle.color }}
            />
          ))}

          {/* Center celebration card */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.3
            }}
            className="relative z-10 pointer-events-auto"
          >
            <div className="glass rounded-2xl p-8 border-2 border-laserGreen shadow-glow-success min-w-[300px]">
              <div className="text-center space-y-4">
                {/* Emoji */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 0.5,
                    repeat: 5,
                    delay: 0.5
                  }}
                  className="text-7xl"
                >
                  {getMilestoneEmoji()}
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-3xl font-bold tracking-tighter"
                >
                  <span className="text-gradient">{getMilestoneMessage()}</span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-sm font-mono text-laserGreen"
                >
                  LEGENDARY CONSISTENCY
                </motion.p>

                {/* Rays animation */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 0.5, 0],
                      scale: [0, 2, 3]
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.5 + i * 0.1,
                      ease: "easeOut"
                    }}
                    className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-success origin-bottom"
                    style={{
                      transform: `rotate(${i * 45}deg) translateY(-50%)`,
                      transformOrigin: 'bottom center'
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Pulsing background glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.3, 0.5, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-success blur-[150px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
