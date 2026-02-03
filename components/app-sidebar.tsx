import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/nutrition", label: "Nutrition" },
  { href: "/biometrics", label: "Biometrics" },
  { href: "/research", label: "Research Library" },
  { href: "/protocols", label: "Protocol Manager" },
  { href: "/progress", label: "Progress" }
]

export function AppSidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-border bg-background px-4 py-6 md:block">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Metabolic Intelligence</p>
          <p className="text-lg font-semibold">MIP Console</p>
        </div>
        <Badge variant="outline">Preview</Badge>
      </div>
      <nav className="space-y-1 text-sm">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
