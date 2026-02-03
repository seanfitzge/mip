type InterventionAlertProps = {
  title: string
  details: string[]
  active: boolean
  severity?: "critical" | "warning" | "info" | "success"
}

const severityStyles = {
  critical: "border-l-critical bg-critical/10 text-critical",
  warning: "border-l-warning bg-warning/10 text-warning",
  info: "border-l-info bg-info/10 text-info",
  success: "border-l-success bg-success/10 text-success"
}

export function InterventionAlert({
  title,
  details,
  active,
  severity = "warning"
}: InterventionAlertProps) {
  if (!active) {
    return null
  }

  return (
    <div className={`rounded-md border-l-4 p-4 ${severityStyles[severity]}`}>
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-lg font-semibold" aria-hidden="true">
          {severity === "critical" ? "!" : severity === "warning" ? "⚠" : "i"}
        </span>
        <div className="space-y-2">
          <p className="text-base font-semibold text-foreground">{title}</p>
          <div className="space-y-1 text-sm text-foreground">
            {details.map((detail) => (
              <p key={detail}>{detail}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
