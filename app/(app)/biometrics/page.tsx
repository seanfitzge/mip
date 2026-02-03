import { getBiometricsSummary, getBiometricsTrend } from "@/lib/data/biometrics"
import { SectionHeader } from "@/components/section-header"
import { MiniLineChart } from "@/components/charts/mini-line-chart"
import { HrvTrendChart } from "@/components/charts/hrv-trend-chart"
import { SleepTimelineChart } from "@/components/charts/sleep-timeline-chart"
import { Card } from "@/components/ui/card"
import { BaselineActions } from "@/components/biometrics/baseline-actions"
import { ManualMetricsForm } from "@/components/biometrics/manual-metrics-form"
import { DeviceGuide } from "@/components/biometrics/device-guide"
import { BaselineStatus } from "@/components/biometrics/baseline-status"

export default async function BiometricsPage() {
  const summary = await getBiometricsSummary()
  const trend = await getBiometricsTrend()

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Biometrics"
        subtitle="Recovery metrics used to adjust nutrition targets."
      />

      {/* Baseline Status */}
      <BaselineStatus
        baselineEstablished={summary.baselineEstablished}
        baselineDaysComplete={summary.baselineDaysComplete}
        baselineDaysRequired={summary.baselineDaysRequired}
        baselineHrvMean={summary.hrvBaselineMean}
        baselineHrvSd={summary.hrvBaselineSd}
        baselineRhrMean={summary.rhrBaselineMean}
        baselineRhrSd={summary.rhrBaselineSd}
      />

      {/* Manual Metrics Input and Device Guide */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ManualMetricsForm />
        <DeviceGuide />
      </div>

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
        <Card className="p-4 lg:col-span-2">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Previous night sleep stages</h3>
            <SleepTimelineChart
              stages={[
                { stage: "deep", startMinutes: 0, durationMinutes: 90 },
                { stage: "light", startMinutes: 90, durationMinutes: 120 },
                { stage: "rem", startMinutes: 210, durationMinutes: 60 },
                { stage: "light", startMinutes: 270, durationMinutes: 180 },
                { stage: "deep", startMinutes: 450, durationMinutes: 60 },
                { stage: "light", startMinutes: 510, durationMinutes: 90 },
                { stage: "rem", startMinutes: 600, durationMinutes: 45 }
              ]}
              totalDurationHours={summary.sleepDurationHours}
              efficiencyPercent={summary.sleepEfficiencyPercent}
            />
            <p className="text-sm text-mutedForeground">
              Sleep score {summary.sleepQuality}/100 · Duration {summary.sleepDurationHours} hrs
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Sleep quality trend</h3>
            <MiniLineChart
              points={trend.map((item) => item.sleepQuality)}
              ariaLabel="Sleep quality trend chart"
              height={120}
              color="rgb(var(--color-info))"
            />
            <p className="text-sm text-mutedForeground">
              7-day average: {Math.round(trend.reduce((sum, item) => sum + item.sleepQuality, 0) / trend.length)}/100
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
            <BaselineActions established={summary.baselineEstablished} />
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

      {/* Historical Data Table */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">Historical Data (Last 14 Days)</h3>
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">HRV (ms)</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">RHR (bpm)</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Sleep (hrs)</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold">Sleep Quality</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {trend.length > 0 ? (
                  trend
                    .slice()
                    .reverse()
                    .map((row, index) => {
                      const isRecent = index < 3
                      return (
                        <tr
                          key={row.date}
                          className={`hover:bg-muted/30 ${isRecent ? "font-medium" : ""}`}
                        >
                          <td className="px-4 py-3 text-sm">
                            {new Date(row.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </td>
                          <td className="px-4 py-3 text-right text-sm">{row.hrvMs.toFixed(1)}</td>
                          <td className="px-4 py-3 text-right text-sm">{row.restingHrBpm}</td>
                          <td className="px-4 py-3 text-right text-sm">
                            {row.sleepDurationHours.toFixed(1)}
                          </td>
                          <td className="px-4 py-3 text-right text-sm">
                            <span
                              className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                row.sleepQuality >= 80
                                  ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
                                  : row.sleepQuality >= 70
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200"
                              }`}
                            >
                              {row.sleepQuality}/100
                            </span>
                          </td>
                        </tr>
                      )
                    })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-sm text-mutedForeground">
                      No historical data yet. Start logging your daily metrics above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
