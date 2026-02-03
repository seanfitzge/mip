import { Card } from "@/components/ui/card"

type TimelineItem = {
  title: string
  subtitle: string
  details: string[]
}

type TimelineProps = {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={item.title} className="relative pl-6">
          <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-primary" />
          {index < items.length - 1 ? (
            <span className="absolute left-1 top-5 h-full w-px bg-border" aria-hidden="true" />
          ) : null}
          <Card className="p-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  {item.subtitle}
                </p>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              </div>
              <div className="space-y-1 text-sm text-mutedForeground">
                {item.details.map((detail) => (
                  <p key={detail}>• {detail}</p>
                ))}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  )
}
