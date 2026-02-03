import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionHeader } from "@/components/section-header"

const featureCards = [
  {
    title: "Biometric Integration Engine",
    description:
      "Real-time HRV, RHR, sleep, and training load signals to detect metabolic stress."
  },
  {
    title: "Evidence-Based Recommendations",
    description:
      "Every suggestion includes peer-reviewed citations and quality ratings."
  },
  {
    title: "Reverse Diet Intelligence",
    description:
      "Guided recovery protocols to restore metabolism without unnecessary fat gain."
  }
]

const valueProps = [
  "Know if you are eating enough with biometric context.",
  "Translate research into clear, actionable nutrition steps.",
  "Optimize recovery, not just performance output."
]

export default function HomePage() {
  return (
    <>
      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase text-muted-foreground">
                Metabolic Intelligence Platform
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Evidence-based nutrition, powered by your biometrics.
              </h1>
              <p className="text-base text-muted-foreground md:text-lg">
                A metabolic decision system that adapts nutrition to recovery,
                training load, and real-world physiology.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>Request early access</Button>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/80"
              >
                View product preview
              </Link>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {valueProps.map((value) => (
                <li key={value}>• {value}</li>
              ))}
            </ul>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today&apos;s Metabolic Snapshot</CardTitle>
              <p className="text-sm text-muted-foreground">
                Recovery up, stress down. Continue reverse diet progression.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">HRV</p>
                  <p className="text-2xl font-semibold">68 ms</p>
                </div>
                <div>
                  <p className="text-muted-foreground">RHR</p>
                  <p className="text-2xl font-semibold">54 bpm</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Sleep</p>
                  <p className="text-2xl font-semibold">7.4 hrs</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Readiness</p>
                  <p className="text-2xl font-semibold">79%</p>
                </div>
              </div>
              <div className="rounded-md border border-border bg-muted/40 p-3 text-sm text-muted-foreground">
                Evidence-based note: Carbohydrate timing can improve sleep onset
                and recovery quality in athletes.
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="section bg-muted/30">
        <div className="container">
          <SectionHeader
            title="Core System Pillars"
            subtitle="Built for serious athletes who need actionable, cited guidance."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {featureCards.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <CardTitle className="text-base">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {feature.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <SectionHeader
              title="Technical foundation"
              subtitle="Designed for a long-term product roadmap."
            />
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Next.js 14 + TypeScript + Tailwind</li>
              <li>• Supabase-ready data layer and auth paths</li>
              <li>• Research citation engine with DOI metadata</li>
              <li>• Wearable integrations with Garmin-first strategy</li>
            </ul>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Target outcomes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>• ±5% TDEE accuracy after 4 weeks of data</p>
              <p>• Reverse diet success without rapid fat gain</p>
              <p>• Higher research engagement through clear summaries</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
