import { SectionHeader } from "@/components/section-header"
import { Timeline } from "@/components/timeline"
import { Card } from "@/components/ui/card"

const roadmapItems = [
  {
    title: "MVP (8-10 weeks)",
    subtitle: "Core tracking and manual workflows",
    details: [
      "Wearable integration via Terra API (Garmin, Oura, WHOOP, Apple Health)",
      "14-day baseline establishment workflow",
      "Evidence-based macro calculator with confidence levels",
      "Manual nutrition logging and core dashboard"
    ]
  },
  {
    title: "Phase 2: Intelligence Layer",
    subtitle: "Adaptive recommendations",
    details: [
      "Adaptive macro adjustments driven by HRV, RHR, and sleep",
      "Automated reverse diet protocol with weekly micro-adjustments",
      "Expanded research library (200+ papers) and GRADE badges",
      "Recovery assessment (RED-S screening) workflows"
    ]
  },
  {
    title: "Phase 3: ML & Personalization",
    subtitle: "Predictive metabolic modeling",
    details: [
      "Bayesian TDEE estimation with confidence bounds",
      "Metabolic state classifier and anomaly detection",
      "Timeline forecaster for reverse diet duration",
      "AI research assistant with RAG on study database"
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

const successCriteria = [
  {
    title: "MVP success criteria",
    items: [
      "Baseline completion workflow works end-to-end",
      "TDEE estimate within ±200 kcal by week 4",
      "HRV interventions trigger appropriately",
      "All recommendations include evidence citations"
    ]
  },
  {
    title: "Phase 2 success criteria",
    items: [
      "Adaptive recommendations deliver measurable recovery improvement",
      "Reverse diet protocol completes with <2 kg fat gain",
      "Research library engagement >5 minutes per week",
      "Wearable sync compliance >85%"
    ]
  }
]

const monetization = [
  {
    tier: "Free",
    details: "Basic tracking, 10 cited studies/month, formula-based TDEE."
  },
  {
    tier: "Pro ($19/mo)",
    details: "Unlimited research, adaptive recommendations, all wearables, Bayesian TDEE."
  },
  {
    tier: "Team ($79/mo)",
    details: "Coach + 10 athletes, shared protocols, team analytics."
  },
  {
    tier: "Enterprise",
    details: "Custom integrations, white-label, BAA, dedicated support."
  }
]

const implementationPriorities = [
  "Initialize Next.js 16 + TypeScript + Tailwind design system",
  "Supabase setup with RLS and baseline schema migration",
  "Authentication (Clerk or NextAuth) with MFA support",
  "Terra API OAuth integration + baseline workflow",
  "Biometric intervention logic (HRV/RHR thresholds)",
  "Evidence-based macro calculator with citations"
]

export default function RoadmapPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="space-y-8">
          <SectionHeader
            title="Development roadmap"
            subtitle="A staged build that prioritizes scientific accuracy and recovery outcomes."
          />
          <Timeline items={roadmapItems} />
          <div className="grid gap-4 lg:grid-cols-2">
            {successCriteria.map((criteria) => (
              <Card key={criteria.title} className="p-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{criteria.title}</h3>
                  {criteria.items.map((item) => (
                    <p key={item} className="text-sm text-mutedForeground">
                      • {item}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          <Card className="p-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Monetization tiers</h3>
              <div className="grid gap-3 md:grid-cols-2">
                {monetization.map((tier) => (
                  <div key={tier.tier}>
                    <p className="text-sm font-semibold text-foreground">{tier.tier}</p>
                    <p className="text-sm text-mutedForeground">{tier.details}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Implementation priorities</h3>
              {implementationPriorities.map((item) => (
                <p key={item} className="text-sm text-mutedForeground">
                  • {item}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
