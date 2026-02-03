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
  keyFindings: string[]
  topics: string[]
}
