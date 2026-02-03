import { NextResponse } from "next/server"
import { getReverseDietProtocol } from "@/lib/data/protocols"

export async function GET() {
  const protocol = await getReverseDietProtocol()
  return NextResponse.json(protocol)
}
