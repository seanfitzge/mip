export type BiometricsSummary = {
  hrvMs: number
  restingHrBpm: number
  sleepQuality: number
  sleepDurationHours: number
  readinessScore: number
}

export type BiometricsTrend = {
  date: string
  hrvMs: number
  restingHrBpm: number
  sleepQuality: number
}
