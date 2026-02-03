import type { EvidenceConfidence } from "@/types/evidence"

export type MacroTargets = {
  calories: number
  proteinG: number
  carbsG: number
  fatG: number
  adjustmentReason?: string
  confidenceLevel: EvidenceConfidence
  proteinCitationDoi: string
  carbCitationDoi: string
  fatCitationDoi: string
}
