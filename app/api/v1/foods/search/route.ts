import { NextResponse } from "next/server"
import { jsonError, requireSession } from "@/lib/api/utils"
import { searchFoods } from "@/lib/integrations/usda"

export async function GET(request: Request) {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }

  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q") ?? ""
  if (!query) {
    return jsonError("Missing query", 400)
  }

  const results = await searchFoods(query)
  return NextResponse.json(results)
}
