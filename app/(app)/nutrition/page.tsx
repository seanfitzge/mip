import { getMacroTargets } from "@/lib/data/macros"
import { SectionHeader } from "@/components/section-header"
import { ConfidenceBadge } from "@/components/confidence-badge"
import {
  Anchor,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Title
} from "@mantine/core"

const mockLog = [
  { time: "7:30 AM", meal: "Greek yogurt + berries", calories: 320, protein: 32, carbs: 35, fat: 5 },
  { time: "12:15 PM", meal: "Chicken bowl", calories: 540, protein: 45, carbs: 60, fat: 12 },
  { time: "6:45 PM", meal: "Salmon + rice", calories: 620, protein: 48, carbs: 70, fat: 18 }
]

export default async function NutritionPage() {
  const macros = await getMacroTargets()

  return (
    <Stack gap="xl">
      <SectionHeader
        title="Nutrition targets"
        subtitle="Evidence-based macro ranges and daily logging."
      />
      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Group justify="space-between">
              <Title order={4}>Today&apos;s targets</Title>
              <ConfidenceBadge level={macros.confidenceLevel} />
            </Group>
            <SimpleGrid cols={2}>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Calories
                </Text>
                <Text fw={600} size="xl">
                  {macros.calories}
                </Text>
              </Stack>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Protein
                </Text>
                <Text fw={600} size="xl">
                  {macros.proteinG} g
                </Text>
              </Stack>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Carbs
                </Text>
                <Text fw={600} size="xl">
                  {macros.carbsG} g
                </Text>
              </Stack>
              <Stack gap={2}>
                <Text size="xs" c="dimmed">
                  Fat
                </Text>
                <Text fw={600} size="xl">
                  {macros.fatG} g
                </Text>
              </Stack>
            </SimpleGrid>
            <Text size="sm" c="dimmed">
              {macros.adjustmentReason}
            </Text>
            <Stack gap={4}>
              <Text size="xs" c="dimmed">
                Evidence citations
              </Text>
              <Group gap="xs">
                <Anchor
                  size="xs"
                  href={`https://doi.org/${macros.proteinCitationDoi}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Protein DOI
                </Anchor>
                <Anchor
                  size="xs"
                  href={`https://doi.org/${macros.carbCitationDoi}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Carb DOI
                </Anchor>
                <Anchor
                  size="xs"
                  href={`https://doi.org/${macros.fatCitationDoi}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Fat DOI
                </Anchor>
              </Group>
            </Stack>
          </Stack>
        </Card>

        <Card withBorder radius="md" padding="lg">
          <Stack gap="sm">
            <Title order={4}>Macro calculator (preview)</Title>
            <SimpleGrid cols={{ base: 1, sm: 2 }}>
              <TextInput placeholder="Weight (kg)" />
              <TextInput placeholder="Body fat %" />
              <TextInput placeholder="Training type" />
              <TextInput placeholder="Goal" />
            </SimpleGrid>
            <Text size="sm" c="dimmed">
              This calculator will adapt to biomarkers in Phase 2.
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>

      <SimpleGrid cols={{ base: 1, lg: 2 }}>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="xs">
            <Title order={4}>Evidence-based macro ranges</Title>
            <Text size="sm" c="dimmed">
              Protein: 2.0-2.7 g/kg during deficit, 1.6-2.2 g/kg maintenance.
            </Text>
            <Text size="sm" c="dimmed">
              Carbs: 3-5 g/kg strength, 5-7 g/kg mixed, 6-10 g/kg endurance.
            </Text>
            <Text size="sm" c="dimmed">
              Fat minimums: 20% of calories to protect hormones (sex-specific thresholds).
            </Text>
          </Stack>
        </Card>
        <Card withBorder radius="md" padding="lg">
          <Stack gap="xs">
            <Title order={4}>Nutrient timing guidance</Title>
            <Text size="sm" c="dimmed">
              Primary: hit daily protein, carbs, and fat targets first.
            </Text>
            <Text size="sm" c="dimmed">
              Secondary: 0.4 g/kg protein per meal across 4+ meals, 3-4h apart.
            </Text>
            <Text size="sm" c="dimmed">
              Optional: shift 20-30 g carbs to evening when sleep &lt;70 for 3+ nights.
            </Text>
          </Stack>
        </Card>
      </SimpleGrid>

      <Card withBorder radius="md" padding="lg">
        <Stack gap="xs">
          <Title order={4}>Energy availability safeguards</Title>
          <Text size="sm" c="dimmed">
            Females: clinical &lt;30 kcal/kg FFM, subclinical &lt;45 kcal/kg FFM for 5+ days.
          </Text>
          <Text size="sm" c="dimmed">
            Males: clinical &lt;25 kcal/kg FFM, subclinical &lt;40 kcal/kg FFM for 14+ days.
          </Text>
          <Text size="sm" c="dimmed">
            If thresholds are crossed, the system increases intake and recommends recovery.
          </Text>
        </Stack>
      </Card>

      <Card withBorder radius="md" padding="lg">
        <Stack gap="sm">
          <Title order={4}>Today&apos;s log</Title>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Time</Table.Th>
                <Table.Th>Meal</Table.Th>
                <Table.Th>Calories</Table.Th>
                <Table.Th>Protein</Table.Th>
                <Table.Th>Carbs</Table.Th>
                <Table.Th>Fat</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {mockLog.map((entry) => (
                <Table.Tr key={entry.time}>
                  <Table.Td>{entry.time}</Table.Td>
                  <Table.Td>{entry.meal}</Table.Td>
                  <Table.Td>{entry.calories}</Table.Td>
                  <Table.Td>{entry.protein} g</Table.Td>
                  <Table.Td>{entry.carbs} g</Table.Td>
                  <Table.Td>{entry.fat} g</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Stack>
      </Card>
    </Stack>
  )
}
