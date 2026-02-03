import { Badge } from "@mantine/core"
import type { EvidenceConfidence } from "@/types/evidence"

const colorMap: Record<EvidenceConfidence, string> = {
  STRONG: "green",
  MODERATE: "yellow",
  PRELIMINARY: "orange",
  LIMITED: "red"
}

export function ConfidenceBadge({ level }: { level: EvidenceConfidence }) {
  return (
    <Badge color={colorMap[level]} variant="light">
      {level} EVIDENCE
    </Badge>
  )
}
