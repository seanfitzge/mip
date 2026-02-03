"use client"

import { motion } from "framer-motion"

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-voidBlack">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{ 
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-gradient-primary blur-[120px]"
      />
      <motion.div
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-gradient-accent blur-[120px]"
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />

      {/* Loading content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Rotating hexagon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="mx-auto"
        >
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <motion.path
              d="M40 10 L65 25 L65 55 L40 70 L15 55 L15 25 Z"
              stroke="url(#gradient)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, 8] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.circle
              cx="40"
              cy="40"
              r="8"
              fill="url(#gradient)"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(10, 132, 255)" />
                <stop offset="100%" stopColor="rgb(130, 71, 229)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Text */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="space-y-2"
        >
          <p className="text-sm font-mono uppercase tracking-ultra text-ghost/70">
            Loading
          </p>
          <div className="flex items-center justify-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
                className="w-1.5 h-1.5 rounded-full bg-electricBlue"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
