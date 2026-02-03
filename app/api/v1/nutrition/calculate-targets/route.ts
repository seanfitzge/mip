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
  const { data: existingTarget, error: checkError } = await supabase
    .from("macro_targets")
    .select("*")
    .eq("user_id", session.user.id)
    .eq("date", today)
    .maybeSingle()

  // If table doesn't exist, provide helpful error message
  if (checkError && (checkError.message.includes("table") || checkError.message.includes("schema cache"))) {
    return jsonError(
      `Database table 'macro_targets' not found. Please run the migration:\n\n` +
      `1. Go to your Supabase dashboard\n` +
      `2. Navigate to SQL Editor\n` +
      `3. Copy and run the contents of: supabase/migrations/0001_init.sql\n\n` +
      `Error details: ${checkError.message}`,
      500
    )
  }

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
  // First try to insert, if that fails due to conflict, update
  const { error: insertError } = await supabase
    .from("macro_targets")
    .insert({
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
    })

  // If insert failed due to conflict (unique constraint), update instead
  if (insertError) {
    // Check if it's a unique constraint violation (target already exists)
    if (insertError.code === "23505" || insertError.message.includes("unique") || insertError.message.includes("duplicate")) {
      const { error: updateError } = await supabase
        .from("macro_targets")
        .update({
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
        })
        .eq("user_id", session.user.id)
        .eq("date", today)

      if (updateError) {
        console.error("Error updating macro targets:", updateError)
        return jsonError(`Failed to save targets: ${updateError.message}. Please ensure the database migration has been run.`, 500)
      }
    } else if (insertError.message.includes("table") || insertError.message.includes("schema cache") || insertError.message.includes("not found")) {
      // Table doesn't exist - migration hasn't been run
      console.error("Table not found error:", insertError)
      return jsonError(
        `Database table 'macro_targets' not found. Please run the migration:\n\n` +
        `1. Go to your Supabase dashboard (https://app.supabase.com)\n` +
        `2. Navigate to SQL Editor\n` +
        `3. Copy and run the contents of: supabase/migrations/0001_init.sql\n\n` +
        `See DATABASE_SETUP.md for detailed instructions.\n\n` +
        `Error: ${insertError.message}`,
        500
      )
    } else {
      console.error("Error saving macro targets:", insertError)
      return jsonError(`Failed to save targets: ${insertError.message}`, 500)
    }
  }

  // Return the calculated target (save is complete)
  return NextResponse.json({
    calories: target.calories,
    proteinG: target.proteinG,
    carbsG: target.carbsG,
    fatG: target.fatG,
    isExisting: false,
    saved: true
  })
}
