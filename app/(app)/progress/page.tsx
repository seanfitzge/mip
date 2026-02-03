import { SectionHeader } from "@/components/section-header"
import { MiniLineChart } from "@/components/charts/mini-line-chart"
import { Card, SimpleGrid, Stack, Text, Title } from "@mantine/core"

const weightTrend = [82.5, 82.2, 82.0, 81.9, 81.8, 81.7, 81.7]

export default function ProgressPage() {
  return (
    <Stack gap="xl">
      <SectionHeader
        title="Progress tracking"
        subtitle="Weight trends, body composition, and performance notes."
      />
      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>Weight trend</Title>
            <MiniLineChart points={weightTrend} />
            <Text size="sm" c="dimmed">
              Stable weight trend during reverse diet stabilization phase.
            </Text>
          </Stack>
        </Card>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>Progress photos</Title>
            <Card withBorder radius="md" padding="xl">
              <Text size="sm" c="dimmed" ta="center">
                Photo uploads will live here in Phase 2.
              </Text>
            </Card>
            <Text size="sm" c="dimmed">
              Track weekly photos to validate body composition shifts.
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>

      <Card withBorder radius="md" padding="lg">
        <Stack gap="sm">
          <Title order={4}>Adaptation curve (preview)</Title>
          <MiniLineChart points={[100, 96, 94, 93, 92, 92, 93]} />
          <Text size="sm" c="dimmed">
            Bayesian TDEE estimates and adaptation curves will appear here once 4+ weeks of
            data are logged.
          </Text>
        </Stack>
      </Card>
    </Stack>
  )
}
