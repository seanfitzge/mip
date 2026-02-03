import type { ReverseDietPhase, ReverseDietProtocol } from "@/types/protocol"

const PHASES: ReverseDietPhase[] = [
  {
    name: "Stabilization",
    duration: "Weeks 1-2",
    focus: ["Hold deficit for glycogen normalization", "Monitor HRV and RHR stability"],
    confidenceLevel: "STRONG"
  },
  {
    name: "Initial Raise",
    duration: "Weeks 3-6",
    focus: ["Increase calories +100-150 per week", "Prioritize carbohydrate increases"],
    confidenceLevel: "MODERATE"
  },
  {
    name: "Continued Progression",
    duration: "Weeks 6-12",
    focus: ["Continue weekly increases", "Adjust pacing from biometric response"],
    confidenceLevel: "MODERATE"
  },
  {
    name: "Metabolic Normalization",
    duration: "Weeks 12-24",
    focus: ["Maintain at new maintenance", "Track HRV and recovery normalization"],
    confidenceLevel: "STRONG"
  }
]

export function buildReverseDietProtocol(params: {
  currentWeek: number
  targetCalories: number
  weeklyIncreaseKcal: number
  predictedEndDate: string
}): ReverseDietProtocol {
  const { currentWeek, targetCalories, weeklyIncreaseKcal, predictedEndDate } = params
  const currentPhase =
    currentWeek <= 2
      ? "Stabilization"
      : currentWeek <= 6
      ? "Initial Raise"
      : currentWeek <= 12
      ? "Continued Progression"
      : "Metabolic Normalization"

  return {
    currentPhase,
    weeklyIncreaseKcal,
    targetCalories,
    currentWeek,
    predictedEndDate,
    phases: PHASES
  }
}
