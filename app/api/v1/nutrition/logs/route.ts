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
    .eq("date", new Date().toISOString().slice(0, 10)) // Only get today's logs
    .order("meal_time", { ascending: false })
    .limit(50)

  // If table doesn't exist, return empty array
  if (error && (error.message.includes("table") || error.message.includes("schema cache") || error.message.includes("not found"))) {
    console.warn("nutrition_logs table not found - migration may not have been run")
    return NextResponse.json([])
  }

  if (error) {
    return jsonError(error.message, 400)
  }

  return NextResponse.json(data ?? [])
}
