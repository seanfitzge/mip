export function SiteFooter() {
  return (
    <footer>
      <div className="container py-10">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Metabolic Intelligence Platform</p>
            <p className="text-sm text-mutedForeground">
              Evidence-based nutrition powered by your biometrics.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Product</p>
            <p className="text-sm text-mutedForeground">
              Research citations · Recovery-driven nutrition · Reverse diet protocols
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-foreground">Compliance</p>
            <p className="text-sm text-mutedForeground">
              HIPAA-ready architecture · Encrypted data · User-owned exports
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
