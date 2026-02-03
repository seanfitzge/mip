import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"
import { readDemoStore, writeDemoStore } from "@/lib/demo-store"

export async function POST(request: Request) {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    const store = await readDemoStore()
    store.macroTargets.adjustmentReason = "Protocol updated in demo mode."
    await writeDemoStore(store)
    return NextResponse.json({
      current_week: body.currentWeek,
      current_weekly_increase: body.currentWeeklyIncrease,
      current_phase: body.currentPhase
    })
  }

  const body = await request.json().catch(() => ({}))
  const { data, error } = await supabase
    .from("reverse_diet_protocols")
    .update({
      current_week: body.currentWeek,
      current_weekly_increase: body.currentWeeklyIncrease,
      current_phase: body.currentPhase,
      updated_at: new Date().toISOString()
    })
    .eq("user_id", session.user.id)
    .eq("status", "active")
    .select("*")
    .maybeSingle()

  if (error) {
    return jsonError(error.message, 400)
  }

  return NextResponse.json(data)
}
