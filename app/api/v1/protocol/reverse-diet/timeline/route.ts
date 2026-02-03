import { NextResponse } from "next/server"
import { getReverseDietProtocol } from "@/lib/data/protocols"

export async function GET() {
  const protocol = await getReverseDietProtocol()
  return NextResponse.json({
    predictedEndDate: protocol.predictedEndDate,
    currentWeek: protocol.currentWeek,
    currentPhase: protocol.currentPhase
  })
}
