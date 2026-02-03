import { getBiometricsSummary, getBiometricsTrend } from "@/lib/data/biometrics"
import { SectionHeader } from "@/components/section-header"
import { MiniLineChart } from "@/components/charts/mini-line-chart"
import { Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core"

export default async function BiometricsPage() {
  const summary = await getBiometricsSummary()
  const trend = await getBiometricsTrend()

  return (
    <Stack gap="xl">
      <SectionHeader
        title="Biometrics"
        subtitle="Recovery metrics used to adjust nutrition targets."
      />
      <SimpleGrid cols={{ base: 1, lg: 3 }}>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>HRV trend</Title>
            <MiniLineChart
              points={trend.map((item) => item.hrvMs)}
              ariaLabel="HRV trend chart"
            />
            <Text size="sm" c="dimmed">
              Current HRV {summary.hrvMs} ms, baseline {summary.hrvBaselineMean} ±{" "}
              {summary.hrvBaselineSd} ms.
            </Text>
          </Stack>
        </Card>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>Resting heart rate</Title>
            <MiniLineChart
              points={trend.map((item) => item.restingHrBpm)}
              ariaLabel="Resting heart rate trend chart"
            />
            <Text size="sm" c="dimmed">
              RHR {summary.restingHrBpm} bpm, baseline {summary.rhrBaselineMean} bpm.
            </Text>
          </Stack>
        </Card>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>Sleep quality</Title>
            <MiniLineChart
              points={trend.map((item) => item.sleepQuality)}
              ariaLabel="Sleep quality trend chart"
            />
            <Text size="sm" c="dimmed">
              Sleep score {summary.sleepQuality}/100 with {summary.sleepDurationHours} hrs
              last night.
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>

      <Card withBorder radius="md" padding="lg">
        <Stack gap="sm">
          <Group justify="space-between">
            <Title order={4}>Personal baselines</Title>
            <Text size="sm" c="dimmed">
              {summary.sourceDevice} (CCC {summary.deviceAccuracyCcc})
            </Text>
          </Group>
          <SimpleGrid cols={{ base: 1, md: 2 }}>
            <Text size="sm" c="dimmed">
              HRV baseline: {summary.hrvBaselineMean} ± {summary.hrvBaselineSd} ms
            </Text>
            <Text size="sm" c="dimmed">
              RHR baseline: {summary.rhrBaselineMean} ± {summary.rhrBaselineSd} bpm
            </Text>
          </SimpleGrid>
        </Stack>
      </Card>

      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="xs">
            <Title order={4}>Calibration phase</Title>
            <Text size="sm" c="dimmed">
              Establishes a 14-day baseline before advanced recommendations.
            </Text>
            <Text size="sm" c="dimmed">
              Smallest worthwhile change = 0.5 × SD of baseline period.
            </Text>
            <Text size="sm" c="dimmed">
              Population norms are never used; only personal baselines.
            </Text>
          </Stack>
        </Card>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="xs">
            <Title order={4}>Validated intervention logic</Title>
            <Text size="sm" c="dimmed">
              • HRV decline ≥7.5% from baseline or 0.5 SD below baseline triggers stress
              response.
            </Text>
            <Text size="sm" c="dimmed">
              • RHR ≥5 bpm above baseline for 2 days strengthens intervention signal.
            </Text>
            <Text size="sm" c="dimmed">
              • Sleep quality &lt;70 for 3 days shifts carbs to evening.
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>

      <Card withBorder radius="md" padding="lg">
        <Stack gap="xs">
          <Title order={4}>Device accuracy reference</Title>
          <Text size="sm" c="dimmed">
            Oura Gen 4 (CCC 0.99) · WHOOP 4.0 (CCC 0.94) · Garmin Fenix (CCC 0.87)
          </Text>
          <Text size="sm" c="dimmed">
            Device reliability is surfaced on every trend to contextualize confidence.
          </Text>
        </Stack>
      </Card>
    </Stack>
  )
}
