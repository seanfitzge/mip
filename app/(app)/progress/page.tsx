import { SectionHeader } from "@/components/section-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MiniLineChart } from "@/components/charts/mini-line-chart"

const weightTrend = [82.5, 82.2, 82.0, 81.9, 81.8, 81.7, 81.7]

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Progress tracking"
        subtitle="Weight trends, body composition, and performance notes."
      />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Weight trend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <MiniLineChart points={weightTrend} />
            <p className="text-sm text-muted-foreground">
              Stable weight trend during reverse diet stabilization phase.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Progress photos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="rounded-md border border-dashed border-border p-6 text-center">
              Photo uploads will live here in Phase 2.
            </div>
            <p>Track weekly photos to validate body composition shifts.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
