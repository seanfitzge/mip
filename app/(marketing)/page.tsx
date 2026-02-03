"use client"

import Link from "next/link"
import { SectionHeader } from "@/components/section-header"
import { Button, Card, Container, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core"

const featureCards = [
  {
    title: "Biometric Integration Engine",
    description:
      "Terra API coverage across major wearables with validated HRV and RHR thresholds."
  },
  {
    title: "Evidence-Based Recommendations",
    description: "GRADE-calibrated confidence indicators on every recommendation."
  },
  {
    title: "Reverse Diet Intelligence",
    description: "Phase-based protocol with timeline prediction and biometric pacing."
  }
]

const valueProps = [
  "Know if you are eating enough with biometric context.",
  "See evidence confidence on every recommendation.",
  "Recover metabolism without unnecessary fat gain."
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
                  Metabolic Intelligence Platform
                </Text>
                <Title order={1}>Evidence-based nutrition, powered by your biometrics.</Title>
                <Text c="dimmed">
                  A metabolic decision system that adapts nutrition to recovery,
                  training load, and real-world physiology with validated thresholds.
                </Text>
              </Stack>
              <Group>
                <Button>Request early access</Button>
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
          <SimpleGrid cols={{ base: 1, md: 3 }}>
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
                title="Technical foundation"
                subtitle="Designed for a long-term product roadmap."
              />
              <Stack gap={4}>
                <Text size="sm" c="dimmed">
                  • Next.js 15 + TypeScript + Mantine
                </Text>
                <Text size="sm" c="dimmed">
                  • Supabase-ready data layer and auth paths
                </Text>
                <Text size="sm" c="dimmed">
                  • Research citation engine with GRADE confidence
                </Text>
                <Text size="sm" c="dimmed">
                  • Terra API wearable coverage (Garmin, Oura, WHOOP)
                </Text>
              </Stack>
            </Stack>
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Title order={4}>Target outcomes</Title>
                <Text size="sm" c="dimmed">
                  • ±150 kcal TDEE accuracy after 4 weeks of data
                </Text>
                <Text size="sm" c="dimmed">
                  • Reverse diet success with minimal fat gain
                </Text>
                <Text size="sm" c="dimmed">
                  • Higher research engagement through clear summaries
                </Text>
              </Stack>
            </Card>
          </SimpleGrid>
        </Container>
      </section>
    </>
  )
}
