import { LineChart } from "@mantine/charts"

type MiniLineChartProps = {
  points: number[]
  height?: number
  color?: string
}

export function MiniLineChart({ points, height = 120, color = "indigo.4" }: MiniLineChartProps) {
  const data = points.map((value, index) => ({
    day: index + 1,
    value
  }))

  return (
    <LineChart
      h={height}
      data={data}
      dataKey="day"
      series={[{ name: "value", color }]}
      withLegend={false}
      withYAxis={false}
      withXAxis={false}
      curveType="monotone"
      strokeWidth={2}
    />
  )
}
