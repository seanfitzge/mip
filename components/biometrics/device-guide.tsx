"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

type DeviceType = "whoop" | "garmin" | "oura" | "apple" | "fitbit"

const deviceGuides: Record<
  DeviceType,
  {
    name: string
    hrv: string
    rhr: string
    sleep: string
    quality: string
  }
> = {
  whoop: {
    name: "WHOOP 4.0",
    hrv: "Recovery screen → HRV (ms)",
    rhr: "Recovery screen → Resting Heart Rate (bpm)",
    sleep: "Sleep tab → Total Sleep (convert to hours)",
    quality: "Sleep tab → Sleep Performance %"
  },
  garmin: {
    name: "Garmin (Fenix, Forerunner)",
    hrv: "Morning Report → HRV Status (ms)",
    rhr: "Health Stats → Resting Heart Rate (bpm)",
    sleep: "Sleep widget → Sleep Time (hours)",
    quality: "Sleep widget → Sleep Score (0-100)"
  },
  oura: {
    name: "Oura Ring",
    hrv: "Readiness tab → HRV card (ms)",
    rhr: "Readiness tab → Resting Heart Rate (bpm)",
    sleep: "Sleep tab → Total Sleep (hours)",
    quality: "Sleep tab → Sleep Score (0-100)"
  },
  apple: {
    name: "Apple Watch",
    hrv: "Health app → Heart → Heart Rate Variability (ms)",
    rhr: "Health app → Heart → Resting Heart Rate (bpm)",
    sleep: "Health app → Sleep → Time Asleep (hours)",
    quality: "Calculate: (Time Asleep / Time in Bed) × 100"
  },
  fitbit: {
    name: "Fitbit",
    hrv: "Today tab → Heart Rate → HRV Summary (ms)",
    rhr: "Today tab → Heart Rate → Resting Heart Rate (bpm)",
    sleep: "Today tab → Sleep → Sleep Duration (hours)",
    quality: "Today tab → Sleep → Sleep Score (0-100)"
  }
}

export function DeviceGuide() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>("whoop")

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Device Quick Reference</h3>
          <p className="text-sm text-mutedForeground">
            Find out where to locate your health metrics on your device
          </p>
        </div>

        {/* Device Selector */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(deviceGuides) as DeviceType[]).map((device) => (
            <button
              key={device}
              onClick={() => setSelectedDevice(device)}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                selectedDevice === device
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              {deviceGuides[device].name}
            </button>
          ))}
        </div>

        {/* Device Guide */}
        <div className="space-y-3 rounded-lg border p-4">
          <h4 className="font-semibold">{deviceGuides[selectedDevice].name} - Where to Find Metrics</h4>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                1
              </div>
              <div>
                <p className="text-sm font-medium">Overnight HRV</p>
                <p className="text-sm text-mutedForeground">{deviceGuides[selectedDevice].hrv}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                2
              </div>
              <div>
                <p className="text-sm font-medium">Resting Heart Rate</p>
                <p className="text-sm text-mutedForeground">{deviceGuides[selectedDevice].rhr}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                3
              </div>
              <div>
                <p className="text-sm font-medium">Sleep Duration</p>
                <p className="text-sm text-mutedForeground">{deviceGuides[selectedDevice].sleep}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                4
              </div>
              <div>
                <p className="text-sm font-medium">Sleep Quality Score</p>
                <p className="text-sm text-mutedForeground">{deviceGuides[selectedDevice].quality}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="rounded-lg bg-muted p-4 text-sm">
          <p className="font-medium">💡 Pro Tips</p>
          <ul className="mt-2 space-y-1 text-mutedForeground">
            <li>• Log metrics at the same time each morning (within 30 min of waking)</li>
            <li>• Log before coffee, exercise, or stressful activities</li>
            <li>• After 14 days, your personal baseline will be automatically calculated</li>
          </ul>
        </div>
      </div>
    </Card>
  )
}
