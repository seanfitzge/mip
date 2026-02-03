import { NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient, getServerSession } from "@/lib/supabase/server"

type ManualBiometricsInput = {
  date: string
  hrv_rmssd_ms?: number | null
  hrv_sdnn_ms?: number | null
  resting_hr_bpm?: number | null
  sleeping_hr_bpm?: number | null
  sleep_duration_hrs?: number | null
  sleep_quality_score?: number | null
  deep_sleep_hrs?: number | null
  rem_sleep_hrs?: number | null
  light_sleep_hrs?: number | null
  sleep_efficiency_percent?: number | null
  steps?: number | null
  active_calories?: number | null
  training_load?: number | null
  recovery_time_hrs?: number | null
  source_device: string
}

/**
 * POST /api/v1/biometrics/manual
 * Save manually entered biometric data
 */
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createSupabaseServerClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    const body: ManualBiometricsInput = await request.json()

    // Validate required fields
    if (!body.date) {
      return NextResponse.json({ error: "Date is required" }, { status: 400 })
    }

    if (!body.hrv_rmssd_ms || !body.resting_hr_bpm || !body.sleep_duration_hrs || !body.sleep_quality_score) {
      return NextResponse.json(
        { error: "HRV, RHR, sleep duration, and sleep quality are required" },
        { status: 400 }
      )
    }

    // Calculate readiness score based on input metrics
    const readinessScore = calculateReadinessScore({
      hrv: body.hrv_rmssd_ms,
      rhr: body.resting_hr_bpm,
      sleepQuality: body.sleep_quality_score,
      sleepDuration: body.sleep_duration_hrs
    })

    // Prepare data for insertion
    const biometricsData = {
      user_id: session.user.id,
      date: body.date,
      hrv_rmssd_ms: body.hrv_rmssd_ms,
      hrv_sdnn_ms: body.hrv_sdnn_ms,
      resting_hr_bpm: body.resting_hr_bpm,
      sleeping_hr_bpm: body.sleeping_hr_bpm,
      sleep_duration_hrs: body.sleep_duration_hrs,
      sleep_quality_score: body.sleep_quality_score,
      deep_sleep_hrs: body.deep_sleep_hrs,
      rem_sleep_hrs: body.rem_sleep_hrs,
      light_sleep_hrs: body.light_sleep_hrs,
      sleep_efficiency_percent: body.sleep_efficiency_percent,
      steps: body.steps,
      active_calories: body.active_calories,
      training_load: body.training_load,
      recovery_time_hrs: body.recovery_time_hrs,
      source_device: body.source_device,
      device_accuracy_ccc: getDeviceAccuracyCCC(body.source_device),
      readiness_score: readinessScore,
      created_at: new Date().toISOString()
    }

    // Insert or update biometrics data using upsert
    const { data, error } = await supabase
      .from("biometrics")
      .upsert(biometricsData, {
        onConflict: "user_id,date",
        ignoreDuplicates: false
      })
      .select()
      .single()

    if (error) {
      console.error("Error saving biometrics:", error)
      return NextResponse.json({ error: "Failed to save biometrics data" }, { status: 500 })
    }

    // Check if we should update baseline
    await updateBaselineIfNeeded(supabase, session.user.id)

    return NextResponse.json({
      success: true,
      data,
      message: "Biometrics saved successfully"
    })
  } catch (error) {
    console.error("Error in POST /api/v1/biometrics/manual:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * Calculate a simple readiness score based on input metrics
 * This mimics what devices like WHOOP and Oura do
 */
function calculateReadinessScore(params: {
  hrv: number
  rhr: number
  sleepQuality: number
  sleepDuration: number
}): number {
  // Simple weighted average:
  // - Sleep quality: 40%
  // - Sleep duration: 20% (7-9 hours is optimal)
  // - HRV: 25% (normalized to 0-100 scale, assuming 20-80ms typical range)
  // - RHR: 15% (normalized, lower is better, assuming 45-80 bpm range)

  const sleepQualityScore = params.sleepQuality // Already 0-100
  
  // Sleep duration score (optimal 7-9 hours)
  let sleepDurationScore = 100
  if (params.sleepDuration < 6) {
    sleepDurationScore = Math.max(0, (params.sleepDuration / 6) * 70)
  } else if (params.sleepDuration < 7) {
    sleepDurationScore = 70 + ((params.sleepDuration - 6) / 1) * 20
  } else if (params.sleepDuration <= 9) {
    sleepDurationScore = 100
  } else {
    sleepDurationScore = Math.max(70, 100 - ((params.sleepDuration - 9) / 2) * 30)
  }

  // HRV score (normalize 20-80ms to 0-100)
  const hrvNormalized = Math.min(100, Math.max(0, ((params.hrv - 20) / 60) * 100))

  // RHR score (normalize 45-80 bpm, inverse scale - lower is better)
  const rhrNormalized = Math.min(100, Math.max(0, ((80 - params.rhr) / 35) * 100))

  // Weighted average
  const readinessScore = Math.round(
    sleepQualityScore * 0.4 + sleepDurationScore * 0.2 + hrvNormalized * 0.25 + rhrNormalized * 0.15
  )

  return Math.min(100, Math.max(0, readinessScore))
}

/**
 * Get device accuracy CCC (Concordance Correlation Coefficient)
 * Based on published validation studies
 */
function getDeviceAccuracyCCC(device: string): number {
  const accuracyMap: Record<string, number> = {
    oura: 0.99,
    whoop: 0.94,
    garmin: 0.87,
    apple_watch: 0.85,
    fitbit: 0.83,
    manual: 0.9, // Assume decent accuracy for manual entry from other devices
    other: 0.85
  }

  return accuracyMap[device.toLowerCase()] || 0.85
}

/**
 * Update user baseline if they have enough data
 */
async function updateBaselineIfNeeded(supabase: any, userId: string) {
  try {
    // Check if baseline is already established
    const { data: user } = await supabase.from("users").select("baseline_established").eq("id", userId).single()

    if (user?.baseline_established) {
      return // Baseline already established
    }

    // Get all biometrics for this user
    const { data: biometrics, count } = await supabase
      .from("biometrics")
      .select("hrv_rmssd_ms, resting_hr_bpm", { count: "exact" })
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .limit(14)

    // Need at least 14 days of data for baseline
    if (!biometrics || count < 14) {
      return
    }

    // Calculate baseline statistics
    const hrvValues = biometrics.map((b: any) => Number(b.hrv_rmssd_ms)).filter((v: number) => v > 0)
    const rhrValues = biometrics.map((b: any) => Number(b.resting_hr_bpm)).filter((v: number) => v > 0)

    if (hrvValues.length < 14 || rhrValues.length < 14) {
      return // Not enough valid data
    }

    const hrvMean = hrvValues.reduce((sum: number, val: number) => sum + val, 0) / hrvValues.length
    const rhrMean = rhrValues.reduce((sum: number, val: number) => sum + val, 0) / rhrValues.length

    // Calculate standard deviations
    const hrvVariance =
      hrvValues.reduce((sum: number, val: number) => sum + Math.pow(val - hrvMean, 2), 0) / hrvValues.length
    const hrvSd = Math.sqrt(hrvVariance)

    const rhrVariance =
      rhrValues.reduce((sum: number, val: number) => sum + Math.pow(val - rhrMean, 2), 0) / rhrValues.length
    const rhrSd = Math.sqrt(rhrVariance)

    // Update user baseline
    await supabase
      .from("users")
      .update({
        baseline_established: true,
        baseline_start_date: biometrics[biometrics.length - 1].date,
        baseline_hrv_mean: Number(hrvMean.toFixed(2)),
        baseline_hrv_sd: Number(hrvSd.toFixed(2)),
        baseline_rhr_mean: Math.round(rhrMean),
        baseline_rhr_sd: Number(rhrSd.toFixed(2))
      })
      .eq("id", userId)
  } catch (error) {
    console.error("Error updating baseline:", error)
    // Don't throw - baseline update is not critical
  }
}
