import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { analyzeTone } from "@/lib/tone-analyzer"
import { getCacheKey, getFromCache, setInCache } from "@/lib/cache"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data, error } = await supabase
      .from("analyses")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) {
      throw error
    }

    return NextResponse.json({ analyses: data })
  } catch (error) {
    console.error("[v0] Get analyses error:", error)
    return NextResponse.json({ error: "Failed to fetch analyses" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { email } = await request.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email content is required" }, { status: 400 })
    }

    // Check cache
    const cacheKey = getCacheKey(email)
    let analysis = getFromCache(cacheKey)

    if (!analysis) {
      analysis = await analyzeTone(email)
      setInCache(cacheKey, analysis)
    }

    // Save to database
    const { data, error } = await supabase
      .from("analyses")
      .insert({
        user_id: user.id,
        email_content: email,
        analysis,
      })
      .select()
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json({
      analysis: data,
      cached: false,
    })
  } catch (error) {
    console.error("[v0] Create analysis error:", error)
    const message = error instanceof Error ? error.message : "Failed to analyze tone"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
