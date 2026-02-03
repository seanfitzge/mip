import type { EvidenceConfidence } from "@/types/evidence"

export type ReverseDietPhase = {
  name: string
  duration: string
  focus: string[]
  confidenceLevel: EvidenceConfidence
}

export type ReverseDietProtocol = {
  currentPhase: string
  weeklyIncreaseKcal: number
  targetCalories: number
  currentWeek: number
  predictedEndDate: string
  phases: ReverseDietPhase[]
}
