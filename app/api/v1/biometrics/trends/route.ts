import { NextResponse } from "next/server"
import { getBiometricsTrend } from "@/lib/data/biometrics"

export async function GET() {
  const trend = await getBiometricsTrend()
  return NextResponse.json(trend)
}
