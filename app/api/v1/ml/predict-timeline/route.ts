import { NextResponse } from "next/server"
import { jsonError, requireSession } from "@/lib/api/utils"

export async function POST(request: Request) {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }

  const body = await request.json().catch(() => ({}))
  const deficitWeeks = Number(body.deficitWeeks ?? 12)
  const startingCalories = Number(body.startingCalories ?? 2200)
  const targetCalories = Number(body.targetCalories ?? 3000)
  const weeklyIncrease = Number(body.weeklyIncreaseKcal ?? 120)
  const weeksToMaintenance = Math.ceil((targetCalories - startingCalories) / weeklyIncrease)
  const totalWeeks = Math.max(deficitWeeks, weeksToMaintenance) + 8

  return NextResponse.json({
    estimatedWeeks: totalWeeks,
    weeksToMaintenance,
    confidence: "MODERATE"
  })
}
