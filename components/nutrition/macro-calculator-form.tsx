"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"

type MacroResult = {
  calories: number
  proteinG: number
  carbsG: number
  fatG: number
}

export function MacroCalculatorForm() {
  const [weightKg, setWeightKg] = useState("")
  const [bodyFat, setBodyFat] = useState("")
  const [trainingType, setTrainingType] = useState("mixed")
  const [goal, setGoal] = useState("reverse_diet")
  const [result, setResult] = useState<MacroResult | null>(null)
  const [status, setStatus] = useState<string | null>(null)

  const [errors, setErrors] = useState<Record<string, string>>({})

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
        goal
      })
    })
    if (!response.ok) {
      setStatus("Unable to calculate targets.")
      return
    }
    const data = await response.json()
    setResult(data)
    setStatus(null)
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
        <FormField
          label="Training type"
          helperText="Strength, endurance, mixed."
          value={trainingType}
          onChange={(event) => setTrainingType(event.target.value)}
        />
        <FormField
          label="Goal"
          helperText="Cut, maintain, reverse diet."
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
        />
      </div>
      {status ? <p className="text-xs text-mutedForeground" aria-live="polite">{status}</p> : null}
      <Button type="submit" className="h-12 px-4">
        Calculate targets
      </Button>
      {result ? (
        <div className="rounded-md border border-border p-3 text-sm text-mutedForeground">
          {result.calories} kcal · {result.proteinG}P · {result.carbsG}C · {result.fatG}F
        </div>
      ) : null}
    </form>
  )
}
