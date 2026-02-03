"use client"

import Link from "next/link"
import { SectionHeader } from "@/components/section-header"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { Button, Card, Container, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core"

const featureCards = [
  {
    title: "Biometric Integration Engine",
    description:
      "Terra API wearable aggregation with HRV/RHR baselines and device accuracy metadata."
  },
  {
    title: "Evidence-Based Recommendation Engine",
    description: "Every guidance item includes GRADE-calibrated confidence levels and citations."
  },
  {
    title: "Adaptive Nutrition Calculator",
    description: "Macro targets update from recovery biomarkers and training load signals."
  },
  {
    title: "Intelligent Reverse Diet Protocol",
    description: "Phase-based pacing with water-weight expectations and timeline forecasts."
  },
  {
    title: "Predictive Metabolic Modeling",
    description: "Bayesian TDEE estimation and adaptation detection from longitudinal data."
  },
  {
    title: "Implicit User Categorization",
    description: "Training status inferred from behavior without questionnaires."
  },
  {
    title: "Research Library & Education Hub",
    description: "500+ papers with “Explain Like I’m A Lifter” summaries."
  },
  {
    title: "Recovery Assessment (RED-S)",
    description: "Soft screening and referral pathways with non-pathologizing language."
  }
]

const valueProps = [
  "Stop guessing if you are eating enough. Know with biometrics.",
  "Every recommendation cites peer-reviewed evidence with confidence.",
  "Reverse diet without unnecessary fat gain or metabolic drag."
]

const interventionTriggers = [
  {
    title: "HRV intervention trigger",
    details: [
      "7-day RMSSD decline ≥7.5% from baseline or 0.5 SD below baseline.",
      "Action: +5-10% calories (carb priority) and reduce training intensity."
    ]
  },
  {
    title: "RHR intervention trigger",
    details: [
      "RHR ≥5 bpm above baseline for 2+ consecutive days.",
      "Action: combine with HRV signal to prioritize recovery."
    ]
  },
  {
    title: "Sleep quality trigger",
    details: [
      "Sleep score <70 for 3+ nights.",
      "Action: shift 20-30 g carbs to evening meals and reduce load."
    ]
  }
]

const evidenceExamples = [
  {
    recommendation: "Increase protein to 2.4 g/kg during deficit.",
    source: "Helms et al. (2014) · 2.3-3.1 g/kg FFM optimal in lean athletes.",
    confidence: "STRONG" as const
  },
  {
    recommendation: "Shift carbs to evening when sleep quality is low.",
    source: "Afaghi et al. (2007) · High-GI carbs improved sleep onset.",
    confidence: "MODERATE" as const
  }
]

const keyPages = [
  "Dashboard: Recovery grade, macro targets, and alerts",
  "Nutrition: Adaptive macros, logging, and evidence citations",
  "Biometrics: HRV/RHR trends with personal baselines",
  "Research Library: GRADE-labeled studies and summaries",
  "Protocol Manager: Reverse diet phase tracker",
  "Progress: Weight trends, body comp, and performance notes"
]

export default function HomePage() {
  return (
    <>
      <section className="section">
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
            <Stack gap="lg">
              <Stack gap="xs">
                <Text size="sm" fw={600} tt="uppercase" c="dimmed">
                  Metabolic Intelligence Platform · Version 2.0
                </Text>
                <Title order={1}>
                  Evidence-based nutrition, powered by real-time recovery biomarkers.
                </Title>
                <Text c="dimmed">
                  A metabolic intelligence system that connects HRV, RHR, sleep, and
                  training load with research-cited recommendations and adaptive macro targets.
                </Text>
              </Stack>
              <Group>
                <Button component={Link} href="/dashboard">
                  Request early access
                </Button>
                <Button component={Link} href="/dashboard" variant="light">
                  View product preview
                </Button>
              </Group>
              <Stack gap={4}>
                {valueProps.map((value) => (
                  <Text key={value} size="sm" c="dimmed">
                    • {value}
                  </Text>
                ))}
              </Stack>
            </Stack>
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Title order={4}>Today&apos;s Metabolic Snapshot</Title>
                <Text size="sm" c="dimmed">
                  Recovery up, stress down. Continue reverse diet progression.
                </Text>
                <SimpleGrid cols={2}>
                  <Stack gap={2}>
                    <Text size="xs" c="dimmed">
                      HRV
                    </Text>
                    <Text fw={600} size="xl">
                      68 ms
                    </Text>
                  </Stack>
                  <Stack gap={2}>
                    <Text size="xs" c="dimmed">
                      RHR
                    </Text>
                    <Text fw={600} size="xl">
                      54 bpm
                    </Text>
                  </Stack>
                  <Stack gap={2}>
                    <Text size="xs" c="dimmed">
                      Sleep
                    </Text>
                    <Text fw={600} size="xl">
                      7.4 hrs
                    </Text>
                  </Stack>
                  <Stack gap={2}>
                    <Text size="xs" c="dimmed">
                      Recovery grade
                    </Text>
                    <Text fw={600} size="xl">
                      Good
                    </Text>
                  </Stack>
                </SimpleGrid>
                <Card withBorder radius="md" padding="sm">
                  <Text size="sm" c="dimmed">
                    Evidence note: Pre-sleep carbohydrate timing may improve sleep
                    onset in athletes (moderate confidence).
                  </Text>
                </Card>
              </Stack>
            </Card>
          </SimpleGrid>
        </Container>
      </section>

      <section className="section bg-muted/30">
        <Container size="lg">
          <SectionHeader
            title="Core System Pillars"
            subtitle="Built for serious athletes who need actionable, cited guidance."
          />
          <SimpleGrid cols={{ base: 1, md: 2, xl: 4 }}>
            {featureCards.map((feature) => (
              <Card key={feature.title} withBorder radius="md" padding="lg">
                <Stack gap="xs">
                  <Title order={4}>{feature.title}</Title>
                  <Text size="sm" c="dimmed">
                    {feature.description}
                  </Text>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </section>

      <section className="section">
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
            <Stack gap="sm">
              <SectionHeader
                title="Validated intervention thresholds"
                subtitle="Multi-biomarker triggers with clear action steps."
              />
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                {interventionTriggers.map((trigger) => (
                  <Card key={trigger.title} withBorder radius="md" padding="lg">
                    <Stack gap="xs">
                      <Title order={5}>{trigger.title}</Title>
                      {trigger.details.map((detail) => (
                        <Text key={detail} size="sm" c="dimmed">
                          • {detail}
                        </Text>
                      ))}
                    </Stack>
                  </Card>
                ))}
              </SimpleGrid>
            </Stack>
            <Stack gap="sm">
              <SectionHeader
                title="Evidence-backed recommendations"
                subtitle="Every change shows confidence, citation, and why."
              />
              <Stack gap="md">
                {evidenceExamples.map((example) => (
                  <Card key={example.recommendation} withBorder radius="md" padding="lg">
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Title order={5}>{example.recommendation}</Title>
                        <ConfidenceBadge level={example.confidence} />
                      </Group>
                      <Text size="sm" c="dimmed">
                        {example.source}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </section>

      <section className="section bg-muted/30">
        <Container size="lg">
          <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
            <Stack gap="sm">
              <SectionHeader
                title="Key product experiences"
                subtitle="Six views that cover recovery, nutrition, and research."
              />
              <Stack gap={4}>
                {keyPages.map((item) => (
                  <Text key={item} size="sm" c="dimmed">
                    • {item}
                  </Text>
                ))}
              </Stack>
            </Stack>
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Title order={4}>Technical foundation</Title>
                <Text size="sm" c="dimmed">
                  • Next.js 15 + TypeScript + Mantine UI
                </Text>
                <Text size="sm" c="dimmed">
                  • Supabase-ready data layer with RLS and PITR
                </Text>
                <Text size="sm" c="dimmed">
                  • Terra API wearable coverage + fallback integrations
                </Text>
                <Text size="sm" c="dimmed">
                  • Research citation engine with GRADE confidence
                </Text>
              </Stack>
            </Card>
          </SimpleGrid>
        </Container>
      </section>

      <section className="section">
        <Container size="lg">
          <Card withBorder radius="md" padding="xl">
            <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="xl">
              <Stack gap="sm">
                <Title order={3}>Target outcomes</Title>
                <Text size="sm" c="dimmed">
                  • ±150 kcal TDEE accuracy after 4 weeks of data
                </Text>
                <Text size="sm" c="dimmed">
                  • Reverse diet success with &lt;2 kg fat gain over 12 weeks
                </Text>
                <Text size="sm" c="dimmed">
                  • HRV recovery to baseline within 8 weeks
                </Text>
              </Stack>
              <Stack gap="sm">
                <Title order={3}>Built for trust</Title>
                <Text size="sm" c="dimmed">
                  • GRADE confidence indicators on every recommendation
                </Text>
                <Text size="sm" c="dimmed">
                  • RED-S screening with supportive language and referrals
                </Text>
                <Text size="sm" c="dimmed">
                  • HIPAA-focused architecture (encryption, audit logging, RLS)
                </Text>
              </Stack>
            </SimpleGrid>
          </Card>
        </Container>
      </section>
    </>
  )
}
