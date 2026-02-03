import { SectionHeader } from "@/components/section-header"
import { Card, Container, SimpleGrid, Stack, Text, Title } from "@mantine/core"

const differentiators = [
  "GRADE-calibrated evidence confidence on every recommendation",
  "Validated biometric intervention thresholds (7.5% HRV decline, +5 bpm RHR)",
  "Reverse diet protocols with predicted timelines",
  "Implicit training status classification without questionnaires"
]

const ethics = [
  "Sex-specific energy availability safeguards and RED-S screening",
  "Data ownership and export for every user",
  "Peer-reviewed sources with GRADE quality ratings",
  "Transparent limitations and uncertainty labeling"
]

const successMetrics = [
  "DAU/MAU ratio and research library engagement",
  "Wearable sync compliance rate",
  "Reverse diet completion success",
  "NPS and conversion to Pro tier"
]

export default function VisionPage() {
  return (
    <section className="section">
      <Container size="lg">
        <Stack gap="xl">
          <Stack gap="sm">
            <Text size="sm" fw={600} tt="uppercase" c="dimmed">
              Executive Vision
            </Text>
            <Title order={1}>Fix the metabolic blind spot.</Title>
            <Text c="dimmed" maw={720}>
              Athletes can track calories and macros, but they cannot see how their
              metabolism is responding. MIP connects recovery biomarkers to
              evidence-based nutrition with confidence grading.
            </Text>
          </Stack>

          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Title order={4}>The problem</Title>
                <Text size="sm" c="dimmed">
                  • Recovery metrics are ignored or siloed.
                </Text>
                <Text size="sm" c="dimmed">
                  • Reverse dieting is trial-and-error.
                </Text>
                <Text size="sm" c="dimmed">
                  • Research is too dense to apply daily.
                </Text>
              </Stack>
            </Card>
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Title order={4}>The solution</Title>
                <Text size="sm" c="dimmed">
                  • Real-time metabolic insights from wearables.
                </Text>
                <Text size="sm" c="dimmed">
                  • Adaptive macro guidance with citations.
                </Text>
                <Text size="sm" c="dimmed">
                  • Predictive modeling for long-term planning.
                </Text>
              </Stack>
            </Card>
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, lg: 3 }}>
            <div>
              <SectionHeader
                title="Key differentiators"
                subtitle="Why MIP wins on trust and outcomes."
              />
              <Stack gap={4}>
                {differentiators.map((item) => (
                  <Text key={item} size="sm" c="dimmed">
                    • {item}
                  </Text>
                ))}
              </Stack>
            </div>
            <div>
              <SectionHeader
                title="Ethical guardrails"
                subtitle="Built to protect metabolic health."
              />
              <Stack gap={4}>
                {ethics.map((item) => (
                  <Text key={item} size="sm" c="dimmed">
                    • {item}
                  </Text>
                ))}
              </Stack>
            </div>
            <div>
              <SectionHeader
                title="Success metrics"
                subtitle="Signals we track as the platform scales."
              />
              <Stack gap={4}>
                {successMetrics.map((item) => (
                  <Text key={item} size="sm" c="dimmed">
                    • {item}
                  </Text>
                ))}
              </Stack>
            </div>
          </SimpleGrid>
        </Stack>
      </Container>
    </section>
  )
}
