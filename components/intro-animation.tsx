"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function IntroAnimation() {
  const [showIntro, setShowIntro] = useState(false)
  const [hasSeenIntro, setHasSeenIntro] = useState(true)

  useEffect(() => {
    // Check if user has seen the intro before
    const seen = localStorage.getItem("mip-intro-seen")
    
    if (!seen) {
      setHasSeenIntro(false)
      setShowIntro(true)
      
      // Mark as seen after animation completes
      const timer = setTimeout(() => {
        setShowIntro(false)
        localStorage.setItem("mip-intro-seen", "true")
      }, 2500) // 2.5 seconds total animation time
      
      return () => clearTimeout(timer)
    }
  }, [])

  // Don't render anything if user has already seen the intro
  if (hasSeenIntro) return null

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
        >
          <div className="relative">
            {/* Animated logo/icon */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
              }}
              className="relative"
            >
              {/* Pulse ring effect */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.2, 1.2], opacity: [0, 0.4, 0] }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: 0.3,
                }}
                className="absolute inset-0 -m-8 rounded-full bg-primary"
                style={{ filter: "blur(20px)" }}
              />
              
              {/* Main icon - DNA/metabolic symbol */}
              <motion.svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative"
              >
                {/* Outer circle */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="55"
                  stroke="rgb(var(--color-primary))"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                />
                
                {/* DNA/Helix strands */}
                <motion.path
                  d="M30 35 Q45 50 60 50 T90 35"
                  stroke="rgb(var(--color-primary))"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                />
                <motion.path
                  d="M30 60 Q45 75 60 75 T90 60"
                  stroke="rgb(var(--color-primary))"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
                />
                <motion.path
                  d="M30 85 Q45 100 60 100 T90 85"
                  stroke="rgb(var(--color-primary))"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                />
                
                {/* Connection dots */}
                {[
                  { cx: 30, cy: 35, delay: 0.7 },
                  { cx: 90, cy: 35, delay: 0.75 },
                  { cx: 30, cy: 60, delay: 0.8 },
                  { cx: 90, cy: 60, delay: 0.85 },
                  { cx: 30, cy: 85, delay: 0.9 },
                  { cx: 90, cy: 85, delay: 0.95 },
                ].map((dot, i) => (
                  <motion.circle
                    key={i}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="4"
                    fill="rgb(var(--color-primary))"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut", delay: dot.delay }}
                  />
                ))}
                
                {/* Center pulse */}
                <motion.circle
                  cx="60"
                  cy="60"
                  r="8"
                  fill="rgb(var(--color-primary))"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 1 }}
                />
              </motion.svg>
            </motion.div>

            {/* Text below icon */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="mt-8 text-center"
            >
              <h2 className="text-2xl font-semibold text-foreground">
                Metabolic Intelligence Platform
              </h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 1.4 }}
                className="mt-2 text-sm text-mutedForeground"
              >
                Evidence-based nutrition powered by biometrics
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
