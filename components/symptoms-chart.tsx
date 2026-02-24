"use client"

import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import type { DengueCase } from "@/types/dengue"

interface SymptomsChartProps {
  data: DengueCase[]
  isLoading: boolean
  detailed?: boolean
}

export function SymptomsChart({ data, isLoading, detailed = false }: SymptomsChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  // Define the symptoms to track
  const symptoms = [
    { key: "febre", label: "Febre" },
    { key: "mialgia", label: "Mialgia" },
    { key: "cefaleia", label: "Cefaleia" },
    { key: "exantema", label: "Exantema" },
    { key: "vomito", label: "Vômito" },
    { key: "nausea", label: "Náusea" },
    { key: "dorCostas", label: "Dor nas Costas" },
    { key: "conjuntivite", label: "Conjuntivite" },
    { key: "artrite", label: "Artrite" },
    { key: "artralgia", label: "Artralgia" },
    { key: "petequias", label: "Petéquias" },
    { key: "dorRetroOrbital", label: "Dor Retro-Orbital" },
  ]

  // Count symptoms
  const symptomCounts = symptoms
    .map((symptom) => {
      const count = data.filter((item) => item[symptom.key as keyof DengueCase] === "Sim").length
      const percentage = data.length > 0 ? (count / data.length) * 100 : 0

      return {
        name: symptom.label,
        count,
        percentage: Number.parseFloat(percentage.toFixed(1)),
        color: getSymptomColor(symptom.key),
      }
    })
    .sort((a, b) => b.count - a.count)

  if (detailed) {
    return (
      <div className="h-full">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={symptomCounts}
            layout="vertical"
            margin={{
              top: 20,
              right: 30,
              left: 100,
              bottom: 5,
            }}
          >
            <XAxis type="number" tickFormatter={(value) => `${value}%`} />
            <YAxis type="category" dataKey="name" tick={{ fill: "#475569" }} width={100} />
            <Tooltip
              formatter={(value) => [`${value}%`, "Percentual"]}
              labelFormatter={(label) => `Sintoma: ${label}`}
            />
            <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
              {symptomCounts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  // For the overview, show top 5 symptoms as a pie chart
  const topSymptoms = symptomCounts.slice(0, 5)

  return (
    <ChartContainer
      config={{
        count: {
          label: "Casos",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <div className="flex h-full">
        <ResponsiveContainer width="50%" height="100%">
          <PieChart>
            <Pie
              data={topSymptoms}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="count"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {topSymptoms.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-center gap-2 w-1/2">
          {topSymptoms.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <div className="flex justify-between w-full">
                <span className="text-slate-700">{entry.name}</span>
                <span className="font-medium text-slate-900">{entry.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ChartContainer>
  )
}

function getSymptomColor(symptomKey: string): string {
  const colorMap: Record<string, string> = {
    febre: "#ef4444",
    mialgia: "#f97316",
    cefaleia: "#f59e0b",
    exantema: "#84cc16",
    vomito: "#10b981",
    nausea: "#06b6d4",
    dorCostas: "#0ea5e9",
    conjuntivite: "#3b82f6",
    artrite: "#6366f1",
    artralgia: "#8b5cf6",
    petequias: "#a855f7",
    dorRetroOrbital: "#ec4899",
  }

  return colorMap[symptomKey] || "#94a3b8"
}

