import { SectionHeader } from "@/components/section-header"
import { Card } from "@/components/ui/card"

const frontendStack = [
  "Next.js 16 (App Router) with TypeScript",
  "Tailwind CSS + custom component system",
  "Tailwind CSS utilities for layout + spacing",
  "Optional dark mode with high-contrast text"
]

const backendStack = [
  "Node.js + Express with API versioning (/api/v1/...)",
  "Supabase PostgreSQL with Row Level Security (RLS)",
  "MongoDB for research papers and summaries",
  "Redis caching for wearable API calls"
]

const wearableStack = [
  "Terra API unified wearable aggregator",
  "Coverage: Apple Health, Garmin, Fitbit, Oura, WHOOP, Eight Sleep",
  "Webhook-driven ingestion for real-time updates",
  "Fallback direct integrations for unsupported devices"
]

const complianceChecklist = [
  "Encrypted data at rest (AES-256) and in transit (TLS 1.3)",
  "MFA for all admin accounts and audit logging",
  "Point-in-time recovery (PITR) and automated backups",
  "Business Associate Agreements with providers"
]

const designPrinciples = [
  "Progressive disclosure: 14-day calibration before advanced metrics",
  "Accessibility: 4.5:1 text contrast, icons for color states",
  "Gamification: habit streaks with intrinsic motivation handoff",
  "Color system: green/amber/red with ✓/⚠ indicators",
  "Typography: system stack or Inter, monospace for numeric data"
]

const databaseTables = [
  "users, biometrics, nutrition_logs, daily_nutrition_summary",
  "weight_logs, macro_targets, reverse_diet_protocols",
  "tdee_estimates, research_papers, red_s_assessments",
  "user_behavior_patterns, intervention_logs"
]

const apiGroups = [
  {
    title: "Biometrics",
    endpoints: [
      "GET /api/v1/biometrics/daily",
      "GET /api/v1/biometrics/trends",
      "GET /api/v1/biometrics/recovery-score",
      "POST /api/v1/biometrics/baseline"
    ]
  },
  {
    title: "Nutrition",
    endpoints: [
      "POST /api/v1/nutrition/calculate-targets",
      "POST /api/v1/nutrition/log-meal",
      "GET /api/v1/nutrition/recommendations",
      "GET /api/v1/nutrition/targets/history"
    ]
  },
  {
    title: "Research",
    endpoints: [
      "GET /api/v1/research/studies",
      "GET /api/v1/research/study/:doi",
      "GET /api/v1/research/topic/:name",
      "GET /api/v1/research/updates"
    ]
  },
  {
    title: "Protocol",
    endpoints: [
      "POST /api/v1/protocol/reverse-diet/start",
      "GET /api/v1/protocol/reverse-diet/status",
      "POST /api/v1/protocol/reverse-diet/update",
      "GET /api/v1/protocol/reverse-diet/timeline"
    ]
  },
  {
    title: "ML + Safety",
    endpoints: [
      "POST /api/v1/ml/predict-tdee",
      "POST /api/v1/ml/predict-timeline",
      "GET /api/v1/ml/insights",
      "GET /api/v1/safety/red-s-risk"
    ]
  }
]

export default function ArchitecturePage() {
  return (
    <section className="section">
      <div className="container">
        <div className="space-y-8">
          <SectionHeader
            title="Technical architecture"
            subtitle="A HIPAA-ready, evidence-first platform built for recovery-informed nutrition."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Frontend</h3>
                {frontendStack.map((item) => (
                  <p key={item} className="text-sm text-mutedForeground">
                    • {item}
                  </p>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Backend & data</h3>
                {backendStack.map((item) => (
                  <p key={item} className="text-sm text-mutedForeground">
                    • {item}
                  </p>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Wearable integration</h3>
                {wearableStack.map((item) => (
                  <p key={item} className="text-sm text-mutedForeground">
                    • {item}
                  </p>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Compliance checklist</h3>
                {complianceChecklist.map((item) => (
                  <p key={item} className="text-sm text-mutedForeground">
                    • {item}
                  </p>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="p-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Design principles</h3>
                {designPrinciples.map((item) => (
                  <p key={item} className="text-sm text-mutedForeground">
                    • {item}
                  </p>
                ))}
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Database schema highlights</h3>
                {databaseTables.map((item) => (
                  <p key={item} className="text-sm text-mutedForeground">
                    • {item}
                  </p>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <SectionHeader
              title="API surface (v1)"
              subtitle="Versioned endpoints for biometrics, nutrition, research, and safety."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {apiGroups.map((group) => (
                <Card key={group.title} className="p-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">{group.title}</h3>
                    {group.endpoints.map((endpoint) => (
                      <p key={endpoint} className="text-sm text-mutedForeground">
                        {endpoint}
                      </p>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
