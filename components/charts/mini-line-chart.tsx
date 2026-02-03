type MiniLineChartProps = {
  points: number[]
  height?: number
  color?: string
  ariaLabel?: string
}

export function MiniLineChart({
  points,
  height = 40,
  color = "rgb(var(--color-primary))",
  ariaLabel = "Trend chart"
}: MiniLineChartProps) {
  const min = Math.min(...points)
  const max = Math.max(...points)
  const range = max - min || 1
  const viewHeight = 40
  const viewWidth = 100
  const step = points.length > 1 ? viewWidth / (points.length - 1) : viewWidth

  const path = points
    .map((point, index) => {
      const x = index * step
      const y = viewHeight - ((point - min) / range) * viewHeight
      return `${index === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  return (
    <div role="img" aria-label={ariaLabel}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${viewWidth} ${viewHeight}`}
        preserveAspectRatio="none"
      >
        <path d={path} fill="none" stroke={color} strokeWidth="2" />
      </svg>
    </div>
  )
}
