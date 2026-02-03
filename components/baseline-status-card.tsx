import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type BaselineStatusCardProps = {
  daysComplete: number
  daysRequired: number
  established: boolean
}

export function BaselineStatusCard({
  daysComplete,
  daysRequired,
  established
}: BaselineStatusCardProps) {
  const progress = Math.min((daysComplete / daysRequired) * 100, 100)

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">Baseline establishment</p>
          <p className={cn("text-sm font-semibold", established ? "text-success" : "text-mutedForeground")}>
            {established ? "Complete" : "In progress"}
          </p>
        </div>
        <div className="h-2 w-full rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary"
            style={{ width: `${progress}%` }}
            aria-hidden="true"
          />
        </div>
        <p className="text-sm text-mutedForeground">
          {daysComplete} of {daysRequired} days of consistent HRV data collected.
        </p>
      </div>
    </Card>
  )
}
