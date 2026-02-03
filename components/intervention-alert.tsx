import { Badge, Card, Group, List, Stack, Text, Title } from "@mantine/core"

type InterventionAlertProps = {
  title: string
  details: string[]
  active: boolean
  severity?: "warning" | "critical" | "info"
}

export function InterventionAlert({
  title,
  details,
  active,
  severity = "warning"
}: InterventionAlertProps) {
  const borderColor = !active
    ? undefined
    : severity === "critical"
      ? "var(--mantine-color-red-6)"
      : severity === "warning"
        ? "var(--mantine-color-yellow-6)"
        : "var(--mantine-color-indigo-6)"

  return (
    <Card
      withBorder
      radius="md"
      padding="lg"
      style={{
        borderColor
      }}
    >
      <Stack gap="sm">
        <Group justify="space-between">
          <Title order={4}>{title}</Title>
          <Badge variant="light" color={active ? "red" : "teal"}>
            {active ? "Active" : "Monitoring"}
          </Badge>
        </Group>
        {active ? (
          <List size="sm" spacing="xs">
            {details.map((detail) => (
              <List.Item key={detail}>{detail}</List.Item>
            ))}
          </List>
        ) : (
          <Text size="sm" c="dimmed">
            No current interventions. Biometrics remain within baseline thresholds.
          </Text>
        )}
      </Stack>
    </Card>
  )
}
