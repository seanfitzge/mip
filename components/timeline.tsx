import { Card, CardContent } from "@/components/ui/card"

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
      {items.map((item) => (
        <Card key={item.title}>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {item.details.map((detail) => (
                <li key={detail}>• {detail}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
