import { SectionHeader } from "@/components/section-header"
import { Timeline } from "@/components/timeline"
import { Container, Stack } from "@mantine/core"

const roadmapItems = [
  {
    title: "MVP (8-10 weeks)",
    subtitle: "Core tracking and manual workflows",
    details: [
      "Garmin integration and baseline biometrics",
      "Static evidence-based macro calculator",
      "Research library with 50 seeded papers",
      "Manual nutrition logging and dashboard"
    ]
  },
  {
    title: "Phase 2: Intelligence Layer",
    subtitle: "Adaptive recommendations",
    details: [
      "Macro adjustments driven by HRV and sleep",
      "Automated reverse diet protocol",
      "WHOOP and Oura integrations",
      "Expanded research library"
    ]
  },
  {
    title: "Phase 3: ML & Personalization",
    subtitle: "Predictive metabolic modeling",
    details: [
      "Bayesian TDEE estimation",
      "Anomaly detection on biometrics",
      "Personalized adaptation curves",
      "AI coach interface with RAG"
    ]
  },
  {
    title: "Phase 4: Scale & Monetization",
    subtitle: "Team, mobile, and API expansion",
    details: [
      "Coach accounts and team management",
      "Mobile apps for daily check-ins",
      "Integration marketplace",
      "Exportable reports for athletes"
    ]
  }
]

export default function RoadmapPage() {
  return (
    <section className="section">
      <Container size="lg">
        <Stack gap="xl">
          <SectionHeader
            title="Development roadmap"
            subtitle="A staged build that prioritizes scientific accuracy and recovery outcomes."
          />
          <Timeline items={roadmapItems} />
        </Stack>
      </Container>
    </section>
  )
}
