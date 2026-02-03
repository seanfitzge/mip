import { NextRequest, NextResponse } from "next/server"
import { createSupabaseServerClient, getServerSession } from "@/lib/supabase/server"

/**
 * GET /api/v1/biometrics/history?days=30
 * Fetch historical biometrics data for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createSupabaseServerClient()
    if (!supabase) {
      return NextResponse.json({ error: "Database connection failed" }, { status: 500 })
    }

    // Get the number of days from query params (default 30)
    const searchParams = request.nextUrl.searchParams
    const days = parseInt(searchParams.get("days") || "30")
    const limit = Math.min(days, 365) // Cap at 1 year

    // Fetch biometrics data
    const { data, error } = await supabase
      .from("biometrics")
      .select(
        `
        date,
        hrv_rmssd_ms,
        resting_hr_bpm,
        sleep_duration_hrs,
        sleep_quality_score,
        deep_sleep_hrs,
        rem_sleep_hrs,
        light_sleep_hrs,
        sleep_efficiency_percent,
        steps,
        active_calories,
        training_load,
        recovery_time_hrs,
        readiness_score,
        source_device,
        device_accuracy_ccc
      `
      )
      .eq("user_id", session.user.id)
      .order("date", { ascending: false })
      .limit(limit)

    if (error) {
      console.error("Error fetching biometrics history:", error)
      return NextResponse.json({ error: "Failed to fetch biometrics history" }, { status: 500 })
    }

    return NextResponse.json({
      data: data || [],
      count: data?.length || 0
    })
  } catch (error) {
    console.error("Error in GET /api/v1/biometrics/history:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
