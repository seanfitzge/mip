import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"

const differentiators = [
  "Evidence-based recommendations with citations",
  "Biometric integration that impacts nutrition decisions",
  "Reverse diet protocols built for recovery",
  "Predictive metabolic modeling over time"
]

const ethics = [
  "Minimum energy availability safeguards and RED-S alerts",
  "Data ownership and export for every user",
  "Peer-reviewed sources with quality ratings",
  "Transparent limitations and uncertainty labeling"
]

const successMetrics = [
  "DAU/MAU ratio and research library engagement",
  "Wearable sync compliance rate",
  "Reverse diet completion success",
  "NPS and conversion to Pro tier"
]

export default function VisionPage() {
  return (
    <section className="section">
      <div className="container space-y-12">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase text-muted-foreground">
            Executive Vision
          </p>
          <h1 className="text-4xl font-semibold">Fix the metabolic blind spot.</h1>
          <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
            Athletes can track calories and macros, but they cannot see how their
            metabolism is responding. MIP connects recovery biomarkers to
            evidence-based nutrition, eliminating guesswork.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">The problem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Recovery metrics are ignored or siloed.</p>
              <p>• Reverse dieting is trial-and-error.</p>
              <p>• Research is too dense to apply daily.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">The solution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• Real-time metabolic insights from wearables.</p>
              <p>• Adaptive macro guidance with citations.</p>
              <p>• Predictive modeling for long-term planning.</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <SectionHeader
              title="Key differentiators"
              subtitle="Why MIP wins on trust and outcomes."
            />
            <ul className="space-y-2 text-sm text-muted-foreground">
              {differentiators.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader
              title="Ethical guardrails"
              subtitle="Built to protect metabolic health."
            />
            <ul className="space-y-2 text-sm text-muted-foreground">
              {ethics.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeader
              title="Success metrics"
              subtitle="Signals we track as the platform scales."
            />
            <ul className="space-y-2 text-sm text-muted-foreground">
              {successMetrics.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
