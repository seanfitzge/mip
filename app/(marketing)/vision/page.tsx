import { SectionHeader } from "@/components/section-header"
import { Card, Container, SimpleGrid, Stack, Table, Text, Title } from "@mantine/core"

const differentiators = [
  "GRADE-calibrated evidence confidence on every recommendation",
  "Validated biometric intervention thresholds (7.5% HRV decline, +5 bpm RHR)",
  "Reverse diet protocols with predicted timelines",
  "Implicit training status classification without questionnaires"
]

const revolutionary = [
  "First platform to adapt nutrition to real-time HRV/RHR recovery signals",
  "Every recommendation cited with GRADE quality indicators",
  "Reverse diet algorithms built for metabolic recovery, not just weight",
  "Bayesian TDEE estimation from longitudinal biometric data",
  "Implicit user categorization based on behavior, not forms"
]

const ethics = [
  "Sex-specific energy availability safeguards and RED-S screening",
  "Data ownership and export for every user",
  "Peer-reviewed sources with GRADE quality ratings",
  "Transparent limitations and uncertainty labeling"
]

const valueProps = [
  {
    title: "For individual athletes",
    bullets: [
      "Stop guessing if you are eating enough. Know with biometrics.",
      "See evidence confidence on every recommendation.",
      "Reverse diet without unnecessary fat gain.",
      "Optimize recovery, not just training."
    ]
  },
  {
    title: "For coaches",
    bullets: [
      "Monitor recovery metrics alongside nutrition adherence.",
      "Cite research when explaining protocols to clients.",
      "Automated adjustments between check-ins.",
      "Export reports for athlete reviews."
    ]
  },
  {
    title: "For researchers & students",
    bullets: [
      "Bridge theory with real-world application.",
      "Access 500+ studies with practical summaries.",
      "Opt-in anonymized data for research contributions.",
      "Track outcomes by evidence tier."
    ]
  }
]

const successMetrics = [
  "DAU/MAU ratio >0.30 and research engagement >5 min/week",
  "Wearable sync compliance >85%",
  "Reverse diet completion >70% with <2 kg fat gain",
  "NPS 50+ with free→pro conversion >15%"
]

const competitiveLandscape = [
  {
    feature: "Adaptive TDEE",
    mip: "Bayesian ±150 kcal",
    macrofactor: "Best-in-class",
    carbon: "Penalizes deviation",
    rpdiet: "Rigid",
    mfp: "Not available"
  },
  {
    feature: "Wearable integration",
    mip: "HRV/RHR nutrition linkage",
    macrofactor: "Limited (Fitbit)",
    carbon: "None",
    rpdiet: "None",
    mfp: "Basic steps"
  },
  {
    feature: "Evidence citations",
    mip: "GRADE confidence",
    macrofactor: "None",
    carbon: "None",
    rpdiet: "None",
    mfp: "None"
  },
  {
    feature: "RED-S screening",
    mip: "Implicit, supportive",
    macrofactor: "None",
    carbon: "None",
    rpdiet: "None",
    mfp: "None"
  },
  {
    feature: "Reverse diet protocol",
    mip: "Automated phases",
    macrofactor: "None",
    carbon: "None",
    rpdiet: "None",
    mfp: "None"
  }
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

          <Card withBorder radius="md" padding="lg">
            <Stack gap="sm">
              <Title order={4}>Why it&apos;s revolutionary</Title>
              <Stack gap={4}>
                {revolutionary.map((item) => (
                  <Text key={item} size="sm" c="dimmed">
                    • {item}
                  </Text>
                ))}
              </Stack>
            </Stack>
          </Card>

          <SimpleGrid cols={{ base: 1, md: 3 }}>
            {valueProps.map((section) => (
              <Card key={section.title} withBorder radius="md" padding="lg">
                <Stack gap="sm">
                  <Title order={4}>{section.title}</Title>
                  {section.bullets.map((item) => (
                    <Text key={item} size="sm" c="dimmed">
                      • {item}
                    </Text>
                  ))}
                </Stack>
              </Card>
            ))}
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

          <Card withBorder radius="md" padding="lg">
            <Stack gap="sm">
              <Title order={4}>Competitive landscape</Title>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Feature</Table.Th>
                    <Table.Th>MIP</Table.Th>
                    <Table.Th>MacroFactor</Table.Th>
                    <Table.Th>Carbon</Table.Th>
                    <Table.Th>RP Diet</Table.Th>
                    <Table.Th>MyFitnessPal</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {competitiveLandscape.map((row) => (
                    <Table.Tr key={row.feature}>
                      <Table.Td>{row.feature}</Table.Td>
                      <Table.Td>{row.mip}</Table.Td>
                      <Table.Td>{row.macrofactor}</Table.Td>
                      <Table.Td>{row.carbon}</Table.Td>
                      <Table.Td>{row.rpdiet}</Table.Td>
                      <Table.Td>{row.mfp}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </section>
  )
}
