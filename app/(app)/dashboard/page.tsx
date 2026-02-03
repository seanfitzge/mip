import { getBiometricsSummary, getBiometricsTrend } from "@/lib/data/biometrics"
import { getMacroTargets } from "@/lib/data/macros"
import { getResearchPapers } from "@/lib/data/research"
import { SectionHeader } from "@/components/section-header"
import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MiniLineChart } from "@/components/charts/mini-line-chart"

export default async function DashboardPage() {
  const biometrics = await getBiometricsSummary()
  const trend = await getBiometricsTrend()
  const macros = await getMacroTargets()
  const research = await getResearchPapers()

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Daily snapshot"
        subtitle="Biometric recovery signals and adaptive nutrition targets."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="HRV" value={`${biometrics.hrvMs} ms`} description="Parasympathetic recovery" />
        <StatCard title="RHR" value={`${biometrics.restingHrBpm} bpm`} description="Metabolic stress marker" />
        <StatCard title="Sleep" value={`${biometrics.sleepDurationHours} hrs`} description="Last night duration" />
        <StatCard title="Readiness" value={`${biometrics.readinessScore}%`} description="Overall recovery score" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">7-day recovery trend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MiniLineChart points={trend.map((item) => item.hrvMs)} />
            <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div>
                <p>Average HRV</p>
                <p className="text-lg font-semibold text-foreground">67 ms</p>
              </div>
              <div>
                <p>Average RHR</p>
                <p className="text-lg font-semibold text-foreground">55 bpm</p>
              </div>
              <div>
                <p>Sleep quality</p>
                <p className="text-lg font-semibold text-foreground">79/100</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Today&apos;s macro targets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p className="text-2xl font-semibold text-foreground">{macros.calories} kcal</p>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <p>Protein</p>
                <p className="text-lg font-semibold text-foreground">{macros.proteinG} g</p>
              </div>
              <div>
                <p>Carbs</p>
                <p className="text-lg font-semibold text-foreground">{macros.carbsG} g</p>
              </div>
              <div>
                <p>Fat</p>
                <p className="text-lg font-semibold text-foreground">{macros.fatG} g</p>
              </div>
            </div>
            <div className="rounded-md border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
              {macros.adjustmentReason}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Research highlight</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {research[0]?.title}
        </CardContent>
      </Card>
    </div>
  )
}
