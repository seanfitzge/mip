import { getBiometricsSummary, getBiometricsTrend } from "@/lib/data/biometrics"
import { SectionHeader } from "@/components/section-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MiniLineChart } from "@/components/charts/mini-line-chart"

export default async function BiometricsPage() {
  const summary = await getBiometricsSummary()
  const trend = await getBiometricsTrend()

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Biometrics"
        subtitle="Recovery metrics used to adjust nutrition targets."
      />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">HRV trend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <MiniLineChart points={trend.map((item) => item.hrvMs)} />
            <p className="text-sm text-muted-foreground">
              Current HRV {summary.hrvMs} ms, improving from baseline.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Resting heart rate</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <MiniLineChart points={trend.map((item) => item.restingHrBpm)} />
            <p className="text-sm text-muted-foreground">
              RHR at {summary.restingHrBpm} bpm, steady and trending down.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Sleep quality</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <MiniLineChart points={trend.map((item) => item.sleepQuality)} />
            <p className="text-sm text-muted-foreground">
              Sleep score {summary.sleepQuality}/100, above weekly average.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Adaptive logic preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• HRV below baseline and RHR elevated triggers +5-10% calories.</p>
          <p>• Sleep quality below 70 for 3 days shifts carbs to evening.</p>
          <p>• Stable recovery allows reverse diet progression.</p>
        </CardContent>
      </Card>
    </div>
  )
}
