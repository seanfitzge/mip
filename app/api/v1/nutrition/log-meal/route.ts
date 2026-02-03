import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"
import { readDemoStore, writeDemoStore } from "@/lib/demo-store"

export async function POST(request: Request) {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  const body = await request.json().catch(() => ({}))
  if (!body.mealName || !body.calories) {
    return jsonError("Missing required fields", 400)
  }

  if (!supabase) {
    const store = await readDemoStore()
    const entry = {
      id: `demo-${Date.now()}`,
      meal_name: body.mealName,
      meal_time: body.mealTime ?? new Date().toISOString(),
      calories: Number(body.calories ?? 0),
      protein_g: Number(body.proteinG ?? 0),
      carbs_g: Number(body.carbsG ?? 0),
      fat_g: Number(body.fatG ?? 0)
    }
    store.nutritionLogs.unshift(entry)
    await writeDemoStore(store)
    return NextResponse.json(entry)
  }

  const { data, error } = await supabase.from("nutrition_logs").insert({
    user_id: session.user.id,
    date: body.date ?? new Date().toISOString().slice(0, 10),
    meal_time: body.mealTime ?? new Date().toISOString(),
    meal_name: body.mealName,
    meal_type: body.mealType ?? "meal",
    calories: Number(body.calories ?? 0),
    protein_g: Number(body.proteinG ?? 0),
    carbs_g: Number(body.carbsG ?? 0),
    fat_g: Number(body.fatG ?? 0),
    fiber_g: Number(body.fiberG ?? 0)
  }).select("*").single()

  if (error) {
    return jsonError(error.message, 400)
  }

  return NextResponse.json(data)
}
