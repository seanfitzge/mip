"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(false)
  const [hasSeenIntro, setHasSeenIntro] = useState(true)
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const seen = localStorage.getItem("mip-intro-seen")
    
    if (!seen) {
      setHasSeenIntro(false)
      setShowIntro(true)
      
      // Stage progression
      const timer1 = setTimeout(() => setStage(1), 400)
      const timer2 = setTimeout(() => setStage(2), 1200)
      const timer3 = setTimeout(() => setStage(3), 2000)
      
      // Complete animation
      const timer4 = setTimeout(() => {
        setShowIntro(false)
        localStorage.setItem("mip-intro-seen", "true")
      }, 3800)
      
      return () => {
        clearTimeout(timer1)
        clearTimeout(timer2)
        clearTimeout(timer3)
        clearTimeout(timer4)
      }
    }
  }, [])

  if (hasSeenIntro) return null

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-voidBlack overflow-hidden"
        >
          {/* Animated gradient orbs */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-primary blur-[120px]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-accent blur-[120px]"
          />
          
          {/* Grid lines effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 1 ? 0.1 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 grid-pattern"
          />

          <div className="relative z-10 text-center px-8">
            {/* Main logo - Geometric abstract shape */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateZ: -10 }}
              animate={{ scale: 1, opacity: 1, rotateZ: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              className="relative mx-auto w-32 h-32 mb-8"
            >
              {/* Rotating outer ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  ease: "linear",
                  repeat: Infinity,
                }}
                className="absolute inset-0"
              >
                <svg
                  width="128"
                  height="128"
                  viewBox="0 0 128 128"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="60"
                    stroke="url(#gradient1)"
                    strokeWidth="1"
                    fill="none"
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(10, 132, 255)" />
                      <stop offset="100%" stopColor="rgb(130, 71, 229)" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Center hexagon */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.path
                    d="M40 10 L65 25 L65 55 L40 70 L15 55 L15 25 Z"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
                  />
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="12"
                    fill="url(#gradient2)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 1 }}
                  />
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(0, 255, 255)" />
                      <stop offset="100%" stopColor="rgb(10, 132, 255)" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Orbiting particles */}
              {[0, 120, 240].map((angle, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: stage >= 2 ? 1 : 0,
                    rotate: 360
                  }}
                  transition={{
                    opacity: { duration: 0.3, delay: 0.8 + i * 0.1 },
                    rotate: { duration: 6, ease: "linear", repeat: Infinity }
                  }}
                  className="absolute inset-0"
                  style={{ transform: `rotate(${angle}deg)` }}
                >
                  <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-neonCyan shadow-glow-success" />
                </motion.div>
              ))}

              {/* Pulsing glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.8, 1.1, 0.8]
                }}
                transition={{
                  duration: 3,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: 0.5
                }}
                className="absolute inset-0 -m-8 rounded-full bg-electricBlue blur-3xl"
              />
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-4"
            >
              <motion.h1
                className="text-5xl font-bold tracking-tighter"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 10 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
              >
                <span className="text-gradient">MIP</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: stage >= 3 ? 0.3 : 0, scaleX: stage >= 3 ? 1 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-px w-32 mx-auto bg-gradient-primary"
              />
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 3 ? 0.7 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-sm tracking-ultra uppercase text-ghost font-mono"
              >
                Metabolic Intelligence Platform
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 3 ? 0.5 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="text-xs text-ghost/50 font-mono"
              >
                Initializing neural networks...
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: stage >= 3 ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              className="mt-12 w-64 h-1 mx-auto bg-charcoal rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut", delay: 2.2 }}
                className="h-full bg-gradient-primary origin-left"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
