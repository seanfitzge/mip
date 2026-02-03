import type { BiometricsSummary, BiometricsTrend } from "@/types/biometrics"
import type { MacroTargets } from "@/types/macros"
import type { ResearchPaper } from "@/types/research"
import type { ReverseDietProtocol } from "@/types/protocol"
import type { UserProfile } from "@/types/user"

export const mockUser: UserProfile = {
  id: "user_001",
  name: "Alex Carter",
  email: "alex@mip.app",
  sex: "male",
  goal: "reverse_diet",
  sport: "Strength",
  trainingFrequency: 5,
  wearableType: "garmin",
  userCategory: "intermediate",
  metabolicFlexibilityScore: 0.72,
  baselineEstablished: true
}

export const mockBiometricsSummary: BiometricsSummary = {
  hrvMs: 68,
  restingHrBpm: 54,
  sleepQuality: 82,
  sleepDurationHours: 7.4,
  readinessScore: 79,
  recoveryGrade: "good",
  interventionTriggered: false,
  sourceDevice: "garmin_fenix",
  deviceAccuracyCcc: 0.87,
  baselineEstablished: true,
  baselineDaysComplete: 14,
  baselineDaysRequired: 14,
  hrvBaselineMean: 64,
  hrvBaselineSd: 6.2,
  rhrBaselineMean: 56,
  rhrBaselineSd: 3.1
}

export const mockBiometricsTrend: BiometricsTrend[] = [
  { date: "Mon", hrvMs: 62, restingHrBpm: 58, sleepQuality: 72, sleepDurationHours: 6.8 },
  { date: "Tue", hrvMs: 64, restingHrBpm: 57, sleepQuality: 76, sleepDurationHours: 7.1 },
  { date: "Wed", hrvMs: 66, restingHrBpm: 56, sleepQuality: 80, sleepDurationHours: 7.5 },
  { date: "Thu", hrvMs: 67, restingHrBpm: 55, sleepQuality: 78, sleepDurationHours: 7.2 },
  { date: "Fri", hrvMs: 68, restingHrBpm: 55, sleepQuality: 82, sleepDurationHours: 7.4 },
  { date: "Sat", hrvMs: 70, restingHrBpm: 54, sleepQuality: 84, sleepDurationHours: 7.8 },
  { date: "Sun", hrvMs: 69, restingHrBpm: 54, sleepQuality: 83, sleepDurationHours: 7.6 }
]

export const mockMacroTargets: MacroTargets = {
  calories: 2750,
  proteinG: 190,
  carbsG: 310,
  fatG: 70,
  adjustmentReason:
    "HRV trending up with stable RHR. Continue reverse diet progression (+100 kcal).",
  confidenceLevel: "STRONG",
  proteinCitationDoi: "10.1136/bjsports-2017-097608",
  carbCitationDoi: "10.1249/MSS.0000000000000852",
  fatCitationDoi: "10.1016/j.jsbmb.2021.105948"
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
    confidenceLevel: "STRONG",
    keyFindings: [
      "Higher protein (>1.6 g/kg) reduced lean mass loss during deficit.",
      "Effect sizes strongest in trained individuals.",
      "Upper range benefits plateau around 2.2 g/kg."
    ],
    eli5Summary: "Higher protein protects muscle during cuts, especially for trained lifters.",
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
    confidenceLevel: "MODERATE",
    keyFindings: [
      "Energy expenditure drops beyond predicted weight loss.",
      "Diet breaks can mitigate adaptation.",
      "Reverse diet timelines often require 12+ weeks."
    ],
    eli5Summary: "Your metabolism slows during long cuts, so recovery needs time and fuel.",
    topics: ["metabolic_adaptation", "reverse_diet"]
  }
]

export const mockReverseDietProtocol: ReverseDietProtocol = {
  currentPhase: "Initial Raise",
  weeklyIncreaseKcal: 120,
  targetCalories: 3000,
  currentWeek: 4,
  predictedEndDate: "2026-05-15",
  phases: [
    {
      name: "Stabilization",
      duration: "Weeks 1-2",
      focus: [
        "Hold deficit for glycogen normalization",
        "Monitor HRV and RHR stability"
      ],
      confidenceLevel: "STRONG"
    },
    {
      name: "Initial Raise",
      duration: "Weeks 3-6",
      focus: [
        "Increase calories +100-150 per week",
        "Prioritize carbohydrate increases"
      ],
      confidenceLevel: "MODERATE"
    },
    {
      name: "Continued Progression",
      duration: "Weeks 6-12",
      focus: [
        "Continue weekly increases",
        "Adjust pacing from biometric response"
      ],
      confidenceLevel: "MODERATE"
    },
    {
      name: "Metabolic Normalization",
      duration: "Weeks 12-24",
      focus: [
        "Maintain at new maintenance",
        "Track HRV and recovery normalization"
      ],
      confidenceLevel: "STRONG"
    }
  ]
}
