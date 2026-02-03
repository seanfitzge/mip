export type BiometricsSummary = {
  hrvMs: number
  restingHrBpm: number
  sleepQuality: number
  sleepDurationHours: number
  readinessScore: number
  recoveryGrade: "optimal" | "good" | "fair" | "poor"
  interventionTriggered: boolean
  sourceDevice: string
  deviceAccuracyCcc: number
  baselineEstablished: boolean
  baselineDaysComplete: number
  baselineDaysRequired: number
  hrvBaselineMean: number
  hrvBaselineSd: number
  rhrBaselineMean: number
  rhrBaselineSd: number
}

export type BiometricsTrend = {
  date: string
  hrvMs: number
  restingHrBpm: number
  sleepQuality: number
  sleepDurationHours: number
}
