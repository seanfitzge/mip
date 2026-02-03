type RedSInput = {
  sex: "male" | "female" | "other"
  energyAvailability: number
  daysBelowThreshold: number
  hrvBelowBaselinePercent?: number
  rhrAboveBaselineBpm?: number
}

export function assessRedSRisk({
  sex,
  energyAvailability,
  daysBelowThreshold,
  hrvBelowBaselinePercent = 0,
  rhrAboveBaselineBpm = 0
}: RedSInput) {
  const clinicalThreshold = sex === "female" ? 30 : 25
  const subclinicalThreshold = sex === "female" ? 45 : 40
  const timeToConcern = sex === "female" ? 5 : 14

  let risk: "low" | "moderate" | "high" = "low"
  if (energyAvailability < clinicalThreshold && daysBelowThreshold >= timeToConcern) {
    risk = "high"
  } else if (energyAvailability < subclinicalThreshold) {
    risk = "moderate"
  }

  const cssdReferralRecommended = risk === "high"
  const intervention =
    risk === "high" ? "calorie_increase" : risk === "moderate" ? "monitoring" : "none"

  return {
    risk,
    cssdReferralRecommended,
    intervention,
    hrvBelowBaselinePercent,
    rhrAboveBaselineBpm
  }
}
