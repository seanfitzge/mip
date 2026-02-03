"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-voidBlack relative overflow-hidden">
      {/* Animated gradient orbs */}
      <motion.div
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-electricBlue/20 blur-[120px]"
      />
      <motion.div
        animate={{ 
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-[600px] h-[600px] rounded-full bg-hotMagenta/20 blur-[120px]"
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 px-6 max-w-2xl">
        {/* 404 Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <div className="relative">
            {/* Pulsing glow behind number */}
            <motion.div
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 blur-3xl"
            >
              <div className="w-full h-full bg-gradient-primary opacity-50" />
            </motion.div>

            {/* 404 Number */}
            <h1 className="relative text-[12rem] md:text-[16rem] font-bold leading-none tracking-tighter">
              <span className="text-gradient">404</span>
            </h1>
          </div>

          {/* Glitch line effect */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1 w-32 mx-auto bg-gradient-primary rounded-full"
          />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="text-foreground">Page not found</span>
          </h2>
          <p className="text-lg text-ghost/70 max-w-lg mx-auto leading-relaxed">
            The page you're looking for doesn't exist or has been moved to another dimension.
          </p>
        </motion.div>

        {/* Error details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="glass rounded-xl p-6 border border-border/30 inline-block"
        >
          <div className="flex items-center gap-3 text-left">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-lg bg-gradient-accent opacity-80 flex items-center justify-center">
                <span className="text-white font-mono font-bold text-xl">!</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-mono text-ghost/50 mb-1">ERROR CODE</p>
              <p className="text-xl font-mono font-bold text-hotMagenta">HTTP 404</p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <Link href="/">
            <Button variant="primary" className="text-base">
              ← Back to Home
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="text-base">
              View Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 rounded-full bg-electricBlue blur-sm"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`
            }}
          />
        ))}
      </div>
    </div>
  )
}
