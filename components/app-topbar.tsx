import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function AppTopbar() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-6 py-4">
      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
          Tuesday · Feb 3 · Sync 2m ago
        </p>
        <h1 className="text-xl font-semibold text-foreground">Metabolic Overview</h1>
        <p className="text-sm text-mutedForeground">Welcome back, Alex.</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <ThemeToggle />
        <Button variant="secondary" className="h-10 px-4 text-sm">
          Export report
        </Button>
        <Button className="h-10 px-4 text-sm">Start Sync</Button>
      </div>
    </div>
  )
}
