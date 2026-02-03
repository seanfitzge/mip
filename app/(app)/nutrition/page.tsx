"use client"

import { useState, useEffect } from "react"
import { SectionHeader } from "@/components/section-header"
import { ConfidenceBadge } from "@/components/confidence-badge"
import { Card } from "@/components/ui/card"
import { MacroCalculatorForm } from "@/components/nutrition/macro-calculator-form"
import { NutritionLogPanel } from "@/components/nutrition/nutrition-log-panel"
import { DietPhaseQuestionnaire, type DietPhaseInfo } from "@/components/nutrition/diet-phase-questionnaire"
import type { MacroTargets } from "@/types/macros"

export default function NutritionPage() {
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
        if (data && data.calories > 0) {
          setMacros(data)
          setHasTargets(true)
          setShowQuestionnaire(false)
        } else {
          setShowQuestionnaire(true)
        }
      } else {
        setShowQuestionnaire(true)
      }
    } catch (error) {
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
    await loadMacros()
  }

  // Use default macros if none loaded yet
  const displayMacros: MacroTargets = macros ?? {
    calories: 0,
    proteinG: 0,
    carbsG: 0,
    fatG: 0,
    confidenceLevel: "MODERATE",
    proteinCitationDoi: "",
    carbCitationDoi: "",
    fatCitationDoi: ""
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Nutrition targets"
        subtitle="Evidence-based macro ranges and daily logging."
      />
      
      {loading ? (
        <Card className="p-4">
          <p className="text-sm text-mutedForeground">Loading...</p>
        </Card>
      ) : showQuestionnaire && !hasTargets ? (
        <DietPhaseQuestionnaire onComplete={handleQuestionnaireComplete} />
      ) : hasTargets && displayMacros.calories > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Today&apos;s targets</h3>
                <ConfidenceBadge level={displayMacros.confidenceLevel} />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                    Calories
                  </p>
                  <p className="text-2xl font-bold text-foreground">{displayMacros.calories}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                    Protein
                  </p>
                  <p className="text-2xl font-bold text-foreground">{displayMacros.proteinG} g</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                    Carbs
                  </p>
                  <p className="text-2xl font-bold text-foreground">{displayMacros.carbsG} g</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                    Fat
                  </p>
                  <p className="text-2xl font-bold text-foreground">{displayMacros.fatG} g</p>
                </div>
              </div>
              {displayMacros.adjustmentReason && (
                <p className="text-sm text-mutedForeground">{displayMacros.adjustmentReason}</p>
              )}
              {displayMacros.proteinCitationDoi && (
                <div className="flex flex-wrap gap-3 text-xs text-primary">
                  <a href={`https://doi.org/${displayMacros.proteinCitationDoi}`} target="_blank" rel="noreferrer">
                    Protein DOI
                  </a>
                  <a href={`https://doi.org/${displayMacros.carbCitationDoi}`} target="_blank" rel="noreferrer">
                    Carb DOI
                  </a>
                  <a href={`https://doi.org/${displayMacros.fatCitationDoi}`} target="_blank" rel="noreferrer">
                    Fat DOI
                  </a>
                </div>
              )}
            </div>
          </Card>

          <Card className="p-4">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Macro calculator</h3>
              <MacroCalculatorForm dietPhaseInfo={dietPhaseInfo ?? undefined} onTargetsSaved={handleTargetsSaved} />
            </div>
          </Card>
        </div>
      ) : (
        <Card className="p-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Macro calculator</h3>
            <MacroCalculatorForm dietPhaseInfo={dietPhaseInfo ?? undefined} onTargetsSaved={handleTargetsSaved} />
          </div>
        </Card>
      )}

      {hasTargets && displayMacros.calories > 0 && (
        <NutritionLogPanel macros={displayMacros} />
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Evidence-based macro ranges</h3>
            <p className="text-sm text-mutedForeground">
              Protein: 2.0-2.7 g/kg during deficit, 1.6-2.2 g/kg maintenance.
            </p>
            <p className="text-sm text-mutedForeground">
              Carbs: 3-5 g/kg strength, 5-7 g/kg mixed, 6-10 g/kg endurance.
            </p>
            <p className="text-sm text-mutedForeground">
              Fat minimums: 20% of calories to protect hormones (sex-specific thresholds).
            </p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Nutrient timing guidance</h3>
            <p className="text-sm text-mutedForeground">
              Primary: hit daily protein, carbs, and fat targets first.
            </p>
            <p className="text-sm text-mutedForeground">
              Secondary: 0.4 g/kg protein per meal across 4+ meals, 3-4h apart.
            </p>
            <p className="text-sm text-mutedForeground">
              Optional: shift 20-30 g carbs to evening when sleep &lt;70 for 3+ nights.
            </p>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Energy availability safeguards</h3>
          <p className="text-sm text-mutedForeground">
            Females: clinical &lt;30 kcal/kg FFM, subclinical &lt;45 kcal/kg FFM for 5+ days.
          </p>
          <p className="text-sm text-mutedForeground">
            Males: clinical &lt;25 kcal/kg FFM, subclinical &lt;40 kcal/kg FFM for 14+ days.
          </p>
          <p className="text-sm text-mutedForeground">
            If thresholds are crossed, the system increases intake and recommends recovery.
          </p>
        </div>
      </Card>
    </div>
  )
}
