"use client"

interface RiskLevelIndicatorProps {
  level: "low" | "medium" | "high"
}

export function RiskLevelIndicator({ level }: RiskLevelIndicatorProps) {
  const levels = [
    { id: "low", label: "Baixo", color: "bg-green" },
    { id: "medium", label: "Médio", color: "bg-yellow" },
    { id: "high", label: "Alto", color: "bg-red" },
  ]

  const currentLevelIndex = levels.findIndex((l) => l.id === level)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        {levels.map((l, index) => (
          <div key={l.id} className="flex flex-col items-center">
            <div className={`w-6 h-6 rounded-full ${index <= currentLevelIndex ? l.color : "bg-gray-200"}`} />
            <span
              className={`text-xs mt-1 font-medium ${
                index === currentLevelIndex
                  ? index === 0
                    ? "text-green"
                    : index === 1
                      ? "text-yellow"
                      : "text-red"
                  : "text-gray-500"
              }`}
            >
              {l.label}
            </span>
          </div>
        ))}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full ${
            level === "low" ? "bg-green w-1/3" : level === "medium" ? "bg-yellow w-2/3" : "bg-red w-full"
          }`}
        />
      </div>

      <p className="text-sm text-gray-600">
        {level === "low" && "Risco baixo: Situação sob controle, com número de casos dentro do esperado."}
        {level === "medium" && "Risco médio: Aumento no número de casos, requer atenção e monitoramento."}
        {level === "high" && "Risco alto: Situação crítica, com número elevado de casos e tendência de aumento."}
      </p>
    </div>
  )
}

