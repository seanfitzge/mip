type HrvTrendChartProps = {
  trend: { date: string; hrvMs: number }[]
  baselineMean: number
  baselineSd: number
  ariaLabel?: string
}

export function HrvTrendChart({
  trend,
  baselineMean,
  baselineSd,
  ariaLabel = "Seven-day HRV trend chart with baseline bands"
}: HrvTrendChartProps) {
  const values = trend.map((item) => item.hrvMs)
  const bandMin = baselineMean - baselineSd
  const bandMax = baselineMean + baselineSd
  const extremeMin = baselineMean - baselineSd * 2
  const extremeMax = baselineMean + baselineSd * 2
  const min = Math.min(...values, extremeMin)
  const max = Math.max(...values, extremeMax)
  const range = max - min || 1

  const viewWidth = 100
  const viewHeight = 60
  const step = trend.length > 1 ? viewWidth / (trend.length - 1) : viewWidth

  const yForValue = (value: number) => viewHeight - ((value - min) / range) * viewHeight

  const rollingAverage = trend.map((_, index) => {
    const start = Math.max(0, index - 6)
    const slice = values.slice(start, index + 1)
    return slice.reduce((sum, val) => sum + val, 0) / slice.length
  })

  const linePath = values
    .map((value, index) => {
      const x = index * step
      const y = yForValue(value)
      return `${index === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  const avgPath = rollingAverage
    .map((value, index) => {
      const x = index * step
      const y = yForValue(value)
      return `${index === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  return (
    <div role="img" aria-label={ariaLabel} className="w-full">
      <svg viewBox={`0 0 ${viewWidth} ${viewHeight + 12}`} width="100%" height="160">
        <rect
          x={0}
          y={yForValue(bandMax)}
          width={viewWidth}
          height={Math.max(0, yForValue(bandMin) - yForValue(bandMax))}
          fill="rgba(86, 180, 233, 0.15)"
        />
        <path d={linePath} fill="none" stroke="rgb(var(--color-primary))" strokeWidth="1.5" />
        <path
          d={avgPath}
          fill="none"
          stroke="rgb(var(--color-info))"
          strokeWidth="3"
          strokeOpacity="0.6"
        />
        {values.map((value, index) => {
          const x = index * step
          const y = yForValue(value)
          const within = Math.abs(value - baselineMean) <= baselineSd
          const moderate = Math.abs(value - baselineMean) <= baselineSd * 2
          const color = within
            ? "rgb(var(--color-success))"
            : moderate
              ? "rgb(var(--color-warning))"
              : "rgb(var(--color-critical))"
          return <circle key={trend[index]?.date} cx={x} cy={y} r="2.5" fill={color} />
        })}
        {trend.map((item, index) => {
          const x = index * step
          return (
            <text
              key={`${item.date}-label`}
              x={x}
              y={viewHeight + 10}
              textAnchor="middle"
              fontSize="6"
              fill="rgb(var(--color-neutral-500))"
            >
              {item.date}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
