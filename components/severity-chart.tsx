"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

interface DengueCase {
  id: string
  severity: string
}

interface SeverityChartProps {
  data: DengueCase[]
  isLoading: boolean
}

export function SeverityChart({ data, isLoading }: SeverityChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  // Process data to get cases by severity
  const severityCounts = {
    mild: 0,
    moderate: 0,
    severe: 0,
  }

  data.forEach((item) => {
    if (item.severity in severityCounts) {
      severityCounts[item.severity as keyof typeof severityCounts]++
    }
  })

  // Convert to chart data format
  const chartData = Object.entries(severityCounts).map(([severity, count]) => ({
    severity,
    count,
    color:
      severity === "mild"
        ? "hsl(var(--chart-3))"
        : severity === "moderate"
          ? "hsl(var(--chart-4))"
          : "hsl(var(--chart-5))",
  }))

  return (
    <ChartContainer
      config={{
        count: {
          label: "Cases",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <div className="flex h-full">
        <ResponsiveContainer width="50%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="count"
              nameKey="severity"
              label={({ severity, percent }) => `${severity}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-center gap-2 w-1/2">
          {chartData.map((entry) => (
            <div key={entry.severity} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <div className="flex justify-between w-full">
                <span className="capitalize">{entry.severity}</span>
                <span className="font-medium">{entry.count.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartContainer>
  )
}

