"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface DiseaseCase {
  age?: number
}

interface AgeDistributionChartProps {
  data: DiseaseCase[]
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

  data.forEach((item) => {
    if (item.age !== undefined) {
      const age = item.age
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
    <div className="h-[300px]">
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
          <Tooltip
            formatter={(value) => [`${value} casos`, "Casos"]}
            labelFormatter={(label) => `Faixa etária: ${label}`}
          />
          <Bar dataKey="count" fill="#1AA4E0" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

