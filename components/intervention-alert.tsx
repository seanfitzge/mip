import { Alert, Stack, Text } from "@mantine/core"
import { IconAlertTriangle } from "@tabler/icons-react"

type InterventionAlertProps = {
  title: string
  details: string[]
  active: boolean
}

export function InterventionAlert({ title, details, active }: InterventionAlertProps) {
  if (!active) {
    return null
  }

  return (
    <Alert
      color="yellow"
      title={title}
      icon={<IconAlertTriangle size={18} />}
      radius="md"
    >
      <Stack gap={4}>
        {details.map((detail) => (
          <Text key={detail} size="sm">
            {detail}
          </Text>
        ))}
      </Stack>
    </Alert>
  )
}
