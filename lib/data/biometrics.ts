import { mockBiometricsSummary, mockBiometricsTrend } from "@/lib/mock-data"
import { createSupabaseServerClient, getServerSession } from "@/lib/supabase/server"
import type { BiometricsSummary, BiometricsTrend } from "@/types/biometrics"
import { evaluateIntervention } from "@/lib/algorithms/interventions"

function mapTrend(rows: any[]): BiometricsTrend[] {
  return rows.map((row) => ({
    date: row.date,
    hrvMs: Number(row.hrv_rmssd_ms ?? 0),
    restingHrBpm: Number(row.resting_hr_bpm ?? 0),
    sleepQuality: Number(row.sleep_quality_score ?? 0),
    sleepDurationHours: Number(row.sleep_duration_hrs ?? 0)
  }))
}

export async function getBiometricsSummary(): Promise<BiometricsSummary> {
  const session = await getServerSession()
  if (!session) {
    return mockBiometricsSummary
  }
  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    return mockBiometricsSummary
  }

  const { data: latest } = await supabase
    .from("biometrics")
    .select("*")
    .eq("user_id", session.user.id)
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data: user } = await supabase.from("users").select("*").eq("id", session.user.id).maybeSingle()

  if (!latest || !user) {
    return mockBiometricsSummary
  }

  const { data: trendRows } = await supabase
    .from("biometrics")
    .select("date, hrv_rmssd_ms, resting_hr_bpm, sleep_quality_score, sleep_duration_hrs")
    .eq("user_id", session.user.id)
    .order("date", { ascending: false })
    .limit(7)

  const trend = mapTrend((trendRows ?? []).slice().reverse())

  const evaluation = evaluateIntervention({
    latestHrv: Number(latest.hrv_rmssd_ms ?? 0),
    latestRhr: Number(latest.resting_hr_bpm ?? 0),
    latestSleepQuality: Number(latest.sleep_quality_score ?? 0),
    hrvBaselineMean: Number(user.baseline_hrv_mean ?? 0),
    hrvBaselineSd: Number(user.baseline_hrv_sd ?? 0),
    rhrBaselineMean: Number(user.baseline_rhr_mean ?? 0),
    trend,
    readinessScore: Number(latest.readiness_score ?? 75)
  })

  const { count: baselineCount } = await supabase
    .from("biometrics")
    .select("id", { count: "exact", head: true })
    .eq("user_id", session.user.id)

  return {
    hrvMs: Number(latest.hrv_rmssd_ms ?? 0),
    restingHrBpm: Number(latest.resting_hr_bpm ?? 0),
    sleepQuality: Number(latest.sleep_quality_score ?? 0),
    sleepDurationHours: Number(latest.sleep_duration_hrs ?? 0),
    sleepEfficiencyPercent: latest.sleep_efficiency_percent ? Number(latest.sleep_efficiency_percent) : undefined,
    readinessScore: Number(latest.readiness_score ?? 0),
    recoveryGrade: evaluation.recoveryGrade,
    interventionTriggered: evaluation.triggered,
    sourceDevice: latest.source_device ?? "unknown",
    deviceAccuracyCcc: Number(latest.device_accuracy_ccc ?? 0),
    baselineEstablished: Boolean(user.baseline_established),
    baselineDaysComplete: baselineCount ?? 0,
    baselineDaysRequired: 14,
    hrvBaselineMean: Number(user.baseline_hrv_mean ?? 0),
    hrvBaselineSd: Number(user.baseline_hrv_sd ?? 0),
    rhrBaselineMean: Number(user.baseline_rhr_mean ?? 0),
    rhrBaselineSd: Number(user.baseline_rhr_sd ?? 0)
  }
}

export async function getBiometricsTrend(): Promise<BiometricsTrend[]> {
  const session = await getServerSession()
  if (!session) {
    return mockBiometricsTrend
  }
  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    return mockBiometricsTrend
  }

  const { data: trendRows } = await supabase
    .from("biometrics")
    .select("date, hrv_rmssd_ms, resting_hr_bpm, sleep_quality_score, sleep_duration_hrs")
    .eq("user_id", session.user.id)
    .order("date", { ascending: true })
    .limit(14)

  if (!trendRows || trendRows.length === 0) {
    return mockBiometricsTrend
  }

  return mapTrend(trendRows)
}
