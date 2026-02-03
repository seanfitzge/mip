"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "◆" },
  { href: "/nutrition", label: "Nutrition", icon: "◇" },
  { href: "/biometrics", label: "Biometrics", icon: "◈" },
  { href: "/research", label: "Research Library", icon: "◉" },
  { href: "/protocols", label: "Protocol Manager", icon: "◊" },
  { href: "/progress", label: "Progress", icon: "⬡" },
  { href: "/settings", label: "Settings", icon: "⚙" }
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden min-h-screen w-72 border-r border-border/30 glass px-6 py-8 md:flex md:flex-col relative overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        animate={{ 
          opacity: [0.05, 0.1, 0.05],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary blur-[100px] rounded-full"
      />

      <div className="relative z-10 space-y-8 flex-1">
        {/* Logo/Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            {/* Animated logo mark */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L19 7V17L12 22L5 17V7L12 2Z"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="12" cy="12" r="3" fill="white" />
              </svg>
            </motion.div>
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-ultra text-ghost/50">
                Metabolic Intelligence
              </p>
              <h1 className="text-xl font-bold tracking-tight">
                <span className="text-gradient">MIP</span>
              </h1>
            </div>
          </div>
          
          {/* Preview badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-neonCyan/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonCyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neonCyan" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wide text-neonCyan">
              Live Preview
            </span>
          </div>
        </motion.div>

        {/* Navigation */}
        <nav className="space-y-2">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href
            
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "group relative block rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300",
                    isActive
                      ? "glass border border-electricBlue/50 text-electricBlue shadow-glow"
                      : "text-ghost/70 hover:glass hover:border hover:border-border/50 hover:text-foreground"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-gradient-primary opacity-10 rounded-xl"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  
                  <div className="relative z-10 flex items-center gap-3">
                    <span className={cn(
                      "text-lg transition-all duration-300",
                      isActive ? "text-electricBlue scale-110" : "text-ghost/50 group-hover:scale-110 group-hover:text-electricBlue"
                    )}>
                      {item.icon}
                    </span>
                    <span className="font-mono">{item.label}</span>
                    {isActive && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-auto w-2 h-2 rounded-full bg-electricBlue shadow-glow"
                      />
                    )}
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </nav>
      </div>

      {/* Footer status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 mt-auto space-y-3"
      >
        <div className="glass rounded-xl p-4 border border-border/30">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wide text-ghost/50">System Status</span>
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-laserGreen shadow-glow-success"
            />
          </div>
          <p className="text-xs font-mono text-ghost/70">Neural networks active</p>
        </div>
      </motion.div>
    </aside>
  )
}
