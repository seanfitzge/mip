import type { MacroTargets } from "@/types/macros"
import type { UserProfile } from "@/types/user"
import type { DietPhaseInfo } from "@/components/nutrition/diet-phase-questionnaire"

type MacroInputs = {
  user: UserProfile
  weightKg: number
  bodyFatPercent?: number | null
  trainingType?: "strength" | "mixed" | "endurance" | "low_volume"
  caloriesOverride?: number | null
  dietPhaseInfo?: DietPhaseInfo
}

const DEFAULT_CITATIONS = {
  protein: "10.1136/bjsports-2017-097608",
  carbs: "10.1249/MSS.0000000000000852",
  fat: "10.1016/j.jsbmb.2021.105948"
}

export function calculateMacroTargets({
  user,
  weightKg,
  bodyFatPercent,
  trainingType = "mixed",
  caloriesOverride,
  dietPhaseInfo
}: MacroInputs): MacroTargets {
  // Use diet phase info if provided, otherwise fall back to user goal
  const goal = dietPhaseInfo?.phase ?? user.goal
  
  let proteinPerKg = 1.9
  if (goal === "deficit") {
    // Higher protein for lean individuals in deficit
    if (bodyFatPercent !== null && bodyFatPercent !== undefined && bodyFatPercent < 15) {
      proteinPerKg = 2.5
    } else {
      proteinPerKg = 2.2
    }
    // Adjust based on deficit depth if available
    if (dietPhaseInfo?.deficitDepth === "extreme") {
      proteinPerKg = Math.max(proteinPerKg, 2.4) // Higher protein for extreme deficits
    }
  } else if (goal === "bulk") {
    proteinPerKg = 1.8
  } else if (goal === "reverse_diet") {
    // Higher protein during reverse diet to support recovery
    proteinPerKg = 2.0
    // If coming from a severe/extreme deficit, maintain higher protein
    if (dietPhaseInfo?.deficitDepth === "severe" || dietPhaseInfo?.deficitDepth === "extreme") {
      proteinPerKg = 2.2
    }
  } else if (goal === "maintenance" || goal === "performance") {
    proteinPerKg = 1.8
  }

  let carbsPerKg = 5
  if (trainingType === "strength") carbsPerKg = 4
  if (trainingType === "low_volume") carbsPerKg = 3.5
  if (trainingType === "endurance") carbsPerKg = 7

  const calories = caloriesOverride ?? Math.round(weightKg * 33)
  const proteinG = Math.round(proteinPerKg * weightKg)
  const carbsG = Math.round(carbsPerKg * weightKg)
  const fatCalories = Math.max(calories * 0.22, calories - proteinG * 4 - carbsG * 4)
  const fatG = Math.max(40, Math.round(fatCalories / 9))

  let adjustmentReason = "Evidence-based macros calculated from training and goal."
  
  if (goal === "reverse_diet") {
    if (dietPhaseInfo?.deficitDurationWeeks) {
      adjustmentReason = `Reverse diet protocol: ${dietPhaseInfo.deficitDurationWeeks} weeks in deficit, ${dietPhaseInfo.deficitDepth ?? "moderate"} depth. Prioritizing metabolic recovery.`
    } else {
      adjustmentReason = "Reverse diet progression based on recovery metrics."
    }
  } else if (goal === "deficit") {
    if (dietPhaseInfo?.deficitDepth) {
      adjustmentReason = `${dietPhaseInfo.deficitDepth.charAt(0).toUpperCase() + dietPhaseInfo.deficitDepth.slice(1)} deficit protocol. Higher protein to preserve lean mass.`
    } else {
      adjustmentReason = "Deficit protocol: Higher protein to preserve lean mass during calorie restriction."
    }
  }

  return {
    calories,
    proteinG,
    carbsG,
    fatG,
    adjustmentReason,
    confidenceLevel: "STRONG",
    proteinCitationDoi: DEFAULT_CITATIONS.protein,
    carbCitationDoi: DEFAULT_CITATIONS.carbs,
    fatCitationDoi: DEFAULT_CITATIONS.fat
  }
}
