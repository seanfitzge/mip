import { Card, Group, Progress, Stack, Text } from "@mantine/core"

type BaselineStatusCardProps = {
  daysComplete: number
  daysRequired: number
  established: boolean
}

export function BaselineStatusCard({
  daysComplete,
  daysRequired,
  established
}: BaselineStatusCardProps) {
  const progress = Math.min((daysComplete / daysRequired) * 100, 100)

  return (
    <Card withBorder radius="md" padding="lg">
      <Stack gap="sm">
        <Group justify="space-between">
          <Text fw={600}>Baseline establishment</Text>
          <Text size="sm" c={established ? "green" : "dimmed"}>
            {established ? "Complete" : "In progress"}
          </Text>
        </Group>
        <Progress value={progress} />
        <Text size="sm" c="dimmed">
          {daysComplete} of {daysRequired} days of consistent HRV data collected.
        </Text>
      </Stack>
    </Card>
  )
}
