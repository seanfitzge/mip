import { Card, List, Stack, Text, Title } from "@mantine/core"

type TimelineItem = {
  title: string
  subtitle: string
  details: string[]
}

type TimelineProps = {
  items: TimelineItem[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <Stack gap="md">
      {items.map((item) => (
        <Card key={item.title} withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase">
                {item.subtitle}
              </Text>
              <Title order={4}>{item.title}</Title>
            </div>
            <List size="sm" spacing="xs">
              {item.details.map((detail) => (
                <List.Item key={detail}>{detail}</List.Item>
              ))}
            </List>
          </Stack>
        </Card>
      ))}
    </Stack>
  )
}
