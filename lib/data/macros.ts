import { mockMacroTargets } from "@/lib/mock-data"
import { createSupabaseServerClient, getServerSession } from "@/lib/supabase/server"
import { calculateMacroTargets } from "@/lib/algorithms/macro-calculator"
import { getCurrentUser } from "@/lib/data/user"
import type { MacroTargets } from "@/types/macros"

export async function getMacroTargets(): Promise<MacroTargets> {
  const session = await getServerSession()
  if (!session) {
    return mockMacroTargets
  }
  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    return mockMacroTargets
  }

  const { data: latest } = await supabase
    .from("macro_targets")
    .select("*")
    .eq("user_id", session.user.id)
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (latest) {
    return {
      calories: Number(latest.calories ?? 0),
      proteinG: Number(latest.protein_g ?? 0),
      carbsG: Number(latest.carbs_g ?? 0),
      fatG: Number(latest.fat_g ?? 0),
      adjustmentReason: latest.adjustment_reason ?? "",
      confidenceLevel: latest.confidence_level ?? "MODERATE",
      proteinCitationDoi: latest.protein_citation_doi ?? mockMacroTargets.proteinCitationDoi,
      carbCitationDoi: latest.carb_citation_doi ?? mockMacroTargets.carbCitationDoi,
      fatCitationDoi: latest.fat_citation_doi ?? mockMacroTargets.fatCitationDoi
    }
  }

  const user = await getCurrentUser()
  const { data: weightRow } = await supabase
    .from("weight_logs")
    .select("weight_kg, body_fat_percent")
    .eq("user_id", session.user.id)
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle()

  const weightKg = Number(weightRow?.weight_kg ?? 82)
  const target = calculateMacroTargets({
    user,
    weightKg,
    bodyFatPercent: weightRow?.body_fat_percent ?? null
  })

  await supabase.from("macro_targets").insert({
    user_id: session.user.id,
    date: new Date().toISOString().slice(0, 10),
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

  return target
}
