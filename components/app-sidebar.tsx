"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/nutrition", label: "Nutrition" },
  { href: "/biometrics", label: "Biometrics" },
  { href: "/research", label: "Research Library" },
  { href: "/protocols", label: "Protocol Manager" },
  { href: "/progress", label: "Progress" },
  { href: "/settings", label: "Settings" }
]

export function AppSidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-border bg-card px-6 py-6 md:block">
      <div className="space-y-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
            Metabolic Intelligence
          </p>
          <p className="text-lg font-semibold text-foreground">MIP Console</p>
        </div>
        <Badge variant="outline">Preview</Badge>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-semibold text-mutedForeground hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
