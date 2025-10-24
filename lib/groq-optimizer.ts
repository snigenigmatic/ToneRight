import { getGroqClient } from "./groq-client"

export interface OptimizedAnalysisRequest {
  email: string
  useParallel?: boolean
}

const PROFESSIONAL_PROMPT = `Analyze this email for professional tone. Return JSON with: tone (string), score (0-1), suggestions (array of 3 strings).
Email: "{email}"`

const CASUAL_PROMPT = `Analyze this email for casual tone. Return JSON with: tone (string), score (0-1), suggestions (array of 3 strings).
Email: "{email}"`

const EMPATHETIC_PROMPT = `Analyze this email for empathetic tone. Return JSON with: tone (string), score (0-1), suggestions (array of 3 strings).
Email: "{email}"`

export async function analyzeWithOptimization(email: string) {
  const groq = getGroqClient()

  // Use parallel requests for faster analysis
  const [professionalRes, casualRes, empatheticRes] = await Promise.all([
    groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      max_tokens: 256,
      messages: [{ role: "user", content: PROFESSIONAL_PROMPT.replace("{email}", email) }],
    }),
    groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      max_tokens: 256,
      messages: [{ role: "user", content: CASUAL_PROMPT.replace("{email}", email) }],
    }),
    groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      max_tokens: 256,
      messages: [{ role: "user", content: EMPATHETIC_PROMPT.replace("{email}", email) }],
    }),
  ])

  const professional = JSON.parse(professionalRes.choices[0]?.message?.content || "{}")
  const casual = JSON.parse(casualRes.choices[0]?.message?.content || "{}")
  const empathetic = JSON.parse(empatheticRes.choices[0]?.message?.content || "{}")

  return {
    professional,
    casual,
    empathetic,
  }
}
