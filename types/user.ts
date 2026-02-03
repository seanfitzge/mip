export type UserProfile = {
  id: string
  name: string
  email: string
  sex: "male" | "female" | "other"
  goal: "performance" | "deficit" | "reverse_diet" | "bulk" | "maintenance"
  sport: string
  trainingFrequency: number
  wearableType: "garmin" | "whoop" | "oura" | "apple_health" | "fitbit"
  userCategory: "novice" | "intermediate" | "elite"
  metabolicFlexibilityScore: number
  baselineEstablished: boolean
}
