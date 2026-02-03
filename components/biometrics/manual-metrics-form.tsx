"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"

type ManualMetricsFormData = {
  date: string
  hrvRmssdMs: string
  restingHrBpm: string
  sleepDurationHrs: string
  sleepQualityScore: string
  deepSleepHrs: string
  remSleepHrs: string
  lightSleepHrs: string
  sleepEfficiencyPercent: string
  steps: string
  activeCalories: string
  trainingLoad: string
  recoveryTimeHrs: string
  sourceDevice: string
}

const initialFormData: ManualMetricsFormData = {
  date: new Date().toISOString().split("T")[0],
  hrvRmssdMs: "",
  restingHrBpm: "",
  sleepDurationHrs: "",
  sleepQualityScore: "",
  deepSleepHrs: "",
  remSleepHrs: "",
  lightSleepHrs: "",
  sleepEfficiencyPercent: "",
  steps: "",
  activeCalories: "",
  trainingLoad: "",
  recoveryTimeHrs: "",
  sourceDevice: "manual"
}

export function ManualMetricsForm() {
  const [formData, setFormData] = useState<ManualMetricsFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleInputChange = (field: keyof ManualMetricsFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch("/api/v1/biometrics/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: formData.date,
          hrv_rmssd_ms: formData.hrvRmssdMs ? parseFloat(formData.hrvRmssdMs) : null,
          resting_hr_bpm: formData.restingHrBpm ? parseInt(formData.restingHrBpm) : null,
          sleep_duration_hrs: formData.sleepDurationHrs ? parseFloat(formData.sleepDurationHrs) : null,
          sleep_quality_score: formData.sleepQualityScore ? parseInt(formData.sleepQualityScore) : null,
          deep_sleep_hrs: formData.deepSleepHrs ? parseFloat(formData.deepSleepHrs) : null,
          rem_sleep_hrs: formData.remSleepHrs ? parseFloat(formData.remSleepHrs) : null,
          light_sleep_hrs: formData.lightSleepHrs ? parseFloat(formData.lightSleepHrs) : null,
          sleep_efficiency_percent: formData.sleepEfficiencyPercent
            ? parseInt(formData.sleepEfficiencyPercent)
            : null,
          steps: formData.steps ? parseInt(formData.steps) : null,
          active_calories: formData.activeCalories ? parseInt(formData.activeCalories) : null,
          training_load: formData.trainingLoad ? parseInt(formData.trainingLoad) : null,
          recovery_time_hrs: formData.recoveryTimeHrs ? parseInt(formData.recoveryTimeHrs) : null,
          source_device: formData.sourceDevice
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to save metrics")
      }

      setMessage({ type: "success", text: "Metrics saved successfully! Page will refresh." })
      setFormData(initialFormData)

      // Refresh the page after a short delay to show updated data
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Failed to save metrics"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Manual Health Metrics Input</h3>
            <p className="text-sm text-mutedForeground">
              Enter your daily health metrics (mimics wearable device data)
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">
              Date *
            </label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              required
            />
          </div>

          {/* Core Metrics - Always Visible */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-mutedForeground">Core Metrics</h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="hrv" className="text-sm font-medium">
                  Overnight HRV (ms) *
                </label>
                <Input
                  id="hrv"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 45.5"
                  value={formData.hrvRmssdMs}
                  onChange={(e) => handleInputChange("hrvRmssdMs", e.target.value)}
                  required
                />
                <p className="text-xs text-mutedForeground">Heart Rate Variability (RMSSD)</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="rhr" className="text-sm font-medium">
                  Resting Heart Rate (bpm) *
                </label>
                <Input
                  id="rhr"
                  type="number"
                  placeholder="e.g., 58"
                  value={formData.restingHrBpm}
                  onChange={(e) => handleInputChange("restingHrBpm", e.target.value)}
                  required
                />
                <p className="text-xs text-mutedForeground">Morning RHR</p>
              </div>

              <div className="space-y-2">
                <label htmlFor="sleepDuration" className="text-sm font-medium">
                  Sleep Duration (hours) *
                </label>
                <Input
                  id="sleepDuration"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 7.5"
                  value={formData.sleepDurationHrs}
                  onChange={(e) => handleInputChange("sleepDurationHrs", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="sleepQuality" className="text-sm font-medium">
                  Sleep Quality Score (0-100) *
                </label>
                <Input
                  id="sleepQuality"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g., 85"
                  value={formData.sleepQualityScore}
                  onChange={(e) => handleInputChange("sleepQualityScore", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Advanced Metrics - Collapsible */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm font-semibold text-mutedForeground hover:text-foreground"
            >
              <span>{showAdvanced ? "▼" : "▶"}</span>
              <span>Advanced Metrics (Optional)</span>
            </button>

            {showAdvanced && (
              <div className="space-y-4 rounded-lg border p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="deepSleep" className="text-sm font-medium">
                      Deep Sleep (hours)
                    </label>
                    <Input
                      id="deepSleep"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 1.5"
                      value={formData.deepSleepHrs}
                      onChange={(e) => handleInputChange("deepSleepHrs", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="remSleep" className="text-sm font-medium">
                      REM Sleep (hours)
                    </label>
                    <Input
                      id="remSleep"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 1.8"
                      value={formData.remSleepHrs}
                      onChange={(e) => handleInputChange("remSleepHrs", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lightSleep" className="text-sm font-medium">
                      Light Sleep (hours)
                    </label>
                    <Input
                      id="lightSleep"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 4.2"
                      value={formData.lightSleepHrs}
                      onChange={(e) => handleInputChange("lightSleepHrs", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="sleepEfficiency" className="text-sm font-medium">
                      Sleep Efficiency (%)
                    </label>
                    <Input
                      id="sleepEfficiency"
                      type="number"
                      min="0"
                      max="100"
                      placeholder="e.g., 92"
                      value={formData.sleepEfficiencyPercent}
                      onChange={(e) => handleInputChange("sleepEfficiencyPercent", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="steps" className="text-sm font-medium">
                      Steps
                    </label>
                    <Input
                      id="steps"
                      type="number"
                      placeholder="e.g., 8500"
                      value={formData.steps}
                      onChange={(e) => handleInputChange("steps", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="activeCalories" className="text-sm font-medium">
                      Active Calories Burned
                    </label>
                    <Input
                      id="activeCalories"
                      type="number"
                      placeholder="e.g., 450"
                      value={formData.activeCalories}
                      onChange={(e) => handleInputChange("activeCalories", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="trainingLoad" className="text-sm font-medium">
                      Training Load
                    </label>
                    <Input
                      id="trainingLoad"
                      type="number"
                      placeholder="e.g., 250"
                      value={formData.trainingLoad}
                      onChange={(e) => handleInputChange("trainingLoad", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="recoveryTime" className="text-sm font-medium">
                      Recovery Time (hours)
                    </label>
                    <Input
                      id="recoveryTime"
                      type="number"
                      placeholder="e.g., 24"
                      value={formData.recoveryTimeHrs}
                      onChange={(e) => handleInputChange("recoveryTimeHrs", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Source Device */}
          <div className="space-y-2">
            <label htmlFor="sourceDevice" className="text-sm font-medium">
              Data Source
            </label>
            <Select
              id="sourceDevice"
              value={formData.sourceDevice}
              onChange={(e) => handleInputChange("sourceDevice", e.target.value)}
            >
              <option value="manual">Manual Entry</option>
              <option value="whoop">WHOOP</option>
              <option value="garmin">Garmin</option>
              <option value="oura">Oura Ring</option>
              <option value="apple_watch">Apple Watch</option>
              <option value="fitbit">Fitbit</option>
              <option value="other">Other</option>
            </Select>
          </div>

          {/* Status Message */}
          {message && (
            <div
              className={`rounded-lg border p-3 text-sm ${
                message.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
                  : "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting ? "Saving..." : "Save Daily Metrics"}
          </Button>
        </form>

        {/* Help Text */}
        <div className="space-y-2 rounded-lg bg-muted p-4 text-sm">
          <p className="font-medium">Where to find these metrics:</p>
          <ul className="space-y-1 text-mutedForeground">
            <li>• WHOOP: Recovery screen (HRV, RHR, Sleep)</li>
            <li>• Garmin: Morning Report or Health Stats</li>
            <li>• Oura Ring: Readiness tab (HRV, RHR, Sleep)</li>
            <li>• Apple Watch: Health app → Heart → Heart Rate Variability</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
