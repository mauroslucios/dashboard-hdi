"use client"

import { useState, useEffect } from "react"
import type { DengueCase } from "@/types/dengue"
import Papa from "papaparse"

interface Filters {
  search: string
  uf?: string
  municipio?: string
  hospitalizacao?: string
  febre?: string
  dataInicio?: string
  dataFim?: string
}

export function useDengueData() {
  const [data, setData] = useState<DengueCase[]>([])
  const [filteredData, setFilteredData] = useState<DengueCase[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    search: "",
  })

  useEffect(() => {
    // Fetch and parse the CSV data
    const fetchData = async () => {
      setIsLoading(true)

      try {
        const response = await fetch(
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DENGBR25_processed-qAKCsqCNa5zfoM7GcspCvbat2Mayq1.csv",
        )
        const csvText = await response.text()

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // Map CSV column names to our camelCase property names
            const mappedData = results.data.map((row: any) => ({
              tipoNotificacao: row["Tipo de Notificação"],
              agravo: row["Agravo"],
              dataNotificacao: row["Data de Notificação"],
              ufNotificacao: row["UF da Notificação"],
              municipioNotificacao: row["Município da Notificação"],
              unidadeSaude: row["Unidade de Saúde"],
              dataPrimeirosSintomas: row["Data dos Primeiros Sintomas"],
              anoNascimento: row["Ano de Nascimento"],
              sexo: row["Sexo"],
              gestante: row["Gestante"],
              raca: row["Raça"],
              ufResidencia: row["UF de Residência"],
              municipioResidencia: row["Município de Residência"],
              paisResidencia: row["País de Residência"],
              dataInvestigacao: row["Data da Investigação"],
              febre: row["Febre"],
              mialgia: row["Mialgia"],
              cefaleia: row["Cefaleia"],
              exantema: row["Exantema"],
              vomito: row["Vômito"],
              nausea: row["Náusea"],
              dorCostas: row["Dor nas Costas"],
              conjuntivite: row["Conjuntivite"],
              artrite: row["Artrite"],
              artralgia: row["Artralgia"],
              petequias: row["Petéquias"],
              leucopenia: row["Leucopenia"],
              testeLaco: row["Teste do Laço"],
              dorRetroOrbital: row["Dor Retro-Orbital"],
              diabetes: row["Diabetes"],
              doencaHematologica: row["Doença Hematológica"],
              hepatopatia: row["Hepatopatia"],
              doencaRenal: row["Doença Renal"],
              hipertensao: row["Hipertensão"],
              ulceraPeptica: row["Úlcera Péptica"],
              doencaAutoimune: row["Doença Autoimune"],
              hospitalizacao: row["Hospitalização"],
              dataInternacao: row["Data da Internação"],
              dataObito: row["Data do Óbito"],
            })) as DengueCase[]

            setData(mappedData)
            setFilteredData(mappedData)
            setIsLoading(false)
          },
          error: (error) => {
            console.error("Error parsing CSV:", error)
            setIsLoading(false)
          },
        })
      } catch (error) {
        console.error("Error fetching data:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Apply filters to data
    let result = [...data]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (item) =>
          (item.municipioNotificacao && item.municipioNotificacao.toLowerCase().includes(searchLower)) ||
          (item.ufNotificacao && item.ufNotificacao.toLowerCase().includes(searchLower)) ||
          (item.unidadeSaude && item.unidadeSaude.toLowerCase().includes(searchLower)),
      )
    }

    if (filters.uf) {
      result = result.filter((item) => item.ufNotificacao === filters.uf)
    }

    if (filters.municipio) {
      result = result.filter((item) => item.municipioNotificacao === filters.municipio)
    }

    if (filters.hospitalizacao) {
      result = result.filter((item) => item.hospitalizacao === filters.hospitalizacao)
    }

    if (filters.febre) {
      result = result.filter((item) => item.febre === filters.febre)
    }

    if (filters.dataInicio) {
      const startDate = new Date(filters.dataInicio)
      result = result.filter((item) => item.dataNotificacao && new Date(item.dataNotificacao) >= startDate)
    }

    if (filters.dataFim) {
      const endDate = new Date(filters.dataFim)
      result = result.filter((item) => item.dataNotificacao && new Date(item.dataNotificacao) <= endDate)
    }

    setFilteredData(result)
  }, [data, filters])

  return { data, filteredData, isLoading, setFilters, filters }
}

