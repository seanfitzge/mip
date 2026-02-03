import { redirect } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { AppTopbar } from "@/components/app-topbar"
import { getServerSession } from "@/lib/supabase/server"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()
  if (!session) {
    redirect("/sign-in")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AppSidebar />
        <div className="flex-1">
          <AppTopbar userEmail={session.user.email ?? ""} />
          <main className="px-6 pb-12 pt-6">
            <div className="space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
