"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { Select } from "@/components/ui/select"
import { Card } from "@/components/ui/card"

export type DietPhaseInfo = {
  phase: "deficit" | "maintenance" | "reverse_diet" | "bulk" | "performance"
  deficitDurationWeeks?: number
  currentDeficitPercent?: number
  hasBeenInDeficit: boolean
  deficitDepth?: "moderate" | "severe" | "extreme"
  weightLossRate?: number
  metabolicSymptoms?: string[]
}

type QuestionnaireStep = 
  | "initial"
  | "deficit_check"
  | "deficit_details"
  | "deficit_depth"
  | "reverse_diet_check"
  | "complete"

export function DietPhaseQuestionnaire({
  onComplete
}: {
  onComplete: (info: DietPhaseInfo) => void
}) {
  const [step, setStep] = useState<QuestionnaireStep>("initial")
  const [info, setInfo] = useState<Partial<DietPhaseInfo>>({})

  const handleInitialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const phase = formData.get("diet_type") as DietPhaseInfo["phase"]
    
    setInfo({ phase })
    
    if (phase === "deficit" || phase === "reverse_diet") {
      setStep("deficit_check")
    } else {
      setStep("complete")
    }
  }

  const handleDeficitCheck = (hasBeenInDeficit: boolean) => {
    setInfo(prev => ({ ...prev, hasBeenInDeficit }))
    
    if (hasBeenInDeficit) {
      setStep("deficit_details")
    } else {
      setStep("complete")
    }
  }

  const handleDeficitDetails = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const duration = Number(formData.get("duration"))
    const deficitPercent = Number(formData.get("deficit_percent"))
    const weightLoss = Number(formData.get("weight_loss"))
    
    setInfo(prev => ({
      ...prev,
      deficitDurationWeeks: duration,
      currentDeficitPercent: deficitPercent,
      weightLossRate: weightLoss
    }))
    
    setStep("deficit_depth")
  }

  const handleDeficitDepth = (depth: "moderate" | "severe" | "extreme") => {
    setInfo(prev => ({ ...prev, deficitDepth: depth }))
    
    if (info.phase === "reverse_diet") {
      setStep("complete")
    } else {
      setStep("complete")
    }
  }

  const handleComplete = () => {
    const completeInfo: DietPhaseInfo = {
      phase: info.phase!,
      hasBeenInDeficit: info.hasBeenInDeficit ?? false,
      deficitDurationWeeks: info.deficitDurationWeeks,
      currentDeficitPercent: info.currentDeficitPercent,
      deficitDepth: info.deficitDepth,
      weightLossRate: info.weightLossRate,
      metabolicSymptoms: info.metabolicSymptoms
    }
    onComplete(completeInfo)
  }

  if (step === "initial") {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Determine Your Diet Phase</h3>
            <p className="text-sm text-mutedForeground mt-1">
              Help us understand your current nutrition phase to provide accurate targets.
            </p>
          </div>
          <form onSubmit={handleInitialSubmit} className="space-y-4">
            <Select
              label="What is your current diet type?"
              helperText="Select the phase that best describes your current approach"
              name="diet_type"
              required
              defaultValue=""
            >
              <option value="" disabled>Select diet type...</option>
              <option value="deficit">Deficit / Cutting</option>
              <option value="maintenance">Maintenance</option>
              <option value="reverse_diet">Reverse Diet (post-deficit recovery)</option>
              <option value="bulk">Bulk / Surplus</option>
              <option value="performance">Performance / Athletic</option>
            </Select>
            <Button type="submit" className="w-full h-12">
              Continue
            </Button>
          </form>
        </div>
      </Card>
    )
  }

  if (step === "deficit_check") {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Deficit History</h3>
            <p className="text-sm text-mutedForeground mt-1">
              Have you been in a calorie deficit recently?
            </p>
          </div>
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 justify-start"
              onClick={() => handleDeficitCheck(true)}
            >
              Yes, I&apos;ve been in a deficit
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 justify-start"
              onClick={() => handleDeficitCheck(false)}
            >
              No, I haven&apos;t been in a deficit
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  if (step === "deficit_details") {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Deficit Details</h3>
            <p className="text-sm text-mutedForeground mt-1">
              Help us understand your deficit history for better recommendations.
            </p>
          </div>
          <form onSubmit={handleDeficitDetails} className="space-y-4">
            <FormField
              label="How long have you been in deficit? (weeks)"
              helperText="Total duration of your current or most recent deficit"
              name="duration"
              type="number"
              inputMode="numeric"
              min="1"
              required
            />
            <FormField
              label="Current deficit percentage (%)"
              helperText="Approximate % below maintenance (e.g., 20 for 20% deficit)"
              name="deficit_percent"
              type="number"
              inputMode="decimal"
              min="0"
              max="50"
              required
            />
            <FormField
              label="Average weight loss per week (lbs)"
              helperText="Your typical weekly weight loss rate"
              name="weight_loss"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.1"
              required
            />
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setStep("deficit_check")}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </Card>
    )
  }

  if (step === "deficit_depth") {
    const duration = info.deficitDurationWeeks ?? 0
    const deficitPercent = info.currentDeficitPercent ?? 0
    const weightLoss = info.weightLossRate ?? 0

    let suggestedDepth: "moderate" | "severe" | "extreme" = "moderate"
    if (duration >= 16 || deficitPercent >= 30 || weightLoss >= 1.5) {
      suggestedDepth = "extreme"
    } else if (duration >= 8 || deficitPercent >= 20 || weightLoss >= 1.0) {
      suggestedDepth = "severe"
    }

    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Deficit Depth Assessment</h3>
            <p className="text-sm text-mutedForeground mt-1">
              Based on your responses, we suggest: <strong>{suggestedDepth}</strong>
            </p>
          </div>
          <div className="space-y-3">
            <Button
              type="button"
              variant={suggestedDepth === "moderate" ? "default" : "outline"}
              className="w-full h-12 justify-start"
              onClick={() => handleDeficitDepth("moderate")}
            >
              Moderate - Short duration (&lt;8 weeks) or small deficit (&lt;20%)
            </Button>
            <Button
              type="button"
              variant={suggestedDepth === "severe" ? "default" : "outline"}
              className="w-full h-12 justify-start"
              onClick={() => handleDeficitDepth("severe")}
            >
              Severe - 8-16 weeks or 20-30% deficit
            </Button>
            <Button
              type="button"
              variant={suggestedDepth === "extreme" ? "default" : "outline"}
              className="w-full h-12 justify-start"
              onClick={() => handleDeficitDepth("extreme")}
            >
              Extreme - 16+ weeks or 30%+ deficit
            </Button>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setStep("deficit_details")}
            >
              Back
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  if (step === "complete") {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Questionnaire Complete</h3>
            <p className="text-sm text-mutedForeground mt-1">
              Ready to calculate your macro targets based on your diet phase.
            </p>
          </div>
          <div className="rounded-md bg-muted p-3 text-sm">
            <p className="font-semibold">Selected Phase: {info.phase}</p>
            {info.hasBeenInDeficit && (
              <div className="mt-2 space-y-1 text-xs text-mutedForeground">
                {info.deficitDurationWeeks && (
                  <p>Deficit duration: {info.deficitDurationWeeks} weeks</p>
                )}
                {info.currentDeficitPercent && (
                  <p>Deficit: {info.currentDeficitPercent}%</p>
                )}
                {info.deficitDepth && (
                  <p>Depth: {info.deficitDepth}</p>
                )}
              </div>
            )}
          </div>
          <Button
            type="button"
            className="w-full h-12"
            onClick={handleComplete}
          >
            Calculate Targets
          </Button>
        </div>
      </Card>
    )
  }

  return null
}
