import { Card } from "@/components/ui/card"
import { MiniLineChart } from "@/components/charts/mini-line-chart"
import { cn } from "@/lib/utils"

type StatCardProps = {
  title: string
  value: string
  description?: string
  delta?: string
  deltaTone?: "success" | "warning" | "critical" | "neutral"
  trend?: number[]
  statusTone?: "success" | "warning" | "critical" | "primary" | "neutral"
}

const toneClasses: Record<NonNullable<StatCardProps["deltaTone"]>, string> = {
  success: "text-success",
  warning: "text-warning",
  critical: "text-critical",
  neutral: "text-mutedForeground"
}

const borderTones: Record<NonNullable<StatCardProps["statusTone"]>, string> = {
  success: "border-l-success",
  warning: "border-l-warning",
  critical: "border-l-critical",
  primary: "border-l-primary",
  neutral: "border-l-border"
}

export function StatCard({
  title,
  value,
  description,
  delta,
  deltaTone = "neutral",
  trend,
  statusTone = "primary"
}: StatCardProps) {
  return (
    <Card className={cn("border-l-4 p-4", borderTones[statusTone])}>
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
          {title}
        </p>
        <div className="text-metric font-bold tracking-[0.02em] text-foreground">{value}</div>
        {delta ? <p className={cn("text-sm", toneClasses[deltaTone])}>{delta}</p> : null}
        {trend ? (
          <MiniLineChart
            points={trend}
            height={40}
            ariaLabel={`${title} seven-day trend`}
          />
        ) : null}
        {description ? <p className="text-sm text-mutedForeground">{description}</p> : null}
      </div>
    </Card>
  )
}
