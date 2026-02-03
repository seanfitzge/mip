import { SectionHeader } from "@/components/section-header"
import { Timeline } from "@/components/timeline"
import { Card, Container, SimpleGrid, Stack, Text, Title } from "@mantine/core"

const roadmapItems = [
  {
    title: "MVP (8-10 weeks)",
    subtitle: "Core tracking and manual workflows",
    details: [
      "Wearable integration via Terra API (Garmin, Oura, WHOOP, Apple Health)",
      "14-day baseline establishment workflow",
      "Evidence-based macro calculator with confidence levels",
      "Manual nutrition logging and core dashboard"
    ]
  },
  {
    title: "Phase 2: Intelligence Layer",
    subtitle: "Adaptive recommendations",
    details: [
      "Adaptive macro adjustments driven by HRV, RHR, and sleep",
      "Automated reverse diet protocol with weekly micro-adjustments",
      "Expanded research library (200+ papers) and GRADE badges",
      "Recovery assessment (RED-S screening) workflows"
    ]
  },
  {
    title: "Phase 3: ML & Personalization",
    subtitle: "Predictive metabolic modeling",
    details: [
      "Bayesian TDEE estimation with confidence bounds",
      "Metabolic state classifier and anomaly detection",
      "Timeline forecaster for reverse diet duration",
      "AI research assistant with RAG on study database"
    ]
  },
  {
    title: "Phase 4: Scale & Monetization",
    subtitle: "Team, mobile, and API expansion",
    details: [
      "Coach accounts and team management",
      "Mobile apps for daily check-ins",
      "Integration marketplace",
      "Exportable reports for athletes"
    ]
  }
]

const successCriteria = [
  {
    title: "MVP success criteria",
    items: [
      "Baseline completion workflow works end-to-end",
      "TDEE estimate within ±200 kcal by week 4",
      "HRV interventions trigger appropriately",
      "All recommendations include evidence citations"
    ]
  },
  {
    title: "Phase 2 success criteria",
    items: [
      "Adaptive recommendations deliver measurable recovery improvement",
      "Reverse diet protocol completes with <2 kg fat gain",
      "Research library engagement >5 minutes per week",
      "Wearable sync compliance >85%"
    ]
  }
]

const monetization = [
  {
    tier: "Free",
    details: "Basic tracking, 10 cited studies/month, formula-based TDEE."
  },
  {
    tier: "Pro ($19/mo)",
    details: "Unlimited research, adaptive recommendations, all wearables, Bayesian TDEE."
  },
  {
    tier: "Team ($79/mo)",
    details: "Coach + 10 athletes, shared protocols, team analytics."
  },
  {
    tier: "Enterprise",
    details: "Custom integrations, white-label, BAA, dedicated support."
  }
]

const implementationPriorities = [
  "Initialize Next.js 15 + TypeScript + Mantine v8 foundation",
  "Supabase setup with RLS and baseline schema migration",
  "Authentication (Clerk or NextAuth) with MFA support",
  "Terra API OAuth integration + baseline workflow",
  "Biometric intervention logic (HRV/RHR thresholds)",
  "Evidence-based macro calculator with citations"
]

export default function RoadmapPage() {
  return (
    <section className="section">
      <Container size="lg">
        <Stack gap="xl">
          <SectionHeader
            title="Development roadmap"
            subtitle="A staged build that prioritizes scientific accuracy and recovery outcomes."
          />
          <Timeline items={roadmapItems} />
          <SimpleGrid cols={{ base: 1, lg: 2 }}>
            {successCriteria.map((criteria) => (
              <Card key={criteria.title} withBorder radius="md" padding="lg">
                <Stack gap="sm">
                  <Title order={4}>{criteria.title}</Title>
                  <Stack gap={4}>
                    {criteria.items.map((item) => (
                      <Text key={item} size="sm" c="dimmed">
                        • {item}
                      </Text>
                    ))}
                  </Stack>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
          <Card withBorder radius="md" padding="lg">
            <Stack gap="sm">
              <Title order={4}>Monetization tiers</Title>
              <SimpleGrid cols={{ base: 1, md: 2 }}>
                {monetization.map((tier) => (
                  <Stack key={tier.tier} gap={4}>
                    <Text fw={600}>{tier.tier}</Text>
                    <Text size="sm" c="dimmed">
                      {tier.details}
                    </Text>
                  </Stack>
                ))}
              </SimpleGrid>
            </Stack>
          </Card>
          <Card withBorder radius="md" padding="lg">
            <Stack gap="sm">
              <Title order={4}>Implementation priorities</Title>
              {implementationPriorities.map((item) => (
                <Text key={item} size="sm" c="dimmed">
                  • {item}
                </Text>
              ))}
            </Stack>
          </Card>
        </Stack>
      </Container>
    </section>
  )
}
