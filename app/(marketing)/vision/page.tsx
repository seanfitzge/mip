import { SectionHeader } from "@/components/section-header"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from "@/components/ui/table"

const differentiators = [
  "GRADE-calibrated evidence confidence on every recommendation",
  "Validated biometric intervention thresholds (7.5% HRV decline, +5 bpm RHR)",
  "Reverse diet protocols with predicted timelines",
  "Implicit training status classification without questionnaires"
]

const revolutionary = [
  "First platform to adapt nutrition to real-time HRV/RHR recovery signals",
  "Every recommendation cited with GRADE quality indicators",
  "Reverse diet algorithms built for metabolic recovery, not just weight",
  "Bayesian TDEE estimation from longitudinal biometric data",
  "Implicit user categorization based on behavior, not forms"
]

const ethics = [
  "Sex-specific energy availability safeguards and RED-S screening",
  "Data ownership and export for every user",
  "Peer-reviewed sources with GRADE quality ratings",
  "Transparent limitations and uncertainty labeling"
]

const valueProps = [
  {
    title: "For individual athletes",
    bullets: [
      "Stop guessing if you are eating enough. Know with biometrics.",
      "See evidence confidence on every recommendation.",
      "Reverse diet without unnecessary fat gain.",
      "Optimize recovery, not just training."
    ]
  },
  {
    title: "For coaches",
    bullets: [
      "Monitor recovery metrics alongside nutrition adherence.",
      "Cite research when explaining protocols to clients.",
      "Automated adjustments between check-ins.",
      "Export reports for athlete reviews."
    ]
  },
  {
    title: "For researchers & students",
    bullets: [
      "Bridge theory with real-world application.",
      "Access 500+ studies with practical summaries.",
      "Opt-in anonymized data for research contributions.",
      "Track outcomes by evidence tier."
    ]
  }
]

const successMetrics = [
  "DAU/MAU ratio >0.30 and research engagement >5 min/week",
  "Wearable sync compliance >85%",
  "Reverse diet completion >70% with <2 kg fat gain",
  "NPS 50+ with free→pro conversion >15%"
]

const competitiveLandscape = [
  {
    feature: "Adaptive TDEE",
    mip: "Bayesian ±150 kcal",
    macrofactor: "Best-in-class",
    carbon: "Penalizes deviation",
    rpdiet: "Rigid",
    mfp: "Not available"
  },
  {
    feature: "Wearable integration",
    mip: "HRV/RHR nutrition linkage",
    macrofactor: "Limited (Fitbit)",
    carbon: "None",
    rpdiet: "None",
    mfp: "Basic steps"
  },
  {
    feature: "Evidence citations",
    mip: "GRADE confidence",
    macrofactor: "None",
    carbon: "None",
    rpdiet: "None",
    mfp: "None"
  },
  {
    feature: "RED-S screening",
    mip: "Implicit, supportive",
    macrofactor: "None",
    carbon: "None",
    rpdiet: "None",
    mfp: "None"
  },
  {
    feature: "Reverse diet protocol",
    mip: "Automated phases",
    macrofactor: "None",
    carbon: "None",
    rpdiet: "None",
    mfp: "None"
  }
]

export default function VisionPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
              Executive Vision
            </p>
            <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
              Fix the metabolic blind spot.
            </h1>
            <p className="text-sm text-mutedForeground body-text">
              Athletes can track calories and macros, but they cannot see how their metabolism
              is responding. MIP connects recovery biomarkers to evidence-based nutrition with
              confidence grading.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">The problem</h3>
                <p className="text-sm text-mutedForeground">• Recovery metrics are ignored or siloed.</p>
                <p className="text-sm text-mutedForeground">• Reverse dieting is trial-and-error.</p>
                <p className="text-sm text-mutedForeground">• Research is too dense to apply daily.</p>
              </div>
            </Card>
            <Card className="p-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">The solution</h3>
                <p className="text-sm text-mutedForeground">• Real-time metabolic insights from wearables.</p>
                <p className="text-sm text-mutedForeground">• Adaptive macro guidance with citations.</p>
                <p className="text-sm text-mutedForeground">• Predictive modeling for long-term planning.</p>
              </div>
            </Card>
          </div>

          <Card className="p-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Why it&apos;s revolutionary</h3>
              {revolutionary.map((item) => (
                <p key={item} className="text-sm text-mutedForeground">
                  • {item}
                </p>
              ))}
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            {valueProps.map((section) => (
              <Card key={section.title} className="p-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                  {section.bullets.map((item) => (
                    <p key={item} className="text-sm text-mutedForeground">
                      • {item}
                    </p>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="space-y-2">
              <SectionHeader
                title="Key differentiators"
                subtitle="Why MIP wins on trust and outcomes."
              />
              {differentiators.map((item) => (
                <p key={item} className="text-sm text-mutedForeground">
                  • {item}
                </p>
              ))}
            </div>
            <div className="space-y-2">
              <SectionHeader
                title="Ethical guardrails"
                subtitle="Built to protect metabolic health."
              />
              {ethics.map((item) => (
                <p key={item} className="text-sm text-mutedForeground">
                  • {item}
                </p>
              ))}
            </div>
            <div className="space-y-2">
              <SectionHeader
                title="Success metrics"
                subtitle="Signals we track as the platform scales."
              />
              {successMetrics.map((item) => (
                <p key={item} className="text-sm text-mutedForeground">
                  • {item}
                </p>
              ))}
            </div>
          </div>

          <Card className="p-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Competitive landscape</h3>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Feature</TableHeaderCell>
                    <TableHeaderCell>MIP</TableHeaderCell>
                    <TableHeaderCell>MacroFactor</TableHeaderCell>
                    <TableHeaderCell>Carbon</TableHeaderCell>
                    <TableHeaderCell>RP Diet</TableHeaderCell>
                    <TableHeaderCell>MyFitnessPal</TableHeaderCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {competitiveLandscape.map((row) => (
                    <TableRow key={row.feature}>
                      <TableCell>{row.feature}</TableCell>
                      <TableCell>{row.mip}</TableCell>
                      <TableCell>{row.macrofactor}</TableCell>
                      <TableCell>{row.carbon}</TableCell>
                      <TableCell>{row.rpdiet}</TableCell>
                      <TableCell>{row.mfp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
