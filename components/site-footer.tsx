import { Container, Stack, Text } from "@mantine/core"

export function SiteFooter() {
  return (
    <footer>
      <Container size="lg" py="xl">
        <Stack gap={4}>
          <Text size="sm">Metabolic Intelligence Platform</Text>
          <Text size="sm" c="dimmed">
            Evidence-based nutrition powered by your biometrics.
          </Text>
        </Stack>
      </Container>
    </footer>
  )
}
