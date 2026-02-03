"use client"

import { Stack, Text, Title } from "@mantine/core"

type SectionHeaderProps = {
  title: string
  subtitle?: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <Stack gap={4} mb="lg">
      <Title order={2}>{title}</Title>
      {subtitle ? (
        <Text size="sm" c="dimmed">
          {subtitle}
        </Text>
      ) : null}
    </Stack>
  )
}
