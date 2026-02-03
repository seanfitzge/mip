type SectionHeaderProps = {
  title: string
  subtitle?: string
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-6 space-y-2">
      <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
      {subtitle ? <p className="text-sm text-mutedForeground body-text">{subtitle}</p> : null}
    </div>
  )
}
