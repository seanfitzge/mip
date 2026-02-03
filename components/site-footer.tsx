import { Container, SimpleGrid, Stack, Text } from "@mantine/core"

export function SiteFooter() {
  return (
    <footer>
      <Container size="lg" py="xl">
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          <Stack gap={4}>
            <Text size="sm">Metabolic Intelligence Platform</Text>
            <Text size="sm" c="dimmed">
              Evidence-based nutrition powered by your biometrics.
            </Text>
          </Stack>
          <Stack gap={4}>
            <Text size="sm">Product</Text>
            <Text size="sm" c="dimmed">
              Research citations · Recovery-driven nutrition · Reverse diet protocols
            </Text>
          </Stack>
          <Stack gap={4}>
            <Text size="sm">Compliance</Text>
            <Text size="sm" c="dimmed">
              HIPAA-ready architecture · Encrypted data · User-owned exports
            </Text>
          </Stack>
        </SimpleGrid>
      </Container>
    </footer>
  )
}
