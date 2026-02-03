import type { BiometricsSummary, BiometricsTrend } from "@/types/biometrics"
import type { MacroTargets } from "@/types/macros"
import type { ResearchPaper } from "@/types/research"
import type { ReverseDietProtocol } from "@/types/protocol"
import type { UserProfile } from "@/types/user"

export const mockUser: UserProfile = {
  id: "user_001",
  name: "Alex Carter",
  email: "alex@mip.app",
  goal: "reverse_diet",
  sport: "Strength",
  trainingFrequency: 5,
  wearableType: "garmin"
}

export const mockBiometricsSummary: BiometricsSummary = {
  hrvMs: 68,
  restingHrBpm: 54,
  sleepQuality: 82,
  sleepDurationHours: 7.4,
  readinessScore: 79
}

export const mockBiometricsTrend: BiometricsTrend[] = [
  { date: "Mon", hrvMs: 62, restingHrBpm: 58, sleepQuality: 72 },
  { date: "Tue", hrvMs: 64, restingHrBpm: 57, sleepQuality: 76 },
  { date: "Wed", hrvMs: 66, restingHrBpm: 56, sleepQuality: 80 },
  { date: "Thu", hrvMs: 67, restingHrBpm: 55, sleepQuality: 78 },
  { date: "Fri", hrvMs: 68, restingHrBpm: 55, sleepQuality: 82 },
  { date: "Sat", hrvMs: 70, restingHrBpm: 54, sleepQuality: 84 },
  { date: "Sun", hrvMs: 69, restingHrBpm: 54, sleepQuality: 83 }
]

export const mockMacroTargets: MacroTargets = {
  calories: 2750,
  proteinG: 190,
  carbsG: 310,
  fatG: 70,
  adjustmentReason:
    "HRV trending up with stable RHR. Continue reverse diet progression (+100 kcal)."
}

export const mockResearchPapers: ResearchPaper[] = [
  {
    id: "paper_001",
    doi: "10.1136/bjsports-2017-097608",
    title:
      "A systematic review, meta-analysis and meta-regression of protein supplementation on resistance training gains",
    authors: "Morton RW et al.",
    journal: "BJSM",
    year: 2018,
    studyType: "Systematic Review",
    population: "Resistance-trained adults",
    qualityRating: 5,
    keyFindings: [
      "Higher protein (>1.6 g/kg) reduced lean mass loss during deficit.",
      "Effect sizes strongest in trained individuals.",
      "Upper range benefits plateau around 2.2 g/kg."
    ],
    topics: ["protein", "muscle_gain"]
  },
  {
    id: "paper_002",
    doi: "10.1186/s12970-014-0031-2",
    title: "Metabolic adaptation to weight loss: implications for the athlete",
    authors: "Trexler ET et al.",
    journal: "JISSN",
    year: 2014,
    studyType: "Review",
    population: "Athletes",
    qualityRating: 4,
    keyFindings: [
      "Energy expenditure drops beyond predicted weight loss.",
      "Diet breaks can mitigate adaptation.",
      "Reverse diet timelines often require 12+ weeks."
    ],
    topics: ["metabolic_adaptation", "reverse_diet"]
  }
]

export const mockReverseDietProtocol: ReverseDietProtocol = {
  currentPhase: "Initial Raise",
  weeklyIncreaseKcal: 120,
  targetCalories: 3000,
  phases: [
    {
      name: "Stabilization",
      duration: "Weeks 1-2",
      focus: [
        "Hold deficit for glycogen normalization",
        "Monitor HRV and RHR stability"
      ]
    },
    {
      name: "Initial Raise",
      duration: "Weeks 3-6",
      focus: [
        "Increase calories +100-150 per week",
        "Prioritize carbohydrate increases"
      ]
    },
    {
      name: "Continued Progression",
      duration: "Weeks 6-12",
      focus: [
        "Continue weekly increases",
        "Adjust pacing from biometric response"
      ]
    },
    {
      name: "Metabolic Normalization",
      duration: "Weeks 12-24",
      focus: [
        "Maintain at new maintenance",
        "Track HRV and recovery normalization"
      ]
    }
  ]
}
