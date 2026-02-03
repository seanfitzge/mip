import { promises as fs } from "fs"
import path from "path"
import { mockBiometricsTrend, mockMacroTargets } from "@/lib/mock-data"

type DemoStore = {
  nutritionLogs: Array<{
    id: string
    meal_name: string
    meal_time: string
    calories: number
    protein_g: number
    carbs_g: number
    fat_g: number
  }>
  weightLogs: Array<{
    date: string
    weight_kg: number
  }>
  baseline: {
    established: boolean
    hrvBaselineMean: number
    hrvBaselineSd: number
    rhrBaselineMean: number
    rhrBaselineSd: number
  }
  macroTargets: typeof mockMacroTargets
  biometrics: typeof mockBiometricsTrend
}

const STORE_PATH = path.join(process.cwd(), "data", "demo-store.json")

const initialStore: DemoStore = {
  nutritionLogs: [],
  weightLogs: [],
  baseline: {
    established: false,
    hrvBaselineMean: 64,
    hrvBaselineSd: 6.2,
    rhrBaselineMean: 56,
    rhrBaselineSd: 3.1
  },
  macroTargets: mockMacroTargets,
  biometrics: mockBiometricsTrend
}

async function ensureStore() {
  try {
    await fs.access(STORE_PATH)
  } catch {
    await fs.mkdir(path.dirname(STORE_PATH), { recursive: true })
    await fs.writeFile(STORE_PATH, JSON.stringify(initialStore, null, 2), "utf-8")
  }
}

export async function readDemoStore(): Promise<DemoStore> {
  await ensureStore()
  const raw = await fs.readFile(STORE_PATH, "utf-8")
  return JSON.parse(raw) as DemoStore
}

export async function writeDemoStore(store: DemoStore) {
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf-8")
}
