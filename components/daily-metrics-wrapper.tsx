"use client"

import { useState, useEffect } from "react"
import { DailyMetricsPrompt } from "@/components/daily-metrics-prompt"
import { MetricsReminderBadge } from "@/components/metrics-reminder-badge"
import { useDailyMetrics } from "@/hooks/use-daily-metrics"

export function DailyMetricsWrapper() {
  const { shouldShowPrompt, shouldShowReminder, markAsLogged, markAsDismissed } = useDailyMetrics()
  const [showPrompt, setShowPrompt] = useState(false)

  // Show prompt automatically after initial render
  useEffect(() => {
    if (shouldShowPrompt) {
      // Small delay for dramatic entrance
      const timer = setTimeout(() => setShowPrompt(true), 800)
      return () => clearTimeout(timer)
    }
  }, [shouldShowPrompt])

  const handleMetricsComplete = () => {
    markAsLogged()
    setShowPrompt(false)
  }

  const handleMetricsDismiss = () => {
    markAsDismissed()
    setShowPrompt(false)
  }

  const handleReminderClick = () => {
    setShowPrompt(true)
  }

  return (
    <>
      {/* Daily Metrics Prompt */}
      {showPrompt && (
        <DailyMetricsPrompt
          hasLoggedToday={false}
          onComplete={handleMetricsComplete}
          onDismiss={handleMetricsDismiss}
        />
      )}

      {/* Floating Reminder Badge */}
      <MetricsReminderBadge
        show={shouldShowReminder && !showPrompt}
        onClick={handleReminderClick}
      />
    </>
  )
}
