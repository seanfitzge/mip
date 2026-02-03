"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormField } from "@/components/ui/form-field"

type ProtocolActionsProps = {
  currentWeek: number
  weeklyIncreaseKcal: number
}

export function ProtocolActions({ currentWeek, weeklyIncreaseKcal }: ProtocolActionsProps) {
  const [week, setWeek] = useState(String(currentWeek))
  const [increase, setIncrease] = useState(String(weeklyIncreaseKcal))
  const [status, setStatus] = useState<string | null>(null)

  const handleUpdate = async () => {
    setStatus("Updating protocol...")
    const response = await fetch("/api/v1/protocol/reverse-diet/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        currentWeek: Number(week),
        currentWeeklyIncrease: Number(increase),
        currentPhase: Number(week) <= 2 ? "Stabilization" : Number(week) <= 6 ? "Initial Raise" : "Continued Progression"
      })
    })
    if (!response.ok) {
      setStatus("Update failed.")
      return
    }
    setStatus("Protocol updated.")
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <FormField label="Current week" value={week} onChange={(e) => setWeek(e.target.value)} />
        <FormField
          label="Weekly increase (kcal)"
          value={increase}
          onChange={(e) => setIncrease(e.target.value)}
        />
      </div>
      <Button className="h-10 px-4 text-sm" onClick={handleUpdate}>
        Save protocol update
      </Button>
      {status ? <p className="text-xs text-mutedForeground">{status}</p> : null}
    </div>
  )
}
