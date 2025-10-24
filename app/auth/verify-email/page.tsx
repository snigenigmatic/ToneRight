"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function VerifyEmailPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-sm p-8 border border-border">
        <div className="space-y-6 text-center">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-foreground">Check your email</h1>
            <p className="text-sm text-muted-foreground">
              We've sent a confirmation link to your email address. Click it to verify your account.
            </p>
          </div>

          <div className="p-4 bg-secondary/50 border border-border rounded text-sm text-foreground">
            Once verified, you'll be able to start analyzing your emails.
          </div>

          <Button variant="outline" className="w-full bg-transparent" onClick={() => router.push("/auth/login")}>
            Back to login
          </Button>
        </div>
      </Card>
    </div>
  )
}
