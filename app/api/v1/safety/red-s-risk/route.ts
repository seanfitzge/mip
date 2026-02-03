import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"
import { assessRedSRisk } from "@/lib/algorithms/red-s"

export async function GET() {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    return jsonError("Supabase not configured", 500)
  }

  const { data: summary } = await supabase
    .from("daily_nutrition_summary")
    .select("energy_availability_kcal_per_kg_ffm")
    .eq("user_id", session.user.id)
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data: user } = await supabase.from("users").select("sex").eq("id", session.user.id).maybeSingle()

  const energyAvailability = Number(summary?.energy_availability_kcal_per_kg_ffm ?? 40)
  const assessment = assessRedSRisk({
    sex: user?.sex ?? "male",
    energyAvailability,
    daysBelowThreshold: energyAvailability < 40 ? 7 : 0
  })

  return NextResponse.json(assessment)
}
