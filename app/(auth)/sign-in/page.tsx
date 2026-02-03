"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FormField } from "@/components/ui/form-field"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [demoLoading, setDemoLoading] = useState(false)

  const handlePasswordSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setStatus(null)
    const supabase = createSupabaseBrowserClient()
    if (!supabase) {
      setStatus("Supabase environment variables are missing.")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setStatus(error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  const handleMagicLink = async () => {
    setLoading(true)
    setStatus(null)
    const supabase = createSupabaseBrowserClient()
    if (!supabase) {
      setStatus("Supabase environment variables are missing.")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      setStatus(error.message)
    } else {
      setStatus("Magic link sent. Check your inbox to finish signing in.")
    }
    setLoading(false)
  }

  const handleDemoMode = async () => {
    setDemoLoading(true)
    setStatus(null)
    const response = await fetch("/api/auth/demo/login", { method: "POST" })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      setStatus(data.error ?? "Demo mode unavailable.")
      setDemoLoading(false)
      return
    }
    router.push("/dashboard")
    router.refresh()
  }

  return (
    <Card className="p-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
          MIP Console
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Sign in</h1>
        <p className="text-sm text-mutedForeground">
          Access your metabolic intelligence dashboard and recovery insights.
        </p>
      </div>

      <form onSubmit={handlePasswordSignIn} className="mt-6 space-y-4">
        <FormField
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@mip.app"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <FormField
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {status ? <p className="text-sm text-mutedForeground">{status}</p> : null}
        <div className="space-y-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={handleMagicLink}
            disabled={loading || !email}
          >
            Send magic link
          </Button>
        </div>
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={handleDemoMode}
          disabled={demoLoading}
        >
          {demoLoading ? "Starting demo..." : "Continue in demo mode"}
        </Button>
      </form>

      <div className="mt-6 text-sm text-mutedForeground">
        New here?{" "}
        <Link className="font-semibold text-primary" href="/sign-up">
          Create an account
        </Link>
        .
      </div>
    </Card>
  )
}
