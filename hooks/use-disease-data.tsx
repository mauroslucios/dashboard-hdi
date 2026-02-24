"use client"

import { useState, useEffect } from "react"
import type { SelectedDisease } from "@/components/dashboard"

interface DiseaseCase {
  id: string
  name?: string
  age?: number
  gender?: string
  region: string
  date: string
  status: string
  severity: string
  symptoms?: string[]
}

interface Filters {
  search: string
  region?: string
  status?: string
  severity?: string
  dateFrom?: string
  dateTo?: string
}

export function useDiseaseData(selectedDisease: SelectedDisease) {
  const [data, setData] = useState<DiseaseCase[]>([])
  const [filteredData, setFilteredData] = useState<DiseaseCase[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filters, setFilters] = useState<Filters>({
    search: "",
  })

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = async () => {
      setIsLoading(true)

      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Generate mock data
        const mockData = generateMockData(selectedDisease, 1000)
        setData(mockData)
        setFilteredData(mockData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [selectedDisease])

  useEffect(() => {
    // Apply filters to data
    let result = [...data]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (item) =>
          (item.name && item.name.toLowerCase().includes(searchLower)) ||
          item.id.toLowerCase().includes(searchLower) ||
          item.region.toLowerCase().includes(searchLower),
      )
    }

    if (filters.region) {
      result = result.filter((item) => item.region === filters.region)
    }

    if (filters.status) {
      result = result.filter((item) => item.status === filters.status)
    }

    if (filters.severity) {
      result = result.filter((item) => item.severity === filters.severity)
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom)
      result = result.filter((item) => new Date(item.date) >= fromDate)
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo)
      result = result.filter((item) => new Date(item.date) <= toDate)
    }

    setFilteredData(result)
  }, [data, filters])

  return { data, filteredData, isLoading, setFilters, filters }
}

// Helper function to generate mock data
function generateMockData(disease: SelectedDisease, count: number): DiseaseCase[] {
  const regions = [
    "Norte - Amazonas",
    "Norte - Pará",
    "Nordeste - Bahia",
    "Nordeste - Ceará",
    "Nordeste - Pernambuco",
    "Centro-Oeste - Goiás",
    "Centro-Oeste - Mato Grosso",
    "Sudeste - São Paulo",
    "Sudeste - Rio de Janeiro",
    "Sudeste - Minas Gerais",
    "Sul - Paraná",
    "Sul - Rio Grande do Sul",
  ]
  const statuses = ["active", "recovered", "deceased"]
  const severities = ["mild", "moderate", "severe"]
  const genders = ["Masculino", "Feminino"]
  const firstNames = ["João", "Maria", "Pedro", "Ana", "Carlos", "Juliana", "Lucas", "Fernanda", "Rafael", "Mariana"]
  const lastNames = [
    "Silva",
    "Santos",
    "Oliveira",
    "Souza",
    "Pereira",
    "Lima",
    "Costa",
    "Rodrigues",
    "Almeida",
    "Nascimento",
  ]

  const result: DiseaseCase[] = []

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

    // Generate a random date within the last 30 days
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * 30))

    // Adjust distribution based on disease
    let statusDistribution = [0.6, 0.35, 0.05] // Default: 60% active, 35% recovered, 5% deceased
    let severityDistribution = [0.7, 0.2, 0.1] // Default: 70% mild, 20% moderate, 10% severe

    if (disease === "dengue") {
      statusDistribution = [0.5, 0.45, 0.05]
      severityDistribution = [0.6, 0.3, 0.1]
    } else if (disease === "zika") {
      statusDistribution = [0.4, 0.59, 0.01]
      severityDistribution = [0.8, 0.15, 0.05]
    } else if (disease === "chikungunya") {
      statusDistribution = [0.45, 0.5, 0.05]
      severityDistribution = [0.5, 0.4, 0.1]
    } else if (disease === "malaria") {
      statusDistribution = [0.6, 0.3, 0.1]
      severityDistribution = [0.4, 0.4, 0.2]
    } else if (disease === "febre_amarela") {
      statusDistribution = [0.4, 0.4, 0.2]
      severityDistribution = [0.3, 0.4, 0.3]
    }

    // Select status based on distribution
    const statusRandom = Math.random()
    let statusIndex = 0
    let cumulative = 0
    for (let j = 0; j < statusDistribution.length; j++) {
      cumulative += statusDistribution[j]
      if (statusRandom < cumulative) {
        statusIndex = j
        break
      }
    }

    // Select severity based on distribution
    const severityRandom = Math.random()
    let severityIndex = 0
    cumulative = 0
    for (let j = 0; j < severityDistribution.length; j++) {
      cumulative += severityDistribution[j]
      if (severityRandom < cumulative) {
        severityIndex = j
        break
      }
    }

    result.push({
      id: `${disease.toUpperCase()}-${(10000 + i).toString()}`,
      name: `${firstName} ${lastName}`,
      age: Math.floor(Math.random() * 80) + 1,
      gender: genders[Math.floor(Math.random() * genders.length)],
      region: regions[Math.floor(Math.random() * regions.length)],
      date: date.toISOString().split("T")[0],
      status: statuses[statusIndex],
      severity: severities[severityIndex],
      symptoms: generateSymptoms(disease),
    })
  }

  return result
}

function generateSymptoms(disease: SelectedDisease): string[] {
  const commonSymptoms = ["fever", "headache", "fatigue"]
  const diseaseSpecificSymptoms: Record<SelectedDisease, string[]> = {
    dengue: ["muscle_pain", "joint_pain", "rash", "eye_pain", "nausea", "vomiting"],
    zika: ["rash", "joint_pain", "conjunctivitis", "muscle_pain"],
    chikungunya: ["joint_pain", "muscle_pain", "rash", "headache"],
    malaria: ["chills", "sweating", "nausea", "vomiting"],
    febre_amarela: ["jaundice", "abdominal_pain", "vomiting", "bleeding"],
  }

  const allPossibleSymptoms = [...commonSymptoms, ...diseaseSpecificSymptoms[disease]]
  const numberOfSymptoms = Math.floor(Math.random() * 5) + 1 // 1 to 5 symptoms

  const selectedSymptoms: string[] = []
  for (let i = 0; i < numberOfSymptoms; i++) {
    const symptom = allPossibleSymptoms[Math.floor(Math.random() * allPossibleSymptoms.length)]
    if (!selectedSymptoms.includes(symptom)) {
      selectedSymptoms.push(symptom)
    }
  }

  return selectedSymptoms
}

