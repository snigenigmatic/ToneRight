"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function WelcomePage() {
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
      } else {
        setAuthenticated(true)
      }
    }

    checkAuth()
  }, [router])

  if (!authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold text-foreground">Welcome to ToneRight</h1>
          <p className="text-lg text-muted-foreground">Your AI-powered email tone analyzer for better communication</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 border border-border">
            <div className="space-y-3">
              <div className="text-2xl">📧</div>
              <h3 className="font-semibold text-foreground">Paste Your Email</h3>
              <p className="text-sm text-muted-foreground">Copy and paste any email you want to analyze</p>
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <div className="space-y-3">
              <div className="text-2xl">🔍</div>
              <h3 className="font-semibold text-foreground">Get Instant Analysis</h3>
              <p className="text-sm text-muted-foreground">AI analyzes tone across multiple perspectives</p>
            </div>
          </Card>

          <Card className="p-6 border border-border">
            <div className="space-y-3">
              <div className="text-2xl">💡</div>
              <h3 className="font-semibold text-foreground">Receive Suggestions</h3>
              <p className="text-sm text-muted-foreground">Get actionable improvements for your emails</p>
            </div>
          </Card>
        </div>

        <div className="flex gap-4 justify-center">
          <Button onClick={() => router.push("/dashboard")} className="px-8">
            Start Analyzing
          </Button>
          <Button variant="outline" onClick={() => router.push("/settings")} className="bg-transparent px-8">
            Settings
          </Button>
        </div>

        <div className="bg-secondary/30 border border-border rounded p-6 space-y-3">
          <h3 className="font-semibold text-foreground">Quick Tips</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Use Ctrl+/ to see keyboard shortcuts</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Your analyses are saved automatically in History</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Star your favorite analyses for quick access</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">•</span>
              <span>Export analyses as JSON or text for sharing</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
