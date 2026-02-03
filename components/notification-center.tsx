type NotificationItem = {
  id: string
  title: string
  body: string
  tier: "critical" | "warning" | "info"
  timing: string
}

const tierMeta = {
  critical: { label: "Critical", color: "border-l-critical bg-critical/10", icon: "!" },
  warning: { label: "Warning", color: "border-l-warning bg-warning/10", icon: "⚠" },
  info: { label: "Info", color: "border-l-info bg-info/10", icon: "i" }
}

const defaultNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Resting heart rate elevated",
    body: "RHR is 5 bpm above baseline for 2 days. Consider reduced intensity.",
    tier: "warning",
    timing: "Today · 7:10 AM"
  },
  {
    id: "notif-2",
    title: "Weekly recovery summary ready",
    body: "HRV stabilized and sleep efficiency improved 6%. Review weekly report.",
    tier: "info",
    timing: "Sunday · 6:30 PM"
  }
]

export function NotificationCenter({ items = defaultNotifications }: { items?: NotificationItem[] }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Notification center</h3>
        <p className="text-xs text-mutedForeground">Default 1-3 per day</p>
      </div>
      <div className="space-y-2">
        {items.map((item) => {
          const meta = tierMeta[item.tier]
          return (
            <div key={item.id} className={`rounded-md border-l-4 p-3 ${meta.color}`}>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-sm font-semibold text-foreground" aria-hidden="true">
                  {meta.icon}
                </span>
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                    {meta.label}
                  </p>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-mutedForeground">{item.body}</p>
                  <p className="text-xs text-mutedForeground">{item.timing}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="text-xs text-mutedForeground">
        Critical alerts deliver immediately and require acknowledgment. Warnings batch within 1
        hour. Informational updates can be disabled.
      </div>
    </div>
  )
}
