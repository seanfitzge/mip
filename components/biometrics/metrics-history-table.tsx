"use client"

import { Card } from "@/components/ui/card"
import type { BiometricsTrend } from "@/types/biometrics"

type BiometricsHistoryRow = {
  date: string
  hrvMs: number
  restingHrBpm: number
  sleepDurationHours: number
  sleepQuality: number
}

type MetricsHistoryTableProps = {
  data: BiometricsHistoryRow[]
}

export function MetricsHistoryTable({ data }: MetricsHistoryTableProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center text-sm text-mutedForeground">
          No historical data yet. Start logging your daily metrics to see trends over time.
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">HRV (ms)</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">RHR (bpm)</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Sleep (hrs)</th>
              <th className="px-4 py-3 text-right text-sm font-semibold">Sleep Quality</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((row, index) => {
              const isRecent = index < 3
              return (
                <tr
                  key={row.date}
                  className={`hover:bg-muted/30 ${isRecent ? "font-medium" : ""}`}
                >
                  <td className="px-4 py-3 text-sm">
                    {new Date(row.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </td>
                  <td className="px-4 py-3 text-right text-sm">{row.hrvMs.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right text-sm">{row.restingHrBpm}</td>
                  <td className="px-4 py-3 text-right text-sm">{row.sleepDurationHours.toFixed(1)}</td>
                  <td className="px-4 py-3 text-right text-sm">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        row.sleepQuality >= 80
                          ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200"
                          : row.sleepQuality >= 70
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-200"
                            : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200"
                      }`}
                    >
                      {row.sleepQuality}/100
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
