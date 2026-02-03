"use client"

import { useState, useEffect } from "react"
import { SectionHeader } from "@/components/section-header"
import { Card } from "@/components/ui/card"
import { MacroCalculatorForm } from "@/components/nutrition/macro-calculator-form"
import { DietPhaseQuestionnaire, type DietPhaseInfo } from "@/components/nutrition/diet-phase-questionnaire"
import type { MacroTargets } from "@/types/macros"

export default function SettingsPage() {
  const [macros, setMacros] = useState<MacroTargets | null>(null)
  const [dietPhaseInfo, setDietPhaseInfo] = useState<DietPhaseInfo | null>(null)
  const [showQuestionnaire, setShowQuestionnaire] = useState(false)
  const [hasTargets, setHasTargets] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMacros()
  }, [])

  const loadMacros = async () => {
    try {
      const response = await fetch("/api/v1/nutrition/targets/current")
      if (response.ok) {
        const data = await response.json()
        if (data && data.calories && data.calories > 0) {
          setMacros(data)
          setHasTargets(true)
          setShowQuestionnaire(false)
        } else {
          setHasTargets(false)
          setShowQuestionnaire(true)
        }
      } else {
        setHasTargets(false)
        setShowQuestionnaire(true)
      }
    } catch (error) {
      console.error("Error loading macros:", error)
      setHasTargets(false)
      setShowQuestionnaire(true)
    } finally {
      setLoading(false)
    }
  }

  const handleQuestionnaireComplete = (info: DietPhaseInfo) => {
    setDietPhaseInfo(info)
    setShowQuestionnaire(false)
  }

  const handleTargetsSaved = async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    await loadMacros()
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Settings"
        subtitle="Configure your nutrition targets and preferences."
      />

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Macro Targets</h3>
            <p className="text-sm text-mutedForeground mt-1">
              Set your nutrition targets based on your diet phase and goals. These targets are designed to be stable and shouldn&apos;t need frequent changes.
            </p>
          </div>

          {loading ? (
            <p className="text-sm text-mutedForeground">Loading...</p>
          ) : showQuestionnaire && !hasTargets ? (
            <div className="space-y-4">
              <DietPhaseQuestionnaire onComplete={handleQuestionnaireComplete} />
            </div>
          ) : hasTargets && macros ? (
            <div className="space-y-4">
              <div className="rounded-md border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm font-semibold text-primary mb-2">Current Targets</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                      Calories
                    </p>
                    <p className="text-xl font-bold text-foreground">{macros.calories}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                      Protein
                    </p>
                    <p className="text-xl font-bold text-foreground">{macros.proteinG} g</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                      Carbs
                    </p>
                    <p className="text-xl font-bold text-foreground">{macros.carbsG} g</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                      Fat
                    </p>
                    <p className="text-xl font-bold text-foreground">{macros.fatG} g</p>
                  </div>
                </div>
                {macros.adjustmentReason && (
                  <p className="text-xs text-mutedForeground mt-3">{macros.adjustmentReason}</p>
                )}
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold mb-3">Recalculate Targets</p>
                <p className="text-xs text-mutedForeground mb-4">
                  Only recalculate if your weight, training, or diet phase has changed significantly.
                </p>
                <MacroCalculatorForm dietPhaseInfo={dietPhaseInfo ?? undefined} onTargetsSaved={handleTargetsSaved} />
              </div>
            </div>
          ) : (
            <MacroCalculatorForm dietPhaseInfo={dietPhaseInfo ?? undefined} onTargetsSaved={handleTargetsSaved} />
          )}
        </div>
      </Card>
    </div>
  )
}
