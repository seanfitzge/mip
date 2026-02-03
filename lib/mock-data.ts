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
  metabolicFlexibilityScore: 0.68,
  baselineEstablished: true
}

export const mockBiometricsSummary: BiometricsSummary = {
  hrvMs: 59,
  restingHrBpm: 60,
  sleepQuality: 68,
  sleepDurationHours: 6.6,
  sleepEfficiencyPercent: 82,
  readinessScore: 62,
  recoveryGrade: "fair",
  interventionTriggered: true,
  sourceDevice: "garmin_fenix7",
  deviceAccuracyCcc: 0.87,
  baselineEstablished: true,
  baselineDaysComplete: 14,
  baselineDaysRequired: 14,
  hrvBaselineMean: 64,
  hrvBaselineSd: 6.2,
  rhrBaselineMean: 55,
  rhrBaselineSd: 3.1
}

export const mockBiometricsTrend: BiometricsTrend[] = [
  { date: "Mon", hrvMs: 63, restingHrBpm: 56, sleepQuality: 74, sleepDurationHours: 7.0 },
  { date: "Tue", hrvMs: 62, restingHrBpm: 57, sleepQuality: 72, sleepDurationHours: 6.9 },
  { date: "Wed", hrvMs: 60, restingHrBpm: 58, sleepQuality: 70, sleepDurationHours: 6.7 },
  { date: "Thu", hrvMs: 59, restingHrBpm: 59, sleepQuality: 68, sleepDurationHours: 6.5 },
  { date: "Fri", hrvMs: 58, restingHrBpm: 60, sleepQuality: 66, sleepDurationHours: 6.4 },
  { date: "Sat", hrvMs: 59, restingHrBpm: 61, sleepQuality: 67, sleepDurationHours: 6.6 },
  { date: "Sun", hrvMs: 59, restingHrBpm: 60, sleepQuality: 68, sleepDurationHours: 6.6 }
]

export const mockMacroTargets: MacroTargets = {
  calories: 2600,
  proteinG: 185,
  carbsG: 285,
  fatG: 68,
  adjustmentReason:
    "HRV declined 7.8% with elevated RHR. Increase calories 5-10% (carb priority).",
  confidenceLevel: "MODERATE",
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
    doi: "10.1111/sms.13521",
    title: "Low energy availability in athletes: a review",
    authors: "Logue DM et al.",
    journal: "Sports Med",
    year: 2020,
    studyType: "Review",
    population: "Athletes",
    qualityRating: 4,
    confidenceLevel: "STRONG",
    keyFindings: [
      "Low energy availability impairs endocrine and bone health.",
      "Female athletes show faster disruption timelines.",
      "Symptoms can appear before performance declines."
    ],
    eli5Summary: "Consistently low fuel harms recovery and hormones before you notice.",
    topics: ["energy_availability", "red_s"]
  },
  {
    id: "paper_003",
    doi: "10.1249/MSS.0000000000000852",
    title: "ACSM position stand: nutrition and athletic performance",
    authors: "Thomas DT et al.",
    journal: "Med Sci Sports Exerc",
    year: 2016,
    studyType: "Position Stand",
    population: "Competitive athletes",
    qualityRating: 5,
    confidenceLevel: "STRONG",
    keyFindings: [
      "Carb needs scale to training volume (3-12 g/kg).",
      "Protein ranges differ by training and energy status.",
      "Hydration status impacts performance and recovery."
    ],
    eli5Summary: "Fuel scales with training load; carbs rise as volume rises.",
    topics: ["carbohydrates", "performance"]
  },
  {
    id: "paper_004",
    doi: "10.1113/EP085282",
    title: "Energy balance and its components: implications for body weight regulation",
    authors: "Hall KD et al.",
    journal: "Am J Clin Nutr",
    year: 2012,
    studyType: "Computational Model",
    population: "Adults",
    qualityRating: 5,
    confidenceLevel: "STRONG",
    keyFindings: [
      "Validated computational models predict weight change.",
      "Metabolic adaptation emerges early in restriction.",
      "Energy expenditure shifts beyond predicted loss."
    ],
    eli5Summary: "Metabolism adapts quickly, so estimates improve with real data.",
    topics: ["metabolic_adaptation", "tdee"]
  },
  {
    id: "paper_005",
    doi: "10.1007/s40279-015-0453-9",
    title: "Sleep and athletic performance",
    authors: "Fullagar HH et al.",
    journal: "Sports Med",
    year: 2015,
    studyType: "Systematic Review",
    population: "Athletes",
    qualityRating: 5,
    confidenceLevel: "STRONG",
    keyFindings: [
      "Sleep loss reduces performance and recovery markers.",
      "Quality matters as much as duration.",
      "Sleep disruption elevates stress hormones."
    ],
    eli5Summary: "Poor sleep blunts recovery and raises stress signals.",
    topics: ["sleep", "recovery"]
  },
  {
    id: "paper_006",
    doi: "10.1136/bjsports-2018-099177",
    title: "IOC consensus statement on RED-S",
    authors: "Mountjoy M et al.",
    journal: "BJSM",
    year: 2023,
    studyType: "Consensus Statement",
    population: "Athletes",
    qualityRating: 5,
    confidenceLevel: "STRONG",
    keyFindings: [
      "Energy availability thresholds: <30 kcal/kg FFM (female).",
      "Males show risk below ~25 kcal/kg FFM.",
      "Recovery requires nutritional and load adjustment."
    ],
    eli5Summary: "Under-fueling harms health; thresholds differ by sex.",
    topics: ["red_s", "energy_availability"]
  },
  {
    id: "paper_007",
    doi: "10.1007/s00394-021-02539-6",
    title: "Low-fat diets and testosterone in men: systematic review and meta-analysis",
    authors: "Whittaker J & Wu K",
    journal: "J Steroid Biochem",
    year: 2021,
    studyType: "Meta-analysis",
    population: "Men",
    qualityRating: 5,
    confidenceLevel: "STRONG",
    keyFindings: [
      "Fat intake below 20% calories reduces testosterone 10-15%.",
      "Moderate fat intake supports hormonal health.",
      "Diet composition impacts endocrine outcomes."
    ],
    eli5Summary: "Too little fat can suppress testosterone.",
    topics: ["fat", "hormones"]
  },
  {
    id: "paper_008",
    doi: "10.1186/s12970-018-0215-1",
    title: "How much protein can the body use in a single meal for muscle-building?",
    authors: "Schoenfeld BJ et al.",
    journal: "JISSN",
    year: 2018,
    studyType: "Review",
    population: "Resistance-trained adults",
    qualityRating: 4,
    confidenceLevel: "MODERATE",
    keyFindings: [
      "0.4 g/kg per meal is an effective target.",
      "Distribution across 4+ meals is beneficial.",
      "No evidence of a hard per-meal ceiling."
    ],
    eli5Summary: "Spread protein across meals; 30g is not a hard limit.",
    topics: ["protein", "timing"]
  },
  {
    id: "paper_009",
    doi: "10.1093/ajcn/85.3.778",
    title: "High-glycemic-index carbohydrate meals shorten sleep onset",
    authors: "Afaghi A et al.",
    journal: "Am J Clin Nutr",
    year: 2007,
    studyType: "RCT",
    population: "Healthy adults",
    qualityRating: 3,
    confidenceLevel: "MODERATE",
    keyFindings: [
      "High-GI carbs 4 hours before bed improved sleep onset.",
      "Timing matters more than strict avoidance.",
      "Individual response varies."
    ],
    eli5Summary: "Evening carbs may help sleep for some athletes.",
    topics: ["sleep", "carbohydrates", "timing"]
  },
  {
    id: "paper_010",
    doi: "10.1186/s12970-017-0177-8",
    title: "ISSN position stand: protein and exercise",
    authors: "Jager R et al.",
    journal: "JISSN",
    year: 2017,
    studyType: "Position Stand",
    population: "Athletes",
    qualityRating: 5,
    confidenceLevel: "STRONG",
    keyFindings: [
      "Protein range 1.6-2.2 g/kg supports performance and recovery.",
      "Higher intake during energy restriction is protective.",
      "Spacing supports muscle protein synthesis."
    ],
    eli5Summary: "Protein needs rise with training and deficits.",
    topics: ["protein", "performance"]
  },
  {
    id: "paper_011",
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
