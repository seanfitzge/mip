export type ReverseDietPhase = {
  name: string
  duration: string
  focus: string[]
}

export type ReverseDietProtocol = {
  currentPhase: string
  weeklyIncreaseKcal: number
  targetCalories: number
  phases: ReverseDietPhase[]
}
