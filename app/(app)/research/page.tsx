import { getResearchPapers } from "@/lib/data/research"
import { SectionHeader } from "@/components/section-header"
import { ResearchCitation } from "@/components/research-citation"
import { SimpleGrid, Stack, TextInput } from "@mantine/core"

export default async function ResearchPage() {
  const papers = await getResearchPapers()

  return (
    <Stack gap="xl">
      <SectionHeader
        title="Research library"
        subtitle="Searchable studies with practical takeaways and citations."
      />
      <div style={{ maxWidth: 420 }}>
        <TextInput placeholder="Search studies, topics, or DOI..." />
      </div>
      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        {papers.map((paper) => (
          <ResearchCitation key={paper.id} paper={paper} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
