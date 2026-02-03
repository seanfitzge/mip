"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

type MetricsReminderBadgeProps = {
  show: boolean
  onClick: () => void
}

export function MetricsReminderBadge({ show, onClick }: MetricsReminderBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="fixed bottom-6 right-6 z-[998] group"
        >
          {/* Pulsing outer rings */}
          <span className="absolute inset-0 rounded-full">
            <span className="absolute inset-0 rounded-full bg-neonCyan animate-ping opacity-20" />
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full bg-neonCyan opacity-10"
            />
          </span>

          {/* Main badge */}
          <div className="relative glass rounded-full p-4 border-2 border-neonCyan shadow-glow-success">
            {/* Icon container */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="url(#gradient-badge)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                  <defs>
                    <linearGradient id="gradient-badge" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(0, 255, 255)" />
                      <stop offset="100%" stopColor="rgb(50, 255, 150)" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Center icon */}
              <motion.div
                animate={isHovered ? { 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                } : {}}
                transition={{ duration: 0.5 }}
                className="relative text-3xl"
              >
                📊
              </motion.div>

              {/* Notification dot */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hotMagenta opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-hotMagenta border-2 border-voidBlack" />
              </span>
            </div>
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
              >
                <div className="glass rounded-lg px-4 py-3 border border-neonCyan/30 shadow-glow">
                  <p className="text-sm font-mono font-bold text-neonCyan">
                    Log Today's Metrics
                  </p>
                  <p className="text-xs font-mono text-ghost/60 mt-1">
                    Click to open
                  </p>
                </div>
                {/* Arrow */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-obsidian border-r border-t border-neonCyan/30 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
