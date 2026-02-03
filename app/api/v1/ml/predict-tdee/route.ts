import { NextResponse } from "next/server"
import { estimateTdee } from "@/lib/algorithms/tdee-estimator"
import { jsonError, requireSession } from "@/lib/api/utils"

export async function POST(request: Request) {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }

  const body = await request.json().catch(() => ({}))
  const estimate = estimateTdee({
    weightKg: Number(body.weightKg ?? 82),
    heightCm: body.heightCm ?? 175,
    age: body.age ?? 30,
    sex: body.sex ?? "male",
    activityMultiplier: body.activityMultiplier ?? 1.5
  })

  return NextResponse.json(estimate)
}
