import Link from "next/link"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/vision", label: "Vision" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/dashboard", label: "App Preview" }
]

export function SiteHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          MIP
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Button variant="secondary">Join waitlist</Button>
        </nav>
      </div>
    </header>
  )
}
