import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"
import { readDemoStore } from "@/lib/demo-store"

export async function GET() {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    const store = await readDemoStore()
    return NextResponse.json(store.nutritionLogs)
  }

  const { data, error } = await supabase
    .from("nutrition_logs")
    .select("*")
    .eq("user_id", session.user.id)
    .order("meal_time", { ascending: false })
    .limit(10)

  if (error) {
    return jsonError(error.message, 400)
  }

  return NextResponse.json(data ?? [])
}
