import { getBiometricsSummary, getBiometricsTrend } from "@/lib/data/biometrics"
import { SectionHeader } from "@/components/section-header"
import { MiniLineChart } from "@/components/charts/mini-line-chart"
import { HrvTrendChart } from "@/components/charts/hrv-trend-chart"
import { Card } from "@/components/ui/card"

export default async function BiometricsPage() {
  const summary = await getBiometricsSummary()
  const trend = await getBiometricsTrend()

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Biometrics"
        subtitle="Recovery metrics used to adjust nutrition targets."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4 lg:col-span-2">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">HRV trend with baseline bands</h3>
            <HrvTrendChart
              trend={trend.map((item) => ({ date: item.date, hrvMs: item.hrvMs }))}
              baselineMean={summary.hrvBaselineMean}
              baselineSd={summary.hrvBaselineSd}
              ariaLabel="HRV trend chart with seven-day rolling average and baseline bands"
            />
            <p className="text-sm text-mutedForeground">
              Current HRV {summary.hrvMs} ms, baseline {summary.hrvBaselineMean} ±{" "}
              {summary.hrvBaselineSd} ms.
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Resting heart rate</h3>
            <MiniLineChart
              points={trend.map((item) => item.restingHrBpm)}
              ariaLabel="Resting heart rate trend chart"
              height={120}
              color="rgb(var(--color-warning))"
            />
            <p className="text-sm text-mutedForeground">
              RHR {summary.restingHrBpm} bpm, baseline {summary.rhrBaselineMean} ±{" "}
              {summary.rhrBaselineSd} bpm.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Sleep quality</h3>
            <MiniLineChart
              points={trend.map((item) => item.sleepQuality)}
              ariaLabel="Sleep quality trend chart"
              height={120}
              color="rgb(var(--color-info))"
            />
            <p className="text-sm text-mutedForeground">
              Sleep score {summary.sleepQuality}/100 with {summary.sleepDurationHours} hrs
              last night.
            </p>
          </div>
        </Card>
        <Card className="p-4 lg:col-span-2">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Personal baselines</h3>
              <p className="text-xs text-mutedForeground">
                {summary.sourceDevice} (CCC {summary.deviceAccuracyCcc})
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <p className="text-sm text-mutedForeground">
                HRV baseline: {summary.hrvBaselineMean} ± {summary.hrvBaselineSd} ms
              </p>
              <p className="text-sm text-mutedForeground">
                RHR baseline: {summary.rhrBaselineMean} ± {summary.rhrBaselineSd} bpm
              </p>
            </div>
            <p className="text-sm text-mutedForeground">
              Baselines are personal only; population norms are never used.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Calibration phase</h3>
            <p className="text-sm text-mutedForeground">
              Establishes a 14-day baseline before advanced recommendations.
            </p>
            <p className="text-sm text-mutedForeground">
              Smallest worthwhile change = 0.5 × SD of baseline period.
            </p>
            <p className="text-sm text-mutedForeground">
              Recognition over recall: baseline context is always visible.
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Validated intervention logic</h3>
            <p className="text-sm text-mutedForeground">
              • HRV decline ≥7.5% from baseline or 0.5 SD below baseline triggers stress response.
            </p>
            <p className="text-sm text-mutedForeground">
              • RHR ≥5 bpm above baseline for 2 days strengthens intervention signal.
            </p>
            <p className="text-sm text-mutedForeground">
              • Sleep quality &lt;70 for 3 days shifts carbs to evening.
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Device accuracy reference</h3>
          <p className="text-sm text-mutedForeground">
            Oura Gen 4 (CCC 0.99) · WHOOP 4.0 (CCC 0.94) · Garmin Fenix (CCC 0.87)
          </p>
          <p className="text-sm text-mutedForeground">
            Device reliability is surfaced on every trend to contextualize confidence.
          </p>
        </div>
      </Card>
    </div>
  )
}
