import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"
import { buildReverseDietProtocol } from "@/lib/algorithms/reverse-diet"

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
  const protocol = buildReverseDietProtocol({
    currentWeek: 1,
    targetCalories: Number(body.targetCalories ?? 3000),
    weeklyIncreaseKcal: Number(body.weeklyIncreaseKcal ?? 120),
    predictedEndDate: body.predictedEndDate ?? "2026-05-15"
  })

  const { data, error } = await supabase.from("reverse_diet_protocols").insert({
    user_id: session.user.id,
    start_date: new Date().toISOString().slice(0, 10),
    predicted_end_date: protocol.predictedEndDate,
    target_calories: protocol.targetCalories,
    weekly_increase_kcal: protocol.weeklyIncreaseKcal,
    current_week: protocol.currentWeek,
    current_phase: protocol.currentPhase,
    status: "active"
  }).select("*").single()

  if (error) {
    return jsonError(error.message, 400)
  }

  return NextResponse.json(data)
}
