"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"
import { MiniLineChart } from "@/components/charts/mini-line-chart"

type WeightEntry = {
  date: string
  weight_kg: number
}

export function WeightLog() {
  const [weight, setWeight] = useState("")
  const [entries, setEntries] = useState<WeightEntry[]>([])
  const [status, setStatus] = useState<string | null>(null)

  const loadEntries = async () => {
    const response = await fetch("/api/v1/progress/weight")
    if (!response.ok) return
    const data = await response.json()
    setEntries(data)
  }

  useEffect(() => {
    void loadEntries()
  }, [])

  const logWeight = async () => {
    setStatus("Saving...")
    const response = await fetch("/api/v1/progress/weight", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weightKg: Number(weight) })
    })
    if (!response.ok) {
      setStatus("Failed to log weight.")
      return
    }
    setWeight("")
    await loadEntries()
    setStatus("Logged.")
    setTimeout(() => setStatus(null), 1500)
  }

  const trend = entries.map((entry) => entry.weight_kg)
  const sevenDayAverage = trend.length >= 7
    ? trend.slice(-7).reduce((sum, val) => sum + val, 0) / 7
    : trend.length > 0
      ? trend.reduce((sum, val) => sum + val, 0) / trend.length
      : null

  // Calculate 7-day rolling average for each point
  const rollingAverage = trend.map((_, index) => {
    const start = Math.max(0, index - 6)
    const slice = trend.slice(start, index + 1)
    return slice.reduce((sum, val) => sum + val, 0) / slice.length
  })

  const goalWeight = 80 // This should come from user settings
  const allPoints = [...trend, goalWeight]
  const minWeight = Math.min(...allPoints)
  const maxWeight = Math.max(...allPoints)
  const range = maxWeight - minWeight || 1

  return (
    <div className="space-y-3">
      <div role="img" aria-label="Weight trend with 7-day rolling average and goal line" className="w-full">
        <svg viewBox="0 0 100 60" width="100%" height="140">
          {/* Goal line (dashed) */}
          {trend.length > 0 && (
            <line
              x1={0}
              y1={60 - ((goalWeight - minWeight) / range) * 60}
              x2={100}
              y2={60 - ((goalWeight - minWeight) / range) * 60}
              stroke="rgb(var(--color-info))"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.6"
            />
          )}
          {/* 7-day rolling average line */}
          {rollingAverage.length > 1 && (
            <path
              d={rollingAverage
                .map((value, index) => {
                  const x = (index / (rollingAverage.length - 1)) * 100
                  const y = 60 - ((value - minWeight) / range) * 60
                  return `${index === 0 ? "M" : "L"} ${x} ${y}`
                })
                .join(" ")}
              fill="none"
              stroke="rgb(var(--color-primary))"
              strokeWidth="2"
            />
          )}
          {/* Individual data points */}
          {trend.map((value, index) => {
            const x = (index / (trend.length - 1 || 1)) * 100
            const y = 60 - ((value - minWeight) / range) * 60
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="2"
                fill="rgb(var(--color-neutral-500))"
                opacity="0.6"
              />
            )
          })}
        </svg>
      </div>
      <div className="flex flex-wrap items-center gap-4 text-xs text-mutedForeground">
        {sevenDayAverage && (
          <span>
            7-day avg: <span className="font-semibold text-foreground">{sevenDayAverage.toFixed(1)} kg</span>
          </span>
        )}
        <span>
          Goal: <span className="font-semibold text-foreground">{goalWeight} kg</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-primary" /> Rolling avg
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2 w-2 border border-info" /> Goal line
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <FormField
          label="Log weight (kg)"
          value={weight}
          onChange={(event) => setWeight(event.target.value)}
          type="number"
          inputMode="decimal"
        />
        <div className="flex items-end">
          <Button className="h-12 px-4" onClick={logWeight} disabled={!weight}>
            Save weight
          </Button>
        </div>
      </div>
      {status ? <p className="text-xs text-mutedForeground" aria-live="polite">{status}</p> : null}
    </div>
  )
}
