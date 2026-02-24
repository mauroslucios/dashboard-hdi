"use client"

import type React from "react"

import { useState } from "react"
import {
  Home,
  Activity,
  Lightbulb,
  ChevronDown,
  AlertCircle,
  WormIcon as Virus,
  Droplets,
  Bug,
  Thermometer,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { ActiveView, SelectedDisease } from "@/components/dashboard"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AppSidebarProps {
  activeView: ActiveView
  setActiveView: (view: ActiveView) => void
  selectedDisease: SelectedDisease
  setSelectedDisease: (disease: SelectedDisease) => void
}

export function AppSidebar({ activeView, setActiveView, selectedDisease, setSelectedDisease }: AppSidebarProps) {
  const [openDiseases, setOpenDiseases] = useState(false)

  const diseaseIcons: Record<SelectedDisease, React.ReactNode> = {
    dengue: <Droplets className="h-5 w-5" />,
    zika: <Virus className="h-5 w-5" />,
    chikungunya: <Bug className="h-5 w-5" />,
    malaria: <AlertCircle className="h-5 w-5" />,
    febre_amarela: <Thermometer className="h-5 w-5" />,
  }

  const diseaseNames: Record<SelectedDisease, string> = {
    dengue: "Dengue",
    zika: "Zika",
    chikungunya: "Chikungunya",
    malaria: "Malária",
    febre_amarela: "Febre Amarela",
  }

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-primary font-semibold text-xl">Monitor de Doenças</h1>
        <p className="text-gray-500 text-sm">Painel de Controle</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeView === "home" ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeView === "home" ? "bg-primary text-white" : "text-gray-700",
                )}
                onClick={() => setActiveView("home")}
              >
                <Home className="mr-2 h-5 w-5" />
                <span className="font-medium">Início</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Visualizações principais</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Collapsible
          open={openDiseases || activeView === "diseases"}
          onOpenChange={setOpenDiseases}
          className="space-y-2"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <CollapsibleTrigger asChild>
                  <Button
                    variant={activeView === "diseases" ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      activeView === "diseases" ? "bg-primary text-white" : "text-gray-700",
                    )}
                    onClick={() => setActiveView("diseases")}
                  >
                    <Activity className="mr-2 h-5 w-5" />
                    <span className="font-medium">Doenças</span>
                    <ChevronDown
                      className={cn(
                        "ml-auto h-4 w-4 transition-transform",
                        (openDiseases || activeView === "diseases") && "transform rotate-180",
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Selecione a doença para análise</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <CollapsibleContent className="space-y-1 pl-6">
            {(Object.keys(diseaseNames) as SelectedDisease[]).map((disease) => (
              <Button
                key={disease}
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  selectedDisease === disease ? "bg-tertiary text-primary font-medium" : "text-gray-600",
                )}
                onClick={() => {
                  setSelectedDisease(disease)
                  if (activeView !== "diseases") setActiveView("diseases")
                }}
              >
                {diseaseIcons[disease]}
                <span className="ml-2">{diseaseNames[disease]}</span>
              </Button>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={activeView === "insights" ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  activeView === "insights" ? "bg-primary text-white" : "text-gray-700",
                )}
                onClick={() => setActiveView("insights")}
              >
                <Lightbulb className="mr-2 h-5 w-5" />
                <span className="font-medium">Insights</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Análises e insights importantes</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-600">Sistema atualizado</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">Última atualização: hoje</p>
      </div>
    </div>
  )
}

