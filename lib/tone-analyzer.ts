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

const TONE_ANALYSIS_PROMPT = `You are an expert email tone analyzer. Analyze the following email and provide a detailed tone analysis in JSON format.

Email to analyze:
"{email}"

Provide your analysis in this exact JSON format (no markdown, just raw JSON):
{{
  "overall_tone": "string describing the overall tone",
  "confidence": number between 0 and 1,
  "perspectives": {{
    "professional": {{
      "tone": "how this email reads in a professional context",
      "score": number between 0 and 1 (1 = very professional),
      "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
    }},
    "casual": {{
      "tone": "how this email reads in a casual context",
      "score": number between 0 and 1 (1 = very casual),
      "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
    }},
    "empathetic": {{
      "tone": "how this email reads in an empathetic context",
      "score": number between 0 and 1 (1 = very empathetic),
      "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]
    }}
  }},
  "key_issues": ["issue 1", "issue 2"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"]
}}

Return ONLY the JSON object, no additional text.`

export async function analyzeTone(email: string): Promise<ToneAnalysis> {
  if (!email || email.trim().length === 0) {
    throw new Error("Email content cannot be empty")
  }

  const groq = getGroqClient()

  try {
    const message = await groq.messages.create({
      model: "mixtral-8x7b-32768",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: TONE_ANALYSIS_PROMPT.replace("{email}", email),
        },
      ],
    })

    const responseText = message.content[0].type === "text" ? message.content[0].text : ""

    // Parse the JSON response
    const analysis = JSON.parse(responseText) as ToneAnalysis

    // Validate the response structure
    if (!analysis.overall_tone || !analysis.perspectives || !analysis.key_issues || !analysis.improvements) {
      throw new Error("Invalid response structure from Groq")
    }

    return analysis
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse tone analysis response")
    }
    throw error
  }
}
