"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import type { SelectedDisease, SelectedRegion } from "@/components/dashboard"

interface TrendAnalysisChartProps {
  disease: SelectedDisease
  region: SelectedRegion
  isLoading: boolean
}

export function TrendAnalysisChart({ disease, region, isLoading }: TrendAnalysisChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />
  }

  // Generate mock data for trend analysis
  const generateTrendData = () => {
    const data = []
    const today = new Date()

    // Generate data for the last 12 months
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today)
      date.setMonth(date.getMonth() - i)

      // Base value depends on disease and region
      let baseValue = 100
      if (disease === "dengue") baseValue = 500
      else if (disease === "zika") baseValue = 200
      else if (disease === "chikungunya") baseValue = 300
      else if (disease === "malaria") baseValue = 150
      else if (disease === "febre_amarela") baseValue = 50

      // Adjust for region
      if (region === "nordeste") baseValue *= 1.5
      else if (region === "sudeste") baseValue *= 1.3
      else if (region === "norte") baseValue *= 1.2
      else if (region === "centro_oeste") baseValue *= 0.8
      else if (region === "sul") baseValue *= 0.6

      // Add seasonal variation
      const month = date.getMonth()
      let seasonalFactor = 1

      // Higher in summer months (Dec-Mar in Brazil)
      if (month === 11 || month === 0 || month === 1 || month === 2) {
        seasonalFactor = 1.5
      }
      // Lower in winter months (Jun-Sep in Brazil)
      else if (month >= 5 && month <= 8) {
        seasonalFactor = 0.6
      }

      const actualValue = Math.round(baseValue * seasonalFactor * (0.8 + Math.random() * 0.4))
      const predictedValue = Math.round(baseValue * seasonalFactor)

      data.push({
        date: date.toISOString().split("T")[0],
        actual: actualValue,
        predicted: predictedValue,
        month: date.toLocaleDateString("pt-BR", { month: "short" }),
      })
    }

    return data
  }

  const trendData = generateTrendData()

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={trendData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip formatter={(value) => [`${value} casos`, ""]} labelFormatter={(label) => `Mês: ${label}`} />
          <Line
            name="Casos Reais"
            type="monotone"
            dataKey="actual"
            stroke="#153983"
            strokeWidth={3}
            dot={{ r: 4, fill: "#153983" }}
            activeDot={{ r: 8, fill: "#153983" }}
          />
          <Line
            name="Tendência Esperada"
            type="monotone"
            dataKey="predicted"
            stroke="#1AA4E0"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4, fill: "#1AA4E0" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

