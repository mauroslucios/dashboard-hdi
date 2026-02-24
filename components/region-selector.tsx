"use client"

import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { SelectedRegion } from "@/components/dashboard"

interface RegionSelectorProps {
  selectedRegion: SelectedRegion
  setSelectedRegion: (region: SelectedRegion) => void
}

export function RegionSelector({ selectedRegion, setSelectedRegion }: RegionSelectorProps) {
  const regions: { id: SelectedRegion; name: string }[] = [
    { id: "all", name: "Todo o Brasil" },
    { id: "norte", name: "Norte" },
    { id: "nordeste", name: "Nordeste" },
    { id: "centro_oeste", name: "Centro-Oeste" },
    { id: "sudeste", name: "Sudeste" },
    { id: "sul", name: "Sul" },
  ]

  return (
    <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <MapPin className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-medium text-gray-800">Selecione a Região</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
          {regions.map((region) => (
            <button
              key={region.id}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedRegion === region.id ? "bg-primary text-white" : "bg-tertiary text-primary hover:bg-primary/10"
              }`}
              onClick={() => setSelectedRegion(region.id)}
            >
              {region.name}
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

