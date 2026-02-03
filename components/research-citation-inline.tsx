import * as React from "react"

type ResearchCitationInlineProps = {
  source: string
  preview: string
  full: string
}

export function ResearchCitationInline({ source, preview, full }: ResearchCitationInlineProps) {
  return (
    <details className="inline-block align-middle">
      <summary
        aria-label="View research source"
        className="inline-flex h-5 w-5 cursor-pointer list-none items-center justify-center rounded-full bg-primary/15 text-xs text-primary"
      >
        📚
      </summary>
      <div className="mt-2 w-[260px] rounded-md border border-border bg-card p-3 text-xs text-mutedForeground shadow-card">
        <p className="font-semibold text-foreground">{source}</p>
        <p className="mt-1">{preview}</p>
        <details className="mt-2">
          <summary className="cursor-pointer text-primary">Read more →</summary>
          <p className="mt-1 text-mutedForeground">{full}</p>
        </details>
      </div>
    </details>
  )
}
