import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"

export async function GET(_: Request, { params }: { params: { name: string } }) {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    return jsonError("Supabase not configured", 500)
  }

  const topic = decodeURIComponent(params.name)
  const { data, error } = await supabase
    .from("research_papers")
    .select("*")
    .contains("topics", [topic])
    .order("year", { ascending: false })

  if (error) {
    return jsonError(error.message, 400)
  }
  return NextResponse.json(data ?? [])
}
