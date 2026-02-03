"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/vision", label: "Vision" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/architecture", label: "Architecture" },
  { href: "/dashboard", label: "App Preview" }
]

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-50 glass border-b border-border/30"
    >
      <div className="container py-4">
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 2L16 6V14L10 18L4 14V6L10 2Z"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="10" cy="10" r="2" fill="white" />
              </svg>
            </motion.div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-gradient">MIP</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-lg text-sm font-mono font-semibold transition-all duration-300",
                    isActive
                      ? "text-electricBlue"
                      : "text-ghost/70 hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="header-active"
                      className="absolute inset-0 glass rounded-lg border border-electricBlue/30"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="neon" className="font-mono">
                Join Waitlist →
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Animated gradient line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-primary"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      />
    </motion.header>
  )
}
