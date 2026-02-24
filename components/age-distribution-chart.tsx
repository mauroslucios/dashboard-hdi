"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { DengueCase } from "@/types/dengue"

interface AgeDistributionChartProps {
  data: DengueCase[]
  isLoading: boolean
}

export function AgeDistributionChart({ data, isLoading }: AgeDistributionChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  // Process data to get cases by age group
  const ageGroups = {
    "0-9": 0,
    "10-19": 0,
    "20-29": 0,
    "30-39": 0,
    "40-49": 0,
    "50-59": 0,
    "60-69": 0,
    "70+": 0,
  }

  const currentYear = new Date().getFullYear()

  data.forEach((item) => {
    if (item.anoNascimento) {
      const age = currentYear - Number(item.anoNascimento)
      if (age < 10) ageGroups["0-9"]++
      else if (age < 20) ageGroups["10-19"]++
      else if (age < 30) ageGroups["20-29"]++
      else if (age < 40) ageGroups["30-39"]++
      else if (age < 50) ageGroups["40-49"]++
      else if (age < 60) ageGroups["50-59"]++
      else if (age < 70) ageGroups["60-69"]++
      else ageGroups["70+"]++
    }
  })

  // Convert to chart data format
  const chartData = Object.entries(ageGroups).map(([ageGroup, count]) => ({
    ageGroup,
    count,
  }))

  return (
    <ChartContainer
      config={{
        count: {
          label: "Casos",
          color: "hsl(262, 83%, 58%)",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <XAxis dataKey="ageGroup" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: "#475569" }} />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

