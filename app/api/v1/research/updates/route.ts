import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"

export async function GET() {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    return jsonError("Supabase not configured", 500)
  }

  const { data, error } = await supabase
    .from("research_papers")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10)

  if (error) {
    return jsonError(error.message, 400)
  }

  return NextResponse.json(data ?? [])
}
