import { Badge } from "@mantine/core"

type ConfidenceBadgeProps = {
  level: string
}

const CONFIDENCE_STYLES: Record<string, { color: string; label: string }> = {
  STRONG: { color: "teal", label: "Strong evidence" },
  MODERATE: { color: "yellow", label: "Moderate evidence" },
  PRELIMINARY: { color: "orange", label: "Preliminary evidence" },
  LIMITED: { color: "red", label: "Limited evidence" },
  HIGH: { color: "teal", label: "High confidence" },
  LOW: { color: "red", label: "Low confidence" }
}

export function ConfidenceBadge({ level }: ConfidenceBadgeProps) {
  const normalized = level.trim().toUpperCase()
  const style = CONFIDENCE_STYLES[normalized]

  return (
    <Badge variant="light" color={style?.color ?? "gray"}>
      {style?.label ?? normalized}
    </Badge>
  )
}
