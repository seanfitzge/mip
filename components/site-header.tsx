"use client"

import Link from "next/link"

const navItems = [
  { href: "/vision", label: "Vision" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/architecture", label: "Architecture" },
  { href: "/dashboard", label: "App Preview" }
]

export function SiteHeader() {
  return (
    <header>
      <div className="container py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-lg font-semibold text-foreground">
            MIP
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-sm text-mutedForeground">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-semibold text-primaryForeground transition-colors hover:bg-primary/90 active:bg-primary/85"
            >
              Join waitlist
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
