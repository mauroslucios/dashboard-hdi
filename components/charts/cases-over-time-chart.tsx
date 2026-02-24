"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface DiseaseCase {
  date: string
  status: string
  severity: string
  region: string
}

interface CasesOverTimeChartProps {
  data: DiseaseCase[]
  isLoading: boolean
}

export function CasesOverTimeChart({ data, isLoading }: CasesOverTimeChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  // Process data to get cases by date
  const dateMap = new Map<string, number>()

  // Get the last 30 days
  const today = new Date()
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]
    dateMap.set(dateStr, 0)
  }

  // Count cases by date
  data.forEach((item) => {
    const date = item.date.split("T")[0]
    if (dateMap.has(date)) {
      dateMap.set(date, (dateMap.get(date) || 0) + 1)
    }
  })

  // Convert to chart data format
  const chartData = Array.from(dateMap.entries()).map(([date, count]) => ({
    date,
    cases: count,
  }))

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.getDate()}/${date.getMonth() + 1}`
            }}
            tick={{ fontSize: 12, fill: "#475569" }}
          />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
          <Tooltip
            formatter={(value) => [`${value} casos`, "Casos"]}
            labelFormatter={(label) => `Data: ${new Date(label).toLocaleDateString("pt-BR")}`}
          />
          <Line
            type="monotone"
            dataKey="cases"
            stroke="#153983"
            strokeWidth={3}
            activeDot={{ r: 8, fill: "#153983" }}
            dot={{ r: 4, fill: "#153983" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

