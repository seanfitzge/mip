import { Card } from "@/components/ui/card"

type BaselineStatusProps = {
  baselineEstablished: boolean
  baselineDaysComplete: number
  baselineDaysRequired: number
  baselineHrvMean?: number
  baselineHrvSd?: number
  baselineRhrMean?: number
  baselineRhrSd?: number
}

export function BaselineStatus({
  baselineEstablished,
  baselineDaysComplete,
  baselineDaysRequired,
  baselineHrvMean,
  baselineHrvSd,
  baselineRhrMean,
  baselineRhrSd
}: BaselineStatusProps) {
  const progressPercent = Math.min(100, (baselineDaysComplete / baselineDaysRequired) * 100)
  const daysRemaining = Math.max(0, baselineDaysRequired - baselineDaysComplete)

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">Personal Baseline Status</h3>
            <p className="text-sm text-mutedForeground">
              {baselineEstablished
                ? "Your personal baseline has been established"
                : "Collecting data to establish your personal baseline"}
            </p>
          </div>
          <div
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              baselineEstablished
                ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
            }`}
          >
            {baselineEstablished ? "✓ Established" : "Collecting"}
          </div>
        </div>

        {!baselineEstablished && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-mutedForeground">Progress</span>
              <span className="font-medium">
                {baselineDaysComplete} / {baselineDaysRequired} days
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {daysRemaining > 0 && (
              <p className="text-sm text-mutedForeground">
                {daysRemaining} more {daysRemaining === 1 ? "day" : "days"} of consistent logging needed
              </p>
            )}
          </div>
        )}

        {baselineEstablished && baselineHrvMean && baselineRhrMean && (
          <div className="space-y-3 rounded-lg border p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-mutedForeground">HRV Baseline</p>
                <p className="text-lg font-semibold">
                  {baselineHrvMean.toFixed(1)} ± {baselineHrvSd?.toFixed(1)} ms
                </p>
                <p className="mt-1 text-xs text-mutedForeground">
                  Smallest Worthwhile Change: {((baselineHrvSd || 0) * 0.5).toFixed(1)} ms
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-mutedForeground">RHR Baseline</p>
                <p className="text-lg font-semibold">
                  {baselineRhrMean} ± {baselineRhrSd?.toFixed(1)} bpm
                </p>
                <p className="mt-1 text-xs text-mutedForeground">
                  Intervention threshold: +{Math.round((baselineRhrSd || 0) * 1.5)} bpm
                </p>
              </div>
            </div>
            <div className="border-t pt-3">
              <p className="text-xs text-mutedForeground">
                ✓ These are YOUR personal norms - not population averages
              </p>
              <p className="text-xs text-mutedForeground">
                ✓ Intervention system active - will alert you to significant changes
              </p>
            </div>
          </div>
        )}

        {!baselineEstablished && (
          <div className="rounded-lg bg-muted p-4 text-sm">
            <p className="font-medium">Why 14 Days?</p>
            <ul className="mt-2 space-y-1 text-mutedForeground">
              <li>• Captures week-to-week variability in your recovery</li>
              <li>• Accounts for menstrual cycle variations (if applicable)</li>
              <li>• Provides statistical reliability for personalized thresholds</li>
              <li>• Evidence-based from sports science research (Plews et al., 2013)</li>
            </ul>
          </div>
        )}
      </div>
    </Card>
  )
}
