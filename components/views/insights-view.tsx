"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { RegionSelector } from "@/components/region-selector"
import { RiskLevelIndicator } from "@/components/risk-level-indicator"
import { TrendAnalysisChart } from "@/components/charts/trend-analysis-chart"
import { PredictiveModelChart } from "@/components/charts/predictive-model-chart"
import type { SelectedDisease, SelectedRegion } from "@/components/dashboard"
import { useDiseaseData } from "@/hooks/use-disease-data"
import { AlertCircle, TrendingUp, TrendingDown, Activity } from "lucide-react"

interface InsightsViewProps {
  selectedDisease: SelectedDisease
  selectedRegion: SelectedRegion
  setSelectedRegion: (region: SelectedRegion) => void
}

export function InsightsView({ selectedDisease, selectedRegion, setSelectedRegion }: InsightsViewProps) {
  const { data, isLoading } = useDiseaseData(selectedDisease)

  const diseaseNames: Record<SelectedDisease, string> = {
    dengue: "Dengue",
    zika: "Zika",
    chikungunya: "Chikungunya",
    malaria: "Malária",
    febre_amarela: "Febre Amarela",
  }

  const regionNames: Record<SelectedRegion, string> = {
    all: "Todo o Brasil",
    norte: "Região Norte",
    nordeste: "Região Nordeste",
    centro_oeste: "Região Centro-Oeste",
    sudeste: "Região Sudeste",
    sul: "Região Sul",
  }

  // Insights específicos baseados na doença e região
  const getInsights = () => {
    if (selectedDisease === "dengue") {
      if (selectedRegion === "nordeste") {
        return {
          riskLevel: "high",
          trend: "up",
          insights: [
            "Aumento de 27% nos casos nas últimas 4 semanas",
            "Maior concentração em áreas urbanas com problemas de saneamento",
            "Correlação com períodos de chuva seguidos por calor intenso",
            "Eficácia reduzida das campanhas de prevenção atuais",
          ],
        }
      } else if (selectedRegion === "sudeste") {
        return {
          riskLevel: "medium",
          trend: "stable",
          insights: [
            "Estabilização dos casos após pico no início do ano",
            "Maior efetividade das campanhas de prevenção",
            "Concentração em áreas periféricas das grandes cidades",
            "Redução de 12% nos casos graves em comparação ao mesmo período do ano anterior",
          ],
        }
      }
    } else if (selectedDisease === "zika") {
      if (selectedRegion === "nordeste") {
        return {
          riskLevel: "medium",
          trend: "down",
          insights: [
            "Redução de 15% nos casos em comparação ao ano anterior",
            "Maior conscientização sobre prevenção entre gestantes",
            "Diminuição de casos de microcefalia relacionados ao Zika",
            "Melhoria nas estratégias de controle do vetor",
          ],
        }
      }
    }

    // Default insights
    return {
      riskLevel: "low",
      trend: "stable",
      insights: [
        "Padrão sazonal consistente com anos anteriores",
        "Distribuição geográfica alinhada com fatores climáticos",
        "Eficácia das campanhas de prevenção dentro do esperado",
        "Correlação com indicadores socioeconômicos e de infraestrutura urbana",
      ],
    }
  }

  const insightData = getInsights()

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-4xl font-semibold text-primary">Insights e Análises</h1>
          <p className="text-gray-600">Análises aprofundadas e tendências para tomada de decisão</p>
        </div>

        <RegionSelector selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion} />

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-800">Nível de Risco</CardTitle>
              <CardDescription>Avaliação atual de risco</CardDescription>
            </CardHeader>
            <CardContent>
              <RiskLevelIndicator level={insightData.riskLevel} />
            </CardContent>
          </Card>

          <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-800">Tendência</CardTitle>
              <CardDescription>Direção da evolução de casos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                {insightData.trend === "up" && (
                  <>
                    <TrendingUp className="h-8 w-8 text-red" />
                    <div>
                      <p className="font-medium text-red">Em alta</p>
                      <p className="text-sm text-gray-500">Aumento no número de casos</p>
                    </div>
                  </>
                )}
                {insightData.trend === "down" && (
                  <>
                    <TrendingDown className="h-8 w-8 text-green" />
                    <div>
                      <p className="font-medium text-green">Em queda</p>
                      <p className="text-sm text-gray-500">Redução no número de casos</p>
                    </div>
                  </>
                )}
                {insightData.trend === "stable" && (
                  <>
                    <Activity className="h-8 w-8 text-yellow" />
                    <div>
                      <p className="font-medium text-yellow">Estável</p>
                      <p className="text-sm text-gray-500">Sem alterações significativas</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-gray-800">Estágio Atual</CardTitle>
              <CardDescription>Fase da epidemia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Badge className="bg-primary text-white">
                  {insightData.riskLevel === "high"
                    ? "Epidêmico"
                    : insightData.riskLevel === "medium"
                      ? "Alerta"
                      : "Endêmico"}
                </Badge>
                <p className="text-sm text-gray-600">
                  {insightData.riskLevel === "high"
                    ? "Número de casos acima do limiar epidêmico"
                    : insightData.riskLevel === "medium"
                      ? "Número de casos próximo ao limiar de alerta"
                      : "Número de casos dentro do padrão esperado"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Alert className="bg-tertiary border-primary">
          <AlertCircle className="h-4 w-4 text-primary" />
          <AlertTitle className="text-primary">Resumo da Situação</AlertTitle>
          <AlertDescription className="text-gray-700">
            Análise de {diseaseNames[selectedDisease]} em {regionNames[selectedRegion]}:
            {insightData.riskLevel === "high"
              ? " Situação de alto risco que requer atenção imediata e medidas intensificadas de controle."
              : insightData.riskLevel === "medium"
                ? " Situação de risco moderado que requer monitoramento contínuo e ações preventivas."
                : " Situação de baixo risco, mas que requer manutenção das medidas preventivas."}
          </AlertDescription>
        </Alert>

        <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-800">Principais Insights</CardTitle>
            <CardDescription>Análises baseadas nos dados mais recentes</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {insightData.insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-1 mr-2 mt-0.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary"></span>
                  </span>
                  <span className="text-gray-700">{insight}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Tabs defaultValue="analysis" className="space-y-4">
          <TabsList className="bg-white rounded-lg border-gray-200 border">
            <TabsTrigger value="analysis" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Análise de Tendências
            </TabsTrigger>
            <TabsTrigger value="prediction" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              Modelo Preditivo
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              Recomendações
            </TabsTrigger>
          </TabsList>
          <TabsContent value="analysis" className="space-y-4">
            <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Análise de Tendências</CardTitle>
                <CardDescription>Padrões e tendências identificados nos dados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <TrendAnalysisChart disease={selectedDisease} region={selectedRegion} isLoading={isLoading} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="prediction" className="space-y-4">
            <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Modelo Preditivo</CardTitle>
                <CardDescription>Previsão de casos para as próximas semanas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <PredictiveModelChart disease={selectedDisease} region={selectedRegion} isLoading={isLoading} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="recommendations" className="space-y-4">
            <Card className="bg-white rounded-xl border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-800">Recomendações</CardTitle>
                <CardDescription>Ações sugeridas com base na análise de dados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-primary mb-2">Para Gestores de Saúde</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      {insightData.riskLevel === "high" ? (
                        <>
                          <li>Intensificar ações de controle vetorial nas áreas mais afetadas</li>
                          <li>Ampliar a capacidade de atendimento nas unidades de saúde</li>
                          <li>Implementar campanhas emergenciais de conscientização</li>
                          <li>Estabelecer sala de situação para monitoramento diário</li>
                          <li>Mobilizar recursos adicionais para enfrentamento da situação</li>
                        </>
                      ) : insightData.riskLevel === "medium" ? (
                        <>
                          <li>Manter vigilância ativa nas áreas de maior incidência</li>
                          <li>Reforçar ações de controle vetorial preventivas</li>
                          <li>Intensificar campanhas educativas em mídias locais</li>
                          <li>Preparar unidades de saúde para possível aumento de casos</li>
                          <li>Monitorar estoques de insumos e medicamentos</li>
                        </>
                      ) : (
                        <>
                          <li>Manter ações rotineiras de vigilância e controle</li>
                          <li>Continuar campanhas educativas regulares</li>
                          <li>Monitorar indicadores para identificar mudanças no padrão</li>
                          <li>Avaliar efetividade das estratégias atuais</li>
                          <li>Planejar ações preventivas para períodos de maior risco</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-primary mb-2">Para a População</h3>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Eliminar criadouros do mosquito em residências e arredores</li>
                      <li>Utilizar repelentes, especialmente nos horários de maior atividade do vetor</li>
                      <li>Instalar telas em janelas e portas</li>
                      <li>Procurar atendimento médico aos primeiros sintomas</li>
                      <li>Participar de ações comunitárias de limpeza e eliminação de criadouros</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

