import { Card, Stack, Text, Title } from "@mantine/core"

type StatCardProps = {
  title: string
  value: string
  description?: string
}

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card withBorder radius="md" padding="lg">
      <Stack gap={4}>
        <Text size="xs" c="dimmed" tt="uppercase">
          {title}
        </Text>
        <Title order={3}>{value}</Title>
        {description ? (
          <Text size="sm" c="dimmed">
            {description}
          </Text>
        ) : null}
      </Stack>
    </Card>
  )
}
