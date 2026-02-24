"use client"

import type React from "react"

import { Activity, Droplets, WormIcon as Virus, Bug, AlertCircle, Thermometer } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { SelectedDisease } from "@/components/dashboard"

interface DiseaseSelectorProps {
  selectedDisease: SelectedDisease
  setSelectedDisease: (disease: SelectedDisease) => void
}

export function DiseaseSelector({ selectedDisease, setSelectedDisease }: DiseaseSelectorProps) {
  const diseases: { id: SelectedDisease; name: string; icon: React.ReactNode }[] = [
    { id: "dengue", name: "Dengue", icon: <Droplets className="h-5 w-5" /> },
    { id: "zika", name: "Zika", icon: <Virus className="h-5 w-5" /> },
    { id: "chikungunya", name: "Chikungunya", icon: <Bug className="h-5 w-5" /> },
    { id: "malaria", name: "Malária", icon: <AlertCircle className="h-5 w-5" /> },
    { id: "febre_amarela", name: "Febre Amarela", icon: <Thermometer className="h-5 w-5" /> },
  ]

  return (
    <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <Activity className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-medium text-gray-800">Selecione a Doença</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
          {diseases.map((disease) => (
            <button
              key={disease.id}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                selectedDisease === disease.id
                  ? "bg-primary text-white"
                  : "bg-tertiary text-primary hover:bg-primary/10"
              }`}
              onClick={() => setSelectedDisease(disease.id)}
            >
              {disease.icon}
              {disease.name}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

