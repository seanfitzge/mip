import { AppSidebar } from "@/components/app-sidebar"
import { AppTopbar } from "@/components/app-topbar"
import { getServerSession } from "@/lib/supabase/server"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AppSidebar />
        <div className="flex-1">
          <AppTopbar />
          <main className="px-6 pb-12 pt-6">
            <div className="space-y-6">
              {!session ? (
                <div className="rounded-md border-l-4 border-warning bg-warning/10 p-4 text-sm text-foreground">
                  <p className="font-semibold">Auth not connected</p>
                  <p className="text-sm text-mutedForeground">
                    Supabase auth session not found. UI is using mock data until auth is
                    configured.
                  </p>
                </div>
              ) : null}
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
