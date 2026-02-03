import { mockUser } from "@/lib/mock-data"
import { createSupabaseServerClient, getServerSession } from "@/lib/supabase/server"
import type { UserProfile } from "@/types/user"

async function ensureUserProfile(userId: string, email: string) {
  const supabase = await createSupabaseServerClient()
  if (!supabase) return null

  const { data: existing, error } = await supabase.from("users").select("*").eq("id", userId).maybeSingle()
  if (existing || error) {
    return existing ?? null
  }

  const name = email.split("@")[0]?.replace(".", " ") ?? "Athlete"
  const { data } = await supabase
    .from("users")
    .insert({
      id: userId,
      email,
      name,
      sex: "male",
      goal: "reverse_diet",
      sport: "Strength",
      training_frequency: 5,
      wearable_type: "garmin",
      user_category: "intermediate",
      metabolic_flexibility_score: 0.7,
      baseline_established: false
    })
    .select("*")
    .single()

  return data ?? null
}

function mapUser(row: any): UserProfile {
  return {
    id: row.id,
    name: row.name ?? "Athlete",
    email: row.email,
    sex: row.sex ?? "male",
    goal: row.goal ?? "reverse_diet",
    sport: row.sport ?? "Strength",
    trainingFrequency: row.training_frequency ?? 5,
    wearableType: row.wearable_type ?? "garmin",
    userCategory: row.user_category ?? "intermediate",
    metabolicFlexibilityScore: Number(row.metabolic_flexibility_score ?? 0.7),
    baselineEstablished: Boolean(row.baseline_established)
  }
}

export async function getCurrentUser() {
  const session = await getServerSession()
  if (!session) {
    return mockUser
  }
  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    return mockUser
  }

  const profile = await ensureUserProfile(session.user.id, session.user.email ?? "athlete@mip.app")
  if (!profile) {
    return mockUser
  }

  return mapUser(profile)
}
