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
    <Card className="p-6 border border-border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email-input" className="text-sm font-medium text-foreground">
            Paste your email
          </label>
          <textarea
            id="email-input"
            placeholder="Paste the email content you want to analyze..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full h-32 p-3 border border-border rounded bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
          <p className="text-xs text-muted-foreground">Tip: Press Ctrl+K to focus, Ctrl+Enter to analyze</p>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={loading || !email.trim()} className="flex-1">
            {loading ? "Analyzing..." : "Analyze Tone"}
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={loading || !email.trim()}
            onClick={() => setEmail("")}
            className="bg-transparent"
          >
            Clear
          </Button>
        </div>
      </form>
    </Card>
  )
}
