import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import type { ResearchPaper } from "@/types/research"
import { ConfidenceBadge } from "@/components/confidence-badge"

type ResearchCitationProps = {
  paper: ResearchPaper
}

export function ResearchCitation({ paper }: ResearchCitationProps) {
  const readingLevel = paper.eli5Summary ? "Accessible" : "Technical"

  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{paper.title}</h3>
          <p className="text-xs text-mutedForeground">
            {paper.authors} ({paper.year}) · {paper.journal}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="muted">{paper.studyType}</Badge>
          <Badge variant="outline">Quality {paper.qualityRating}/5</Badge>
          <Badge variant="outline">{readingLevel}</Badge>
          <ConfidenceBadge level={paper.confidenceLevel} />
        </div>
        <p className="text-xs text-mutedForeground">
          Population: {paper.population} · Topics: {paper.topics.join(", ")}
        </p>
        {paper.eli5Summary ? (
          <div className="rounded-md bg-muted p-3 text-sm text-foreground">
            <p className="font-semibold text-foreground">Why this matters</p>
            <p className="text-sm text-mutedForeground">{paper.eli5Summary}</p>
          </div>
        ) : null}
        <div className="space-y-1 text-sm text-foreground">
          {paper.keyFindings.map((finding) => (
            <p key={finding}>• {finding}</p>
          ))}
        </div>
        <a
          href={`https://doi.org/${paper.doi}`}
          target="_blank"
          rel="noreferrer"
          className="text-xs font-semibold text-primary"
        >
          Read full study →
        </a>
      </div>
    </Card>
  )
}
