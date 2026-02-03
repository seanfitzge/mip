import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"
import { readDemoStore, writeDemoStore } from "@/lib/demo-store"

export async function GET() {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    const store = await readDemoStore()
    return NextResponse.json(store.weightLogs)
  }

  const { data, error } = await supabase
    .from("weight_logs")
    .select("date, weight_kg")
    .eq("user_id", session.user.id)
    .order("date", { ascending: true })
    .limit(14)

  if (error) {
    return jsonError(error.message, 400)
  }

  return NextResponse.json(data ?? [])
}

export async function POST(request: Request) {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    const store = await readDemoStore()
    const entry = {
      date: body.date ?? new Date().toISOString().slice(0, 10),
      weight_kg: weight
    }
    store.weightLogs = store.weightLogs.filter((item) => item.date !== entry.date)
    store.weightLogs.push(entry)
    await writeDemoStore(store)
    return NextResponse.json(entry)
  }

  const body = await request.json().catch(() => ({}))
  const weight = Number(body.weightKg ?? 0)
  if (!weight) {
    return jsonError("Missing weight", 400)
  }

  const { data, error } = await supabase
    .from("weight_logs")
    .upsert({
      user_id: session.user.id,
      date: body.date ?? new Date().toISOString().slice(0, 10),
      weight_kg: weight
    })
    .select("*")
    .single()

  if (error) {
    return jsonError(error.message, 400)
  }

  return NextResponse.json(data)
}
