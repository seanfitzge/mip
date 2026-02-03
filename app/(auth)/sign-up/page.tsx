"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FormField } from "@/components/ui/form-field"

export default function SignUpPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setStatus(null)
    const supabase = createSupabaseBrowserClient()
    if (!supabase) {
      setStatus("Supabase environment variables are missing.")
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })

    if (error) {
      setStatus(error.message)
      setLoading(false)
      return
    }

    setStatus("Check your inbox to confirm your email. Then sign in.")
    setLoading(false)
  }

  const handleResend = async () => {
    if (!email) {
      setStatus("Enter your email to resend the confirmation.")
      return
    }
    setResending(true)
    const supabase = createSupabaseBrowserClient()
    if (!supabase) {
      setStatus("Supabase environment variables are missing.")
      setResending(false)
      return
    }
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    if (error) {
      setStatus(error.message)
    } else {
      setStatus("Confirmation email resent. Check your inbox or spam.")
    }
    setResending(false)
  }

  return (
    <Card className="p-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-mutedForeground">
          MIP Console
        </p>
        <h1 className="text-2xl font-semibold text-foreground">Create your account</h1>
        <p className="text-sm text-mutedForeground">
          Set up your baseline and start tracking recovery-informed nutrition.
        </p>
      </div>

      <form onSubmit={handleSignUp} className="mt-6 space-y-4">
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
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {status ? <p className="text-sm text-mutedForeground">{status}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full"
          onClick={handleResend}
          disabled={resending}
        >
          {resending ? "Resending..." : "Resend confirmation"}
        </Button>
      </form>

      <div className="mt-6 text-sm text-mutedForeground">
        Already have an account?{" "}
        <Link className="font-semibold text-primary" href="/sign-in">
          Sign in
        </Link>
        .
      </div>
    </Card>
  )
}
