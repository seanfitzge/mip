"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { Select } from "@/components/ui/select"
import type { DietPhaseInfo } from "./diet-phase-questionnaire"

type MacroResult = {
  calories: number
  proteinG: number
  carbsG: number
  fatG: number
}

type MacroCalculatorFormProps = {
  dietPhaseInfo?: DietPhaseInfo
  onTargetsSaved?: () => void
}

export function MacroCalculatorForm({ dietPhaseInfo, onTargetsSaved }: MacroCalculatorFormProps) {
  const [weightKg, setWeightKg] = useState("")
  const [bodyFat, setBodyFat] = useState("")
  const [trainingType, setTrainingType] = useState("mixed")
  const [dietType, setDietType] = useState<string>(dietPhaseInfo?.phase ?? "")
  const [result, setResult] = useState<MacroResult | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [hasSavedTargets, setHasSavedTargets] = useState(false)

  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (dietPhaseInfo?.phase) {
      setDietType(dietPhaseInfo.phase)
    }
  }, [dietPhaseInfo])

  useEffect(() => {
    checkExistingTargets()
  }, [])

  const checkExistingTargets = async () => {
    try {
      const response = await fetch("/api/v1/nutrition/targets/history")
      if (response.ok) {
        const data = await response.json()
        if (data && data.length > 0) {
          setHasSavedTargets(true)
          const latest = data[0]
          setResult({
            calories: latest.calories,
            proteinG: latest.protein_g,
            carbsG: latest.carbs_g,
            fatG: latest.fat_g
          })
        }
      }
    } catch (error) {
      // Silently fail - user can still calculate
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!weightKg || Number(weightKg) <= 0) {
      newErrors.weightKg = "Weight is required and must be greater than 0"
    }
    if (bodyFat && (Number(bodyFat) < 0 || Number(bodyFat) > 100)) {
      newErrors.bodyFat = "Body fat percentage must be between 0 and 100"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validate()) return
    
    setStatus("Calculating...")
    const response = await fetch("/api/v1/nutrition/calculate-targets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weightKg: Number(weightKg ?? 0),
        bodyFatPercent: bodyFat ? Number(bodyFat) : null,
        trainingType,
        goal: dietType,
        dietPhaseInfo: dietPhaseInfo,
        forceRecalculate: hasSavedTargets // Force recalculation if targets already exist
      })
    })
    if (!response.ok) {
      setStatus("Unable to calculate targets.")
      return
    }
    const data = await response.json()
    setResult(data)
    setHasSavedTargets(true)
    setStatus(null)
    if (onTargetsSaved) {
      onTargetsSaved()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <FormField
          label="Weight (kg)"
          helperText="Used to estimate protein range."
          value={weightKg}
          onChange={(event) => {
            setWeightKg(event.target.value)
            if (errors.weightKg) {
              setErrors((prev) => ({ ...prev, weightKg: "" }))
            }
          }}
          errorText={errors.weightKg}
          type="number"
          inputMode="decimal"
          required
        />
        <FormField
          label="Body fat %"
          helperText="Optional for lean mass targets."
          value={bodyFat}
          onChange={(event) => {
            setBodyFat(event.target.value)
            if (errors.bodyFat) {
              setErrors((prev) => ({ ...prev, bodyFat: "" }))
            }
          }}
          errorText={errors.bodyFat}
          type="number"
          inputMode="decimal"
        />
        <Select
          label="Training type"
          helperText="Strength, endurance, mixed."
          value={trainingType}
          onChange={(event) => setTrainingType(event.target.value)}
        >
          <option value="strength">Strength</option>
          <option value="mixed">Mixed</option>
          <option value="endurance">Endurance</option>
          <option value="low_volume">Low Volume</option>
        </Select>
        <Select
          label="Diet type"
          helperText="Your current diet phase"
          value={dietType}
          onChange={(event) => setDietType(event.target.value)}
          required
        >
          <option value="" disabled>Select diet type...</option>
          <option value="deficit">Deficit / Cutting</option>
          <option value="maintenance">Maintenance</option>
          <option value="reverse_diet">Reverse Diet</option>
          <option value="bulk">Bulk / Surplus</option>
          <option value="performance">Performance / Athletic</option>
        </Select>
      </div>
      {status ? <p className="text-xs text-mutedForeground" aria-live="polite">{status}</p> : null}
      {hasSavedTargets && result && (
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3 text-sm">
          <p className="font-semibold text-primary">Using saved targets</p>
          <p className="text-mutedForeground mt-1">
            {result.calories} kcal · {result.proteinG}P · {result.carbsG}C · {result.fatG}F
          </p>
        </div>
      )}
      <Button type="submit" className="h-12 px-4 w-full">
        {hasSavedTargets ? "Recalculate targets" : "Calculate & save targets"}
      </Button>
      {result && !hasSavedTargets && (
        <div className="rounded-md border border-border p-3 text-sm text-mutedForeground">
          <p className="font-semibold mb-1">Calculated targets:</p>
          <p>{result.calories} kcal · {result.proteinG}P · {result.carbsG}C · {result.fatG}F</p>
          <p className="text-xs mt-2 text-mutedForeground">Targets have been saved. Use these going forward.</p>
        </div>
      )}
    </form>
  )
}
