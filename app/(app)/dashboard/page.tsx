import { getBiometricsSummary, getBiometricsTrend } from "@/lib/data/biometrics"
import { getMacroTargets } from "@/lib/data/macros"
import { getResearchPapers } from "@/lib/data/research"
import { getCurrentUser } from "@/lib/data/user"
import { SectionHeader } from "@/components/section-header"
import { StatCard } from "@/components/stat-card"
import { MiniLineChart } from "@/components/charts/mini-line-chart"
import { BaselineStatusCard } from "@/components/baseline-status-card"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { InterventionAlert } from "@/components/intervention-alert"
import { Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core"

export default async function DashboardPage() {
  const biometrics = await getBiometricsSummary()
  const trend = await getBiometricsTrend()
  const macros = await getMacroTargets()
  const research = await getResearchPapers()
  const user = await getCurrentUser()

  const recoveryIcon = biometrics.recoveryGrade === "optimal" ? "✓" : biometrics.recoveryGrade === "good" ? "✓" : "⚠"

  return (
    <Stack gap="xl">
      <SectionHeader
        title="Daily snapshot"
        subtitle="Biometric recovery signals and adaptive nutrition targets."
      />
      <SimpleGrid cols={{ base: 1, md: 2, xl: 4 }}>
        <StatCard title="HRV" value={`${biometrics.hrvMs} ms`} description="Parasympathetic recovery" />
        <StatCard title="RHR" value={`${biometrics.restingHrBpm} bpm`} description="Metabolic stress marker" />
        <StatCard title="Sleep" value={`${biometrics.sleepDurationHours} hrs`} description="Last night duration" />
        <StatCard title="Readiness" value={`${biometrics.readinessScore}%`} description="Overall recovery score" />
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Group justify="space-between">
              <Title order={4}>Recovery grade</Title>
              <Text size="sm" c="dimmed">
                {recoveryIcon} {biometrics.recoveryGrade.toUpperCase()}
              </Text>
            </Group>
            <Text size="sm" c="dimmed">
              Baseline HRV {biometrics.hrvBaselineMean} ± {biometrics.hrvBaselineSd} ms ·
              RHR baseline {biometrics.rhrBaselineMean} bpm.
            </Text>
            <Text size="sm" c="dimmed">
              Device accuracy: {biometrics.sourceDevice} (CCC {biometrics.deviceAccuracyCcc})
            </Text>
          </Stack>
        </Card>
        <BaselineStatusCard
          daysComplete={biometrics.baselineDaysComplete}
          daysRequired={biometrics.baselineDaysRequired}
          established={biometrics.baselineEstablished}
        />
      </SimpleGrid>

      <InterventionAlert
        title="Recovery intervention triggered"
        details={[
          "HRV trend below baseline threshold.",
          "RHR elevated above baseline for two days.",
          "Increase calories 5-10% (carbohydrate priority).",
          "Reduce training intensity for 48-72 hours."
        ]}
        active={biometrics.interventionTriggered}
      />

      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>7-day recovery trend</Title>
            <MiniLineChart
              points={trend.map((item) => item.hrvMs)}
              ariaLabel="Seven day HRV recovery trend chart"
            />
            <SimpleGrid cols={3}>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Average HRV
                </Text>
                <Text fw={600}>67 ms</Text>
              </Stack>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Average RHR
                </Text>
                <Text fw={600}>55 bpm</Text>
              </Stack>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Sleep quality
                </Text>
                <Text fw={600}>79/100</Text>
              </Stack>
            </SimpleGrid>
          </Stack>
        </Card>

        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Group justify="space-between">
              <Title order={4}>Today&apos;s macro targets</Title>
              <ConfidenceBadge level={macros.confidenceLevel} />
            </Group>
            <Text fw={600} size="xl">
              {macros.calories} kcal
            </Text>
            <SimpleGrid cols={3}>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Protein
                </Text>
                <Text fw={600}>{macros.proteinG} g</Text>
              </Stack>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Carbs
                </Text>
                <Text fw={600}>{macros.carbsG} g</Text>
              </Stack>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Fat
                </Text>
                <Text fw={600}>{macros.fatG} g</Text>
              </Stack>
            </SimpleGrid>
            <Text size="sm" c="dimmed">
              {macros.adjustmentReason}
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>User category snapshot</Title>
            <Text size="sm" c="dimmed">
              Training status: {user.userCategory}
            </Text>
            <Text size="sm" c="dimmed">
              Goal: {user.goal.replaceAll("_", " ")} · Sport: {user.sport}
            </Text>
            <Text size="sm" c="dimmed">
              Metabolic flexibility score: {user.metabolicFlexibilityScore}
            </Text>
          </Stack>
        </Card>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>Energy availability guardrail</Title>
            <Text size="sm" c="dimmed">
              Clinical threshold: &lt;30 kcal/kg FFM (female), &lt;25 kcal/kg FFM (male).
            </Text>
            <Text size="sm" c="dimmed">
              Subclinical threshold: &lt;45 kcal/kg FFM (female), &lt;40 kcal/kg FFM (male).
            </Text>
            <Text size="sm" c="dimmed">
              Current status: monitor recovery metrics and maintain intake increases.
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>

      <Card withBorder radius="md" padding="lg">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={4}>Research highlight</Title>
            {research[0] ? <ConfidenceBadge level={research[0].confidenceLevel} /> : null}
          </Group>
          <Text size="sm" c="dimmed">
            {research[0]?.title}
          </Text>
          <Text size="sm" c="dimmed">
            {research[0]?.eli5Summary}
          </Text>
        </Stack>
      </Card>
    </Stack>
  )
}
