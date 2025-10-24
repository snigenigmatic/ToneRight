import { getGroqClient } from "./groq-client"

export interface ToneAnalysis {
  overall_tone: string
  confidence: number
  perspectives: {
    professional: {
      tone: string
      score: number
      suggestions: string[]
    }
    casual: {
      tone: string
      score: number
      suggestions: string[]
    }
    empathetic: {
      tone: string
      score: number
      suggestions: string[]
    }
  }
  key_issues: string[]
  improvements: string[]
}

const TONE_ANALYSIS_PROMPT = `Analyze this email's tone and respond with ONLY valid JSON in this exact format:

{"overall_tone":"brief description","confidence":0.85,"perspectives":{"professional":{"tone":"description","score":0.8,"suggestions":["tip1","tip2","tip3"]},"casual":{"tone":"description","score":0.6,"suggestions":["tip1","tip2","tip3"]},"empathetic":{"tone":"description","score":0.7,"suggestions":["tip1","tip2","tip3"]}},"key_issues":["issue1","issue2"],"improvements":["improvement1","improvement2","improvement3"]}

Email: "{email}"

JSON:`

export async function analyzeTone(email: string): Promise<ToneAnalysis> {
  if (!email || email.trim().length === 0) {
    throw new Error("Email content cannot be empty")
  }

  const groq = getGroqClient()

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: TONE_ANALYSIS_PROMPT.replace("{email}", email),
        },
      ],
    })

    const responseText = completion.choices[0]?.message?.content || ""

    // Clean and parse the JSON response
    let analysis: ToneAnalysis
    try {
      // Clean the response text
      let cleanResponse = responseText.trim()
      
      // Remove any markdown code blocks
      cleanResponse = cleanResponse.replace(/```json\s*/g, '').replace(/```\s*/g, '')
      
      // Find JSON object bounds
      const jsonStart = cleanResponse.indexOf('{')
      const jsonEnd = cleanResponse.lastIndexOf('}')
      
      if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
        throw new Error("No valid JSON object found in response")
      }
      
      const jsonString = cleanResponse.substring(jsonStart, jsonEnd + 1)
      analysis = JSON.parse(jsonString) as ToneAnalysis
      
    } catch (parseError) {
      console.error("Failed to parse JSON response:", responseText)
      
      // Fallback: return a default analysis
      return {
        overall_tone: "neutral and informative",
        confidence: 0.7,
        perspectives: {
          professional: {
            tone: "suitable for professional communication",
            score: 0.7,
            suggestions: ["Consider more formal language", "Add clear call to action", "Use professional greetings"]
          },
          casual: {
            tone: "moderately casual and approachable",
            score: 0.6,
            suggestions: ["Add personal touches", "Use more conversational tone", "Include friendly expressions"]
          },
          empathetic: {
            tone: "shows understanding and consideration",
            score: 0.8,
            suggestions: ["Acknowledge recipient's perspective", "Use supportive language", "Show appreciation"]
          }
        },
        key_issues: ["Unable to fully analyze due to parsing error"],
        improvements: ["Retry analysis with clearer content", "Ensure email is properly formatted", "Check for special characters"]
      }
    }

    // Validate and fix the response structure
    if (!analysis.overall_tone) analysis.overall_tone = "neutral"
    if (!analysis.confidence || analysis.confidence < 0 || analysis.confidence > 1) analysis.confidence = 0.7
    if (!analysis.perspectives) analysis.perspectives = {
      professional: { tone: "professional", score: 0.7, suggestions: ["Add professional language"] },
      casual: { tone: "casual", score: 0.6, suggestions: ["Add casual elements"] },
      empathetic: { tone: "empathetic", score: 0.8, suggestions: ["Show more empathy"] }
    }
    if (!analysis.key_issues) analysis.key_issues = []
    if (!analysis.improvements) analysis.improvements = ["Consider tone adjustments"]

    return analysis
  } catch (error) {
    console.error("Tone analysis error:", error)
    throw error
  }
}
