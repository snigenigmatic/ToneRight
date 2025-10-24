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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Clean Header Section */}
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                Email Tone Analyzer
              </h1>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Analyze your email tone across professional, casual, and empathetic perspectives
              </p>
            </div>

            {/* Clean Tab Navigation */}
            <div className="flex justify-center">
              <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 shadow-sm border border-gray-200 dark:border-gray-700">
                <Button
                  variant={tab === "analyzer" ? "default" : "ghost"}
                  onClick={() => setTab("analyzer")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    tab === "analyzer" 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  Analyzer
                </Button>
                <Button
                  variant={tab === "history" ? "default" : "ghost"}
                  onClick={() => setTab("history")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    tab === "history" 
                      ? "bg-blue-600 text-white shadow-sm" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  History
                </Button>
              </div>
            </div>
          </div>

          {/* Analyzer Tab */}
          {tab === "analyzer" && (
            <div className="space-y-6">
              <EmailInputForm onSubmit={handleAnalyze} loading={loading} />

              {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 text-red-500 mt-0.5">⚠</div>
                    <div>
                      <h3 className="font-medium text-red-800 dark:text-red-200 text-sm">Analysis Error</h3>
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
                    </div>
                  </div>
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
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <span className="text-2xl">📧</span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Ready to Analyze</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto">
                      Paste your email content above to get started with tone analysis
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {tab === "history" && (
            <div className="space-y-4">
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Analysis History</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Review your previous analyses</p>
              </div>
              <AnalysisHistory onSelect={handleSelectAnalysis} />
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Helper */}
        <KeyboardShortcuts />
      </main>
    </div>
  )
}
