"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface EmailInputFormProps {
  onSubmit: (email: string) => Promise<void>
  loading: boolean
}

export function EmailInputForm({ onSubmit, loading }: EmailInputFormProps) {
  const [email, setEmail] = useState("")

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        const textarea = document.getElementById("email-input") as HTMLTextAreaElement
        textarea?.focus()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault()
        if (email.trim()) {
          handleSubmit(e as unknown as React.FormEvent)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [email])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      await onSubmit(email)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-3">
          <label htmlFor="email-input" className="text-sm font-medium text-gray-900 dark:text-gray-100 block">
            Email Content
          </label>
          
          <div className="relative">
            <textarea
              id="email-input"
              placeholder="Paste your email content here..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
            />
            {email && (
              <div className="absolute top-2 right-2 px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                {email.length} chars
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+K</kbd>
              <span>to focus</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+Enter</kbd>
              <span>to analyze</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button 
            type="submit" 
            disabled={loading || !email.trim()} 
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Analyzing...</span>
              </div>
            ) : (
              "Analyze Tone"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={loading || !email.trim()}
            onClick={() => setEmail("")}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  )
}
