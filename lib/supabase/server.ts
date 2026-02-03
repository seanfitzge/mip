import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { getSupabaseEnv } from "@/lib/supabase/env"

export async function createSupabaseServerClient() {
  const cookieStore = await cookies()
  const { url, anonKey } = getSupabaseEnv()

  return createServerClient(url, anonKey, {
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
  const { data } = await supabase.auth.getSession()
  return data.session
}
