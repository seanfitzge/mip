import { SectionHeader } from "@/components/section-header"
import { Card, Container, SimpleGrid, Stack, Text, Title } from "@mantine/core"

const frontendStack = [
  "Next.js 15 (App Router) with TypeScript",
  "Mantine v8 UI components + @mantine/charts",
  "Tailwind CSS utilities for layout + spacing",
  "Default dark mode with high-contrast text"
]

const backendStack = [
  "Node.js + Express with API versioning (/api/v1/...)",
  "Supabase PostgreSQL with Row Level Security (RLS)",
  "MongoDB for research papers and summaries",
  "Redis caching for wearable API calls"
]

const wearableStack = [
  "Terra API unified wearable aggregator",
  "Coverage: Apple Health, Garmin, Fitbit, Oura, WHOOP, Eight Sleep",
  "Webhook-driven ingestion for real-time updates",
  "Fallback direct integrations for unsupported devices"
]

const complianceChecklist = [
  "Encrypted data at rest (AES-256) and in transit (TLS 1.3)",
  "MFA for all admin accounts and audit logging",
  "Point-in-time recovery (PITR) and automated backups",
  "Business Associate Agreements with providers"
]

const designPrinciples = [
  "Progressive disclosure: 14-day calibration before advanced metrics",
  "Accessibility: 4.5:1 text contrast, icons for color states",
  "Gamification: habit streaks with intrinsic motivation handoff",
  "Color system: green/amber/red with ✓/⚠ indicators",
  "Typography: system stack or Inter, monospace for numeric data"
]

const databaseTables = [
  "users, biometrics, nutrition_logs, daily_nutrition_summary",
  "weight_logs, macro_targets, reverse_diet_protocols",
  "tdee_estimates, research_papers, red_s_assessments",
  "user_behavior_patterns, intervention_logs"
]

const apiGroups = [
  {
    title: "Biometrics",
    endpoints: [
      "GET /api/v1/biometrics/daily",
      "GET /api/v1/biometrics/trends",
      "GET /api/v1/biometrics/recovery-score",
      "POST /api/v1/biometrics/baseline"
    ]
  },
  {
    title: "Nutrition",
    endpoints: [
      "POST /api/v1/nutrition/calculate-targets",
      "POST /api/v1/nutrition/log-meal",
      "GET /api/v1/nutrition/recommendations",
      "GET /api/v1/nutrition/targets/history"
    ]
  },
  {
    title: "Research",
    endpoints: [
      "GET /api/v1/research/studies",
      "GET /api/v1/research/study/:doi",
      "GET /api/v1/research/topic/:name",
      "GET /api/v1/research/updates"
    ]
  },
  {
    title: "Protocol",
    endpoints: [
      "POST /api/v1/protocol/reverse-diet/start",
      "GET /api/v1/protocol/reverse-diet/status",
      "POST /api/v1/protocol/reverse-diet/update",
      "GET /api/v1/protocol/reverse-diet/timeline"
    ]
  },
  {
    title: "ML + Safety",
    endpoints: [
      "POST /api/v1/ml/predict-tdee",
      "POST /api/v1/ml/predict-timeline",
      "GET /api/v1/ml/insights",
      "GET /api/v1/safety/red-s-risk"
    ]
  }
]

export default function ArchitecturePage() {
  return (
    <section className="section">
      <Container size="lg">
        <Stack gap="xl">
          <SectionHeader
            title="Technical architecture"
            subtitle="A HIPAA-ready, evidence-first platform built for recovery-informed nutrition."
          />
          <SimpleGrid cols={{ base: 1, lg: 2 }}>
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Title order={4}>Frontend</Title>
                {frontendStack.map((item) => (
                  <Text key={item} size="sm" c="dimmed">
                    • {item}
                  </Text>
                ))}
              </Stack>
            </Card>
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Title order={4}>Backend & data</Title>
                {backendStack.map((item) => (
                  <Text key={item} size="sm" c="dimmed">
                    • {item}
                  </Text>
                ))}
              </Stack>
            </Card>
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, lg: 2 }}>
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Title order={4}>Wearable integration</Title>
                {wearableStack.map((item) => (
                  <Text key={item} size="sm" c="dimmed">
                    • {item}
                  </Text>
                ))}
              </Stack>
            </Card>
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Title order={4}>Compliance checklist</Title>
                {complianceChecklist.map((item) => (
                  <Text key={item} size="sm" c="dimmed">
                    • {item}
                  </Text>
                ))}
              </Stack>
            </Card>
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, lg: 2 }}>
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Title order={4}>Design principles</Title>
                {designPrinciples.map((item) => (
                  <Text key={item} size="sm" c="dimmed">
                    • {item}
                  </Text>
                ))}
              </Stack>
            </Card>
            <Card withBorder radius="md" padding="lg">
              <Stack gap="sm">
                <Title order={4}>Database schema highlights</Title>
                {databaseTables.map((item) => (
                  <Text key={item} size="sm" c="dimmed">
                    • {item}
                  </Text>
                ))}
              </Stack>
            </Card>
          </SimpleGrid>

          <div>
            <SectionHeader
              title="API surface (v1)"
              subtitle="Versioned endpoints for biometrics, nutrition, research, and safety."
            />
            <SimpleGrid cols={{ base: 1, md: 2, xl: 3 }}>
              {apiGroups.map((group) => (
                <Card key={group.title} withBorder radius="md" padding="lg">
                  <Stack gap="sm">
                    <Title order={5}>{group.title}</Title>
                    {group.endpoints.map((endpoint) => (
                      <Text key={endpoint} size="sm" c="dimmed">
                        {endpoint}
                      </Text>
                    ))}
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </div>
        </Stack>
      </Container>
    </section>
  )
}
