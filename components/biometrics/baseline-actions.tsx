"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function BaselineActions({ established }: { established: boolean }) {
  const [status, setStatus] = useState<string | null>(null)

  const handleBaseline = async () => {
    setStatus("Calculating baseline...")
    const response = await fetch("/api/v1/biometrics/baseline", { method: "POST" })
    if (!response.ok) {
      setStatus("Unable to establish baseline yet.")
      return
    }
    setStatus("Baseline established.")
  }

  const handleConnect = async () => {
    setStatus("Waiting for Terra webhook...")
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button className="h-10 px-4 text-sm" onClick={handleConnect}>
        Connect wearable
      </Button>
      <Button
        variant="secondary"
        className="h-10 px-4 text-sm"
        onClick={handleBaseline}
        disabled={established}
      >
        {established ? "Baseline ready" : "Establish baseline"}
      </Button>
      {status ? <p className="text-xs text-mutedForeground">{status}</p> : null}
    </div>
  )
}
