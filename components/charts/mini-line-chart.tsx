type MiniLineChartProps = {
  points: number[]
  height?: number
}

export function MiniLineChart({ points, height = 80 }: MiniLineChartProps) {
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const width = 240
  const step = width / (points.length - 1)

  const d = points
    .map((point, index) => {
      const x = index * step
      const y = height - ((point - min) / range) * height
      return `${index === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={d} fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}
