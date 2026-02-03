import { getReverseDietProtocol } from "@/lib/data/protocols"
import { SectionHeader } from "@/components/section-header"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { Card, Group, SimpleGrid, Stack, Text, Title } from "@mantine/core"

export default async function ProtocolsPage() {
  const protocol = await getReverseDietProtocol()

  return (
    <Stack gap="xl">
      <SectionHeader
        title="Reverse diet protocol"
        subtitle="Structured phases to restore metabolism after a deficit."
      />
      <Card withBorder radius="md" padding="lg">
        <Stack gap="xs">
          <Title order={4}>Current phase: {protocol.currentPhase}</Title>
          <Text size="sm" c="dimmed">
            Week {protocol.currentWeek} · Predicted completion {protocol.predictedEndDate}
          </Text>
          <Text size="sm" c="dimmed">
            Weekly increase: {protocol.weeklyIncreaseKcal} kcal
          </Text>
          <Text size="sm" c="dimmed">
            Target maintenance: {protocol.targetCalories} kcal
          </Text>
        </Stack>
      </Card>

      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        {protocol.phases.map((phase) => (
          <Card key={phase.name} withBorder radius="md" padding="lg">
            <Stack gap="sm">
              <Group justify="space-between">
                <Title order={4}>{phase.name}</Title>
                <ConfidenceBadge level={phase.confidenceLevel} />
              </Group>
              <Text size="sm" c="dimmed">
                {phase.duration}
              </Text>
              <Stack gap={4}>
                {phase.focus.map((item) => (
                  <Text key={item} size="sm" c="dimmed">
                    • {item}
                  </Text>
                ))}
              </Stack>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  )
}
