import type { cookies as cookiesType } from "next/headers"

const DEMO_COOKIE = "mip_demo_session"

type DemoSession = {
  user: {
    id: string
    email: string
  }
}

export function getDemoSession(cookieStore: ReturnType<typeof cookiesType>): DemoSession | null {
  const token = cookieStore.get(DEMO_COOKIE)?.value
  if (!token) return null
  return {
    user: {
      id: "demo-user",
      email: "demo@mip.app"
    }
  }
}

export function getDemoCookieName() {
  return DEMO_COOKIE
}
