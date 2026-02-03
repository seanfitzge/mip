import { Badge, Card, Group, Progress, Stack, Text, Title } from "@mantine/core"

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
  const progress = daysRequired > 0 ? Math.min(100, (daysComplete / daysRequired) * 100) : 0

  return (
    <Card withBorder radius="md" padding="lg">
      <Stack gap="sm">
        <Group justify="space-between">
          <Title order={4}>Baseline status</Title>
          <Badge variant="light" color={established ? "teal" : "yellow"}>
            {established ? "Established" : "In progress"}
          </Badge>
        </Group>
        <Text size="sm" c="dimmed">
          {daysComplete} of {daysRequired} days logged
        </Text>
        <Progress value={progress} radius="xl" />
        <Text size="xs" c="dimmed">
          Recommendations unlock after a 14-day baseline.
        </Text>
      </Stack>
    </Card>
  )
}
