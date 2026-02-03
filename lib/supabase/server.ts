import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { getSupabaseEnv } from "@/lib/supabase/env"
import { getDemoSession } from "@/lib/auth/demo"

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  const env = getSupabaseEnv()
  if (!env) {
    return null
  }

  return createServerClient(env.url, env.anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options?: Record<string, unknown>) {
        cookieStore.set({ name, value, ...(options ?? {}) })
      },
      remove(name: string, options?: Record<string, unknown>) {
        cookieStore.set({ name, value: "", ...(options ?? {}) })
      }
    }
  })
}

export async function getServerSession() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) {
    const cookieStore = await cookies()
    return getDemoSession(cookieStore)
  }
  const { data } = await supabase.auth.getSession()
  return data.session
}
