import { getResearchPapers } from "@/lib/data/research"
import { SectionHeader } from "@/components/section-header"
import { ResearchCitation } from "@/components/research-citation"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { Card, SimpleGrid, Stack, Text, TextInput, Title } from "@mantine/core"

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
    <Stack gap="xl">
      <SectionHeader
        title="Research library"
        subtitle="Searchable studies with practical takeaways and citations."
      />
      <div style={{ maxWidth: 420 }}>
        <TextInput placeholder="Search studies, topics, or DOI..." />
      </div>
      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>Core topics</Title>
            {topics.map((topic) => (
              <Text key={topic} size="sm" c="dimmed">
                • {topic}
              </Text>
            ))}
          </Stack>
        </Card>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>Evidence confidence legend</Title>
            <Stack gap={6}>
              <ConfidenceBadge level="STRONG" />
              <ConfidenceBadge level="MODERATE" />
              <ConfidenceBadge level="PRELIMINARY" />
              <ConfidenceBadge level="LIMITED" />
            </Stack>
          </Stack>
        </Card>
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        {papers.map((paper) => (
          <ResearchCitation key={paper.id} paper={paper} />
        ))}
      </SimpleGrid>
      <Card withBorder radius="md" padding="lg">
        <Stack gap="sm">
          <Title order={4}>Myth-busting highlights</Title>
          {myths.map((myth) => (
            <Text key={myth} size="sm" c="dimmed">
              • {myth}
            </Text>
          ))}
        </Stack>
      </Card>
    </Stack>
  )
}
