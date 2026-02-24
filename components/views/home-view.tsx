"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, MapPin, Activity, Users, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegionSelector } from "@/components/region-selector"
import { CasesOverTimeChart } from "@/components/charts/cases-over-time-chart"
import { AgeDistributionChart } from "@/components/charts/age-distribution-chart"
import { SymptomsChart } from "@/components/charts/symptoms-chart"
import { GeographicDistributionMap } from "@/components/charts/geographic-distribution-map"
import DataTable from "@/components/data-table"
import type { SelectedDisease, SelectedRegion } from "@/components/dashboard"
import { useDiseaseData } from "@/hooks/use-disease-data"

interface HomeViewProps {
  selectedDisease: SelectedDisease
  selectedRegion: SelectedRegion
  setSelectedRegion: (region: SelectedRegion) => void
}

export function HomeView({ selectedDisease, selectedRegion, setSelectedRegion }: HomeViewProps) {
  const { data, isLoading, filteredData, setFilters, filters } = useDiseaseData(selectedDisease)
  const [searchTerm, setSearchTerm] = useState("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setFilters({ ...filters, search: e.target.value })
  }

  const totalCases = filteredData.length
  const activeCases = filteredData.filter((item) => item.status === "active").length
  const severeCases = filteredData.filter((item) => item.severity === "severe").length
  const regions = [...new Set(filteredData.map((item) => item.region))].length

  const diseaseNames: Record<SelectedDisease, string> = {
    dengue: "Dengue",
    zika: "Zika",
    chikungunya: "Chikungunya",
    malaria: "Malária",
    febre_amarela: "Febre Amarela",
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-4xl font-semibold text-primary">Dashboard de {diseaseNames[selectedDisease]}</h1>
            <p className="text-gray-600">Monitoramento e análise de casos no Brasil</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="w-full pl-8 bg-white border-gray-300"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon" className="bg-white border-gray-300">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filtrar</span>
            </Button>
          </div>
        </div>

        <RegionSelector selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total de Casos</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {isLoading ? "Carregando..." : totalCases.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">Casos notificados</p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Casos Ativos</CardTitle>
              <Activity className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                {isLoading ? "Carregando..." : activeCases.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">
                {activeCases > 0 ? `${((activeCases / totalCases) * 100).toFixed(1)}% dos casos` : "Nenhum caso ativo"}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Casos Graves</CardTitle>
              <AlertCircle className="h-4 w-4 text-red" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red">
                {isLoading ? "Carregando..." : severeCases.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500">
                {severeCases > 0 ? `${((severeCases / totalCases) * 100).toFixed(1)}% dos casos` : "Nenhum caso grave"}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Regiões Afetadas</CardTitle>
              <MapPin className="h-4 w-4 text-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green">{isLoading ? "Carregando..." : regions}</div>
              <p className="text-xs text-gray-500">Regiões com casos notificados</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="bg-white rounded-lg border-gray-200 border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Mapa
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Sintomas
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Dados
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800">Casos ao Longo do Tempo</CardTitle>
                  <CardDescription>Evolução de casos nos últimos 30 dias</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <CasesOverTimeChart data={filteredData} isLoading={isLoading} />
                </CardContent>
              </Card>
              <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800">Distribuição por Idade</CardTitle>
                  <CardDescription>Casos por faixa etária</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <AgeDistributionChart data={filteredData} isLoading={isLoading} />
                </CardContent>
              </Card>
              <Card className="bg-white rounded-xl border-gray-200 shadow-sm md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-gray-800">Sintomas Principais</CardTitle>
                  <CardDescription>Frequência dos sintomas relatados</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <SymptomsChart data={filteredData} isLoading={isLoading} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="map" className="space-y-4">
            <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Distribuição Geográfica</CardTitle>
                <CardDescription>Casos por região e estado</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px]">
                  <GeographicDistributionMap data={filteredData} isLoading={isLoading} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="symptoms" className="space-y-4">
            <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Análise de Sintomas</CardTitle>
                <CardDescription>Detalhamento dos sintomas por caso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <SymptomsChart data={filteredData} isLoading={isLoading} detailed />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="data" className="space-y-4">
            <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Dados Brutos</CardTitle>
                <CardDescription>Conjunto completo de dados com opções de filtragem</CardDescription>
              </CardHeader>
              <CardContent>
                <DataTable data={filteredData} isLoading={isLoading} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

