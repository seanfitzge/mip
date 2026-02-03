import { getBiometricsSummary, getBiometricsTrend } from "@/lib/data/biometrics"
import { getMacroTargets } from "@/lib/data/macros"
import { getResearchPapers } from "@/lib/data/research"
import { getCurrentUser } from "@/lib/data/user"
import { SectionHeader } from "@/components/section-header"
import { StatCard } from "@/components/stat-card"
import { BaselineStatusCard } from "@/components/baseline-status-card"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { InterventionAlert } from "@/components/intervention-alert"
import { Card } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { HrvTrendChart } from "@/components/charts/hrv-trend-chart"
import { ResearchCitationInline } from "@/components/research-citation-inline"
import { NotificationCenter } from "@/components/notification-center"
import { evaluateIntervention } from "@/lib/algorithms/interventions"

export default async function DashboardPage() {
  const biometrics = await getBiometricsSummary()
  const trend = await getBiometricsTrend()
  const macros = await getMacroTargets()
  const research = await getResearchPapers()
  const user = await getCurrentUser()
  const intervention = evaluateIntervention({
    latestHrv: biometrics.hrvMs,
    latestRhr: biometrics.restingHrBpm,
    latestSleepQuality: biometrics.sleepQuality,
    hrvBaselineMean: biometrics.hrvBaselineMean,
    hrvBaselineSd: biometrics.hrvBaselineSd,
    rhrBaselineMean: biometrics.rhrBaselineMean,
    trend,
    readinessScore: biometrics.readinessScore
  })

  const recoveryStatus =
    biometrics.recoveryGrade === "optimal"
      ? "optimal"
      : biometrics.recoveryGrade === "good"
        ? "good"
        : biometrics.recoveryGrade === "fair"
          ? "moderate"
          : "at-risk"

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Daily snapshot"
        subtitle="Biometric recovery signals and adaptive nutrition targets."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="HRV"
          value={`${biometrics.hrvMs} ms`}
          description="Parasympathetic recovery"
          delta="▲ +4 vs baseline"
          deltaTone="success"
          trend={trend.map((item) => item.hrvMs)}
          statusTone="success"
        />
        <StatCard
          title="RHR"
          value={`${biometrics.restingHrBpm} bpm`}
          description="Metabolic stress marker"
          delta="▼ -2 vs baseline"
          deltaTone="success"
          trend={trend.map((item) => item.restingHrBpm)}
          statusTone="warning"
        />
        <StatCard
          title="Sleep"
          value={`${biometrics.sleepDurationHours} hrs`}
          description="Last night duration"
          delta="▲ +18m vs average"
          deltaTone="success"
          trend={trend.map((item) => item.sleepQuality)}
          statusTone="primary"
        />
        <StatCard
          title="Recovery"
          value={`${biometrics.readinessScore}%`}
          description="Overall recovery score"
          delta="Moderate training readiness"
          deltaTone="neutral"
          statusTone="warning"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Recovery grade</h3>
              <StatusBadge status={recoveryStatus} />
            </div>
            <p className="text-sm text-mutedForeground">
              Baseline HRV {biometrics.hrvBaselineMean} ± {biometrics.hrvBaselineSd} ms · RHR
              baseline {biometrics.rhrBaselineMean} bpm.
            </p>
            <p className="text-sm text-mutedForeground">
              Data source: {biometrics.sourceDevice} (CCC {biometrics.deviceAccuracyCcc})
            </p>
            <button className="text-sm font-semibold text-primary">
              How is this calculated?
            </button>
          </div>
        </Card>
        <BaselineStatusCard
          daysComplete={biometrics.baselineDaysComplete}
          daysRequired={biometrics.baselineDaysRequired}
          established={biometrics.baselineEstablished}
        />
      </div>

      <InterventionAlert
        title="Recovery intervention triggered"
        details={[
          ...intervention.reasons,
          "Reduce training intensity for 48-72 hours."
        ]}
        active={biometrics.interventionTriggered}
        severity="warning"
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">7-day HRV trend</h3>
              <button className="text-sm font-semibold text-primary">Full view →</button>
            </div>
            <HrvTrendChart
              trend={trend.map((item) => ({ date: item.date, hrvMs: item.hrvMs }))}
              baselineMean={biometrics.hrvBaselineMean}
              baselineSd={biometrics.hrvBaselineSd}
            />
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Average HRV
                </p>
                <p className="text-sm font-semibold text-foreground">67 ms</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Average RHR
                </p>
                <p className="text-sm font-semibold text-foreground">55 bpm</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Sleep quality
                </p>
                <p className="text-sm font-semibold text-foreground">79/100</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-mutedForeground">
              <span>Baseline band</span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-success" /> Within range
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-warning" /> ±2 SD
              </span>
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-critical" /> Beyond
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Today&apos;s macro targets</h3>
              <ConfidenceBadge level={macros.confidenceLevel} />
            </div>
            <div className="text-2xl font-bold text-foreground">{macros.calories} kcal</div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Protein
                </p>
                <p className="text-sm font-semibold text-foreground">{macros.proteinG} g</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Carbs
                </p>
                <p className="text-sm font-semibold text-foreground">{macros.carbsG} g</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Fat
                </p>
                <p className="text-sm font-semibold text-foreground">{macros.fatG} g</p>
              </div>
            </div>
            <p className="text-sm text-mutedForeground">{macros.adjustmentReason}</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">User category snapshot</h3>
            <p className="text-sm text-mutedForeground">
              Training status: {user.userCategory}
            </p>
            <p className="text-sm text-mutedForeground">
              Goal: {user.goal.replaceAll("_", " ")} · Sport: {user.sport}
            </p>
            <p className="text-sm text-mutedForeground">
              Metabolic flexibility score: {user.metabolicFlexibilityScore}
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Energy availability guardrail</h3>
            <p className="text-sm text-mutedForeground">
              Clinical threshold: &lt;30 kcal/kg FFM (female), &lt;25 kcal/kg FFM (male).
            </p>
            <p className="text-sm text-mutedForeground">
              Subclinical threshold: &lt;45 kcal/kg FFM (female), &lt;40 kcal/kg FFM (male).
            </p>
            <p className="text-sm text-mutedForeground">
              Current status: monitor recovery metrics and maintain intake increases.
            </p>
            <button className="text-sm font-semibold text-primary">
              When to consult a healthcare provider
            </button>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Today&apos;s insight</h3>
            {research[0] ? <ConfidenceBadge level={research[0].confidenceLevel} /> : null}
          </div>
          <p className="text-sm text-mutedForeground">
            Your HRV is 8% above your 30-day average, indicating good parasympathetic recovery.
            Combined with quality sleep, you&apos;re well-positioned for higher intensity work.
            <span className="ml-2">
              <ResearchCitationInline
                source="Fullagar et al. (2015), Sports Med"
                preview="Sleep loss reduces recovery markers and increases stress hormones."
                full="Recovery indicators improve with consistent sleep duration and quality across 7-day windows."
              />
            </span>
          </p>
          <button className="text-sm font-semibold text-primary">View full analysis</button>
        </div>
      </Card>

      <Card className="p-4">
        <NotificationCenter />
      </Card>
    </div>
  )
}
