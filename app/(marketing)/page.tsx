"use client"

import Link from "next/link"
import { SectionHeader } from "@/components/section-header"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const featureCards = [
  {
    title: "Biometric Integration Engine",
    description:
      "Terra API wearable aggregation with HRV/RHR baselines and device accuracy metadata."
  },
  {
    title: "Evidence-Based Recommendation Engine",
    description: "Every guidance item includes GRADE-calibrated confidence levels and citations."
  },
  {
    title: "Adaptive Nutrition Calculator",
    description: "Macro targets update from recovery biomarkers and training load signals."
  },
  {
    title: "Intelligent Reverse Diet Protocol",
    description: "Phase-based pacing with water-weight expectations and timeline forecasts."
  },
  {
    title: "Predictive Metabolic Modeling",
    description: "Bayesian TDEE estimation and adaptation detection from longitudinal data."
  },
  {
    title: "Implicit User Categorization",
    description: "Training status inferred from behavior without questionnaires."
  },
  {
    title: "Research Library & Education Hub",
    description: "500+ papers with “Explain Like I’m A Lifter” summaries."
  },
  {
    title: "Recovery Assessment (RED-S)",
    description: "Soft screening and referral pathways with non-pathologizing language."
  }
]

const valueProps = [
  "Stop guessing if you are eating enough. Know with biometrics.",
  "Every recommendation cites peer-reviewed evidence with confidence.",
  "Reverse diet without unnecessary fat gain or metabolic drag."
]

const interventionTriggers = [
  {
    title: "HRV intervention trigger",
    details: [
      "7-day RMSSD decline ≥7.5% from baseline or 0.5 SD below baseline.",
      "Action: +5-10% calories (carb priority) and reduce training intensity."
    ]
  },
  {
    title: "RHR intervention trigger",
    details: [
      "RHR ≥5 bpm above baseline for 2+ consecutive days.",
      "Action: combine with HRV signal to prioritize recovery."
    ]
  },
  {
    title: "Sleep quality trigger",
    details: [
      "Sleep score <70 for 3+ nights.",
      "Action: shift 20-30 g carbs to evening meals and reduce load."
    ]
  }
]

const evidenceExamples = [
  {
    recommendation: "Increase protein to 2.4 g/kg during deficit.",
    source: "Helms et al. (2014) · 2.3-3.1 g/kg FFM optimal in lean athletes.",
    confidence: "STRONG" as const
  },
  {
    recommendation: "Shift carbs to evening when sleep quality is low.",
    source: "Afaghi et al. (2007) · High-GI carbs improved sleep onset.",
    confidence: "MODERATE" as const
  }
]

const keyPages = [
  "Dashboard: Recovery grade, macro targets, and alerts",
  "Nutrition: Adaptive macros, logging, and evidence citations",
  "Biometrics: HRV/RHR trends with personal baselines",
  "Research Library: GRADE-labeled studies and summaries",
  "Protocol Manager: Reverse diet phase tracker",
  "Progress: Weight trends, body comp, and performance notes"
]

export default function HomePage() {
  const [shouldAnimate, setShouldAnimate] = useState(false)

  useEffect(() => {
    // Check if this is first visit (intro animation was shown)
    const hasSeenIntro = localStorage.getItem("mip-intro-seen")
    if (!hasSeenIntro) {
      // Wait for intro to complete before animating content
      const timer = setTimeout(() => setShouldAnimate(true), 2600)
      return () => clearTimeout(timer)
    } else {
      // No intro, animate immediately
      setShouldAnimate(true)
    }
  }, [])

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  }

  return (
    <>
      <motion.section
        className="section"
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={0}
      >
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                  Metabolic Intelligence Platform · Version 2.0
                </p>
                <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
                  Evidence-based nutrition, powered by real-time recovery biomarkers.
                </h1>
                <p className="text-sm text-mutedForeground body-text">
                  A metabolic intelligence system that connects HRV, RHR, sleep, and training
                  load with research-cited recommendations and adaptive macro targets.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-semibold text-primaryForeground transition-colors hover:bg-primary/90 active:bg-primary/85"
                >
                  Request early access
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-border px-6 text-sm font-semibold text-foreground hover:bg-muted"
                >
                  View product preview
                </Link>
              </div>
              <div className="space-y-2 text-sm text-mutedForeground">
                {valueProps.map((value) => (
                  <p key={value}>• {value}</p>
                ))}
              </div>
            </div>
            <Card className="p-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Today&apos;s Metabolic Snapshot</h3>
                  <p className="text-sm text-mutedForeground">
                    Recovery up, stress down. Continue reverse diet progression.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "HRV", value: "68 ms" },
                    { label: "RHR", value: "54 bpm" },
                    { label: "Sleep", value: "7.4 hrs" },
                    { label: "Recovery grade", value: "Good" }
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                        {item.label}
                      </p>
                      <p className="text-xl font-semibold text-foreground">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="rounded-md border border-border bg-muted p-3 text-sm text-mutedForeground">
                  Evidence note: Pre-sleep carbohydrate timing may improve sleep onset in
                  athletes (moderate confidence).
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section bg-muted/30"
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={0.1}
      >
        <div className="container">
          <SectionHeader
            title="Core System Pillars"
            subtitle="Built for serious athletes who need actionable, cited guidance."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature) => (
              <Card key={feature.title} className="p-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-mutedForeground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section"
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={0.2}
      >
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <SectionHeader
                title="Validated intervention thresholds"
                subtitle="Multi-biomarker triggers with clear action steps."
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {interventionTriggers.map((trigger) => (
                  <Card key={trigger.title} className="p-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{trigger.title}</h3>
                      {trigger.details.map((detail) => (
                        <p key={detail} className="text-sm text-mutedForeground">
                          • {detail}
                        </p>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <SectionHeader
                title="Evidence-backed recommendations"
                subtitle="Every change shows confidence, citation, and why."
              />
              <div className="space-y-4">
                {evidenceExamples.map((example) => (
                  <Card key={example.recommendation} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold">{example.recommendation}</h3>
                        <ConfidenceBadge level={example.confidence} />
                      </div>
                      <p className="text-sm text-mutedForeground">{example.source}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section bg-muted/30"
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={0.3}
      >
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <SectionHeader
                title="Key product experiences"
                subtitle="Six views that cover recovery, nutrition, and research."
              />
              <div className="space-y-2">
                {keyPages.map((item) => (
                  <p key={item} className="text-sm text-mutedForeground">
                    • {item}
                  </p>
                ))}
              </div>
            </div>
            <Card className="p-4">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Technical foundation</h3>
                {[
                  "Next.js 15 + TypeScript + Tailwind UI",
                  "Supabase-ready data layer with RLS and PITR",
                  "Terra API wearable coverage + fallback integrations",
                  "Research citation engine with GRADE confidence"
                ].map((item) => (
                  <p key={item} className="text-sm text-mutedForeground">
                    • {item}
                  </p>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="section"
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={0.4}
      >
        <div className="container">
          <Card className="p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Target outcomes</h3>
                <p className="text-sm text-mutedForeground">
                  • ±150 kcal TDEE accuracy after 4 weeks of data
                </p>
                <p className="text-sm text-mutedForeground">
                  • Reverse diet success with &lt;2 kg fat gain over 12 weeks
                </p>
                <p className="text-sm text-mutedForeground">
                  • HRV recovery to baseline within 8 weeks
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Built for trust</h3>
                <p className="text-sm text-mutedForeground">
                  • GRADE confidence indicators on every recommendation
                </p>
                <p className="text-sm text-mutedForeground">
                  • RED-S screening with supportive language and referrals
                </p>
                <p className="text-sm text-mutedForeground">
                  • HIPAA-focused architecture (encryption, audit logging, RLS)
                </p>
              </div>
            </div>
          </Card>
        </div>
      </motion.section>
    </>
  )
}
