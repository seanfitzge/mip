import { NextResponse } from "next/server"
import { jsonError, requireSession, requireSupabase } from "@/lib/api/utils"
import { mockResearchPapers } from "@/lib/mock-data"

export async function GET(request: Request) {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    return NextResponse.json(mockResearchPapers)
  }

  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")
  const topic = searchParams.get("topic")

  let requestBuilder = supabase.from("research_papers").select("*")

  if (query) {
    requestBuilder = requestBuilder.or(`title.ilike.%${query}%,doi.ilike.%${query}%`)
  }
  if (topic) {
    requestBuilder = requestBuilder.contains("topics", [topic])
  }

  const { data, error } = await requestBuilder.order("year", { ascending: false }).limit(50)

  if (error) {
    return jsonError(error.message, 400)
  }

  return NextResponse.json(data ?? [])
}
