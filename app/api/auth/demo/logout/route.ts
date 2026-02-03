import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getDemoCookieName } from "@/lib/auth/demo"

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.set({
    name: getDemoCookieName(),
    value: "",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    maxAge: 0
  })
  return NextResponse.json({ ok: true })
}
