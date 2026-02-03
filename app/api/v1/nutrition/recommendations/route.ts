import { NextResponse } from "next/server"
import { getBiometricsSummary, getBiometricsTrend } from "@/lib/data/biometrics"
import { evaluateIntervention } from "@/lib/algorithms/interventions"

export async function GET() {
  const summary = await getBiometricsSummary()
  const trend = await getBiometricsTrend()
  const evaluation = evaluateIntervention({
    latestHrv: summary.hrvMs,
    latestRhr: summary.restingHrBpm,
    latestSleepQuality: summary.sleepQuality,
    hrvBaselineMean: summary.hrvBaselineMean,
    hrvBaselineSd: summary.hrvBaselineSd,
    rhrBaselineMean: summary.rhrBaselineMean,
    trend,
    readinessScore: summary.readinessScore
  })

  return NextResponse.json({
    triggered: evaluation.triggered,
    confidence: evaluation.confidence,
    reasons: evaluation.reasons
  })
}
