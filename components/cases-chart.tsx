"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { DengueCase } from "@/types/dengue"

interface CasesChartProps {
  data: DengueCase[]
  isLoading: boolean
}

export function CasesChart({ data, isLoading }: CasesChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  // Process data to get cases by date
  const dateMap = new Map<string, number>()

  // Get all notification dates
  data.forEach((item) => {
    if (item.dataNotificacao) {
      const date = item.dataNotificacao.split("T")[0]
      dateMap.set(date, (dateMap.get(date) || 0) + 1)
    }
  })

  // Sort dates and get the last 30 days of data
  const sortedDates = Array.from(dateMap.entries())
    .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
    .slice(-30)

  // Convert to chart data format
  const chartData = sortedDates.map(([date, count]) => ({
    date,
    cases: count,
  }))

  return (
    <ChartContainer
      config={{
        cases: {
          label: "Novos Casos",
          color: "hsl(16, 100%, 50%)",
        },
      }}
      className="h-[300px]"
    >
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
          <Tooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="cases"
            stroke="hsl(16, 100%, 50%)"
            strokeWidth={3}
            activeDot={{ r: 8, fill: "#f97316" }}
            dot={{ r: 4, fill: "#f97316" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

