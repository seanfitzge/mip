import { Button, Group, Stack, Text, Title } from "@mantine/core"

export function AppTopbar() {
  return (
    <Group justify="space-between" px="lg" py="md" style={{ borderBottom: "1px solid var(--mantine-color-default-border)" }}>
      <Stack gap={2}>
        <Text size="xs" c="dimmed" tt="uppercase">
          Today
        </Text>
        <Title order={3}>Metabolic Overview</Title>
      </Stack>
      <Group>
        <Button variant="light">Export report</Button>
        <Button>Start Sync</Button>
      </Group>
    </Group>
  )
}
