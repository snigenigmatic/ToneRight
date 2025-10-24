"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function KeyboardShortcuts() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "/") {
        e.preventDefault()
        setOpen(!open)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open])

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
        title="Press Ctrl+/ for shortcuts"
      >
        ?
      </button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
      <Card className="w-full max-w-sm p-6 border border-border" onClick={(e) => e.stopPropagation()}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">Keyboard Shortcuts</h2>

          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Toggle shortcuts</span>
              <kbd className="px-2 py-1 bg-secondary border border-border rounded text-xs font-mono">Ctrl + /</kbd>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Focus email input</span>
              <kbd className="px-2 py-1 bg-secondary border border-border rounded text-xs font-mono">Ctrl + K</kbd>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Analyze email</span>
              <kbd className="px-2 py-1 bg-secondary border border-border rounded text-xs font-mono">Ctrl + Enter</kbd>
            </div>
          </div>

          <Button onClick={() => setOpen(false)} className="w-full">
            Close
          </Button>
        </div>
      </Card>
    </div>
  )
}
