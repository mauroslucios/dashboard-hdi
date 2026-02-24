"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface DiseaseCase {
  region: string
  status: string
  severity: string
}

interface GeographicDistributionMapProps {
  data: DiseaseCase[]
  isLoading: boolean
}

export function GeographicDistributionMap({ data, isLoading }: GeographicDistributionMapProps) {
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

  // Process data to get cases by region
  const regionCounts = new Map<string, { total: number; severe: number }>()

  data.forEach((item) => {
    if (!regionCounts.has(item.region)) {
      regionCounts.set(item.region, { total: 0, severe: 0 })
    }

    const regionData = regionCounts.get(item.region)!
    regionData.total++

    if (item.severity === "severe") {
      regionData.severe++
    }
  })

  // Sort regions by total cases
  const sortedRegions = Array.from(regionCounts.entries())
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10)

  return (
    <div className="h-full flex flex-col md:flex-row gap-4">
      <div className="flex-1 bg-tertiary rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p>Mapa interativo do Brasil</p>
          <p className="text-sm">Mostrando a distribuição de casos por estado</p>
        </div>
      </div>
      <div className="w-full md:w-72 space-y-4">
        <h3 className="font-medium text-gray-800">Top 10 Regiões Afetadas</h3>
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
          {sortedRegions.map(([region, { total, severe }]) => (
            <div key={region} className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between">
                <span className="font-medium text-gray-800">{region}</span>
                <span className="text-primary font-semibold">{total}</span>
              </div>
              <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${(severe / total) * 100}%` }} />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Casos graves: {severe}</span>
                <span>{((severe / total) * 100).toFixed(0)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

