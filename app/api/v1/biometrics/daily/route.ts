import { NextResponse } from "next/server"
import { getBiometricsSummary } from "@/lib/data/biometrics"

export async function GET() {
  const summary = await getBiometricsSummary()
  return NextResponse.json(summary)
}
