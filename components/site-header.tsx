"use client"

import Link from "next/link"
import { Anchor, Button, Container, Group, Text } from "@mantine/core"

const navItems = [
  { href: "/vision", label: "Vision" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/dashboard", label: "App Preview" }
]

export function SiteHeader() {
  return (
    <header>
      <Container size="lg" py="md">
        <Group justify="space-between">
          <Anchor component={Link} href="/" underline="never">
            <Text fw={700} size="lg">
              MIP
            </Text>
          </Anchor>
          <Group gap="lg">
            {navItems.map((item) => (
              <Anchor
                key={item.href}
                component={Link}
                href={item.href}
                c="dimmed"
                underline="never"
              >
                {item.label}
              </Anchor>
            ))}
            <Button variant="light">Join waitlist</Button>
          </Group>
        </Group>
      </Container>
    </header>
  )
}
