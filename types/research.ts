import type { EvidenceConfidence } from "@/types/evidence"

export type ResearchPaper = {
  id: string
  doi: string
  title: string
  authors: string
  journal: string
  year: number
  studyType: string
  population: string
  qualityRating: number
  confidenceLevel: EvidenceConfidence
  keyFindings: string[]
  eli5Summary?: string
  topics: string[]
}
