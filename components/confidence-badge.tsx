import { Badge } from "@/components/ui/badge"
import type { EvidenceConfidence } from "@/types/evidence"

const colorMap: Record<EvidenceConfidence, string> = {
  STRONG: "bg-success text-white",
  MODERATE: "bg-warning text-white",
  PRELIMINARY: "bg-info text-white",
  LIMITED: "bg-critical text-white"
}

export function ConfidenceBadge({ level }: { level: EvidenceConfidence }) {
  return (
    <Badge className={colorMap[level]}>
      {level} EVIDENCE
    </Badge>
  )
}
