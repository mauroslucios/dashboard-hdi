"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { HomeView } from "@/components/views/home-view"
import { DiseasesView } from "@/components/views/diseases-view"
import { InsightsView } from "@/components/views/insights-view"

export type ActiveView = "home" | "diseases" | "insights"
export type SelectedDisease = "dengue" | "zika" | "chikungunya" | "malaria" | "febre_amarela"
export type SelectedRegion = "all" | "norte" | "nordeste" | "centro_oeste" | "sudeste" | "sul"

export default function Dashboard() {
  const [activeView, setActiveView] = useState<ActiveView>("home")
  const [selectedDisease, setSelectedDisease] = useState<SelectedDisease>("dengue")
  const [selectedRegion, setSelectedRegion] = useState<SelectedRegion>("all")

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar
        activeView={activeView}
        setActiveView={setActiveView}
        selectedDisease={selectedDisease}
        setSelectedDisease={setSelectedDisease}
      />

      <main className="flex-1 overflow-auto">
        {activeView === "home" && (
          <HomeView
            selectedDisease={selectedDisease}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
        )}

        {activeView === "diseases" && (
          <DiseasesView
            selectedDisease={selectedDisease}
            setSelectedDisease={setSelectedDisease}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
        )}

        {activeView === "insights" && (
          <InsightsView
            selectedDisease={selectedDisease}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
          />
        )}
      </main>
    </div>
  )
}

