"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import type { DengueCase } from "@/types/dengue"

interface DengueMapProps {
  data: DengueCase[]
  isLoading: boolean
}

export function DengueMap({ data, isLoading }: DengueMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // This would be where you'd initialize a map library like Leaflet or Google Maps
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading || !mapLoaded) {
    return <Skeleton className="h-full w-full rounded-lg" />
  }

  // Process data to get cases by UF and municipality
  const regionCounts = new Map<string, { total: number; hospitalized: number }>()
  const ufCounts = new Map<string, number>()

  data.forEach((item) => {
    // Count by municipality
    const municipalityKey = `${item.ufNotificacao} - ${item.municipioNotificacao}`
    if (!regionCounts.has(municipalityKey)) {
      regionCounts.set(municipalityKey, { total: 0, hospitalized: 0 })
    }

    const regionData = regionCounts.get(municipalityKey)!
    regionData.total++

    if (item.hospitalizacao === "Sim") {
      regionData.hospitalized++
    }

    // Count by UF
    if (item.ufNotificacao) {
      ufCounts.set(item.ufNotificacao, (ufCounts.get(item.ufNotificacao) || 0) + 1)
    }
  })

  // Sort regions by total cases
  const sortedRegions = Array.from(regionCounts.entries())
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10)

  // Sort UFs by total cases
  const sortedUFs = Array.from(ufCounts.entries()).sort((a, b) => b[1] - a[1])

  return (
    <div className="h-full flex flex-col md:flex-row gap-4">
      <div className="flex-1 bg-slate-100 rounded-lg flex items-center justify-center">
        <div className="text-center text-slate-600">
          <p>Mapa interativo seria exibido aqui</p>
          <p className="text-sm">Utilizando bibliotecas como Leaflet, Mapbox ou Google Maps</p>
        </div>
      </div>
      <div className="w-full md:w-72 space-y-4">
        <div>
          <h3 className="font-medium text-slate-800 mb-2">Top 10 Municípios</h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
            {sortedRegions.map(([region, { total, hospitalized }]) => (
              <div key={region} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-slate-800">{region}</span>
                  <span className="text-orange-600 font-semibold">{total}</span>
                </div>
                <div className="mt-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${(hospitalized / total) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Hospitalizados: {hospitalized}</span>
                  <span>{((hospitalized / total) * 100).toFixed(0)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium text-slate-800 mb-2">Casos por UF</h3>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
            {sortedUFs.map(([uf, count]) => (
              <div
                key={uf}
                className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200 shadow-sm"
              >
                <span className="font-medium text-slate-800">{uf}</span>
                <span className="text-orange-600 font-semibold">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

