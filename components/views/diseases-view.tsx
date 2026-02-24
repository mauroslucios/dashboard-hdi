"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RegionSelector } from "@/components/region-selector"
import { DiseaseSelector } from "@/components/disease-selector"
import { CasesOverTimeChart } from "@/components/charts/cases-over-time-chart"
import { SymptomsChart } from "@/components/charts/symptoms-chart"
import { GeographicDistributionMap } from "@/components/charts/geographic-distribution-map"
import { DiseaseComparisonChart } from "@/components/charts/disease-comparison-chart"
import type { SelectedDisease, SelectedRegion } from "@/components/dashboard"
import { useDiseaseData } from "@/hooks/use-disease-data"

interface DiseasesViewProps {
  selectedDisease: SelectedDisease
  setSelectedDisease: (disease: SelectedDisease) => void
  selectedRegion: SelectedRegion
  setSelectedRegion: (region: SelectedRegion) => void
}

export function DiseasesView({
  selectedDisease,
  setSelectedDisease,
  selectedRegion,
  setSelectedRegion,
}: DiseasesViewProps) {
  const { data, isLoading, filteredData } = useDiseaseData(selectedDisease)

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
        <div>
          <h1 className="text-4xl font-semibold text-primary">Análise de Doenças</h1>
          <p className="text-gray-600">Selecione uma doença para visualizar dados detalhados</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <DiseaseSelector selectedDisease={selectedDisease} setSelectedDisease={setSelectedDisease} />

          <RegionSelector selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />
        </div>

        <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">Visão Geral: {diseaseNames[selectedDisease]}</CardTitle>
            <CardDescription>Informações gerais sobre a doença selecionada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">Sobre a Doença</h3>
                <p className="text-gray-600 mb-4">
                  {selectedDisease === "dengue" &&
                    "A dengue é uma doença febril causada pelo vírus dengue, transmitido pela picada do mosquito Aedes aegypti. Seus sintomas incluem febre alta, dores musculares, dor de cabeça, náusea e erupções cutâneas."}
                  {selectedDisease === "zika" &&
                    "O vírus Zika é transmitido principalmente pelo mosquito Aedes aegypti. A infecção durante a gravidez pode causar microcefalia e outros defeitos congênitos. Os sintomas incluem febre leve, erupção cutânea e dor nas articulações."}
                  {selectedDisease === "chikungunya" &&
                    "A febre chikungunya é causada por um vírus transmitido pelos mosquitos Aedes aegypti e Aedes albopictus. Caracteriza-se por febre alta e dores intensas nas articulações, que podem persistir por meses ou anos."}
                  {selectedDisease === "malaria" &&
                    "A malária é causada por parasitas do gênero Plasmodium, transmitidos pela picada de mosquitos Anopheles infectados. Seus sintomas incluem febre alta, calafrios, sudorese e dores de cabeça."}
                  {selectedDisease === "febre_amarela" &&
                    "A febre amarela é uma doença infecciosa transmitida por mosquitos infectados. Pode causar febre, náuseas, vômitos e, em casos graves, insuficiência hepática e renal, hemorragia e morte."}
                </p>
                <h3 className="text-lg font-medium text-primary mb-2">Transmissão</h3>
                <p className="text-gray-600">
                  {selectedDisease === "dengue" &&
                    "Transmitida pela picada do mosquito Aedes aegypti infectado com o vírus."}
                  {selectedDisease === "zika" &&
                    "Transmitida principalmente pela picada do mosquito Aedes aegypti, mas também pode ser transmitida por via sexual e de mãe para filho durante a gravidez."}
                  {selectedDisease === "chikungunya" &&
                    "Transmitida pela picada dos mosquitos Aedes aegypti e Aedes albopictus infectados com o vírus."}
                  {selectedDisease === "malaria" &&
                    "Transmitida pela picada de mosquitos Anopheles fêmeas infectados com o parasita Plasmodium."}
                  {selectedDisease === "febre_amarela" &&
                    "Transmitida pela picada de mosquitos infectados, principalmente dos gêneros Aedes e Haemagogus."}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">Sintomas Comuns</h3>
                <ul className="list-disc pl-5 text-gray-600 mb-4">
                  {selectedDisease === "dengue" && (
                    <>
                      <li>Febre alta (40°C)</li>
                      <li>Dores musculares e articulares</li>
                      <li>Dor de cabeça</li>
                      <li>Dor atrás dos olhos</li>
                      <li>Erupções cutâneas</li>
                      <li>Náusea e vômito</li>
                    </>
                  )}
                  {selectedDisease === "zika" && (
                    <>
                      <li>Febre leve</li>
                      <li>Erupção cutânea</li>
                      <li>Dor nas articulações</li>
                      <li>Conjuntivite</li>
                      <li>Dor muscular</li>
                      <li>Dor de cabeça</li>
                    </>
                  )}
                  {selectedDisease === "chikungunya" && (
                    <>
                      <li>Febre alta</li>
                      <li>Dores intensas nas articulações</li>
                      <li>Dor de cabeça</li>
                      <li>Dor muscular</li>
                      <li>Erupção cutânea</li>
                      <li>Fadiga</li>
                    </>
                  )}
                  {selectedDisease === "malaria" && (
                    <>
                      <li>Febre alta</li>
                      <li>Calafrios</li>
                      <li>Sudorese</li>
                      <li>Dores de cabeça</li>
                      <li>Náusea e vômito</li>
                      <li>Dores musculares</li>
                    </>
                  )}
                  {selectedDisease === "febre_amarela" && (
                    <>
                      <li>Febre</li>
                      <li>Dor de cabeça</li>
                      <li>Dores musculares</li>
                      <li>Náusea e vômito</li>
                      <li>Icterícia (pele e olhos amarelados)</li>
                      <li>Hemorragias (em casos graves)</li>
                    </>
                  )}
                </ul>
                <h3 className="text-lg font-medium text-primary mb-2">Prevenção</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {selectedDisease === "dengue" && (
                    <>
                      <li>Eliminar criadouros do mosquito</li>
                      <li>Usar repelentes</li>
                      <li>Instalar telas em janelas</li>
                      <li>Usar roupas que cubram o corpo</li>
                      <li>Vacinação (quando disponível)</li>
                    </>
                  )}
                  {selectedDisease === "zika" && (
                    <>
                      <li>Eliminar criadouros do mosquito</li>
                      <li>Usar repelentes</li>
                      <li>Usar preservativos nas relações sexuais</li>
                      <li>Instalar telas em janelas</li>
                      <li>Usar roupas que cubram o corpo</li>
                    </>
                  )}
                  {selectedDisease === "chikungunya" && (
                    <>
                      <li>Eliminar criadouros do mosquito</li>
                      <li>Usar repelentes</li>
                      <li>Instalar telas em janelas</li>
                      <li>Usar roupas que cubram o corpo</li>
                    </>
                  )}
                  {selectedDisease === "malaria" && (
                    <>
                      <li>Usar mosquiteiros tratados com inseticida</li>
                      <li>Aplicar repelentes</li>
                      <li>Tomar medicamentos preventivos</li>
                      <li>Eliminar água parada</li>
                      <li>Usar roupas que cubram o corpo</li>
                    </>
                  )}
                  {selectedDisease === "febre_amarela" && (
                    <>
                      <li>Vacinação</li>
                      <li>Usar repelentes</li>
                      <li>Eliminar criadouros do mosquito</li>
                      <li>Instalar telas em janelas</li>
                      <li>Usar roupas que cubram o corpo</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="trends" className="space-y-4">
          <TabsList className="bg-white rounded-lg border-gray-200 border">
            <TabsTrigger value="trends" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Tendências
            </TabsTrigger>
            <TabsTrigger value="symptoms" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Sintomas
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Distribuição
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Comparação
            </TabsTrigger>
          </TabsList>
          <TabsContent value="trends" className="space-y-4">
            <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Tendência de Casos</CardTitle>
                <CardDescription>Evolução de casos ao longo do tempo</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[400px]">
                  <CasesOverTimeChart data={filteredData} isLoading={isLoading} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="symptoms" className="space-y-4">
            <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Sintomas Relatados</CardTitle>
                <CardDescription>Frequência dos sintomas nos casos reportados</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[400px]">
                  <SymptomsChart data={filteredData} isLoading={isLoading} detailed />
                </div>
              </CardContent>
            </Card>
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
          <TabsContent value="comparison" className="space-y-4">
            <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Comparação entre Doenças</CardTitle>
                <CardDescription>Análise comparativa de diferentes doenças</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <DiseaseComparisonChart currentDisease={selectedDisease} isLoading={isLoading} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

