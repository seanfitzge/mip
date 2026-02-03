import { AppSidebar } from "@/components/app-sidebar"
import { AppTopbar } from "@/components/app-topbar"
import { getServerSession } from "@/lib/supabase/server"
import { Alert, Stack } from "@mantine/core"
import { IconInfoCircle } from "@tabler/icons-react"

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="flex">
        <AppSidebar />
        <div className="flex-1">
          <AppTopbar />
          <main className="px-6 pb-12 pt-6">
            <Stack gap="md">
              {!session ? (
                <Alert
                  icon={<IconInfoCircle size={16} />}
                  title="Auth not connected"
                  color="yellow"
                >
                  Supabase auth session not found. UI is using mock data until auth is
                  configured.
                </Alert>
              ) : null}
              {children}
            </Stack>
          </main>
        </div>
      </div>
    </div>
  )
}
