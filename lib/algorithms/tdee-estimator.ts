type TdeeInput = {
  weightKg: number
  heightCm?: number | null
  age?: number | null
  sex?: "male" | "female" | "other"
  activityMultiplier?: number
}

export function estimateTdee({
  weightKg,
  heightCm,
  age,
  sex = "male",
  activityMultiplier = 1.5
}: TdeeInput) {
  const height = heightCm ?? 175
  const years = age ?? 30
  const sexOffset = sex === "female" ? -161 : 5
  const bmr = 10 * weightKg + 6.25 * height - 5 * years + sexOffset
  const tdee = Math.round(bmr * activityMultiplier)

  return {
    bmr: Math.round(bmr),
    tdee,
    confidenceInterval: [tdee - 200, tdee + 200] as const
  }
}
