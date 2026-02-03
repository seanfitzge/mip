import type { BiometricsSummary, BiometricsTrend } from "@/types/biometrics"

type InterventionResult = {
  triggered: boolean
  reasons: string[]
  confidence: "STRONG" | "MODERATE" | "LOW"
  recoveryGrade: BiometricsSummary["recoveryGrade"]
}

function getRecoveryGrade(score: number): BiometricsSummary["recoveryGrade"] {
  if (score >= 85) return "optimal"
  if (score >= 70) return "good"
  if (score >= 55) return "fair"
  return "poor"
}

export function evaluateIntervention(params: {
  latestHrv: number
  latestRhr: number
  latestSleepQuality: number
  hrvBaselineMean: number
  hrvBaselineSd: number
  rhrBaselineMean: number
  trend: BiometricsTrend[]
  readinessScore?: number
}): InterventionResult {
  const {
    latestHrv,
    latestRhr,
    latestSleepQuality,
    hrvBaselineMean,
    hrvBaselineSd,
    rhrBaselineMean,
    trend,
    readinessScore = 75
  } = params

  const hrvDeclinePercent = hrvBaselineMean
    ? ((hrvBaselineMean - latestHrv) / hrvBaselineMean) * 100
    : 0
  const hrvBelowSd = hrvBaselineSd ? latestHrv <= hrvBaselineMean - 0.5 * hrvBaselineSd : false
  const rhrElevated = latestRhr >= rhrBaselineMean + 5
  const sleepPoor = latestSleepQuality < 70

  const reasons: string[] = []
  if (hrvDeclinePercent >= 7.5 || hrvBelowSd) {
    reasons.push("HRV trend below baseline threshold.")
  }
  if (rhrElevated) {
    reasons.push("RHR elevated above baseline for two days.")
  }
  if (sleepPoor) {
    reasons.push("Sleep quality below 70 for three nights.")
  }

  const trendAverage =
    trend.length > 0 ? trend.reduce((acc, item) => acc + item.hrvMs, 0) / trend.length : latestHrv
  const recoveryGrade = getRecoveryGrade(readinessScore)

  const triggered = (hrvDeclinePercent >= 7.5 || hrvBelowSd) || rhrElevated
  const confidence = hrvDeclinePercent >= 7.5 && rhrElevated ? "STRONG" : triggered ? "MODERATE" : "LOW"

  if (triggered) {
    reasons.push("Increase calories 5-10% (carbohydrate priority).")
  } else if (trendAverage > hrvBaselineMean) {
    reasons.push("HRV trend above baseline. Maintain current targets.")
  }

  return { triggered, reasons, confidence, recoveryGrade }
}
