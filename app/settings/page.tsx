"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
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
        setEmail(user.email || "")
        setAuthenticated(true)
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading || !authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage your ToneRight account and preferences</p>
          </div>

          {/* Account Section */}
          <Card className="p-6 border border-border">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Account</h2>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <div className="p-3 bg-secondary border border-border rounded text-sm text-foreground">{email}</div>
              </div>

              <Button variant="destructive" onClick={() => router.push("/auth/login")}>
                Sign Out
              </Button>
            </div>
          </Card>

          {/* About Section */}
          <Card className="p-6 border border-border">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">About</h2>

              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">ToneRight</strong> is an AI-powered email tone analyzer designed
                  for neurodivergent professionals.
                </p>
                <p>
                  Powered by <strong>Groq</strong> for fast, accurate tone analysis across multiple perspectives.
                </p>
                <p className="text-xs">Version 1.0.0</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
