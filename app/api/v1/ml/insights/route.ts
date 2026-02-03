import { NextResponse } from "next/server"
import { jsonError, requireSession } from "@/lib/api/utils"

export async function GET() {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }

  return NextResponse.json({
    insights: [
      "HRV typically dips after 3 days below 2500 kcal.",
      "RHR improves ~2 bpm when weekly carb increases exceed 75g.",
      "Sleep quality stabilizes when evening carbs are >25g."
    ]
  })
}
