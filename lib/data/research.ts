import { mockResearchPapers } from "@/lib/mock-data"
import { createSupabaseServerClient, getServerSession } from "@/lib/supabase/server"
import type { ResearchPaper } from "@/types/research"

export async function getResearchPapers(): Promise<ResearchPaper[]> {
  const session = await getServerSession()
  if (!session) {
    return mockResearchPapers
  }
  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    return mockResearchPapers
  }

  const { data } = await supabase
    .from("research_papers")
    .select("*")
    .order("year", { ascending: false })
    .limit(50)

  if (!data || data.length === 0) {
    return mockResearchPapers
  }

  return data.map((row) => ({
    id: row.id,
    doi: row.doi,
    title: row.title,
    authors: row.authors ?? "",
    journal: row.journal ?? "",
    year: row.year ?? 0,
    studyType: row.study_type ?? "",
    population: row.population ?? "",
    qualityRating: row.quality_rating ?? 0,
    confidenceLevel: row.confidence_level ?? "MODERATE",
    keyFindings: row.key_findings ?? [],
    eli5Summary: row.eli5_summary ?? "",
    topics: row.topics ?? []
  }))
}
