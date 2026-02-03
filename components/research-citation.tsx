import { Badge, Card, Group, List, Stack, Text, Title } from "@mantine/core"
import type { ResearchPaper } from "@/types/research"
import { ConfidenceBadge } from "@/components/confidence-badge"

type ResearchCitationProps = {
  paper: ResearchPaper
}

export function ResearchCitation({ paper }: ResearchCitationProps) {
  return (
    <Card withBorder radius="md" padding="lg">
      <Stack gap="sm">
        <div>
          <Title order={5}>{paper.title}</Title>
          <Text size="xs" c="dimmed">
            {paper.authors} ({paper.year}) · {paper.journal}
          </Text>
        </div>
        <Group gap="xs">
          <Badge variant="light">{paper.studyType}</Badge>
          <Badge variant="outline">Quality {paper.qualityRating}/5</Badge>
          <ConfidenceBadge level={paper.confidenceLevel} />
        </Group>
        <Text size="xs" c="dimmed">
          Population: {paper.population} · Topics: {paper.topics.join(", ")}
        </Text>
        {paper.eli5Summary ? (
          <Text size="sm" c="dimmed">
            {paper.eli5Summary}
          </Text>
        ) : null}
        <List size="sm" spacing="xs">
          {paper.keyFindings.map((finding) => (
            <List.Item key={finding}>{finding}</List.Item>
          ))}
        </List>
        <Text
          component="a"
          href={`https://doi.org/${paper.doi}`}
          target="_blank"
          rel="noreferrer"
          size="xs"
          c="indigo.4"
        >
          Read full study
        </Text>
      </Stack>
    </Card>
  )
}
