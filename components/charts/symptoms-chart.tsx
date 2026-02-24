"use client"

import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface DiseaseCase {
  symptoms?: string[]
}

interface SymptomsChartProps {
  data: DiseaseCase[]
  isLoading: boolean
  detailed?: boolean
}

export function SymptomsChart({ data, isLoading, detailed = false }: SymptomsChartProps) {
  if (isLoading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  // Define the symptoms to track
  const symptoms = [
    { key: "fever", label: "Febre" },
    { key: "headache", label: "Dor de cabeça" },
    { key: "muscle_pain", label: "Dor muscular" },
    { key: "joint_pain", label: "Dor nas articulações" },
    { key: "rash", label: "Erupção cutânea" },
    { key: "nausea", label: "Náusea" },
    { key: "vomiting", label: "Vômito" },
    { key: "eye_pain", label: "Dor nos olhos" },
    { key: "bleeding", label: "Sangramento" },
    { key: "fatigue", label: "Fadiga" },
  ]

  // Count symptoms
  const symptomCounts = symptoms
    .map((symptom) => {
      // In a real app, this would count actual symptoms from the data
      // For now, we'll generate random counts
      const count = Math.floor(Math.random() * data.length)
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
    <div className="h-[300px]">
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
            <Tooltip
              formatter={(value) => [`${value} casos`, "Casos"]}
              labelFormatter={(label) => `Sintoma: ${label}`}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-center gap-2 w-1/2">
          {topSymptoms.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
              <div className="flex justify-between w-full">
                <span className="text-gray-700">{entry.name}</span>
                <span className="font-medium text-gray-900">{entry.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getSymptomColor(symptomKey: string): string {
  const colorMap: Record<string, string> = {
    fever: "#F03D3D",
    headache: "#1AA4E0",
    muscle_pain: "#0BB07B",
    joint_pain: "#FFCE52",
    rash: "#153983",
    nausea: "#386488",
    vomiting: "#66D1FF",
    eye_pain: "#042363",
    bleeding: "#026899",
    fatigue: "#30B8F2",
  }

  return colorMap[symptomKey] || "#717274"
}

