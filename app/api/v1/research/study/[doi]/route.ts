import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"

export async function GET(_: Request, { params }: { params: { doi: string } }) {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    return jsonError("Supabase not configured", 500)
  }

  const doi = decodeURIComponent(params.doi)
  const { data, error } = await supabase.from("research_papers").select("*").eq("doi", doi).maybeSingle()
  if (error || !data) {
    return jsonError("Study not found", 404)
  }
  return NextResponse.json(data)
}
