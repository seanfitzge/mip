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

      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="xs">
            <Title order={4}>Water weight reality check</Title>
            <Text size="sm" c="dimmed">
              Expect 1-3 kg (2-7 lb) increase in 24-48 hours from glycogen + water.
            </Text>
            <Text size="sm" c="dimmed">
              Peak weight days 1-2, stabilizes by days 3-5. This is not fat gain.
            </Text>
          </Stack>
        </Card>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="xs">
            <Title order={4}>Pacing guidance</Title>
            <Text size="sm" c="dimmed">
              Standard increase is +100-150 kcal/week (carb priority).
            </Text>
            <Text size="sm" c="dimmed">
              If weight increases &gt;0.5 lb/week, slow to +50-75 kcal/week.
            </Text>
            <Text size="sm" c="dimmed">
              Pace faster when HRV improves and RHR drops; slower if stressed.
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>

      <Card withBorder radius="md" padding="lg">
        <Stack gap="xs">
          <Title order={4}>Personalization inputs</Title>
          <Text size="sm" c="dimmed">
            Depth and duration of deficit, initial body fat, sex, and biometric response
            patterns adjust pacing automatically.
          </Text>
          <Text size="sm" c="dimmed">
            Weekly micro-adjustments follow weight trends and recovery markers.
          </Text>
        </Stack>
      </Card>

      <Card withBorder radius="md" padding="lg">
        <Stack gap="xs">
          <Title order={4}>Critical note on rate</Title>
          <Text size="sm" c="dimmed">
            The 100-150 kcal/week increase is practitioner consensus, not definitive evidence.
          </Text>
          <Text size="sm" c="dimmed">
            2024 research suggests immediate return to maintenance may perform similarly.
          </Text>
          <Text size="sm" c="dimmed">
            MIP tests both approaches and updates recommendations as data improves.
          </Text>
        </Stack>
      </Card>
    </Stack>
  )
}
