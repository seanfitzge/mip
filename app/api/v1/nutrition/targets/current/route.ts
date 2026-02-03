import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"
import { readDemoStore } from "@/lib/demo-store"
import type { MacroTargets } from "@/types/macros"
import { mockMacroTargets } from "@/lib/mock-data"

export async function GET() {
  const session = await requireSession()
  if (!session) {
    return NextResponse.json(mockMacroTargets)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    const store = await readDemoStore()
    return NextResponse.json({
      calories: store.macroTargets.calories,
      proteinG: store.macroTargets.proteinG,
      carbsG: store.macroTargets.carbsG,
      fatG: store.macroTargets.fatG,
      confidenceLevel: "MODERATE",
      proteinCitationDoi: mockMacroTargets.proteinCitationDoi,
      carbCitationDoi: mockMacroTargets.carbCitationDoi,
      fatCitationDoi: mockMacroTargets.fatCitationDoi
    })
  }

  const { data: latest, error: queryError } = await supabase
    .from("macro_targets")
    .select("*")
    .eq("user_id", session.user.id)
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle()

  // If table doesn't exist, return null (no targets yet)
  if (queryError && (queryError.message.includes("table") || queryError.message.includes("schema cache"))) {
    console.warn("macro_targets table not found - migration may not have been run")
    return NextResponse.json(null)
  }

  if (latest) {
    return NextResponse.json({
      calories: Number(latest.calories ?? 0),
      proteinG: Number(latest.protein_g ?? 0),
      carbsG: Number(latest.carbs_g ?? 0),
      fatG: Number(latest.fat_g ?? 0),
      adjustmentReason: latest.adjustment_reason ?? "",
      confidenceLevel: latest.confidence_level ?? "MODERATE",
      proteinCitationDoi: latest.protein_citation_doi ?? mockMacroTargets.proteinCitationDoi,
      carbCitationDoi: latest.carb_citation_doi ?? mockMacroTargets.carbCitationDoi,
      fatCitationDoi: latest.fat_citation_doi ?? mockMacroTargets.fatCitationDoi
    } as MacroTargets)
  }

  return NextResponse.json(null)
}
