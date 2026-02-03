import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ResearchPaper } from "@/types/research"

type ResearchCitationProps = {
  paper: ResearchPaper
}

export function ResearchCitation({ paper }: ResearchCitationProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{paper.title}</CardTitle>
        <p className="text-xs text-muted-foreground">
          {paper.authors} ({paper.year}) · {paper.journal}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{paper.studyType}</Badge>
          <Badge variant="muted">Quality: {paper.qualityRating}/5</Badge>
        </div>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {paper.keyFindings.map((finding) => (
            <li key={finding}>• {finding}</li>
          ))}
        </ul>
        <a
          className="text-xs text-primary underline"
          href={`https://doi.org/${paper.doi}`}
          target="_blank"
          rel="noreferrer"
        >
          Read full study
        </a>
      </CardContent>
    </Card>
  )
}
