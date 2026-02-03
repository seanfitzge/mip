import { Badge, Card, Group, List, Stack, Text, Title } from "@mantine/core"

type InterventionAlertProps = {
  title: string
  details: string[]
  active: boolean
}

export function InterventionAlert({ title, details, active }: InterventionAlertProps) {
  return (
    <Card
      withBorder
      radius="md"
      padding="lg"
      style={{
        borderColor: active ? "var(--mantine-color-red-6)" : undefined
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
