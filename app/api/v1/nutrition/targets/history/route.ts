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
    return NextResponse.json([
      {
        date: new Date().toISOString().slice(0, 10),
        calories: store.macroTargets.calories,
        protein_g: store.macroTargets.proteinG,
        carbs_g: store.macroTargets.carbsG,
        fat_g: store.macroTargets.fatG
      }
    ])
  }

  const { data, error } = await supabase
    .from("macro_targets")
    .select("*")
    .eq("user_id", session.user.id)
    .order("date", { ascending: false })
    .limit(14)

  // If table doesn't exist, return empty array
  if (error && (error.message.includes("table") || error.message.includes("schema cache"))) {
    console.warn("macro_targets table not found - migration may not have been run")
    return NextResponse.json([])
  }

  if (error) {
    return jsonError(error.message, 400)
  }

  return NextResponse.json(data ?? [])
}
