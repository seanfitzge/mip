import { AppSidebar } from "@/components/app-sidebar"
import { AppTopbar } from "@/components/app-topbar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/20">
      <div className="flex">
        <AppSidebar />
        <div className="flex-1">
          <AppTopbar />
          <main className="px-6 pb-12 pt-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
