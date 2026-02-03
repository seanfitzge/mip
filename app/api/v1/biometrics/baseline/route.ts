import { NextResponse } from "next/server"
import { requireSession, requireSupabase, jsonError } from "@/lib/api/utils"
import { readDemoStore, writeDemoStore } from "@/lib/demo-store"

export async function POST() {
  const session = await requireSession()
  if (!session) {
    return jsonError("Unauthorized", 401)
  }
  const supabase = await requireSupabase()
  if (!supabase) {
    const store = await readDemoStore()
    store.baseline.established = true
    await writeDemoStore(store)
    return NextResponse.json({
      baselineEstablished: true,
      hrvBaselineMean: store.baseline.hrvBaselineMean,
      hrvBaselineSd: store.baseline.hrvBaselineSd,
      rhrBaselineMean: store.baseline.rhrBaselineMean,
      rhrBaselineSd: store.baseline.rhrBaselineSd
    })
  }

  const { data: rows } = await supabase
    .from("biometrics")
    .select("hrv_rmssd_ms, resting_hr_bpm")
    .eq("user_id", session.user.id)
    .order("date", { ascending: false })
    .limit(14)

  if (!rows || rows.length < 7) {
    return jsonError("Not enough data to establish baseline", 400)
  }

  const hrvValues = rows.map((row) => Number(row.hrv_rmssd_ms ?? 0)).filter(Boolean)
  const rhrValues = rows.map((row) => Number(row.resting_hr_bpm ?? 0)).filter(Boolean)

  const mean = (values: number[]) => values.reduce((a, b) => a + b, 0) / values.length
  const sd = (values: number[]) => {
    const m = mean(values)
    return Math.sqrt(values.reduce((acc, val) => acc + Math.pow(val - m, 2), 0) / values.length)
  }

  const baselineHrvMean = Number(mean(hrvValues).toFixed(2))
  const baselineHrvSd = Number(sd(hrvValues).toFixed(2))
  const baselineRhrMean = Number(mean(rhrValues).toFixed(2))
  const baselineRhrSd = Number(sd(rhrValues).toFixed(2))

  await supabase.from("users").update({
    baseline_established: true,
    baseline_start_date: new Date().toISOString().slice(0, 10),
    baseline_hrv_mean: baselineHrvMean,
    baseline_hrv_sd: baselineHrvSd,
    baseline_rhr_mean: baselineRhrMean,
    baseline_rhr_sd: baselineRhrSd
  }).eq("id", session.user.id)

  return NextResponse.json({
    baselineEstablished: true,
    hrvBaselineMean: baselineHrvMean,
    hrvBaselineSd: baselineHrvSd,
    rhrBaselineMean: baselineRhrMean,
    rhrBaselineSd: baselineRhrSd
  })
}
