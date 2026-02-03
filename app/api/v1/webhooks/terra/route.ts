import { NextResponse } from "next/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient()
  const payload = await request.json().catch(() => null)
  if (!payload) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  if (!supabase) {
    return NextResponse.json({ ok: true, mock: true })
  }

  const userId = payload?.user_id
  const biometrics = payload?.data ?? []
  if (!userId || !Array.isArray(biometrics)) {
    return NextResponse.json({ ok: true })
  }

  await Promise.all(
    biometrics.map((entry: any) =>
      supabase.from("biometrics").upsert({
        user_id: userId,
        date: entry.date,
        hrv_rmssd_ms: entry.hrv_rmssd,
        resting_hr_bpm: entry.resting_hr,
        sleep_quality_score: entry.sleep_quality,
        sleep_duration_hrs: entry.sleep_duration,
        source_device: entry.device,
        device_accuracy_ccc: entry.device_accuracy
      })
    )
  )

  return NextResponse.json({ ok: true })
}
