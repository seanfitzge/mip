import { NextResponse } from "next/server"
import { createSupabaseServerClient, getServerSession } from "@/lib/supabase/server"

export async function requireSession() {
  const session = await getServerSession()
  if (!session) {
    return null
  }
  return session
}

export async function requireSupabase() {
  const supabase = await createSupabaseServerClient()
  return supabase
}

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status })
}
