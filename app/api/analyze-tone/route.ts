import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { analyzeTone } from "@/lib/tone-analyzer"
import { getCacheKey, getFromCache, setInCache } from "@/lib/cache"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email content is required" }, { status: 400 })
    }

    // Check cache
    const cacheKey = getCacheKey(email)
    const cachedResult = getFromCache(cacheKey)
    if (cachedResult) {
      return NextResponse.json({
        analysis: cachedResult,
        cached: true,
      })
    }

    // Analyze tone
    const analysis = await analyzeTone(email)

    // Cache the result
    setInCache(cacheKey, analysis)

    return NextResponse.json({
      analysis,
      cached: false,
    })
  } catch (error) {
    console.error("[v0] Tone analysis error:", error)

    const message = error instanceof Error ? error.message : "Failed to analyze tone"

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
