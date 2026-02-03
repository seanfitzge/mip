type SleepStage = "wake" | "rem" | "light" | "deep"

type SleepTimelineChartProps = {
  stages: { stage: SleepStage; startMinutes: number; durationMinutes: number }[]
  totalDurationHours: number
  efficiencyPercent?: number
  ariaLabel?: string
}

const stageColors: Record<SleepStage, string> = {
  wake: "rgb(var(--color-neutral-200))",
  rem: "rgb(var(--color-info))",
  light: "rgb(var(--color-primary))",
  deep: "rgb(var(--color-success))"
}

const stageLabels: Record<SleepStage, string> = {
  wake: "Wake",
  rem: "REM",
  light: "Light",
  deep: "Deep"
}

export function SleepTimelineChart({
  stages,
  totalDurationHours,
  efficiencyPercent,
  ariaLabel = "Sleep stages timeline for previous night"
}: SleepTimelineChartProps) {
  const totalMinutes = totalDurationHours * 60
  const viewWidth = 100
  const viewHeight = 24

  // Sort stages by start time
  const sortedStages = [...stages].sort((a, b) => a.startMinutes - b.startMinutes)

  return (
    <div role="img" aria-label={ariaLabel} className="w-full">
      <svg viewBox={`0 0 ${viewWidth} ${viewHeight + 8}`} width="100%" height="80">
        {sortedStages.map((stage, index) => {
          const x = (stage.startMinutes / totalMinutes) * viewWidth
          const width = (stage.durationMinutes / totalMinutes) * viewWidth
          return (
            <rect
              key={index}
              x={x}
              y={2}
              width={width}
              height={viewHeight}
              fill={stageColors[stage.stage]}
              rx="1"
            />
          )
        })}
        {/* 8-hour target line */}
        <line
          x1={(8 * 60 / totalMinutes) * viewWidth}
          y1={0}
          x2={(8 * 60 / totalMinutes) * viewWidth}
          y2={viewHeight + 4}
          stroke="rgb(var(--color-neutral-500))"
          strokeWidth="0.5"
          strokeDasharray="1 1"
          opacity="0.5"
        />
        {/* Time labels */}
        {[0, 2, 4, 6, 8].map((hour) => {
          const x = (hour * 60 / totalMinutes) * viewWidth
          return (
            <text
              key={hour}
              x={x}
              y={viewHeight + 6}
              textAnchor="middle"
              fontSize="5"
              fill="rgb(var(--color-neutral-500))"
            >
              {hour}h
            </text>
          )
        })}
      </svg>
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-mutedForeground">
        {Object.entries(stageLabels).map(([stage, label]) => (
          <span key={stage} className="inline-flex items-center gap-1">
            <span
              className="h-2 w-2 rounded"
              style={{ backgroundColor: stageColors[stage as SleepStage] }}
            />
            {label}
          </span>
        ))}
        {efficiencyPercent !== undefined && (
          <span className="ml-auto font-semibold text-foreground">
            Efficiency: {efficiencyPercent}%
          </span>
        )}
      </div>
    </div>
  )
}
