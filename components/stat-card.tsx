import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type StatCardProps = {
  title: string
  value: string
  description?: string
}

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      {description ? <CardContent>{description}</CardContent> : null}
    </Card>
  )
}
