"use client"

import { useState, useEffect } from "react"

export type DailyMetricsStatus = {
  hasLoggedToday: boolean
  lastLoggedDate: string | null
  isDismissedToday: boolean
}

export function useDailyMetrics() {
  const [status, setStatus] = useState<DailyMetricsStatus>({
    hasLoggedToday: false,
    lastLoggedDate: null,
    isDismissedToday: false
  })

  useEffect(() => {
    checkDailyMetricsStatus()
  }, [])

  const checkDailyMetricsStatus = () => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0]
    
    // Check localStorage for last logged date
    const lastLogged = localStorage.getItem('mip-last-metrics-log')
    const dismissed = localStorage.getItem('mip-metrics-dismissed')
    
    const hasLoggedToday = lastLogged === today
    const isDismissedToday = dismissed === today

    setStatus({
      hasLoggedToday,
      lastLoggedDate: lastLogged,
      isDismissedToday
    })
  }

  const markAsLogged = () => {
    const today = new Date().toISOString().split('T')[0]
    localStorage.setItem('mip-last-metrics-log', today)
    localStorage.removeItem('mip-metrics-dismissed')
    setStatus({
      hasLoggedToday: true,
      lastLoggedDate: today,
      isDismissedToday: false
    })
  }

  const markAsDismissed = () => {
    const today = new Date().toISOString().split('T')[0]
    localStorage.setItem('mip-metrics-dismissed', today)
    setStatus(prev => ({
      ...prev,
      isDismissedToday: true
    }))
  }

  const shouldShowPrompt = !status.hasLoggedToday && !status.isDismissedToday
  const shouldShowReminder = !status.hasLoggedToday && status.isDismissedToday

  return {
    status,
    shouldShowPrompt,
    shouldShowReminder,
    markAsLogged,
    markAsDismissed,
    refresh: checkDailyMetricsStatus
  }
}
