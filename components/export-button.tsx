"use client"

import { Button } from "@/components/ui/button"
import type { ToneAnalysis } from "@/lib/tone-analyzer"

interface ExportButtonProps {
  analysis: ToneAnalysis
  email: string
}

export function ExportButton({ analysis, email }: ExportButtonProps) {
  const handleExportJSON = () => {
    const data = {
      email,
      analysis,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `tone-analysis-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportText = () => {
    const text = `Email Tone Analysis Report
Generated: ${new Date().toLocaleString()}

OVERALL TONE: ${analysis.overall_tone}
Confidence: ${Math.round(analysis.confidence * 100)}%

PERSPECTIVE ANALYSIS:

Professional:
- Tone: ${analysis.perspectives.professional.tone}
- Score: ${Math.round(analysis.perspectives.professional.score * 100)}%
- Suggestions: ${analysis.perspectives.professional.suggestions.join(", ")}

Casual:
- Tone: ${analysis.perspectives.casual.tone}
- Score: ${Math.round(analysis.perspectives.casual.score * 100)}%
- Suggestions: ${analysis.perspectives.casual.suggestions.join(", ")}

Empathetic:
- Tone: ${analysis.perspectives.empathetic.tone}
- Score: ${Math.round(analysis.perspectives.empathetic.score * 100)}%
- Suggestions: ${analysis.perspectives.empathetic.suggestions.join(", ")}

KEY ISSUES:
${analysis.key_issues.map((issue) => `- ${issue}`).join("\n")}

IMPROVEMENTS:
${analysis.improvements.map((improvement) => `- ${improvement}`).join("\n")}`

    const blob = new Blob([text], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `tone-analysis-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={handleExportJSON} className="bg-transparent">
        Export JSON
      </Button>
      <Button variant="outline" size="sm" onClick={handleExportText} className="bg-transparent">
        Export Text
      </Button>
    </div>
  )
}
