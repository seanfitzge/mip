import { mockReverseDietProtocol } from "@/lib/mock-data"
import { createSupabaseServerClient, getServerSession } from "@/lib/supabase/server"
import { buildReverseDietProtocol } from "@/lib/algorithms/reverse-diet"
import type { ReverseDietProtocol } from "@/types/protocol"

export async function getReverseDietProtocol(): Promise<ReverseDietProtocol> {
  const session = await getServerSession()
  if (!session) {
    return mockReverseDietProtocol
  }
  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    return mockReverseDietProtocol
  }

  const { data: latest } = await supabase
    .from("reverse_diet_protocols")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle()

  if (latest) {
    return buildReverseDietProtocol({
      currentWeek: Number(latest.current_week ?? 1),
      targetCalories: Number(latest.target_calories ?? 3000),
      weeklyIncreaseKcal: Number(latest.current_weekly_increase ?? latest.weekly_increase_kcal ?? 100),
      predictedEndDate: latest.predicted_end_date ?? "2026-05-15"
    })
  }

  const protocol = buildReverseDietProtocol({
    currentWeek: 1,
    targetCalories: 3000,
    weeklyIncreaseKcal: 120,
    predictedEndDate: "2026-05-15"
  })

  await supabase.from("reverse_diet_protocols").insert({
    user_id: session.user.id,
    start_date: new Date().toISOString().slice(0, 10),
    predicted_end_date: protocol.predictedEndDate,
    target_calories: protocol.targetCalories,
    weekly_increase_kcal: protocol.weeklyIncreaseKcal,
    current_week: protocol.currentWeek,
    current_phase: protocol.currentPhase,
    status: "active"
  })

  return protocol
}
