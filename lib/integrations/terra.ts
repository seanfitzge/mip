import { mockBiometricsTrend } from "@/lib/mock-data"

const TERRA_BASE_URL = "https://api.tryterra.co"

type TerraDailyResponse = {
  data: Array<{
    date: string
    hrv_rmssd?: number
    resting_hr?: number
    sleep_quality?: number
    sleep_duration?: number
    device?: string
    device_accuracy?: number
  }>
}

export async function fetchTerraDaily(userId: string): Promise<TerraDailyResponse> {
  const apiKey = process.env.TERRA_API_KEY
  const devId = process.env.TERRA_DEV_ID
  if (!apiKey || !devId) {
    return {
      data: mockBiometricsTrend.map((item) => ({
        date: item.date,
        hrv_rmssd: item.hrvMs,
        resting_hr: item.restingHrBpm,
        sleep_quality: item.sleepQuality,
        sleep_duration: item.sleepDurationHours,
        device: "mock",
        device_accuracy: 0.9
      }))
    }
  }

  const response = await fetch(`${TERRA_BASE_URL}/v2/daily?user_id=${userId}`, {
    headers: {
      "x-api-key": apiKey,
      "dev-id": devId
    }
  })

  if (!response.ok) {
    return { data: [] }
  }

  return response.json()
}
