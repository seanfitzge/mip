export type UserProfile = {
  id: string
  name: string
  email: string
  goal: "performance" | "deficit" | "reverse_diet" | "bulk"
  sport: string
  trainingFrequency: number
  wearableType: "garmin" | "whoop" | "oura"
}
