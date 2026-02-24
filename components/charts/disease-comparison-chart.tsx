"use client"

import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import type { SelectedDisease } from "@/components/dashboard"

interface DiseaseComparisonChartProps {
  currentDisease: SelectedDisease
  isLoading: boolean
}

export function DiseaseComparisonChart({ currentDisease, isLoading }: DiseaseComparisonChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />
  }

  // Mock data for disease comparison
  const comparisonData = [
    {
      name: "Casos Totais",
      dengue: 15000,
      zika: 5000,
      chikungunya: 8000,
      malaria: 3000,
      febre_amarela: 1000,
    },
    {
      name: "Casos Graves",
      dengue: 3000,
      zika: 800,
      chikungunya: 1500,
      malaria: 900,
      febre_amarela: 400,
    },
    {
      name: "Hospitalizações",
      dengue: 2000,
      zika: 500,
      chikungunya: 1200,
      malaria: 700,
      febre_amarela: 300,
    },
    {
      name: "Óbitos",
      dengue: 150,
      zika: 30,
      chikungunya: 80,
      malaria: 60,
      febre_amarela: 40,
    },
  ]

  const colors = {
    dengue: "#153983",
    zika: "#1AA4E0",
    chikungunya: "#0BB07B",
    malaria: "#FFCE52",
    febre_amarela: "#F03D3D",
  }

  const diseaseNames: Record<SelectedDisease, string> = {
    dengue: "Dengue",
    zika: "Zika",
    chikungunya: "Chikungunya",
    malaria: "Malária",
    febre_amarela: "Febre Amarela",
  }

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={comparisonData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value, name) => [value, diseaseNames[name as SelectedDisease]]} />
          <Legend formatter={(value) => diseaseNames[value as SelectedDisease]} />
          {(Object.keys(colors) as SelectedDisease[]).map((disease) => (
            <Bar
              key={disease}
              dataKey={disease}
              fill={colors[disease]}
              radius={[4, 4, 0, 0]}
              opacity={disease === currentDisease ? 1 : 0.6}
              strokeWidth={disease === currentDisease ? 2 : 0}
              stroke={disease === currentDisease ? colors[disease] : undefined}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

