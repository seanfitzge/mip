"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { MacroTargets } from "@/types/macros"

type FoodResult = {
  fdcId: number
  description: string
  calories: number
  protein: number
  carbs: number
  fat: number
}

type NutritionLog = {
  id: string
  meal_name: string
  meal_time: string
  calories: number
  protein_g: number
  carbs_g: number
  fat_g: number
}

export function NutritionLogPanel({ macros }: { macros: MacroTargets }) {
  const [query, setQuery] = useState("")
  const [foods, setFoods] = useState<FoodResult[]>([])
  const [logs, setLogs] = useState<NutritionLog[]>([])
  const [status, setStatus] = useState<string | null>(null)

  const loadLogs = async () => {
    const response = await fetch("/api/v1/nutrition/logs")
    if (!response.ok) return
    const data = await response.json()
    setLogs(data)
  }

  useEffect(() => {
    void loadLogs()
  }, [])

  const totals = useMemo(() => {
    return logs.reduce(
      (acc, log) => {
        acc.calories += Number(log.calories ?? 0)
        acc.protein += Number(log.protein_g ?? 0)
        acc.carbs += Number(log.carbs_g ?? 0)
        acc.fat += Number(log.fat_g ?? 0)
        return acc
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    )
  }, [logs])

  const searchFoods = async () => {
    if (!query) return
    setStatus("Searching foods...")
    const response = await fetch(`/api/v1/foods/search?q=${encodeURIComponent(query)}`)
    if (!response.ok) {
      setStatus("Food search failed.")
      return
    }
    const data = await response.json()
    setFoods(data)
    setStatus(null)
  }

  const logFood = async (food: FoodResult) => {
    setStatus("Logging meal...")
    const response = await fetch("/api/v1/nutrition/log-meal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mealName: food.description,
        calories: food.calories,
        proteinG: food.protein,
        carbsG: food.carbs,
        fatG: food.fat
      })
    })
    if (!response.ok) {
      setStatus("Failed to log meal.")
      return
    }
    await loadLogs()
    setStatus("Logged.")
    setTimeout(() => setStatus(null), 1500)
  }

  const quickFavorites = [
    { name: "Eggs", calories: 155, protein: 13, carbs: 1, fat: 11 },
    { name: "Oats", calories: 389, protein: 17, carbs: 66, fat: 7 },
    { name: "Chicken", calories: 165, protein: 31, carbs: 0, fat: 4 },
    { name: "Rice", calories: 130, protein: 2, carbs: 28, fat: 0 },
    { name: "Salmon", calories: 206, protein: 22, carbs: 0, fat: 12 }
  ]

  const logQuickFood = async (food: typeof quickFavorites[0]) => {
    setStatus("Logging meal...")
    const response = await fetch("/api/v1/nutrition/log-meal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mealName: food.name,
        calories: food.calories,
        proteinG: food.protein,
        carbsG: food.carbs,
        fatG: food.fat
      })
    })
    if (!response.ok) {
      setStatus("Failed to log meal.")
      return
    }
    await loadLogs()
    setStatus("Logged.")
    setTimeout(() => setStatus(null), 1500)
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-md border border-border bg-card p-4">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Log food</h3>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex-1">
              <Input
                placeholder="Search foods..."
                aria-label="Search foods"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    searchFoods()
                  }
                }}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                className="h-12 w-12 p-0"
                aria-label="Camera capture"
                title="Camera capture"
              >
                📷
              </Button>
              <Button
                variant="ghost"
                className="h-12 w-12 p-0"
                aria-label="Voice input"
                title="Voice input"
              >
                🎤
              </Button>
              <Button variant="secondary" className="h-12 px-4" onClick={searchFoods}>
                Search
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
              Quick add
            </p>
            <div className="flex flex-wrap gap-2">
              {quickFavorites.map((food) => (
                <Button
                  key={food.name}
                  variant="secondary"
                  className="h-10 px-3 text-xs"
                  onClick={() => logQuickFood(food)}
                >
                  {food.name}
                </Button>
              ))}
              <Button variant="ghost" className="h-10 w-10 p-0 text-xs" aria-label="Add more favorites">
                +
              </Button>
            </div>
          </div>
          {status ? <p className="text-xs text-mutedForeground">{status}</p> : null}
          {foods.length > 0 ? (
            <div className="space-y-2">
              {foods.map((food) => (
                <div key={food.fdcId} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{food.description}</p>
                    <p className="text-xs text-mutedForeground">{food.calories} kcal</p>
                  </div>
                  <p className="text-xs text-mutedForeground">
                    P:{food.protein} C:{food.carbs} F:{food.fat}
                  </p>
                  <div className="mt-2 flex justify-end">
                    <Button className="h-9 px-3 text-xs" onClick={() => logFood(food)}>
                      Log this
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
                Recent meals
              </p>
              <div className="flex gap-2">
                <button
                  className="text-xs font-semibold text-primary hover:underline"
                  onClick={loadLogs}
                >
                  Copy yesterday
                </button>
                <button
                  className="text-xs font-semibold text-primary hover:underline"
                  onClick={loadLogs}
                >
                  Refresh
                </button>
              </div>
            </div>
            <div className="mt-2 space-y-2">
              {logs.map((entry) => (
                <div key={entry.id} className="rounded-md border border-border p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">
                      {entry.meal_name} · {new Date(entry.meal_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <p className="text-xs text-mutedForeground">{entry.calories} kcal</p>
                  </div>
                  <p className="text-xs text-mutedForeground">
                    P:{entry.protein_g} C:{entry.carbs_g} F:{entry.fat_g}
                  </p>
                </div>
              ))}
              {logs.length === 0 ? (
                <p className="text-sm text-mutedForeground">No logs yet today.</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-border bg-card p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Today&apos;s progress</h3>
            <p className="text-xs text-mutedForeground">Live</p>
          </div>
          {[
            { label: "Calories", value: totals.calories, target: macros.calories },
            { label: "Protein", value: totals.protein, target: macros.proteinG },
            { label: "Carbs", value: totals.carbs, target: macros.carbsG },
            { label: "Fat", value: totals.fat, target: macros.fatG }
          ].map((item) => {
            const progress = Math.min((item.value / item.target) * 100, 100)
            return (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-xs text-mutedForeground">
                    {item.value} / {item.target}
                    {item.label === "Calories" ? "" : " g"}
                  </p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${progress}%` }}
                    aria-hidden="true"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
