import { getResearchPapers } from "@/lib/data/research"
import { SectionHeader } from "@/components/section-header"
import { ResearchCitation } from "@/components/research-citation"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

const topics = [
  "Protein requirements",
  "Carbohydrate periodization",
  "Energy availability & RED-S",
  "Reverse dieting protocols",
  "Nutrient timing",
  "Sleep & recovery"
]

const myths = [
  "You need protein within 30 minutes post-workout — FALSE (4-6 hour window).",
  "More than 30g protein per meal is wasted — FALSE (0.4 g/kg per meal).",
  "You need 6 meals a day to stoke metabolism — FALSE (total intake matters).",
  "Eating carbs at night makes you fat — FALSE (context + total calories).",
  "Metabolic damage is permanent — OVERSTATED (recovery possible)."
]

export default async function ResearchPage() {
  const papers = await getResearchPapers()

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Research library"
        subtitle="Searchable studies with practical takeaways and citations."
      />
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-full max-w-md">
          <Input placeholder="Search studies, topics, or DOI..." aria-label="Search studies" />
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", "Protein", "Sleep", "HRV", "Metabolism", "Training"].map((filter) => (
            <button
              key={filter}
              className="rounded-full border border-border px-3 py-1 text-xs font-semibold text-mutedForeground hover:bg-muted hover:text-foreground"
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Core topics</h3>
            {topics.map((topic) => (
              <p key={topic} className="text-sm text-mutedForeground">
                • {topic}
              </p>
            ))}
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Evidence confidence legend</h3>
            <div className="flex flex-wrap gap-2">
              <ConfidenceBadge level="STRONG" />
              <ConfidenceBadge level="MODERATE" />
              <ConfidenceBadge level="PRELIMINARY" />
              <ConfidenceBadge level="LIMITED" />
            </div>
          </div>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {papers.map((paper) => (
          <ResearchCitation key={paper.id} paper={paper} />
        ))}
      </div>
      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Myth-busting highlights</h3>
          {myths.map((myth) => (
            <p key={myth} className="text-sm text-mutedForeground">
              • {myth}
            </p>
          ))}
        </div>
      </Card>
    </div>
  )
}
