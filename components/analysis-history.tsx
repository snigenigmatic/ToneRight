"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getOverallToneColor, formatConfidence } from "@/lib/tone-utils"

interface Analysis {
  id: string
  email_content: string
  analysis: {
    overall_tone: string
    confidence: number
  }
  is_favorite: boolean
  created_at: string
}

interface AnalysisHistoryProps {
  onSelect: (analysis: Analysis) => void
}

export function AnalysisHistory({ onSelect }: AnalysisHistoryProps) {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalyses = async () => {
      try {
        const response = await fetch("/api/analyses")
        if (!response.ok) throw new Error("Failed to fetch analyses")
        const data = await response.json()
        setAnalyses(data.analyses)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load history")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyses()
  }, [])

  const handleToggleFavorite = async (id: string, isFavorite: boolean) => {
    try {
      const response = await fetch(`/api/analyses/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_favorite: !isFavorite }),
      })

      if (!response.ok) throw new Error("Failed to update")

      setAnalyses((prev) => prev.map((a) => (a.id === id ? { ...a, is_favorite: !isFavorite } : a)))
    } catch (err) {
      console.error("[v0] Toggle favorite error:", err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/analyses/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete")
      setAnalyses((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      console.error("[v0] Delete error:", err)
    }
  }

  if (loading) {
    return <div className="text-center text-muted-foreground">Loading history...</div>
  }

  if (error) {
    return <div className="text-center text-destructive">{error}</div>
  }

  if (analyses.length === 0) {
    return <div className="text-center text-muted-foreground">No analyses yet</div>
  }

  return (
    <div className="space-y-2">
      {analyses.map((analysis) => (
        <Card
          key={analysis.id}
          className="p-4 border border-border hover:bg-secondary/30 transition-colors cursor-pointer"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0" onClick={() => onSelect(analysis)}>
              <div className="flex items-center gap-2 mb-2">
                <p className={`font-medium ${getOverallToneColor(analysis.analysis.overall_tone)}`}>
                  {analysis.analysis.overall_tone}
                </p>
                <span className="text-xs text-muted-foreground">{formatConfidence(analysis.analysis.confidence)}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{analysis.email_content.substring(0, 100)}...</p>
              <p className="text-xs text-muted-foreground mt-1">{new Date(analysis.created_at).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleToggleFavorite(analysis.id, analysis.is_favorite)
                }}
              >
                {analysis.is_favorite ? "★" : "☆"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDelete(analysis.id)
                }}
              >
                ✕
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
