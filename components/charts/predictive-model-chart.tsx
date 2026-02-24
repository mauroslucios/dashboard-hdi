"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import type { SelectedDisease, SelectedRegion } from "@/components/dashboard"

interface PredictiveModelChartProps {
  disease: SelectedDisease
  region: SelectedRegion
  isLoading: boolean
}

export function PredictiveModelChart({ disease, region, isLoading }: PredictiveModelChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />
  }

  // Generate mock data for predictive model
  const generatePredictiveData = () => {
    const data = []
    const today = new Date()

    // Generate data for the last 4 weeks and next 8 weeks
    for (let i = -4; i < 8; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() + i * 7) // Weekly data

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

      const value = Math.round(baseValue * seasonalFactor * (0.8 + Math.random() * 0.4))

      // For future dates, add prediction interval
      let lowerBound = null
      let upperBound = null

      if (i >= 0) {
        const uncertainty = 0.1 + i * 0.05 // Uncertainty increases with time
        lowerBound = Math.round(value * (1 - uncertainty))
        upperBound = Math.round(value * (1 + uncertainty))
      }

      data.push({
        date: date.toISOString().split("T")[0],
        value: value,
        lowerBound: lowerBound,
        upperBound: upperBound,
        isFuture: i >= 0,
        week: `Semana ${i >= 0 ? "+" : ""}${i}`,
      })
    }

    return data
  }

  const predictiveData = generatePredictiveData()

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={predictiveData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 10,
          }}
        >
          <XAxis dataKey="week" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip formatter={(value) => [`${value} casos`, ""]} labelFormatter={(label) => `${label}`} />
          <Line
            name="Casos Históricos"
            type="monotone"
            dataKey="value"
            stroke="#153983"
            strokeWidth={3}
            dot={{ r: 4, fill: "#153983" }}
            activeDot={{ r: 8, fill: "#153983" }}
            connectNulls
          />
          <Line
            name="Previsão"
            type="monotone"
            dataKey="value"
            stroke="#1AA4E0"
            strokeWidth={3}
            strokeDasharray="5 5"
            dot={{ r: 4, fill: "#1AA4E0" }}
            activeDot={{ r: 8, fill: "#1AA4E0" }}
            connectNulls
          />
          <Line
            name="Limite Inferior"
            type="monotone"
            dataKey="lowerBound"
            stroke="#E5EEFF"
            strokeWidth={1}
            dot={false}
            activeDot={false}
            connectNulls
          />
          <Line
            name="Limite Superior"
            type="monotone"
            dataKey="upperBound"
            stroke="#E5EEFF"
            strokeWidth={1}
            dot={false}
            activeDot={false}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

