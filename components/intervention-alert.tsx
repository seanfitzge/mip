import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type InterventionAlertProps = {
  title: string
  details: string[]
  active: boolean
  severity?: "warning" | "critical" | "info"
}

const severityStyles = {
  critical: {
    border: "border-l-critical",
    bg: "bg-critical/10",
    icon: "!",
    label: "Critical"
  },
  warning: {
    border: "border-l-warning",
    bg: "bg-warning/10",
    icon: "⚠",
    label: "Warning"
  },
  info: {
    border: "border-l-info",
    bg: "bg-info/10",
    icon: "i",
    label: "Info"
  }
}

export function InterventionAlert({
  title,
  details,
  active,
  severity = "warning"
}: InterventionAlertProps) {
  const style = severityStyles[severity]

  return (
    <Card
      className={cn(
        "border-l-4 p-4",
        active && style.border,
        active && style.bg
      )}
      aria-live={active ? "polite" : undefined}
      role="alert"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {active && (
              <span className="text-sm font-semibold text-foreground" aria-hidden="true">
                {style.icon}
              </span>
            )}
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
          <Badge variant={active ? "default" : "secondary"}>
            {active ? "Active" : "Monitoring"}
          </Badge>
        </div>
        {active ? (
          <ul className="space-y-1 text-sm text-mutedForeground">
            {details.map((detail, index) => (
              <li key={index}>• {detail}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-mutedForeground">
            No current interventions. Biometrics remain within baseline thresholds.
          </p>
        )}
      </div>
    </Card>
  )
}
