import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { getSupabaseEnv } from "@/lib/supabase/env"
import { getDemoCookieName } from "@/lib/auth/demo"

export async function POST() {
  const env = getSupabaseEnv()
  if (env) {
    return NextResponse.json({ error: "Demo mode disabled when Supabase is configured." }, { status: 400 })
  }

  const cookieStore = await cookies()
  cookieStore.set({
    name: getDemoCookieName(),
    value: "active",
    httpOnly: true,
    path: "/",
    sameSite: "lax"
  })

  return NextResponse.json({ ok: true })
}
