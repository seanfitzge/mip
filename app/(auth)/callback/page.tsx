"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState("Finalizing sign-in...")

  useEffect(() => {
    const finalize = async () => {
      const code = searchParams.get("code")
      if (!code) {
        setStatus("Missing auth code. Please try again.")
        return
      }
      const supabase = createSupabaseBrowserClient()
      if (!supabase) {
        setStatus("Supabase environment variables are missing.")
        return
      }
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      if (error) {
        setStatus(error.message)
        return
      }
      router.push("/dashboard")
      router.refresh()
    }

    void finalize()
  }, [router, searchParams])

  return (
    <div className="rounded-md border border-border bg-card p-6 text-sm text-mutedForeground">
      {status}
    </div>
  )
}
