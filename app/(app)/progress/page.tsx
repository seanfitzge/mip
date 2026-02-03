import { SectionHeader } from "@/components/section-header"
import { MiniLineChart } from "@/components/charts/mini-line-chart"
import { Card } from "@/components/ui/card"

const weightTrend = [82.5, 82.2, 82.0, 81.9, 81.8, 81.7, 81.7]
const performanceTrend = [78, 80, 82, 81, 83, 84, 85]
const adherenceTrend = [92, 88, 90, 94, 91, 93, 95]

export default function ProgressPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        title="Progress tracking"
        subtitle="Weight trends, body composition, and performance notes."
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Weight trend</h3>
            <MiniLineChart points={weightTrend} ariaLabel="Seven day weight trend chart" height={120} />
            <p className="text-sm text-mutedForeground">
              7-day rolling average with goal line at 82 kg.
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Progress photos</h3>
            <div className="rounded-md border border-dashed border-border p-8 text-center text-sm text-mutedForeground">
              Photo uploads will live here in Phase 2.
            </div>
            <p className="text-sm text-mutedForeground">
              Track weekly photos to validate body composition shifts.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Performance trend</h3>
            <MiniLineChart points={performanceTrend} ariaLabel="Performance trend chart" height={120} />
            <p className="text-sm text-mutedForeground">
              Training performance improving as recovery metrics stabilize.
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Adherence consistency</h3>
            <MiniLineChart points={adherenceTrend} ariaLabel="Adherence trend chart" height={120} />
            <p className="text-sm text-mutedForeground">
              Logging consistency supports accurate TDEE and adaptation modeling.
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Adaptation curve (preview)</h3>
          <MiniLineChart
            points={[100, 96, 94, 93, 92, 92, 93]}
            ariaLabel="Metabolic adaptation curve preview chart"
            height={140}
            color="rgb(var(--color-info))"
          />
          <p className="text-sm text-mutedForeground">
            Bayesian TDEE estimates and adaptation curves will appear here once 4+ weeks of
            data are logged.
          </p>
          <p className="text-sm text-mutedForeground">
            Forecasts appear as dashed lines with confidence bands in Phase 3.
          </p>
        </div>
      </Card>
    </div>
  )
}
