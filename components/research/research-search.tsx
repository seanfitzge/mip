"use client"

import { useMemo, useState } from "react"
import { FormField } from "@/components/ui/form-field"
import { Button } from "@/components/ui/button"
import { ResearchCitation } from "@/components/research-citation"
import type { ResearchPaper } from "@/types/research"

export function ResearchSearch({ initialPapers }: { initialPapers: ResearchPaper[] }) {
  const [query, setQuery] = useState("")
  const [papers, setPapers] = useState(initialPapers)
  const [status, setStatus] = useState<string | null>(null)

  const handleSearch = async () => {
    setStatus("Searching...")
    const response = await fetch(`/api/v1/research/studies?q=${encodeURIComponent(query)}`)
    if (!response.ok) {
      setStatus("Search failed.")
      return
    }
    const data = await response.json()
    setPapers(data)
    setStatus(null)
  }

  const visible = useMemo(() => papers, [papers])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="w-full max-w-md">
          <FormField
            label="Search studies"
            placeholder="Search studies, topics, or DOI..."
            helperText="Full-text search with highlighted results."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleSearch()
              }
            }}
          />
        </div>
        <Button variant="secondary" onClick={handleSearch}>
          Search
        </Button>
        {status ? <p className="text-xs text-mutedForeground" aria-live="polite">{status}</p> : null}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {visible.map((paper) => (
          <ResearchCitation key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  )
}
