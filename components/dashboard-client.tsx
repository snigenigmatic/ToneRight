"use client"

import { useState } from "react"
import { EmailInputForm } from "@/components/email-input-form"
import { ToneResults } from "@/components/tone-results"
import { AnalysisHistory } from "@/components/analysis-history"
import { ExportButton } from "@/components/export-button"
import { SkeletonLoader } from "@/components/skeleton-loader"
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts"
import { Button } from "@/components/ui/button"
import type { ToneAnalysis } from "@/lib/tone-analyzer"

type Tab = "analyzer" | "history"

interface AnalysisWithId {
  id: string
  email_content: string
  analysis: ToneAnalysis
  is_favorite: boolean
  created_at: string
}

export function DashboardClient() {
  const [tab, setTab] = useState<Tab>("analyzer")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<ToneAnalysis | null>(null)
  const [email, setEmail] = useState("")
  const [selectedAnalysis, setSelectedAnalysis] = useState<AnalysisWithId | null>(null)

  const handleAnalyze = async (emailContent: string) => {
    setLoading(true)
    setError(null)
    setAnalysis(null)
    setEmail(emailContent)

    try {
      const response = await fetch("/api/analyses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailContent }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to analyze tone")
      }

      const data = await response.json()
      setAnalysis(data.analysis.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSelectAnalysis = (selectedAnal: AnalysisWithId) => {
    setAnalysis(selectedAnal.analysis)
    setEmail(selectedAnal.email_content)
    setTab("analyzer")
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="space-y-8">
        {/* Header with Tabs */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground">Email Tone Analyzer</h1>
            <p className="text-muted-foreground">
              Analyze your email tone across professional, casual, and empathetic perspectives
            </p>
          </div>

          <div className="flex gap-2 border-b border-border">
            <Button
              variant={tab === "analyzer" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTab("analyzer")}
              className={tab === "analyzer" ? "" : "bg-transparent"}
            >
              Analyzer
            </Button>
            <Button
              variant={tab === "history" ? "default" : "ghost"}
              size="sm"
              onClick={() => setTab("history")}
              className={tab === "history" ? "" : "bg-transparent"}
            >
              History
            </Button>
          </div>
        </div>

        {/* Analyzer Tab */}
        {tab === "analyzer" && (
          <div className="space-y-8">
            <EmailInputForm onSubmit={handleAnalyze} loading={loading} />

            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded text-sm text-destructive">
                {error}
              </div>
            )}

            {loading && <SkeletonLoader />}

            {analysis && !loading && (
              <div className="space-y-4">
                <div className="flex justify-end">
                  <ExportButton analysis={analysis} email={email} />
                </div>
                <ToneResults analysis={analysis} />
              </div>
            )}

            {!analysis && !error && !loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Paste an email above to get started</p>
              </div>
            )}
          </div>
        )}

        {/* History Tab */}
        {tab === "history" && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-foreground">Analysis History</h2>
            <AnalysisHistory onSelect={handleSelectAnalysis} />
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Helper */}
      <KeyboardShortcuts />
    </main>
  )
}
