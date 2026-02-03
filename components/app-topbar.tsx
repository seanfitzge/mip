"use client"

import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SignOutButton } from "@/components/sign-out-button"

type AppTopbarProps = {
  userEmail: string
}

export function AppTopbar({ userEmail }: AppTopbarProps) {
  const greetingName = useMemo(() => {
    if (!userEmail) return "there"
    return userEmail.split("@")[0]?.replace(".", " ") ?? "there"
  }, [userEmail])

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
          Tuesday · Feb 3 · Sync 2m ago
        </p>
        <h1 className="text-xl font-semibold text-foreground">Metabolic Overview</h1>
        <p className="text-sm text-mutedForeground">Welcome back, {greetingName}.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <ThemeToggle />
        <Button variant="secondary" className="h-10 px-4 text-sm">
          Export report
        </Button>
        <Button className="h-10 px-4 text-sm">Start Sync</Button>
        <SignOutButton />
      </div>
    </div>
  )
}
