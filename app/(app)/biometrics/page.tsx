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
            <MiniLineChart points={trend.map((item) => item.hrvMs)} />
            <Text size="sm" c="dimmed">
              Current HRV {summary.hrvMs} ms, baseline {summary.hrvBaselineMean} ±{" "}
              {summary.hrvBaselineSd} ms.
            </Text>
          </Stack>
        </Card>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>Resting heart rate</Title>
            <MiniLineChart points={trend.map((item) => item.restingHrBpm)} />
            <Text size="sm" c="dimmed">
              RHR {summary.restingHrBpm} bpm, baseline {summary.rhrBaselineMean} bpm.
            </Text>
          </Stack>
        </Card>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>Sleep quality</Title>
            <MiniLineChart points={trend.map((item) => item.sleepQuality)} />
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

      <Card withBorder radius="md" padding="lg">
        <Stack gap="xs">
          <Title order={4}>Validated intervention logic</Title>
          <Text size="sm" c="dimmed">
            • HRV decline ≥7.5% from baseline or 0.5 SD below baseline triggers metabolic
            stress response.
          </Text>
          <Text size="sm" c="dimmed">
            • RHR ≥5 bpm above baseline for 2 days strengthens intervention signal.
          </Text>
          <Text size="sm" c="dimmed">
            • Sleep quality &lt;70 for 3 days shifts carbs to evening.
          </Text>
        </Stack>
      </Card>
    </Stack>
  )
}
