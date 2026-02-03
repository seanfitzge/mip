import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"
import { mockBiometricsTrend, mockMacroTargets } from "@/lib/mock-data"

export async function POST() {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    return jsonError("Supabase not configured", 500)
  }

  const today = new Date()
  const biometricsPayload = mockBiometricsTrend.map((item, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (mockBiometricsTrend.length - 1 - index))
    return {
      user_id: session.user.id,
      date: date.toISOString().slice(0, 10),
      hrv_rmssd_ms: item.hrvMs,
      resting_hr_bpm: item.restingHrBpm,
      sleep_quality_score: item.sleepQuality,
      sleep_duration_hrs: item.sleepDurationHours,
      readiness_score: 75,
      source_device: "garmin_fenix",
      device_accuracy_ccc: 0.87
    }
  })

  await supabase.from("biometrics").upsert(biometricsPayload, { onConflict: "user_id,date" })

  await supabase.from("macro_targets").upsert({
    user_id: session.user.id,
    date: today.toISOString().slice(0, 10),
    calories: mockMacroTargets.calories,
    protein_g: mockMacroTargets.proteinG,
    carbs_g: mockMacroTargets.carbsG,
    fat_g: mockMacroTargets.fatG,
    protein_citation_doi: mockMacroTargets.proteinCitationDoi,
    carb_citation_doi: mockMacroTargets.carbCitationDoi,
    fat_citation_doi: mockMacroTargets.fatCitationDoi,
    calculation_method: "seed",
    adjustment_reason: mockMacroTargets.adjustmentReason ?? "",
    confidence_level: mockMacroTargets.confidenceLevel
  })

  return NextResponse.json({ ok: true })
}
