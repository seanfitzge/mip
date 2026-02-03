import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"
import { calculateMacroTargets } from "@/lib/algorithms/macro-calculator"
import { getCurrentUser } from "@/lib/data/user"
import type { DietPhaseInfo } from "@/components/nutrition/diet-phase-questionnaire"

export async function POST(request: Request) {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    return jsonError("Supabase not configured", 500)
  }

  const body = await request.json().catch(() => ({}))
  const weightKg = Number(body.weightKg ?? 82)
  const bodyFatPercent = body.bodyFatPercent ?? null
  const dietPhaseInfo = body.dietPhaseInfo as DietPhaseInfo | undefined

  // Check if user already has targets saved for today
  const today = new Date().toISOString().slice(0, 10)
  const { data: existingTarget } = await supabase
    .from("macro_targets")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("date", today)
    .maybeSingle()

  // If targets exist and user hasn't explicitly requested recalculation, return existing
  if (existingTarget && !body.forceRecalculate) {
    return NextResponse.json({
      calories: Number(existingTarget.calories ?? 0),
      proteinG: Number(existingTarget.protein_g ?? 0),
      carbsG: Number(existingTarget.carbs_g ?? 0),
      fatG: Number(existingTarget.fat_g ?? 0),
      isExisting: true
    })
  }

  const user = await getCurrentUser()
  const userWithGoal = body.goal ? { ...user, goal: body.goal } : user
  
  // Calculate targets with diet phase info
  const target = calculateMacroTargets({
    user: userWithGoal,
    weightKg,
    bodyFatPercent,
    trainingType: body.trainingType ?? "mixed",
    caloriesOverride: body.caloriesOverride ?? null,
    dietPhaseInfo
  })

  // Save targets (upsert for today)
  await supabase.from("macro_targets").upsert({
    user_id: session.user.id,
    date: today,
    calories: target.calories,
    protein_g: target.proteinG,
    carbs_g: target.carbsG,
    fat_g: target.fatG,
    protein_citation_doi: target.proteinCitationDoi,
    carb_citation_doi: target.carbCitationDoi,
    fat_citation_doi: target.fatCitationDoi,
    calculation_method: "adaptive",
    adjustment_reason: target.adjustmentReason ?? "",
    confidence_level: target.confidenceLevel
  }, {
    onConflict: "user_id,date"
  })

  return NextResponse.json({
    ...target,
    isExisting: false
  })
}
