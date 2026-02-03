"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createSupabaseBrowserClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"

export function SignOutButton() {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    const supabase = createSupabaseBrowserClient()
    await fetch("/api/auth/demo/logout", { method: "POST" })
    if (supabase) {
      await supabase.auth.signOut()
    }
    router.push("/sign-in")
    router.refresh()
  }

  return (
    <Button
      variant="ghost"
      className="h-10 px-4 text-sm"
      onClick={handleSignOut}
      disabled={isSigningOut}
    >
      {isSigningOut ? "Signing out..." : "Sign out"}
    </Button>
  )
}
