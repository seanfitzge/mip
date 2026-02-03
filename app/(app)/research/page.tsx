import { getResearchPapers } from "@/lib/data/research"
import { SectionHeader } from "@/components/section-header"
import { Input } from "@/components/ui/input"
import { ResearchCitation } from "@/components/research-citation"

export default async function ResearchPage() {
  const papers = await getResearchPapers()

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Research library"
        subtitle="Searchable studies with practical takeaways and citations."
      />
      <div className="max-w-md">
        <Input placeholder="Search studies, topics, or DOI..." />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {papers.map((paper) => (
          <ResearchCitation key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  )
}
