import { Button } from "@/components/ui/button"

export function AppTopbar() {
  return (
    <div className="flex items-center justify-between border-b border-border bg-background px-6 py-4">
      <div>
        <p className="text-xs uppercase text-muted-foreground">Today</p>
        <h1 className="text-xl font-semibold">Metabolic Overview</h1>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="ghost">Export</Button>
        <Button>Start Sync</Button>
      </div>
    </div>
  )
}
