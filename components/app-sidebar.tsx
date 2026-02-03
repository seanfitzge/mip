import Link from "next/link"
import { Anchor, Badge, Stack, Text } from "@mantine/core"

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/nutrition", label: "Nutrition" },
  { href: "/biometrics", label: "Biometrics" },
  { href: "/research", label: "Research Library" },
  { href: "/protocols", label: "Protocol Manager" },
  { href: "/progress", label: "Progress" }
]

export function AppSidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-[var(--mantine-color-default-border)] px-4 py-6 md:block">
      <Stack gap="lg">
        <Stack gap={2}>
          <Text size="sm" c="dimmed">
            Metabolic Intelligence
          </Text>
          <Text fw={600} size="lg">
            MIP Console
          </Text>
        </Stack>
        <Badge variant="outline">Preview</Badge>
        <Stack gap="xs">
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
        </Stack>
      </Stack>
    </aside>
  )
}
