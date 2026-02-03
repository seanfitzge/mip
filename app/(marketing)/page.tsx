"use client"

import Link from "next/link"
import { SectionHeader } from "@/components/section-header"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
      {/* Hero Section - Experimental Design */}
      <motion.section
        className="relative section min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden py-12"
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={0}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
            className="absolute top-20 left-20 w-[500px] h-[500px] rounded-full bg-electricBlue/20 blur-[120px]"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              rotate: [0, -90, 0]
            }}
            transition={{ duration: 25, ease: "easeInOut", repeat: Infinity }}
            className="absolute bottom-20 right-20 w-[600px] h-[600px] rounded-full bg-deepPurple/20 blur-[120px]"
          />
        </div>

        <div className="container relative z-10">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-block"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-electricBlue/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neonCyan opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neonCyan"></span>
                  </span>
                  <span className="text-xs font-mono font-semibold uppercase tracking-ultra text-neonCyan">
                    Version 2.0 · Neural Active
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter">
                  <span className="text-gradient">Evidence-based</span>
                  <br />
                  <span className="text-foreground">nutrition,</span>
                  <br />
                  <span className="text-gradient">powered by</span>
                  <br />
                  <span className="text-neon">your biometrics.</span>
                </h1>
                
                <p className="text-lg text-ghost/80 body-text leading-relaxed max-w-xl">
                  A metabolic intelligence system that connects HRV, RHR, sleep, and training
                  load with research-cited recommendations and adaptive macro targets.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link href="/dashboard">
                  <Button variant="primary" className="text-base">
                    Request Early Access →
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline" className="text-base">
                    View Demo
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="space-y-3 pt-4"
              >
                {valueProps.map((value, i) => (
                  <motion.div
                    key={value}
                    initial={{ opacity: 0, x: -20 }}
                    animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-primary" />
                    <p className="text-sm text-ghost/70">{value}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right content - Floating card */}
            <motion.div
              initial={{ opacity: 0, x: 30, rotateY: -15 }}
              animate={shouldAnimate ? { opacity: 1, x: 0, rotateY: 0 } : { opacity: 0, x: 30, rotateY: -15 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative"
            >
              <Card className="p-8 float border-2 border-electricBlue/20">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-gradient">Today&apos;s Metabolic Snapshot</h3>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-3 h-3 rounded-full bg-laserGreen shadow-glow-success"
                      />
                    </div>
                    <p className="text-sm text-ghost/60">
                      Recovery up, stress down. Continue reverse diet progression.
                    </p>
                  </div>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "HRV", value: "68", unit: "ms", color: "laserGreen" },
                      { label: "RHR", value: "54", unit: "bpm", color: "neonCyan" },
                      { label: "Sleep", value: "7.4", unit: "hrs", color: "electricBlue" },
                      { label: "Recovery", value: "Good", unit: "", color: "plasmaPink" }
                    ].map((item) => (
                      <motion.div 
                        key={item.label}
                        whileHover={{ scale: 1.05 }}
                        className="glass p-4 rounded-lg border border-border/30 hover:border-electricBlue/50"
                      >
                        <p className="text-xs font-mono font-semibold uppercase tracking-ultra text-ghost/50 mb-2">
                          {item.label}
                        </p>
                        <p className={`text-3xl font-bold font-mono`}>
                          <span className={`text-${item.color}`}>{item.value}</span>
                          {item.unit && <span className="text-sm text-ghost/40 ml-1">{item.unit}</span>}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="glass rounded-lg p-4 border border-neonCyan/20">
                    <p className="text-xs font-mono text-ghost/70 leading-relaxed">
                      <span className="text-neonCyan font-semibold">INSIGHT:</span> Pre-sleep carbohydrate timing may improve sleep onset in athletes (moderate confidence).
                    </p>
                  </div>
                </div>
              </Card>

              {/* Floating orbs around card */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: 360
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-8 -right-8 w-16 h-16 rounded-full bg-gradient-primary blur-xl opacity-60"
              />
              <motion.div
                animate={{ 
                  y: [0, 20, 0],
                  rotate: -360
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-8 -left-8 w-20 h-20 rounded-full bg-gradient-accent blur-xl opacity-60"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Core System Pillars - Bento Grid Style */}
      <motion.section
        className="section relative"
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={0.1}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              <span className="text-gradient">Core System Pillars</span>
            </h2>
            <p className="text-lg text-ghost/70 max-w-2xl mx-auto">
              Built for serious athletes who need actionable, cited guidance.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featureCards.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              >
                <Card className="p-6 h-full hover:border-electricBlue/50 group">
                  <div className="space-y-4">
                    {/* Icon placeholder with gradient */}
                    <div className="w-12 h-12 rounded-lg bg-gradient-primary opacity-80 group-hover:opacity-100 flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white rounded-sm" />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold tracking-tight">{feature.title}</h3>
                      <p className="text-sm text-ghost/60 leading-relaxed">{feature.description}</p>
                    </div>

                    {/* Hover arrow */}
                    <motion.div
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: -10 }}
                      whileHover={{ x: 0 }}
                    >
                      <span className="text-xs font-mono text-neonCyan">→ Learn more</span>
                    </motion.div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Intervention Thresholds & Evidence */}
      <motion.section
        className="section relative"
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={0.2}
      >
        {/* Background accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-electricBlue/5 to-transparent" />
        
        <div className="container relative z-10">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Intervention Thresholds */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-gradient">
                  Validated intervention thresholds
                </h2>
                <p className="text-ghost/70">Multi-biomarker triggers with clear action steps.</p>
              </div>
              
              <div className="space-y-4">
                {interventionTriggers.map((trigger, i) => (
                  <motion.div
                    key={trigger.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                  >
                    <Card className="p-6 border-l-4 border-l-hotMagenta/50">
                      <div className="space-y-3">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-hotMagenta animate-pulse-glow" />
                          {trigger.title}
                        </h3>
                        <div className="space-y-2 pl-4">
                          {trigger.details.map((detail, j) => (
                            <motion.p 
                              key={j} 
                              className="text-sm text-ghost/70 font-mono leading-relaxed"
                              initial={{ opacity: 0, x: -10 }}
                              animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 + j * 0.05 }}
                            >
                              <span className="text-neonCyan">→</span> {detail}
                            </motion.p>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Evidence-backed Recommendations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-gradient">
                  Evidence-backed recommendations
                </h2>
                <p className="text-ghost/70">Every change shows confidence, citation, and why.</p>
              </div>
              
              <div className="space-y-4">
                {evidenceExamples.map((example, i) => (
                  <motion.div
                    key={example.recommendation}
                    initial={{ opacity: 0, y: 20 }}
                    animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                  >
                    <Card className="p-6 group hover:border-laserGreen/50">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="text-lg font-bold flex-1">{example.recommendation}</h3>
                          <ConfidenceBadge level={example.confidence} />
                        </div>
                        <div className="glass rounded-lg p-3 border border-border/30">
                          <p className="text-xs font-mono text-ghost/70">{example.source}</p>
                        </div>
                        <motion.div
                          className="flex items-center gap-2 text-xs font-mono text-laserGreen opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span>→ View full citation</span>
                        </motion.div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Key Product Experiences */}
      <motion.section
        className="section relative"
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={0.3}
      >
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left: Product Views */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-gradient">
                  Key product experiences
                </h2>
                <p className="text-ghost/70">Six views that cover recovery, nutrition, and research.</p>
              </div>
              
              <div className="space-y-3">
                {keyPages.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                    className="glass rounded-lg p-4 border border-border/30 hover:border-electricBlue/50 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-neonCyan" />
                      <p className="text-sm font-mono text-ghost/80 group-hover:text-foreground transition-colors">
                        {item}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Technical Foundation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Card className="p-8 h-full border-2 border-deepPurple/30">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center">
                      <span className="text-white font-mono font-bold text-lg">{ "{}" }</span>
                    </div>
                    <h3 className="text-2xl font-bold">Technical foundation</h3>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      "Next.js 15 + TypeScript + Tailwind UI",
                      "Supabase-ready data layer with RLS and PITR",
                      "Terra API wearable coverage + fallback integrations",
                      "Research citation engine with GRADE confidence"
                    ].map((item, i) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 20 }}
                        animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                        className="flex items-start gap-3 glass rounded-lg p-3 border border-border/20"
                      >
                        <span className="text-plasmaPink mt-0.5">→</span>
                        <p className="text-sm text-ghost/70 font-mono leading-relaxed">{item}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Target Outcomes & Trust - Final CTA */}
      <motion.section
        className="section relative overflow-hidden"
        initial="hidden"
        animate={shouldAnimate ? "visible" : "hidden"}
        variants={fadeInUp}
        custom={0.4}
      >
        {/* Dramatic background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-primary opacity-20 blur-[150px] rounded-full" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="p-12 border-2 border-electricBlue/30 relative overflow-hidden">
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
              
              <div className="relative z-10">
                <div className="grid gap-12 lg:grid-cols-2">
                  {/* Target Outcomes */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-laserGreen/30">
                        <span className="w-2 h-2 rounded-full bg-laserGreen animate-pulse-glow" />
                        <span className="text-xs font-mono uppercase tracking-ultra text-laserGreen">
                          Target Outcomes
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold">Built to deliver results</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        "±150 kcal TDEE accuracy after 4 weeks of data",
                        "Reverse diet success with <2 kg fat gain over 12 weeks",
                        "HRV recovery to baseline within 8 weeks"
                      ].map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: -20 }}
                          animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-md bg-gradient-success flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-voidBlack text-xs font-bold">✓</span>
                          </div>
                          <p className="text-sm text-ghost/80 leading-relaxed">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Built for Trust */}
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-neonCyan/30">
                        <span className="w-2 h-2 rounded-full bg-neonCyan animate-pulse-glow" />
                        <span className="text-xs font-mono uppercase tracking-ultra text-neonCyan">
                          Built for Trust
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold">Privacy & transparency first</h3>
                    </div>
                    <div className="space-y-4">
                      {[
                        "GRADE confidence indicators on every recommendation",
                        "RED-S screening with supportive language and referrals",
                        "HIPAA-focused architecture (encryption, audit logging, RLS)"
                      ].map((item, i) => (
                        <motion.div
                          key={item}
                          initial={{ opacity: 0, x: 20 }}
                          animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                          transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-md bg-gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                          <p className="text-sm text-ghost/80 leading-relaxed">{item}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Final CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="mt-12 text-center"
                >
                  <div className="inline-flex flex-col items-center gap-6">
                    <p className="text-lg text-ghost/70 max-w-xl">
                      Experience the future of metabolic intelligence. 
                      <span className="text-gradient font-semibold"> Join the waitlist today.</span>
                    </p>
                    <Link href="/dashboard">
                      <Button variant="neon" className="text-lg px-12">
                        Get Early Access →
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}
